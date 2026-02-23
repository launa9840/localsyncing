# LocalSync - Local Network Clipboard

A modern, full-stack local network clipboard application. Share text and files seamlessly across all devices on your local network with real-time synchronization, password protection, and a beautiful dark mode interface.

![LocalSync](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### Core Functionality
- **🔄 Real-time Sync**: Type text or upload files and see changes instantly across all devices (500ms debounce)
- **📱 IP-Based Rooms**: Automatically groups devices by IP address - no registration needed
- **📁 File Sharing**: Upload, download, and delete files with drag-and-drop support (up to 100MB)
- **🔒 Password Protection**: Secure your clipboard with SHA-256 encrypted passwords
- **🌓 Dark Mode**: Beautiful light and dark themes with system detection
- **📊 Debug Console**: Professional debugging tools with stats and diagnostics
- **💬 Support Center**: Comprehensive help center with FAQ and contact form

### User Experience
- **Zero Setup**: No account creation, no downloads - just open and start syncing
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, minimalist design with Shadcn UI components
- **Fast Performance**: Optimized with Next.js 16 and Turbopack
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier works great!)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd localsync
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase Storage (required for file uploads):
   - Follow the guide in `SUPABASE_SETUP.md` (5 minutes)
   - Or see `SUPABASE_QUICK_REFERENCE.md` for quick setup

4. Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 (App Router with Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Themes**: next-themes
- **Notifications**: Sonner
- **Storage**: Supabase Storage (for file uploads)

## 📁 Project Structure

```
localsync/
├── app/
│   ├── api/
│   │   ├── debug/route.ts     # Debug API endpoint
│   │   ├── sync/route.ts      # Main sync API endpoint
│   │   └── upload/route.ts    # File upload endpoint
│   ├── debug/page.tsx         # Debug console page
│   ├── features/page.tsx      # Features showcase page
│   ├── support/page.tsx       # Support & help center
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── features/              # Feature page components
│   │   ├── AllFeaturesGrid.tsx
│   │   ├── FooterCTA.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── StatsSection.tsx
│   │   └── TestimonialsSection.tsx
│   ├── ui/                    # Shadcn UI components
│   ├── Dashboard.tsx          # Main dashboard component
│   ├── FileUploadZone.tsx     # Drag-and-drop file upload
│   ├── Navbar.tsx             # Navigation bar
│   ├── PasswordDialog.tsx     # Password input dialog
│   ├── SettingsDialog.tsx     # Settings modal
│   ├── ThemeProvider.tsx      # Theme context provider
│   └── ThemeToggle.tsx        # Dark mode toggle
├── lib/
│   ├── realtime-service.ts    # Backend sync logic
│   ├── password-utils.ts      # Password hashing utilities
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript type definitions
└── public/
    ├── uploads/               # Uploaded files directory
    └── testimonials/          # Testimonial images
```

## 🔌 API Endpoints

### GET /api/sync
Fetches the current sync data for the client's IP address.

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "string",
    "files": [],
    "isLocked": false,
    "lastUpdated": 1234567890
  }
}
```

### POST /api/sync
Updates sync data. Accepts the following actions:

**Actions:**
- `updateText`: Update the shared text
- `addFile`: Add a file to the shared list
- `deleteFile`: Remove a file from the shared list
- `setPassword`: Enable password protection (requires passwordHash)
- `removePassword`: Disable password protection
- `verifyPassword`: Verify a password (returns isValid boolean)

### POST /api/upload
Handles file uploads and returns file metadata.

**Request:** multipart/form-data with file

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "size": 12345,
    "url": "/uploads/filename"
  }
}
```

### GET /api/debug
Returns the client's IP address.

### POST /api/debug
Debug operations. Accepts actions:
- `getStats`: Get statistics
- `resetPassword`: Reset password
- `deleteFiles`: Delete all files
- `unlinkIPs`: Unlink associated IPs
- `resetEverything`: Complete reset

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

See `SUPABASE_SETUP.md` for detailed Supabase configuration.

### Environment Variables

Required for production:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from your Supabase project: **Settings** → **API**

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

## 🔧 Production Considerations

For production deployment, consider these enhancements:

1. **Persistent Storage**: Replace in-memory storage with Redis or a database
2. **File Storage**: Use S3, Cloudflare R2, or similar for file uploads
3. **WebSocket**: Implement WebSocket for true real-time sync instead of polling
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **File Validation**: Implement virus scanning and file type validation
6. **Analytics**: Add analytics to track usage
7. **Monitoring**: Set up error tracking (Sentry, LogRocket)
8. **CDN**: Use a CDN for static assets
9. **Backup**: Implement automated backups
10. **SSL**: Ensure HTTPS is enabled

## 📱 Mobile Optimization

The application is fully optimized for mobile devices:
- Responsive breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Touch-friendly UI elements
- Mobile-optimized navigation with hamburger menu
- Optimized images with Next.js Image component
- Fast loading with code splitting

## 🎨 Customization

### Themes
Edit `app/globals.css` to customize colors and themes.

### Components
All UI components are in `components/ui/` and can be customized.

### Branding
Update metadata in `app/layout.tsx` for SEO and social sharing.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Inspired by [SSAVR](https://ssavr.com)
- Built with [Next.js](https://nextjs.org)
- UI components from [Shadcn UI](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

## 📞 Support

- Visit the `/support` page for help
- Check the `/debug` page for diagnostics
- View all features at `/features`

---

Made with ❤️ by the LocalSync Team
