# LocalSync - Quick Reference Card

## 🚀 Getting Started

```bash
cd localsync
npm run dev
```
Open: http://localhost:3000

## 🎯 Main Features

| Feature | How to Use |
|---------|-----------|
| **Type Text** | Just start typing in the text area |
| **Upload File** | Drag & drop or click "Choose File" |
| **Copy Text** | Click the "Copy" button |
| **Download File** | Click download icon next to file |
| **Delete File** | Click trash icon next to file |
| **Dark Mode** | Click Moon/Sun icon (top-right) |
| **Settings** | Click ⚙️ icon (top-right) |

## 🔒 Password Protection

### Enable
1. Click ⚙️ Settings
2. Toggle "Password Protection" ON
3. Enter password
4. Click Confirm

### Unlock (Other Device)
1. Click "Unlock" button
2. Enter password
3. Click Confirm

### Disable
1. Click ⚙️ Settings
2. Toggle "Password Protection" OFF
3. Enter current password
4. Click Confirm

## 🎨 UI Elements

```
┌─────────────────────────────────────────────┐
│ LocalSync [🔒 Protected]      🌙  ⚙️        │  ← Header
├─────────────────────────────────────────────┤
│ Shared Text                        Copy     │  ← Text Section
│ ┌─────────────────────────────────────────┐ │
│ │ Type here...                            │ │  ← Text Area
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ Files                                       │  ← Files Section
│ ┌─────────────────────────────────────────┐ │
│ │ Drag & drop or click to upload          │ │  ← Upload Zone
│ └─────────────────────────────────────────┘ │
│ 📄 document.pdf (2.3 MB)      ⬇️  🗑️       │  ← File List
└─────────────────────────────────────────────┘
```

## 🔑 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Copy text | Ctrl+C (after selecting) |
| Paste text | Ctrl+V |
| Select all | Ctrl+A |

## 📊 Status Indicators

| Indicator | Meaning |
|-----------|---------|
| 🔒 Protected | Password protection enabled |
| 🌙 | Dark mode active |
| ☀️ | Light mode active |
| ✅ Success toast | Action completed |
| ❌ Error toast | Action failed |

## 🔐 Security Notes

- ✅ Passwords are SHA-256 hashed
- ✅ Client-side hashing (browser)
- ✅ No plain text storage
- ⚠️ Remember your password!
- ⚠️ No password recovery

## 📱 Responsive Design

| Device | Layout |
|--------|--------|
| Desktop | Full width, max 1024px |
| Tablet | Responsive, stacked |
| Mobile | Single column, touch-friendly |

## 🌐 Network Behavior

- All devices on same IP share clipboard
- Syncs every 2 seconds
- Text debounced 500ms
- Files uploaded immediately

## 🎨 Theme Colors

### Light Mode
- Background: Slate 50
- Card: White
- Text: Slate 800

### Dark Mode
- Background: Slate 900
- Card: Slate 800
- Text: Slate 100

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Not syncing | Check network connection |
| Wrong password | Check Caps Lock, try again |
| File won't upload | Check file size, try again |
| Dark mode not working | Clear browser cache |

## 📝 File Support

- ✅ All file types supported
- ✅ Drag & drop enabled
- ✅ Multiple files (one at a time)
- ⚠️ No size limit (add in production)

## 🚦 API Actions

| Action | Endpoint | Method |
|--------|----------|--------|
| Get data | /api/sync | GET |
| Update text | /api/sync | POST |
| Add file | /api/sync | POST |
| Delete file | /api/sync | POST |
| Set password | /api/sync | POST |
| Remove password | /api/sync | POST |
| Verify password | /api/sync | POST |
| Upload file | /api/upload | POST |

## 💡 Tips

1. **Strong Passwords**: Use 8+ characters, mixed case, numbers, symbols
2. **Share Securely**: Don't write password in clipboard
3. **Regular Updates**: Change password periodically
4. **Test First**: Try on one device before sharing
5. **HTTPS**: Required for production (Web Crypto API)

## 🎯 Common Use Cases

### Personal Use
```
1. Open on laptop
2. Type notes
3. Open on phone
4. Access same notes
```

### Team Use
```
1. Enable password protection
2. Share password with team
3. Everyone can access
4. Secure from others
```

### File Sharing
```
1. Drag file to upload zone
2. File appears in list
3. Other devices see file
4. Click download to get file
```

## 📚 Documentation Files

- `README.md` - Project overview
- `QUICKSTART.md` - Quick start guide
- `HOW_TO_USE_PASSWORD.md` - Password quick guide
- `PASSWORD_PROTECTION_GUIDE.md` - Detailed password docs
- `PASSWORD_FLOW.md` - Visual flow diagrams
- `DARK_MODE.md` - Dark mode documentation
- `FEATURES_SUMMARY.md` - Complete feature list
- `QUICK_REFERENCE.md` - This file

## 🎉 Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

## 📞 Need Help?

1. Check documentation files
2. Review error messages
3. Check browser console
4. Verify network connection
5. Try refreshing page

---

**Remember**: All devices on the same IP automatically share the clipboard!
