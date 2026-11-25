import type { TemplateId } from "./types";

/**
 * The shop categories from "shop category / website templates" (vRB).
 *
 * Each kind of shop gets one of the template families and its own words:
 * a garage says "Request a quote", a salon says "Book an appointment".
 * The Google Maps category is matched against `match`, top to bottom, so
 * order matters: "pet salon" must hit pets before it hits beauty.
 */

export type KindId =
  | "food"
  | "cafe"
  | "pet"
  | "clinic"
  | "beauty"
  | "fitness"
  | "auto"
  | "repair"
  | "home"
  | "events"
  | "education"
  | "other";

/** One question in a WhatsApp request form. */
export type FormField = {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "date" | "number";
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

export type Kind = {
  id: KindId;
  /** Plural, for the internal list of previews. */
  label: string;
  template: TemplateId;
  match?: RegExp;
  cta: { whatsapp: string; call: string; message: string };
  /** Heading over the services / menu list. */
  services: string;
  /** Heading over the "people keep mentioning" tags. */
  mentions: string;
  /** Optional request form, sent as one WhatsApp message. */
  form?: { title: string; intro: string; fields: FormField[]; submit: string };
};

const when: FormField = {
  id: "when",
  label: "How soon?",
  type: "select",
  options: ["As soon as possible", "This week", "No rush"],
};

export const KINDS: Kind[] = [
  {
    id: "food",
    label: "Restaurants",
    template: "restaurant",
    match: /restaurant|grill|pizza|sushi|burger|steak|seafood|diner|bistro|kitchen|mezze|shawarma|manakish|food/i,
    cta: { whatsapp: "Book a table on WhatsApp", call: "Call to book a table", message: "Hi {name}, I'd like to book a table for " },
    services: "Menu",
    mentions: "What people mention",
  },
  {
    id: "cafe",
    label: "Cafés",
    template: "coffee-shop",
    match: /cafe|café|coffee|\btea\b|juice|dessert|ice cream|yogurt|roaster|pastry|bakery|açaí/i,
    cta: { whatsapp: "Order on WhatsApp", call: "Call to order", message: "Hi {name}, I'd like to order " },
    services: "On the menu",
    mentions: "What people mention most",
  },
  {
    id: "pet",
    label: "Pet services",
    template: "appointments",
    match: /\bpets?\b|veterinar|\bvet\b|\bdogs?\b|\bcats?\b|groomer|animal|kennel|aquarium/i,
    cta: { whatsapp: "Book a visit on WhatsApp", call: "Call to book a visit", message: "Hi {name}, I'd like to book " },
    services: "Care and prices",
    mentions: "What pet owners mention",
  },
  {
    id: "clinic",
    label: "Dentists and clinics",
    template: "appointments",
    match: /dentist|dental|clinic|doctor|physician|medical|orthodont|dermatolog|physiotherap|optician|optometr|pediatric|gyneco|cardiolog|laborator/i,
    cta: { whatsapp: "Ask for an appointment", call: "Call for an appointment", message: "Hi {name}, I'd like an appointment for " },
    services: "Treatments",
    mentions: "What patients mention",
  },
  {
    id: "beauty",
    label: "Salons and barbers",
    template: "appointments",
    match: /salon|barber|\bhair|nail|beauty|\bspa\b|lash|brow|make-?up|cosmetic|waxing|aesthetic/i,
    cta: { whatsapp: "Book on WhatsApp", call: "Call to book", message: "Hi {name}, I'd like to book " },
    services: "Services and prices",
    mentions: "What clients mention",
  },
  {
    id: "fitness",
    label: "Fitness and Pilates",
    template: "appointments",
    match: /gym|fitness|pilates|yoga|crossfit|boxing|martial|karate|taekwondo|dance studio|swim|personal trainer|sports club/i,
    cta: { whatsapp: "Ask about a trial class", call: "Call about a trial class", message: "Hi {name}, I'd like to try " },
    services: "Classes and memberships",
    mentions: "What members mention",
  },
  {
    id: "auto",
    label: "Garages and car services",
    template: "quote",
    match: /\bcar\b|\bcars\b|\bauto|garage|mechanic|\btyres?\b|\btires?\b|body shop|car wash|vehicle|motor|oil change|battery/i,
    cta: { whatsapp: "Request a quote", call: "Call for a quote", message: "Hi {name}, I'd like a quote." },
    services: "What we fix",
    mentions: "What drivers mention",
    form: {
      title: "Get a quote",
      intro: "Tell the garage what's wrong. It goes to them as a WhatsApp message.",
      submit: "Send on WhatsApp",
      fields: [
        { id: "car", label: "Car make and model", type: "text", placeholder: "Kia Picanto 2019", required: true },
        { id: "job", label: "What needs doing?", type: "textarea", placeholder: "Brakes squeak when I stop", required: true },
        when,
      ],
    },
  },
  {
    id: "repair",
    label: "Phone and electronics repair",
    template: "quote",
    match: /phone|mobile|computer|laptop|electronic|appliance|\btv\b|tablet|printer|repair/i,
    cta: { whatsapp: "Request a quote", call: "Call for a quote", message: "Hi {name}, I'd like a repair quote." },
    services: "Repairs",
    mentions: "What customers mention",
    form: {
      title: "Get a repair quote",
      intro: "Say what broke. It goes to the shop as a WhatsApp message.",
      submit: "Send on WhatsApp",
      fields: [
        { id: "device", label: "Device and brand", type: "text", placeholder: "iPhone 13", required: true },
        { id: "job", label: "What's wrong with it?", type: "textarea", placeholder: "Cracked screen, touch still works", required: true },
        when,
      ],
    },
  },
  {
    id: "home",
    label: "Home maintenance",
    template: "quote",
    match: /plumb|electrician|electrical|hvac|air condition|handyman|painter|painting|carpent|locksmith|cleaning|pest control|roof|contractor|renovat|aluminium|aluminum|glass|tiles|solar|generator|maintenance/i,
    cta: { whatsapp: "Request a quote", call: "Call for a quote", message: "Hi {name}, I'd like a quote." },
    services: "Services",
    mentions: "What customers mention",
    form: {
      title: "Get a quote",
      intro: "Describe the job. It goes to them as a WhatsApp message.",
      submit: "Send on WhatsApp",
      fields: [
        { id: "job", label: "What needs doing?", type: "textarea", placeholder: "Kitchen tap leaking under the sink", required: true },
        { id: "where", label: "Your area", type: "text", placeholder: "Achrafieh" },
        when,
      ],
    },
  },
  {
    id: "events",
    label: "Weddings and events",
    template: "events",
    match: /wedding|bridal|event|photograph|videograph|florist|flower|party|catering|\bdj\b|banquet|venue|planner/i,
    cta: { whatsapp: "Check availability", call: "Call to check availability", message: "Hi {name}, I'd like to check your availability." },
    services: "Packages",
    mentions: "What couples mention",
    form: {
      title: "Check a date",
      intro: "Ask if your date is free. It goes to them as a WhatsApp message.",
      submit: "Ask on WhatsApp",
      fields: [
        { id: "date", label: "Event date", type: "date", required: true },
        { id: "type", label: "Type of event", type: "select", options: ["Wedding", "Engagement", "Birthday", "Corporate", "Other"] },
        { id: "guests", label: "Number of guests", type: "number", placeholder: "150" },
      ],
    },
  },
  {
    id: "education",
    label: "Tutors and courses",
    template: "education",
    match: /school|tutor|academy|institute|course|lesson|language|training cent|learning|education|university|college|teacher/i,
    cta: { whatsapp: "Ask about classes", call: "Call about classes", message: "Hi {name}, I'd like to ask about classes." },
    services: "Subjects and courses",
    mentions: "What students mention",
    form: {
      title: "Ask about classes",
      intro: "Say what you'd like to learn. It goes to them as a WhatsApp message.",
      submit: "Ask on WhatsApp",
      fields: [
        { id: "subject", label: "Subject", type: "text", placeholder: "Maths, French, piano", required: true },
        { id: "level", label: "Who is it for?", type: "select", options: ["Child", "Teenager", "University student", "Adult"] },
        { id: "format", label: "Where", type: "select", options: ["In person", "Online", "Either"] },
      ],
    },
  },
];

export const OTHER: Kind = {
  id: "other",
  label: "Everything else",
  template: "general",
  cta: { whatsapp: "Message us on WhatsApp", call: "Call us", message: "Hi {name}, I'd like to ask about " },
  services: "Services",
  mentions: "What clients mention",
};

const BY_ID = new Map<KindId, Kind>([...KINDS, OTHER].map((k) => [k.id, k]));

/** "Hair salon" -> beauty. Unknown categories land on "other". */
export function kindFor(category?: string): Kind {
  if (!category) return OTHER;
  return KINDS.find((k) => k.match?.test(category)) ?? OTHER;
}

export function kindById(id?: KindId): Kind {
  return (id && BY_ID.get(id)) || OTHER;
}

/** For the internal list: every kind, in the spreadsheet's order. */
export const ALL_KINDS: Kind[] = [...KINDS, OTHER];
