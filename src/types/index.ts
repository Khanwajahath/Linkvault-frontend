export interface Link {
  _id: string;
  title: string;
  url: string;
  description?: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}