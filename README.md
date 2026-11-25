# Website previews

One personalised preview page per local business, sent to the owner over
WhatsApp. Data comes from Supabase, filled by the n8n lead workflow.

## 1. Run it locally

    npm install
    cp .env.example .env.local     # then fill in your Supabase keys
    npm run dev

No database to hand? See the site on built-in samples instead:

    USE_SAMPLE_DATA=1 npm run dev

`/` lists every preview. Each business is at `/<slug>`.

## 2. Before the pages are complete

Run `setup/01-supabase-migration.sql` in the Supabase SQL Editor, then
apply `setup/02-n8n-group-photos-node.js` and
`setup/03-n8n-template-expression.txt` in n8n. Without those, the hours
table, the About text, the highlights and the rating bars stay empty and
the pages simply hide those sections.

## 3. Deploy

Push to GitHub, import the repo on vercel.com, and add the three
variables from `.env.example` under Settings -> Environment Variables
BEFORE the first build. Missing keys do not crash the build any more,
but every page comes out empty.

Then put the live URL into the n8n **Settings** node as `baseUrl`, so
the links written into the Google Sheet point at the right place.

## How it is put together

    app/
      layout.tsx              fonts, the site-wide noindex rule
      page.tsx                internal list of previews, grouped by shop category
      [slug]/page.tsx         one business: data -> template, plus link previews
      [slug]/opengraph-image  the card WhatsApp shows before anyone taps
      [slug]/icon.tsx         browser-tab icon with the business initial
    components/
      templates/index.ts      template id -> component, and theme colours
      templates/restaurant    dark evening room, photo mosaic, printed menu
      templates/coffee-shop   daylight, paper and teal, swipeable photo strip
      templates/appointments  salons, barbers, clinics, fitness, pet care
      templates/quote         garages, home maintenance, electronics repair
      templates/events        wedding and event vendors
      templates/education     tutors and courses
      templates/general       anything that fits none of the above
      site/                   photo, stars, rating bars, open-now, map, buttons,
                              and the WhatsApp request form
    lib/
      categories.ts           the ten shop categories from the vRB sheet: which
                              template, button words, and request form each gets
      types.ts                the shape of one business
      get-business.ts         the ONLY place that knows where data comes from
      view.ts                 turns raw data into what templates display
      hours.ts                reads Google's opening hours, works out open/closed
      sample-data.ts          eight test businesses, one per template or more
      fonts.ts                Latin and Arabic faces

### How a business gets its template

The Google category decides. `lib/categories.ts` matches it against the
ten shop categories from the vRB sheet ("Hair salon" -> salons and
barbers -> the appointments template, "Auto repair shop" -> garages ->
the quote template). No n8n or Supabase change is needed.

A template saved in the Supabase `template` column wins, so you can force
one business onto a design by hand. Only `general` (or an empty column)
lets the category decide.

To teach it a new category word, add it to the right `match` line in
`lib/categories.ts`.

### Adding a template

1. Copy `components/templates/general.tsx` to a new file.
2. Add its id to `TemplateId` and `TEMPLATE_IDS` in `lib/types.ts`, and a
   palette block in `app/globals.css`.
3. Add one line to `components/templates/index.ts`, and a colour to the
   `COLORS` lists in `app/[slug]/icon.tsx` and `opengraph-image.tsx`.
4. Point a category at it in `lib/categories.ts`.

## Things worth knowing

- **Landlines get a call button, not WhatsApp.** Lebanese landlines
  (numbers like +961 6 741 272) are not on WhatsApp, so a wa.me link to
  one silently fails. Mobile prefixes (3, 70, 71, 76, 78, 79, 81) get the
  WhatsApp button.
- **Pages never look broken when data is missing.** Every section hides
  itself, and a business with no description gets an honest one written
  from its own category, area and rating.
- **New businesses need no redeploy.** Pages for businesses added after
  the build are rendered on first visit, then cached.
- **Nothing is indexed by Google.** Every page carries a noindex tag and
  a visible "this is a preview" banner. These are real businesses that
  did not ask for a website.
- **Photos** are resized by Vercel. The free plan has a monthly limit on
  that; plenty for previews, worth knowing if usage grows.
- **Request forms never touch a server.** The quote, date and class forms
  just open WhatsApp with the answers typed in; the visitor presses send.
- `public/samples/` is only for `USE_SAMPLE_DATA`. Delete it whenever you
  like.
