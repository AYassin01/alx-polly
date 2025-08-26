export type Poll = {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: number;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
};