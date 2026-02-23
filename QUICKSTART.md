# Quick Start Guide

## Run the Application

```bash
cd localsync
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test the Sync Feature

1. Open the app in multiple browser tabs or devices on the same network
2. Type in the text area - it will sync across all tabs after 500ms
3. Upload a file using drag-and-drop or the file picker
4. Click the Copy button to copy text to clipboard
5. Download or delete files from the file list

## Key Features Implemented

✅ IP-based automatic device grouping  
✅ Real-time text sync with 500ms debounce  
✅ Drag-and-drop file upload  
✅ File download and delete  
✅ Copy to clipboard with toast notifications  
✅ Minimalist SSAVR-style design  
✅ Fully responsive (mobile & desktop)  
✅ TypeScript with full type safety  
✅ Shadcn UI components  

## Project Structure

```
localsync/
├── app/
│   ├── api/sync/route.ts       # Main sync endpoint
│   ├── api/upload/route.ts     # File upload handler
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── Dashboard.tsx           # Main UI component
│   ├── FileUploadZone.tsx      # Drag-drop upload
│   └── SettingsDialog.tsx      # Settings modal
├── lib/
│   └── realtime-service.ts     # Backend sync logic
└── types/
    └── index.ts                # TypeScript types
```

## Next Steps

For production deployment:
- Replace in-memory storage with Redis
- Add WebSocket for real-time updates
- Implement password protection
- Add file size limits and validation
- Set up cloud file storage (S3, etc.)
