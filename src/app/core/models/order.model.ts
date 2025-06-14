export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id?: string | null;
  createdAt: number;
  customerId: string;
  items: { [key: string]: OrderItem } | OrderItem[];
  notes?: string;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  tableNumber: number;
  total: number;
  updatedAt: number;
}

export interface CreateOrderRequest {
  customerId: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
  tableNumber: number;
}
