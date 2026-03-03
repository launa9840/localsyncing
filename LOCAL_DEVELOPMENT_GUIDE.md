# Local Development Guide

## Problem: IP Detection in Local Development

When developing locally, the app detects `::1` or `127.0.0.1` as the IP address, which prevents syncing between devices on your local network.

## Solution: IP Override for Local Development

### Step 1: Find Your Local Network IP

**On Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter (e.g., `192.168.1.100`)

**On Mac/Linux:**
```bash
ifconfig
# or
ip addr show
```
Look for your local network IP (usually starts with `192.168.x.x` or `10.0.x.x`)

### Step 2: Set the Override Variable

Add this to your `.env.local` file:

```env
NEXT_PUBLIC_LOCAL_IP_OVERRIDE=192.168.1.100
```

Replace `192.168.1.100` with your actual local network IP.

### Step 3: Restart Your Dev Server

```bash
npm run dev
```

### Step 4: Access from Other Devices

Now you can access your dev server from other devices on the same WiFi:

**From your laptop:**
- http://localhost:3000

**From your phone/tablet:**
- http://192.168.1.100:3000

Both devices will sync to the same "room" in the database because they're using the same IP address (`192.168.1.100`).

## Verify It's Working

1. Open the app on your laptop
2. Look at the bottom-right corner - you should see: `Sync IP: 192.168.1.100`
3. Open the same URL on your phone
4. Type text on your laptop - it should appear on your phone
5. Upload a file on your phone - it should appear on your laptop

## Production Deployment

On Vercel, **do NOT set** `NEXT_PUBLIC_LOCAL_IP_OVERRIDE`. Vercel will automatically detect the correct IP from the `x-forwarded-for` header.

## Troubleshooting

**Issue:** Still seeing `localhost-dev` or `::1`
- Make sure you restarted the dev server after adding the env variable
- Check that the variable name is exactly `NEXT_PUBLIC_LOCAL_IP_OVERRIDE`
- Verify the IP address is correct (no typos)

**Issue:** Can't access from phone
- Make sure both devices are on the same WiFi network
- Check your firewall isn't blocking port 3000
- Try accessing http://YOUR_IP:3000 directly in the phone's browser

**Issue:** Data not syncing between devices
- Check the "Sync IP" display at the bottom-right of both devices
- Both should show the same IP address
- If they're different, one device is using the wrong IP
