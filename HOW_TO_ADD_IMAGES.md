# How to Add Images to Device Preview

## Quick Guide

I've updated the HeroSection component to support images. Here's how to add your device preview images:

## Step 1: Add Your Images

Place your images in the `public` folder:

```
localsync/
└── public/
    ├── phone-preview.png    ← Add your phone image here
    └── tablet-preview.png   ← Add your tablet image here
```

## Step 2: Image Requirements

### Phone Preview Image
- **Recommended size**: 384px × 512px (or 2x: 768px × 1024px)
- **Aspect ratio**: 3:4 (portrait)
- **Format**: PNG, JPG, or WebP
- **File name**: `phone-preview.png`

### Tablet Preview Image
- **Recommended size**: 512px × 384px (or 2x: 1024px × 768px)
- **Aspect ratio**: 4:3 (landscape)
- **Format**: PNG, JPG, or WebP
- **File name**: `tablet-preview.png`

## Step 3: That's It!

The images will automatically appear in the device preview section on the features page.

## Alternative: Use Different Image Names

If you want to use different file names, update the `src` in `HeroSection.tsx`:

```tsx
<Image
  src="/your-phone-image.png"  // Change this
  alt="Phone Preview"
  fill
  className="object-cover"
/>
```

## Alternative: Use External URLs

You can also use external image URLs:

```tsx
<Image
  src="https://example.com/phone-preview.png"
  alt="Phone Preview"
  fill
  className="object-cover"
/>
```

Note: For external URLs, you need to configure Next.js. Add to `next.config.ts`:

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

## Customization Options

### 1. Change Image Fit

```tsx
// Cover (default) - fills container, may crop
className="object-cover"

// Contain - fits inside, may have empty space
className="object-contain"

// Fill - stretches to fill
className="object-fill"
```

### 2. Adjust Opacity

Change the parent div opacity:

```tsx
<div className="mt-16 flex justify-center items-center gap-8 opacity-60">
                                                              ↑
                                                    Change this (0-100)
```

### 3. Change Border Style

```tsx
// Current: 4px border
border-4

// Options:
border-2  // Thinner
border-8  // Thicker
border-0  // No border
```

### 4. Add Shadow

```tsx
<div className="w-48 h-64 border-4 ... shadow-2xl">
                                        ↑
                                   Add shadow
```

### 5. Change Background Color

```tsx
<div className="... bg-slate-100 dark:bg-slate-800">
                    ↑                    ↑
              Light mode            Dark mode
```

## Example: Using Screenshots

If you want to use screenshots of your app:

1. Take screenshots on phone and tablet
2. Save as `phone-preview.png` and `tablet-preview.png`
3. Place in `public` folder
4. Done!

## Example: Using Mockups

If you want to use device mockups:

1. Create mockups using tools like:
   - Figma
   - Sketch
   - Photoshop
   - Online mockup generators
2. Export as PNG
3. Place in `public` folder
4. Done!

## Fallback: No Images Available

If you don't have images yet, the current placeholder text will show. You can customize it:

```tsx
<div className="w-48 h-64 ... flex items-center justify-center">
  <span className="text-xs">Your Custom Text</span>
</div>
```

## Advanced: Multiple Images

Want to show multiple device types? Add more:

```tsx
<div className="mt-16 flex justify-center items-center gap-8 opacity-60">
  {/* Phone */}
  <div className="w-48 h-64 ... relative">
    <Image src="/phone.png" alt="Phone" fill className="object-cover" />
  </div>
  
  {/* Tablet */}
  <div className="w-64 h-48 ... relative">
    <Image src="/tablet.png" alt="Tablet" fill className="object-cover" />
  </div>
  
  {/* Desktop */}
  <div className="w-80 h-48 ... relative">
    <Image src="/desktop.png" alt="Desktop" fill className="object-cover" />
  </div>
</div>
```

## Troubleshooting

### Image Not Showing?

1. **Check file path**: Must be in `public` folder
2. **Check file name**: Case-sensitive (phone-preview.png not Phone-Preview.png)
3. **Restart dev server**: Run `npm run dev` again
4. **Check browser console**: Look for errors

### Image Looks Stretched?

Change `object-cover` to `object-contain`:

```tsx
className="object-contain"
```

### Image Too Large?

Next.js automatically optimizes images. But you can:

1. Resize images before adding
2. Use WebP format for smaller size
3. Compress images using tools like TinyPNG

## Best Practices

1. **Use 2x resolution**: For retina displays (e.g., 768px × 1024px for phone)
2. **Optimize images**: Compress before adding
3. **Use WebP**: Smaller file size, better quality
4. **Add alt text**: For accessibility
5. **Test on mobile**: Ensure images look good on all devices

## Quick Commands

```bash
# Restart dev server after adding images
npm run dev

# Build to test production
npm run build
```

## Example File Structure

```
localsync/
├── public/
│   ├── phone-preview.png      ← Your phone image
│   ├── tablet-preview.png     ← Your tablet image
│   ├── phone-preview@2x.png   ← Optional: 2x version
│   └── tablet-preview@2x.png  ← Optional: 2x version
└── components/
    └── features/
        └── HeroSection.tsx    ← Already updated!
```

## Need Help?

If you need help finding or creating device preview images:

1. **Free mockup tools**:
   - Mockuphone.com
   - Smartmockups.com
   - Placeit.net

2. **Screenshot tools**:
   - Browser DevTools (F12 → Device Mode)
   - Responsively App
   - BrowserStack

3. **Design tools**:
   - Figma (free)
   - Canva (free)
   - Photopea (free, online Photoshop)

---

That's it! Just add your images to the `public` folder and they'll appear automatically.
