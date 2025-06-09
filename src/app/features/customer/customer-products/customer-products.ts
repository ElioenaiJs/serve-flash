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

export const menuItems: MenuItem[] = [
    { icon: 'apps', title: 'Todos los productos' },
    { icon: 'local_cafe', title: 'Café' },
    { icon: 'cake', title: 'Postres' },
    { icon: 'local_bar', title: 'Bebidas' },
    { icon: 'lunch_dining', title: 'Sandwiches' }
];

export const menuCategories: MenuItem[] = [
    { icon: 'apps', title: 'Todos los productos' },
    { icon: 'local_cafe', title: 'Café' },
    { icon: 'cake', title: 'Postres' },
    { icon: 'local_bar', title: 'Bebidas' },
    { icon: 'lunch_dining', title: 'Sandwiches' }
  ];

export const products: Product[] = [
    {
      id: 1,
      title: 'Café Americano',
      description: 'Café negro tradicional',
      price: 2.50,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Café'
    },
    {
      id: 2,
      title: 'Capuchino',
      description: 'Espresso con leche vaporizada',
      price: 3.50,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Café'
    },
    {
      id: 3,
      title: 'Latte',
      description: 'Café con leche cremosa',
      price: 3.00,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Café'
    },
    {
      id: 4,
      title: 'Tarta de Manzana',
      description: 'Deliciosa tarta casera',
      price: 4.00,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Postres'
    },
    {
      id: 5,
      title: 'Brownie',
      description: 'Brownie de chocolate con nueces',
      price: 3.50,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Postres'
    },
    {
      id: 6,
      title: 'Sandwich Club',
      description: 'Triple sandwich de pollo',
      price: 5.00,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Sandwiches'
    },
    {
      id: 7,
      title: 'Té Verde',
      description: 'Té verde japonés premium',
      price: 2.50,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Bebidas'
    },
    {
      id: 8,
      title: 'Jugo Natural',
      description: 'Jugo recién exprimido de naranja',
      price: 3.00,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Bebidas'
    },
    {
      id: 9,
      title: 'Café Mocha',
      description: 'Café con chocolate y crema',
      price: 4.00,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Café'
    },
    {
      id: 10,
      title: 'Cheesecake',
      description: 'Cheesecake clásico con frutos rojos',
      price: 4.50,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Postres'
    },
    {
      id: 11,
      title: 'Sandwich Vegetariano',
      description: 'Sandwich con vegetales frescos',
      price: 4.50,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Sandwiches'
    },
    {
      id: 12,
      title: 'Limonada',
      description: 'Limonada natural con menta',
      price: 2.50,
      imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
      category: 'Bebidas'
    }
  ];