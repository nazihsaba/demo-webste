import type { Business } from "./types";

/**
 * Invented businesses for trying the site without a database.
 * Turn on with USE_SAMPLE_DATA=1. Each one tests a different amount of data:
 * rich, medium, sparse, and an Arabic name.
 */
const photos = (set: string, n = 6) =>
  Array.from({ length: n }, (_, i) => `/samples/${set}-${i + 1}.jpg`);

const everyDay = (hours: string) =>
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => ({ day, hours }));

export const sampleBusinesses: Business[] = [
  {
    slug: "beit-samra-batroun-a1b2",
    business: "Beit Samra",
    template: "restaurant",
    category: "Lebanese restaurant",
    area: "Batroun",
    address: "Old Souk, Batroun, Lebanon",
    phone: "96171601650",
    rating: 4.7,
    reviews: 312,
    imageUrl: "/samples/restaurant-1.jpg",
    galleryUrls: photos("restaurant"),
    mapsUrl: "https://www.google.com/maps",
    lat: 34.2556,
    lng: 35.6589,
    headline: "Charcoal, sea air, and a table that runs long",
    about:
      "Three generations have cooked in this stone house off the old souk. The mezze comes out the way it always has, the fish is whatever came in that morning, and nobody rushes you out.",
    offerings: [
      { name: "Mezze for the table", description: "Hummus, tabbouleh, moutabal, warm bread", price: "$35" },
      { name: "Catch of the day", description: "Grilled whole over charcoal, lemon, olive oil", price: "$42" },
      { name: "Mixed grill", description: "Lamb, kafta and shish taouk, garlic, pickles", price: "$38" },
      { name: "Knefeh", description: "Made to order, with ka'ak", price: "$12" },
    ],
    openingHours: [
      { day: "Monday", hours: "Closed" },
      ...["Tuesday", "Wednesday", "Thursday"].map((day) => ({ day, hours: "12 PM–11 PM" })),
      ...["Friday", "Saturday"].map((day) => ({ day, hours: "12 PM–1 AM" })),
      { day: "Sunday", hours: "12 PM–10 PM" },
    ],
    highlights: ["Outdoor seating", "Great wine list", "Good for groups", "Accepts reservations"],
    reviewTags: [
      { title: "grilled fish", count: 41 },
      { title: "mezze", count: 33 },
      { title: "sea view", count: 18 },
      { title: "friendly staff", count: 15 },
    ],
    reviewsDistribution: { fiveStar: 241, fourStar: 49, threeStar: 12, twoStar: 4, oneStar: 6 },
  },
  {
    slug: "cafe-marra-batroun-c3d4",
    business: "Café Marra",
    template: "coffee-shop",
    category: "Coffee shop",
    area: "Batroun",
    address: "Main street, Batroun, Lebanon",
    phone: "9616741272", // a landline: the page shows a call button, not WhatsApp
    rating: 4.3,
    reviews: 388,
    imageUrl: "/samples/coffee-1.jpg",
    galleryUrls: photos("coffee"),
    lat: 34.2493,
    lng: 35.6603,
    editorialSummary:
      "A small room with a big machine on the main street. We roast light, pull short, and know most people's order before they ask. Stay for an hour or take it down to the water.",
    openingHours: everyDay("7 AM–1 AM"),
    highlights: ["Great coffee", "Good for working on laptop", "Outdoor seating", "Cosy"],
    reviewTags: [
      { title: "spanish latte", count: 12 },
      { title: "frozen yogurt", count: 9 },
      { title: "chill place", count: 6 },
      { title: "budget friendly", count: 6 },
    ],
    reviewsDistribution: { fiveStar: 211, fourStar: 93, threeStar: 45, twoStar: 9, oneStar: 30 },
  },
  {
    slug: "ahwet-el-mina-e5f6",
    business: "Ahwet el Mina - قهوة الميناء",
    template: "coffee-shop",
    category: "Coffee shop",
    area: "Jbeil",
    phone: "96181181131",
    rating: 4.8,
    reviews: 57,
    imageUrl: "/samples/coffee-4.jpg",
    galleryUrls: ["/samples/coffee-4.jpg", "/samples/coffee-2.jpg", "/samples/coffee-6.jpg"],
    lat: 34.1211,
    lng: 35.6481,
    openingHoursToday: { day: "Tuesday", hours: "Open 24 hours" },
    reviewTags: [
      { title: "shisha", count: 8 },
      { title: "arabic coffee", count: 5 },
    ],
  },
  {
    slug: "studio-nour-jbeil-g7h8",
    business: "Studio Nour",
    template: "general",
    category: "Hair salon",
    area: "Jbeil",
    address: "Rue du Port, Jbeil, Lebanon",
    phone: "96176398198",
    rating: 4.9,
    reviews: 64,
    imageUrl: "/samples/salon-1.jpg",
    galleryUrls: photos("salon"),
    lat: 34.1223,
    lng: 35.6466,
    openingHours: [
      ...["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => ({ day, hours: "9 AM–7 PM" })),
      { day: "Saturday", hours: "9 AM–5 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
    highlights: ["Appointment required", "Women-owned", "Wheelchair-accessible entrance"],
    reviewsDistribution: { fiveStar: 60, fourStar: 3, threeStar: 1 },
  },
];
