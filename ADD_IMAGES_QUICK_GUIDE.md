# Quick Guide: Add Images to Device Preview

## Current Status ✅

The component is ready to display images! Right now it shows placeholder text with a nice gradient background.

## To Add Your Images (3 Easy Steps):

### Step 1: Get Your Images
- Phone image: 384px × 512px (portrait)
- Tablet image: 512px × 384px (landscape)

### Step 2: Add to Public Folder
```
localsync/
└── public/
    ├── phone-preview.png    ← Add here
    └── tablet-preview.png   ← Add here
```

### Step 3: Uncomment the Code

Open `components/features/HeroSection.tsx` and uncomment these lines:

**For Phone:**
```tsx
{/* Uncomment when you add phone-preview.png to public folder */}
{/* <Image
  src="/phone-preview.png"
  alt="Phone Preview"
  fill
  className="object-cover"
/> */}
```

Remove the `{/*` and `*/}` to make it:
```tsx
<Image
  src="/phone-preview.png"
  alt="Phone Preview"
  fill
  className="object-cover"
/>
```

**For Tablet:**
```tsx
{/* Uncomment when you add tablet-preview.png to public folder */}
{/* <Image
  src="/tablet-preview.png"
  alt="Tablet Preview"
  fill
  className="object-cover"
/> */}
```

Remove the `{/*` and `*/}` to make it:
```tsx
<Image
  src="/tablet-preview.png"
  alt="Tablet Preview"
  fill
  className="object-cover"
/>
```

Also remove or comment out the placeholder text:
```tsx
{/* <span className="text-xs text-slate-400 dark:text-slate-600">Phone Preview</span> */}
```

## That's It! 🎉

Your images will now appear in the device preview section.

## Don't Have Images Yet?

No problem! The current design looks clean with the gradient background and placeholder text. You can add images later when you're ready.

## Where to Get Images?

1. **Take Screenshots**: Screenshot your app on phone/tablet
2. **Use Mockups**: Create mockups on Figma or Canva
3. **Free Tools**: 
   - Mockuphone.com
   - Smartmockups.com
   - Placeit.net

## Example: Complete Code with Images

Here's what the final code looks like with images enabled:

```tsx
{/* Phone Preview */}
<div className="w-48 h-64 border-4 border-slate-300 dark:border-slate-700 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative">
  <Image
    src="/phone-preview.png"
    alt="Phone Preview"
    fill
    className="object-cover"
  />
</div>

{/* Tablet Preview */}
<div className="w-64 h-48 border-4 border-slate-300 dark:border-slate-700 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative">
  <Image
    src="/tablet-preview.png"
    alt="Tablet Preview"
    fill
    className="object-cover"
  />
</div>
```

## Need Help?

Check `HOW_TO_ADD_IMAGES.md` for detailed instructions and customization options!
