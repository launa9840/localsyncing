# Quick Guide: How to Use Password Protection

## Enable Password Protection

1. Click the **Settings** button (⚙️) in the top-right corner
2. Toggle **Password Protection** to ON
3. Enter your desired password in the dialog
4. Click **Confirm**
5. Done! You'll see a green "Protected" badge

## Access from Another Device

1. Open LocalSync on another device (same network)
2. You'll see a "Clipboard Locked" screen
3. Click **Unlock**
4. Enter the password
5. Click **Confirm**
6. Access granted!

## Disable Password Protection

1. Click the **Settings** button (⚙️)
2. Toggle **Password Protection** to OFF
3. Enter your current password to confirm
4. Click **Confirm**
5. Protection removed!

## Important Notes

✅ Password is hashed with SHA-256 (secure)  
✅ All devices on same IP share the same password  
✅ Password is required to view/edit content when locked  
⚠️ No password recovery - remember your password!  
⚠️ Case-sensitive password  

## What Gets Protected

When password protection is enabled:
- ✅ Text content (hidden until unlocked)
- ✅ File list (hidden until unlocked)
- ✅ Upload functionality (disabled until unlocked)
- ✅ Delete functionality (disabled until unlocked)

## Security

- Passwords are NEVER stored in plain text
- SHA-256 cryptographic hashing
- Client-side hashing (browser computes hash)
- Only hash is sent to server
- Requires HTTPS in production

## Tips

💡 Use a strong password (8+ characters, mixed case, numbers, symbols)  
💡 Share password securely with team members  
💡 Change password periodically  
💡 Don't write the password in the clipboard itself!  

For detailed information, see [PASSWORD_PROTECTION_GUIDE.md](./PASSWORD_PROTECTION_GUIDE.md)
