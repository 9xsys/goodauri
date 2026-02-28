# Photo Checklist

Download photos from your Airbnb listing and save them in `/public/photos/` with the exact filenames below.

The site is built so you only need to replace files — no code edits required.

## Source listing
https://www.airbnb.com/rooms/1348269151508277110

## Required photos

| # | Filename | What to use | Used in |
|---|----------|-------------|---------|
| 1 | `hero-mountains.jpg` | Best exterior/mountain/landscape shot from the listing. Wide, high-res (at least 1920×1080). This is the full-screen hero background. | Hero section |
| 2 | `gallery-1.jpg` | Main living room / best interior shot. This one appears larger in the grid. | Gallery (featured) |
| 3 | `gallery-2.jpg` | Kitchen area | Gallery |
| 4 | `gallery-3.jpg` | Bedroom | Gallery |
| 5 | `gallery-4.jpg` | Bathroom | Gallery |
| 6 | `gallery-5.jpg` | View from balcony or window (mountains) | Gallery |
| 7 | `gallery-6.jpg` | Building exterior or entrance | Gallery |
| 8 | `gallery-7.jpg` | Workspace / desk area (or another interior detail) | Gallery |
| 9 | `gallery-8.jpg` | Any additional interior shot (living room alternate angle, etc.) | Gallery |
| 10 | `og-image.jpg` | Social sharing image. Use the best overview shot. Ideally 1200×630px. Can be a cropped version of the hero or a good interior. | OpenGraph / Twitter cards |

## How to download from Airbnb

1. Open the listing in your browser
2. Click "Show all photos"
3. Right-click each photo → "Save image as..."
4. Rename to match the filenames above
5. Drop them into `/public/photos/`

## Image optimization tips

- Keep originals reasonable: hero should be ~1920px wide, gallery images ~1200px wide
- JPEG quality 80–85% is fine — Next.js will serve AVIF/WebP automatically
- The hero image benefits from being slightly dark or having a clear sky area at the top (text overlays on top)
- If you have more than 8 gallery shots, add them as `gallery-9.jpg`, `gallery-10.jpg`, etc. and update the `galleryPhotos` array in `src/components/Gallery.tsx`

## Placeholder behavior

Until you add real photos, the site will show broken image icons. That's expected.
To test the layout quickly, you can use any mountain/apartment stock photos with these filenames.
