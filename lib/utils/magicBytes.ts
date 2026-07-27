export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  /** The file extension detected from magic bytes (e.g., 'png', 'jpg', 'pdf'). Only set when isValid is true. */
  detectedExtension?: string;
}

/**
 * Validates an uploaded file's content by checking its actual magic bytes
 * (file signature) rather than just the extension, and enforces a size limit.
 */
export async function validateUploadedFile(
  file: File,
  allowedTypes: ('image' | 'pdf')[],
  maxSizeBytes: number
): Promise<FileValidationResult> {
  // 1. Enforce size limit
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds the limit of ${(maxSizeBytes / (1024 * 1024)).toFixed(1)}MB.`,
    };
  }

  // 2. Read first 8 bytes for magic number analysis
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer.slice(0, 8));

  // Helper to match prefix bytes
  const match = (header: number[]) => {
    return header.every((val, i) => bytes[i] === val);
  };

  // Executable file headers (MZ for DOS/Windows EXE, ELF for Linux ELF, or script starts with #!)
  const isExe = match([0x4D, 0x5A]) || match([0x7F, 0x45, 0x4C, 0x46]) || (bytes[0] === 0x23 && bytes[1] === 0x21); // '#' and '!'
  if (isExe) {
    return {
      isValid: false,
      error: 'Security Warning: Executable file types are blocked.',
    };
  }

  // Define signatures
  const isPng = match([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const isJpeg = bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF;
  const isGif = match([0x47, 0x49, 0x46, 0x38]); // GIF8
  const isPdf = match([0x25, 0x50, 0x44, 0x46]); // %PDF

  // Validate matches and determine extension from magic bytes
  let detectedExtension: string | undefined;
  if (allowedTypes.includes('image')) {
    if (isPng) detectedExtension = 'png';
    else if (isJpeg) detectedExtension = 'jpg';
    else if (isGif) detectedExtension = 'gif';
  }
  if (allowedTypes.includes('pdf')) {
    if (isPdf) detectedExtension = 'pdf';
  }

  if (!detectedExtension) {
    return {
      isValid: false,
      error: `Invalid file signature. File content does not match allowed formats (${allowedTypes.join(', ')}).`,
    };
  }

  return { isValid: true, detectedExtension };
}
