# Gudauri Mountain Apartment — Rental Website

A conversion-focused single-page rental site for a summer apartment in Gudauri, Georgia. Built for digital nomads and outdoor enthusiasts.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** for animations
- **Resend** for booking emails (optional)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
npx vercel
```

Or connect the repo to [vercel.com](https://vercel.com) for automatic deploys.

Set these environment variables in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | No | Resend API key for email sending |
| `BOOKING_EMAIL` | No | Email address to receive booking requests |
| `NEXT_PUBLIC_SITE_URL` | No | Your production URL (for SEO/OpenGraph) |

## Configuration

### Site settings

Edit `src/site-config.ts` to change:

- Property name, tagline, pricing
- Max guests, beds, bathrooms
- Check-in/check-out times, minimum nights
- Contact links (email, WhatsApp, Telegram)
- Map coordinates and embed URL
- Amenities list

All fields marked with `// TODO` need your real values.

### Availability & blocked dates

Edit `src/data/availability.json`:

```json
{
  "season_open": "2025-06-01",
  "season_close": "2025-09-30",
  "min_nights": 3,
  "max_guests": 4,
  "blocked_dates": [
    "2025-07-10",
    "2025-07-11"
  ]
}
```

- `season_open` / `season_close`: Only dates within this range are bookable
- `blocked_dates`: Individual dates that are unavailable (already booked, maintenance, etc.)
- `min_nights`: Minimum number of nights per booking
- Dates use `YYYY-MM-DD` format

### Translations

Three language files in `messages/`:

- `messages/en.json` — English
- `messages/fr.json` — French
- `messages/ka.json` — Georgian (Kartuli)

All visible text comes from these files. Edit them directly to change copy.

### Photos

See `PHOTO_CHECKLIST.md` for the full list.

Photos go in `/public/photos/`. The site uses these exact filenames:

- `hero-mountains.jpg` — Full-screen hero background
- `gallery-1.jpg` through `gallery-8.jpg` — Gallery grid
- `og-image.jpg` — Social sharing image

To swap images, replace the files. No code changes needed.

To add more gallery photos, add files as `gallery-9.jpg`, `gallery-10.jpg`, etc. and update the `galleryPhotos` array in `src/components/Gallery.tsx`.

## Booking flow

### How it works

1. Visitor selects check-in and check-out dates on the calendar
2. Calendar validates against availability (season, blocked dates, minimum nights)
3. Visitor fills in name, email, optional message
4. Form submits to `/api/booking`

### Email sending (production)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Set environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   BOOKING_EMAIL=your@email.com
   ```
4. Booking requests will be emailed to you

### Fallback (development)

Without Resend configured, booking requests are saved as JSON files in the `booking-requests/` directory (gitignored). Check this folder during development.

### Direct contact fallback

The booking form always shows direct contact buttons (email, WhatsApp, Telegram) as an alternative to the form submission. If the API fails, visitors can still reach you.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Main page (assembles all sections)
│   ├── globals.css         # Tailwind + design tokens
│   ├── api/booking/route.ts # Booking API endpoint
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt config
├── components/
│   ├── Navbar.tsx           # Sticky nav + language switcher
│   ├── HeroParallax.tsx     # Parallax mountain hero
│   ├── Gallery.tsx          # Photo grid + lightbox
│   ├── WhyThisPlace.tsx     # Value proposition blocks
│   ├── Amenities.tsx        # Amenities icon grid
│   ├── AvailabilityCalendar.tsx # Date picker calendar
│   ├── BookingForm.tsx      # Booking section (calendar + form)
│   ├── LocationMap.tsx      # Map + getting there info
│   ├── Reviews.tsx          # Testimonials
│   ├── FAQ.tsx              # Accordion FAQ
│   ├── Footer.tsx           # Footer + language switch
│   └── ContactButtons.tsx   # Floating WhatsApp/Telegram
├── data/
│   └── availability.json    # Season dates + blocked dates
├── lib/
│   ├── i18n.ts             # Translation system
│   └── utils.ts            # Date helpers, class merger
└── site-config.ts          # All property/site configuration
messages/
├── en.json                  # English translations
├── fr.json                  # French translations
└── ka.json                  # Georgian translations
public/
└── photos/                  # Your property photos
```

## SEO

- OpenGraph and Twitter card metadata configured
- Semantic HTML headings (h1, h2, h3)
- `sitemap.xml` auto-generated
- `robots.txt` auto-generated
- Alt text on all images (translatable)
- `lang` attribute on `<html>`

## Performance notes

- Parallax uses `requestAnimationFrame` (no heavy scroll libraries)
- Images served as AVIF/WebP via Next.js
- Fonts loaded with `next/font` (no layout shift)
- Animations respect `prefers-reduced-motion` (Framer Motion default)
- No heavy dependencies — just Next.js, Framer Motion, and Resend
