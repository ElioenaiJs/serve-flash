export interface User {
  id: string;
  username: string;
  email: string;
  role:'customer' | 'admin'| 'kitchen';
  createdAt?: Date;
  updatedAt?: Date;
}