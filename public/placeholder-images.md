# Placeholder Images

Since you don't have device preview images yet, here are some options:

## Option 1: Use Placeholder Services (Temporary)

Update HeroSection.tsx to use placeholder services:

```tsx
<Image
  src="https://via.placeholder.com/384x512/e2e8f0/64748b?text=Phone+Preview"
  alt="Phone Preview"
  fill
  className="object-cover"
/>

<Image
  src="https://via.placeholder.com/512x384/e2e8f0/64748b?text=Tablet+Preview"
  alt="Tablet Preview"
  fill
  className="object-cover"
/>
```

## Option 2: Create Simple SVG Placeholders

I can create SVG files for you that will work immediately.

## Option 3: Use Your App Screenshots

Take screenshots of your LocalSync app and use those!

## Option 4: Keep Current Design

The current design with text placeholders looks clean and minimal.

## Recommendation

For now, the component will show a background color with the images. If the images don't exist, you'll see a gray background which still looks good!

To add real images later, just drop them in the `public` folder:
- `phone-preview.png`
- `tablet-preview.png`
