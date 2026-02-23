# Simple Guide: Add Images to Your Features Page

## What You Need

Two images:
1. **Phone image** - Portrait orientation (taller than wide)
2. **Tablet image** - Landscape orientation (wider than tall)

## Step-by-Step Instructions

### Step 1: Prepare Your Images

You can use:
- Screenshots of your app
- Device mockups
- Any PNG or JPG images

**Recommended sizes:**
- Phone: 384px wide × 512px tall
- Tablet: 512px wide × 384px tall

(Don't worry if they're different sizes - Next.js will handle it!)

### Step 2: Rename Your Images

Rename your images to exactly:
- `phone-preview.png`
- `tablet-preview.png`

(You can also use `.jpg` format)

### Step 3: Add Images to Public Folder

1. Open your project folder: `localsync`
2. Find the `public` folder
3. Copy your two images into the `public` folder

Your folder should look like:
```
localsync/
├── public/
│   ├── phone-preview.png    ← Your phone image here
│   ├── tablet-preview.png   ← Your tablet image here
│   ├── file.svg
│   ├── globe.svg
│   └── ...
```

### Step 4: Restart Your Dev Server

1. Stop the server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. Open http://localhost:3000/features

**That's it!** Your images should now appear!

## Don't Have Images Yet?

### Option 1: Use Placeholder Images (Temporary)

Create two simple colored rectangles in any image editor:
- Phone: 384×512px, any color
- Tablet: 512×384px, any color

Save as `phone-preview.png` and `tablet-preview.png`

### Option 2: Take Screenshots

1. Open your LocalSync app
2. Open browser DevTools (F12)
3. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
4. Select "iPhone 12 Pro" or similar
5. Take screenshot (right-click → Capture screenshot)
6. Repeat for tablet size

### Option 3: Download Free Mockups

Visit these sites for free device mockups:
- https://mockuphone.com
- https://smartmockups.com (free tier)
- https://www.freepik.com (search "phone mockup")

## Troubleshooting

### Images Not Showing?

**Check 1:** Are files in the right place?
```
localsync/public/phone-preview.png  ✓
localsync/phone-preview.png         ✗ (wrong location)
```

**Check 2:** Are file names exactly right?
```
phone-preview.png   ✓
Phone-Preview.png   ✗ (wrong case)
phone_preview.png   ✗ (wrong separator)
phonepreview.png    ✗ (no separator)
```

**Check 3:** Did you restart the dev server?
```bash
# Stop server (Ctrl+C)
# Then start again:
npm run dev
```

**Check 4:** Check browser console for errors
- Open DevTools (F12)
- Look for red errors
- Common error: "Failed to load resource" means file not found

### Images Look Stretched or Cropped?

If your images don't look right, you can adjust the fit.

Open `components/features/HeroSection.tsx` and change:

```tsx
className="object-cover"    // Fills space, may crop
```

To:

```tsx
className="object-contain"  // Fits inside, shows all
```

## Quick Example

Let's say you have two images on your desktop:
- `my-phone-screenshot.png`
- `my-tablet-screenshot.png`

**Do this:**

1. Rename them:
   - `my-phone-screenshot.png` → `phone-preview.png`
   - `my-tablet-screenshot.png` → `tablet-preview.png`

2. Copy both files to: `localsync/public/`

3. In terminal:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

4. Open: http://localhost:3000/features

Done! 🎉

## Need Different Image Names?

If you want to use different file names (like `phone.png` instead of `phone-preview.png`):

1. Open `components/features/HeroSection.tsx`
2. Find these lines:
   ```tsx
   src="/phone-preview.png"
   src="/tablet-preview.png"
   ```
3. Change to your file names:
   ```tsx
   src="/phone.png"
   src="/tablet.png"
   ```

## Still Need Help?

If images still don't show:

1. Make sure files are in `public` folder (not `public/uploads` or anywhere else)
2. Check file extensions match (`.png` or `.jpg`)
3. Try with a simple test image first
4. Check the browser console (F12) for errors

---

**Summary:**
1. Get two images
2. Rename to `phone-preview.png` and `tablet-preview.png`
3. Put in `public` folder
4. Restart server
5. Done!
