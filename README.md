# Website previews

One personalised preview page per local business, sent to the owner over
WhatsApp as a sales tool.

## Run it

    npm install
    npm run dev

Open the forwarded port. `/` lists every demo. Each business lives at `/<slug>`.

## How it is put together

    app/
      layout.tsx          fonts + the site-wide noindex rule
      page.tsx            internal list of demos (not for clients)
      [slug]/page.tsx     one business: loads data, picks a template, sets link previews
      not-found.tsx       shown when a slug does not exist
    components/
      templates/
        index.ts          the registry that maps template id -> component
        restaurant.tsx    dark evening room, brass, printed menu
        coffee-shop.tsx   daylight, paper and teal, asymmetric hero
      preview-banner.tsx  "not their official website" line
      whatsapp-button.tsx opens wa.me with a pre-written first message
      rating.tsx          stars + review count
    lib/
      types.ts            the shape of one business
      demo-data.ts        sample businesses (stands in for the API)
      get-business.ts     the only place that knows where data comes from

### Adding a template

1. Copy `components/templates/coffee-shop.tsx` to a new file.
2. Add its id to `TemplateId` in `lib/types.ts`.
3. Add one line to `components/templates/index.ts`.

Nothing else changes.

### Connecting real data

Replace the body of `getBusiness()` in `lib/get-business.ts` with a fetch to the
n8n webhook. The commented example in that file is the whole change.

## Deploy

Push to GitHub, then import the repo at vercel.com. Vercel detects Next.js and
builds it. Every push after that redeploys.
