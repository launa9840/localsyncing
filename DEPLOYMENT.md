# LocalSync Deployment Guide

This guide will help you deploy LocalSync to production.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy Next.js applications.

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-project.vercel.app`

### Option 2: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**
   - Connect your GitHub repository
   - Netlify will auto-deploy on every push

### Option 3: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t localsync .
   docker run -p 3000:3000 localsync
   ```

### Option 4: VPS (DigitalOcean, AWS, etc.)

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and Build**
   ```bash
   git clone <your-repo>
   cd localsync
   npm install
   npm run build
   ```

3. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "localsync" -- start
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Production Optimizations

### 1. Environment Variables

Create a `.env.production` file:

```env
# Optional: Add production-specific variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. File Storage

For production, replace local file storage with cloud storage:

**AWS S3 Example:**
```typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: "us-east-1" });

async function uploadToS3(file: File) {
  const command = new PutObjectCommand({
    Bucket: "your-bucket",
    Key: file.name,
    Body: file,
  });
  
  await s3Client.send(command);
}
```

### 3. Database Integration

Replace in-memory storage with Redis or PostgreSQL:

**Redis Example:**
```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});

export async function getSyncData(ip: string) {
  return await redis.get(`sync:${ip}`);
}
```

### 4. Rate Limiting

Add rate limiting to prevent abuse:

```typescript
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response("Too Many Requests", { status: 429 });
  }
  
  // Continue with request...
}
```

### 5. Analytics

Add analytics to track usage:

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 6. Error Monitoring

Add Sentry for error tracking:

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## 🔒 Security Checklist

- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Add rate limiting to API endpoints
- [ ] Implement file type validation
- [ ] Add virus scanning for uploads
- [ ] Set up CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable CSP headers
- [ ] Implement proper error handling
- [ ] Add request validation
- [ ] Set up monitoring and alerts

## 📊 Performance Checklist

- [ ] Enable Next.js Image optimization
- [ ] Add caching headers
- [ ] Implement CDN for static assets
- [ ] Enable compression
- [ ] Optimize bundle size
- [ ] Add loading states
- [ ] Implement lazy loading
- [ ] Use React Server Components where possible
- [ ] Add service worker for offline support
- [ ] Monitor Core Web Vitals

## 🧪 Pre-Deployment Testing

1. **Build Test**
   ```bash
   npm run build
   npm start
   ```

2. **Mobile Testing**
   - Test on real devices
   - Use Chrome DevTools device emulation
   - Test touch interactions

3. **Browser Testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

4. **Performance Testing**
   - Run Lighthouse audit
   - Check bundle size
   - Test loading speed

5. **Security Testing**
   - Test password protection
   - Verify file upload restrictions
   - Check for XSS vulnerabilities

## 📈 Post-Deployment

1. **Monitor Performance**
   - Set up Vercel Analytics or Google Analytics
   - Monitor error rates
   - Track user engagement

2. **Set Up Backups**
   - Backup database regularly
   - Backup uploaded files
   - Version control your code

3. **Update Dependencies**
   ```bash
   npm outdated
   npm update
   ```

4. **Monitor Logs**
   - Check application logs
   - Monitor API response times
   - Track error rates

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors

### Files Not Uploading
- Check file size limits
- Verify upload directory permissions
- Check API route configuration

### Sync Not Working
- Verify API endpoints are accessible
- Check network connectivity
- Verify IP detection is working

### Dark Mode Issues
- Clear browser cache
- Check ThemeProvider configuration
- Verify CSS variables are set

## 📞 Support

For deployment issues:
- Check the [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Visit the `/support` page
- Check GitHub Issues

---

Good luck with your deployment! 🚀
