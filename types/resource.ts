export interface Resource {
  _id: string;
  title: string;
  description: string | null;
  fileUrl: string | null;
  gatedByEmail: boolean;
}

export interface AdminResource {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  gated_by_email: boolean;
  created_at: string;
  updated_at: string;
}
