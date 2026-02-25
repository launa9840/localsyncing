/**
 * Sanitize filename to remove illegal characters and ensure safe file handling
 * @param filename - Original filename to sanitize
 * @returns Sanitized filename safe for storage and download
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return 'file';
  
  // Split filename and extension
  const lastDotIndex = filename.lastIndexOf('.');
  const name = lastDotIndex > 0 ? filename.substring(0, lastDotIndex) : filename;
  const ext = lastDotIndex > 0 ? filename.substring(lastDotIndex) : '';
  
  // Remove illegal characters: / \ : * ? " < > | and control characters
  const sanitizedName = name
    .replace(/[/\\:*?"<>|\x00-\x1f\x80-\x9f]/g, '_')
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .replace(/^_+|_+$/g, ''); // Remove leading/trailing underscores
  
  // Sanitize extension
  const sanitizedExt = ext.replace(/[/\\:*?"<>|\x00-\x1f\x80-\x9f]/g, '');
  
  // Ensure we have a valid name
  const finalName = sanitizedName || 'file';
  
  // Limit length (255 is common filesystem limit)
  const maxLength = 255 - sanitizedExt.length;
  const truncatedName = finalName.length > maxLength 
    ? finalName.substring(0, maxLength) 
    : finalName;
  
  return truncatedName + sanitizedExt;
}

/**
 * Extract filename from Cloudinary URL if needed
 * @param url - Cloudinary URL
 * @returns Extracted filename or default
 */
export function extractFilenameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    return decodeURIComponent(lastPart);
  } catch {
    return 'downloaded-file';
  }
}
