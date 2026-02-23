# Password Protection Guide

## Overview

The password protection feature allows you to secure your LocalSync clipboard with a password. When enabled, all devices on your network must enter the correct password to access the shared content.

## How to Enable Password Protection

1. **Open Settings**
   - Click the Settings icon (⚙️) in the top-right corner of the app

2. **Enable Password Protection**
   - Toggle the "Password Protection" switch to ON
   - A dialog will appear asking you to set a password

3. **Set Your Password**
   - Enter a strong password (remember it!)
   - Click "Confirm"
   - You'll see a success message: "Password protection enabled!"

4. **Confirmation**
   - The settings dialog will show "Enabled" under Password Protection
   - A green "Protected" badge will appear next to the LocalSync title

## How to Use Password-Protected Clipboard

### On the Same Device
- Once you've set the password, you remain authenticated
- You can continue using the clipboard normally
- The "Protected" badge indicates the clipboard is secured

### On Other Devices
1. Open LocalSync on another device (same network/IP)
2. You'll see a "Clipboard Locked" screen
3. Click the "Unlock" button
4. Enter the password you set
5. Click "Confirm"
6. If correct, you'll gain access to the clipboard

### What Happens When Locked
- Text content is hidden
- Files are not accessible
- Upload and delete functions are disabled
- Only the unlock button is available

## How to Disable Password Protection

1. **Open Settings**
   - Click the Settings icon (⚙️)

2. **Disable Password Protection**
   - Toggle the "Password Protection" switch to OFF
   - A dialog will appear asking for your current password

3. **Verify Your Password**
   - Enter your current password
   - Click "Confirm"
   - You'll see: "Password protection disabled!"

4. **Confirmation**
   - The "Protected" badge disappears
   - All devices can now access without a password

## Security Features

### Password Hashing
- Passwords are NEVER stored in plain text
- Uses SHA-256 cryptographic hashing
- Hash is computed client-side (in your browser)
- Only the hash is sent to the server

### How It Works
1. You enter: `myPassword123`
2. Browser computes: `sha256("myPassword123")` = `abc123def456...`
3. Server stores: `abc123def456...` (the hash)
4. When unlocking, your password is hashed again and compared

### Important Notes
- **Remember your password!** There's no recovery option
- Password is per IP address (all devices on same IP share it)
- If you forget the password, you'll need to clear the server storage
- In production, use a strong password (8+ characters, mixed case, numbers, symbols)

## Use Cases

### Home Network
- Protect your family's shared clipboard from guests
- Prevent accidental access by visitors on your WiFi

### Office Network
- Secure team clipboards with a shared password
- Control access to sensitive information

### Public WiFi (with VPN)
- Add extra security layer when using public networks
- Ensure only authorized devices can access your clipboard

## Troubleshooting

### "Incorrect password" Error
- Double-check your password (case-sensitive)
- Make sure Caps Lock is off
- Try typing slowly to avoid typos

### Can't Remember Password
- Currently, there's no password recovery
- For development: restart the server to clear storage
- For production: contact your system administrator

### Password Not Working on Other Devices
- Ensure all devices are on the same network (same public IP)
- Check that password protection is actually enabled
- Try refreshing the page

### Want to Change Password
1. Disable password protection (requires current password)
2. Enable it again with a new password

## Technical Details

### Storage
- In-memory storage (development)
- For production: use Redis or database
- Password hash stored with clipboard data

### API Endpoints
- `POST /api/sync` with `action: 'setPassword'` - Enable protection
- `POST /api/sync` with `action: 'removePassword'` - Disable protection
- `POST /api/sync` with `action: 'verifyPassword'` - Check password

### Client-Side Hashing
```javascript
// Password is hashed using Web Crypto API
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
```

## Best Practices

1. **Use Strong Passwords**
   - At least 8 characters
   - Mix uppercase, lowercase, numbers, symbols
   - Avoid common words or patterns

2. **Share Securely**
   - Don't write password in the clipboard itself
   - Use secure channels to share with team members
   - Consider using a password manager

3. **Regular Updates**
   - Change password periodically
   - Update if someone leaves your team
   - Reset if you suspect compromise

4. **Production Deployment**
   - Use HTTPS (required for Web Crypto API)
   - Implement rate limiting on password attempts
   - Add password strength requirements
   - Consider adding 2FA for extra security

## Future Enhancements

Potential features for future versions:
- Password recovery via email
- Password strength indicator
- Password expiration
- Multiple user accounts with different passwords
- Audit log of access attempts
- Temporary access codes
- Biometric authentication
