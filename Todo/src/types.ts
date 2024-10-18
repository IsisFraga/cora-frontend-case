export type ITodoTypes = "pending" | "done";

export interface TodoItem {
  id: string;
  ref: string;
  title: string;
  description: React.ReactNode;
  status: 'pending' | 'done';
  required: boolean;
  links?: Array<{ name: string; url?: string; link?: string }>;
}