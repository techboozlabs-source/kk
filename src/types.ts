export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Fruits' | 'Vegetables' | 'Dairy' | 'Bakery' | 'Meat' | 'Pantry';
