export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

export interface MenuItem {
  icon: string;
  title: string;
}

export const menuCategories: MenuItem[] = [
  { icon: 'apps', title: 'Todos los productos' },
  { icon: 'lunch_dining', title: 'comida' },
  { icon: 'local_bar', title: 'bebidas' },
  { icon: 'cake', title: 'postres' },
  { icon: 'help_outline', title: 'otro' }
];
