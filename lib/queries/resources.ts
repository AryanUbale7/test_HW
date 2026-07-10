import { createClient, createReadOnlyClient } from '@/lib/supabase/server';
import { Resource } from '@/types/resource';

/**
 * Fetches all available resources ordered by creation date.
 */
export async function getResources(): Promise<Resource[]> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('resources')
    .select('id, title, description, file_url, gated_by_email')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }

  return (
    data?.map((r) => ({
      _id: r.id,
      title: r.title,
      description: r.description,
      fileUrl: r.file_url,
      gatedByEmail: r.gated_by_email,
    })) || []
  );
}

/**
 * Fetches the count of resources.
 */
export async function getResourcesCount(): Promise<number> {
  const supabase = createReadOnlyClient();
  const { count, error } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching resources count:', error);
    return 0;
  }
  return count || 0;
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
  const supabase = await createClient();
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from('resources')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching admin resources:', error);
    return { resources: [], total: 0 };
  }
  return { resources: data || [], total: count || 0 };
}
