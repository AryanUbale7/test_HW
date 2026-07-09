export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  arm: string | null;
}

export interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  arm: string | null;
  created_at: string;
  updated_at: string;
}
