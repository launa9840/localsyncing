# Testimonial Images Guide

## ✅ What I Added

I've added profile images to the testimonials section! Each testimonial now has a colorful avatar with initials.

## Current Setup

### Images Created:
- `public/testimonials/kristin-wong.svg` (Blue avatar with "KW")
- `public/testimonials/mihir-patkar.svg` (Green avatar with "MP")
- `public/testimonials/david-bolanos.svg` (Purple avatar with "DB")

### How It Works:
The Avatar component now shows:
1. **First**: Tries to load the image from `/testimonials/[name].svg`
2. **Fallback**: If image doesn't load, shows colored circle with initials

## Add Your Own Photos

### Option 1: Replace SVG Files (Easy)

Replace the SVG files with your own images:

1. Get profile photos (JPG, PNG, or SVG)
2. Rename them:
   - `kristin-wong.jpg` (or .png)
   - `mihir-patkar.jpg` (or .png)
   - `david-bolanos.jpg` (or .png)
3. Place in `public/testimonials/` folder
4. Update the file extensions in `TestimonialsSection.tsx`:

```tsx
const testimonials = [
  {
    name: 'Kristin Wong',
    image: '/testimonials/kristin-wong.jpg',  // Change .svg to .jpg
    // ...
  },
  // ...
];
```

### Option 2: Use External URLs

You can use images from the web:

```tsx
const testimonials = [
  {
    name: 'Kristin Wong',
    image: 'https://example.com/kristin.jpg',
    // ...
  },
];
```

**Note**: For external URLs, add to `next.config.ts`:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};
```

### Option 3: Use Placeholder Services

For testing, use placeholder services:

```tsx
image: 'https://ui-avatars.com/api/?name=Kristin+Wong&background=3b82f6&color=fff&size=200',
```

## Image Requirements

### Size
- **Recommended**: 200×200 pixels
- **Minimum**: 100×100 pixels
- **Format**: JPG, PNG, SVG, or WebP

### Aspect Ratio
- **Best**: Square (1:1)
- Avatar component will crop to circle

### File Size
- **Recommended**: < 100KB per image
- Compress images before adding

## Customize Avatar Colors

In `TestimonialsSection.tsx`, change the `color` property:

```tsx
const testimonials = [
  {
    name: 'Kristin Wong',
    color: 'bg-blue-500',    // Blue
    // ...
  },
  {
    name: 'Mihir Patkar',
    color: 'bg-green-500',   // Green
    // ...
  },
  {
    name: 'David G. Bolanos',
    color: 'bg-purple-500',  // Purple
    // ...
  },
];
```

### Available Colors:
```tsx
bg-blue-500    // Blue
bg-green-500   // Green
bg-purple-500  // Purple
bg-red-500     // Red
bg-orange-500  // Orange
bg-pink-500    // Pink
bg-yellow-500  // Yellow
bg-indigo-500  // Indigo
bg-teal-500    // Teal
bg-cyan-500    // Cyan
```

## Add More Testimonials

To add more testimonials, add to the array:

```tsx
const testimonials = [
  // Existing testimonials...
  {
    name: 'Your Name',
    role: 'Your Role',
    company: 'Your Company',
    avatar: 'YN',  // Initials for fallback
    image: '/testimonials/your-name.jpg',
    quote: 'Your testimonial quote here.',
    color: 'bg-red-500',
  },
];
```

## Remove Testimonials

To remove a testimonial, delete it from the array:

```tsx
const testimonials = [
  // Keep only the ones you want
  {
    name: 'Kristin Wong',
    // ...
  },
  // Removed others
];
```

## Fallback Behavior

If an image fails to load:
- Shows colored circle with initials
- Uses the `color` property for background
- Shows `avatar` property for initials

Example:
```
Image fails to load
       ↓
┌─────────┐
│   KW    │ ← Shows initials on colored background
└─────────┘
```

## File Structure

```
localsync/
└── public/
    └── testimonials/
        ├── kristin-wong.svg     ← Replace with your images
        ├── mihir-patkar.svg     ← Replace with your images
        └── david-bolanos.svg    ← Replace with your images
```

## Quick Steps to Add Real Photos

1. **Get 3 profile photos** (200×200 pixels, square)
2. **Rename them**:
   - `kristin-wong.jpg`
   - `mihir-patkar.jpg`
   - `david-bolanos.jpg`
3. **Place in** `public/testimonials/` folder
4. **Update extensions** in `TestimonialsSection.tsx`:
   ```tsx
   image: '/testimonials/kristin-wong.jpg',  // .svg → .jpg
   ```
5. **Restart server**: `npm run dev`
6. **Done!** Photos will appear

## Tips

### Compress Images
Use tools like:
- TinyPNG (https://tinypng.com)
- Squoosh (https://squoosh.app)
- ImageOptim (Mac)

### Get Professional Photos
- Use LinkedIn profile photos
- Take professional headshots
- Use Gravatar
- Generate AI avatars

### Consistent Style
- Use same size for all images
- Use same background style
- Use same lighting/filter
- Crop to show face clearly

## Troubleshooting

### Image Not Showing?
1. Check file is in `public/testimonials/` folder
2. Check file name matches exactly (case-sensitive)
3. Check file extension (.jpg, .png, .svg)
4. Restart dev server
5. Check browser console for errors

### Image Looks Stretched?
- Avatar component automatically crops to circle
- Use square images (1:1 aspect ratio)
- Image will be centered and cropped

### Image Too Large?
- Compress image before adding
- Recommended: < 100KB per image
- Use WebP format for smaller size

## Example: Using Real Photos

```tsx
const testimonials = [
  {
    name: 'John Doe',
    role: 'CEO',
    company: 'Tech Corp',
    avatar: 'JD',
    image: '/testimonials/john-doe.jpg',  // Your photo
    quote: 'Amazing product!',
    color: 'bg-blue-500',
  },
];
```

## Current Avatars

The current SVG avatars show:
- **Blue circle** with "KW" for Kristin Wong
- **Green circle** with "MP" for Mihir Patkar
- **Purple circle** with "DB" for David G. Bolanos

These are placeholder avatars. Replace them with real photos for a professional look!

---

**Your testimonials now have images!** 🎉

Replace the SVG files with real photos to make them even better.
