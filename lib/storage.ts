import path from 'path';

/**
 * Returns the absolute path to the persistent storage folder.
 * Defaults to a folder parallel to the project directory ('../honworth-storage')
 * but can be overridden via the PERSISTENT_STORAGE_DIR environment variable.
 */
export function getPersistentStoragePath(subFolder: string): string {
  const baseDir = process.env.PERSISTENT_STORAGE_DIR || path.join(process.cwd(), 'public');
  return path.join(baseDir, subFolder);
}
