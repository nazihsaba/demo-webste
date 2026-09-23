/*
 * Paste this into the n8n node "Group photos by business", replacing its code.
 *
 * It already groups the uploaded photos. What is new: it also saves the
 * details the photo run returns but you were throwing away — the full week
 * of opening hours, the owner's own description, the highlights, and the
 * review numbers. Those fill the hours table, the About section, the tags
 * and the rating bars on the demo pages.
 *
 * Run setup/01-supabase-migration.sql first, or the new fields have
 * nowhere to land.
 */

const base = $('Settings').first().json.supabaseUrl + '/storage/v1/object/public/';
const slugByPlace = $('Collect place IDs').first().json.slugByPlace;

// Supabase answers each upload with its path: "business-photos/<slug>/1.jpg".
const photos = {};
for (const item of $input.all()) {
  const key = item.json.Key;
  if (!key) continue; // a failed photo: skip it, keep the rest
  const slug = key.split('/')[1];
  (photos[slug] ||= []).push(base + key);
}

// Google groups these under headings like "Highlights" and "Offerings",
// sometimes as objects and sometimes as arrays. Handle both.
const GROUPS = ['Highlights', 'Popular for', 'Offerings', 'Atmosphere', 'Service options', 'Dining options', 'Amenities', 'Planning'];

function highlightsOf(info) {
  if (!info || typeof info !== 'object') return null;
  const out = [];
  for (const name of GROUPS) {
    const group = info[name];
    if (!group) continue;
    const entries = Array.isArray(group) ? group.flatMap((o) => Object.entries(o)) : Object.entries(group);
    for (const [label, on] of entries) {
      if (on === true && !out.includes(label)) out.push(label);
    }
  }
  return out.length ? out.slice(0, 8) : null;
}

const rows = [];
for (const item of $('Fetch photos').all()) {
  const place = item.json;
  const slug = slugByPlace[place.placeId];
  if (!slug) continue;

  const row = {
    slug,
    opening_hours: place.openingHours?.length ? place.openingHours : null,
    editorial_summary: place.editorialSummary || null,
    highlights: highlightsOf(place.additionalInfo),
    review_tags: place.reviewsTags?.length ? place.reviewsTags : null,
    reviews_distribution: place.reviewsDistribution || null,
  };

  // Only overwrite the photo columns when photos actually uploaded.
  const urls = (photos[slug] || []).sort();
  if (urls.length) {
    row.image_url = urls[0];
    row.image_urls = urls;
  }

  rows.push({ json: row });
}

return rows;
