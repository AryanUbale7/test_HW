import { query } from '@/lib/mysql';
import { Resource } from '@/types/resource';

function resolveFileUrl(title: string, rawUrl?: string): string {
  if (rawUrl && rawUrl.startsWith('/resources/')) {
    return rawUrl;
  }
  if (rawUrl && rawUrl.startsWith('http')) {
    return rawUrl;
  }
  
  const lowerTitle = (title || '').toLowerCase();
  if (lowerTitle.includes('insurance')) {
    return '/resources/Honworth_Questions_Before_First_Insurance.pdf';
  }
  if (lowerTitle.includes('mutual fund') || lowerTitle.includes('mf')) {
    return '/resources/Honworth_Questions_Before_First_MF.pdf';
  }
  if (lowerTitle.includes('checklist') || lowerTitle.includes('family')) {
    return '/resources/Honworth_Family_Financial_Checklist.pdf';
  }

  return rawUrl || '/resources/Honworth_Family_Financial_Checklist.pdf';
}

/**
 * Fetches all available resources ordered by creation date.
 */
export async function getResources(): Promise<Resource[]> {
  try {
    const data = await query<any[]>('SELECT id, title, description, file_url, gated_by_email FROM resources ORDER BY created_at DESC');

    return data.map((r) => ({
      _id: r.id,
      title: r.title,
      description: r.description,
      fileUrl: resolveFileUrl(r.title, r.file_url),
      gatedByEmail: Boolean(r.gated_by_email),
    }));
  } catch (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
}

/**
 * Fetches the count of resources.
 */
export async function getResourcesCount(): Promise<number> {
  try {
    const rows = await query<any[]>('SELECT COUNT(*) as count FROM resources');
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching resources count:', error);
    return 0;
  }
}

/**
 * Fetches all resources for admin dashboard.
 */
export async function getAdminResources({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
} = {}) {
  try {
    const offset = (page - 1) * limit;

    const resources = await query<any[]>(
      'SELECT * FROM resources ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const countRows = await query<any[]>('SELECT COUNT(*) as count FROM resources');
    const total = countRows[0]?.count || 0;

    const formattedResources = resources.map((r) => ({
      ...r,
      gated_by_email: Boolean(r.gated_by_email),
    }));

    return { resources: formattedResources, total };
  } catch (error) {
    console.error('Error fetching admin resources:', error);
    return { resources: [], total: 0 };
  }
}
