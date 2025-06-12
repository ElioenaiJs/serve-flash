export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  createdAt: number;
  customerId: string;
  items: { [key: string]: OrderItem } | OrderItem[];
  notes?: string;
  status: string;
  tableNumber: number;
  total: number;
  updatedAt: number;
  preparationTime?: number;
}