export interface User {
  id: string;
  name: string;
  email: string;
  role:'customer' | 'admin'| 'kitchen';
  createdAt?: Date;
  updatedAt?: Date;
}