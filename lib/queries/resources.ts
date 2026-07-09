import { createClient } from '@/lib/supabase/server';
import { Resource } from '@/types/resource';

/**
 * Fetches all available resources ordered by creation date.
 */
export async function getResources(): Promise<Resource[]> {
  const supabase = await createClient();
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
  const supabase = await createClient();
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
export async function getAdminResources() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin resources:', error);
    return [];
  }
  return data || [];
}
