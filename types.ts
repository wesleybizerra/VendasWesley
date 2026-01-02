
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  customer: {
    name: string;
    email: string;
    cpf: string;
    zipCode: string;
    address: string;
    city: string;
    state: string;
  };
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
  date: string;
}

export type Category = 'Eletrônicos' | 'Moda' | 'Acessórios' | 'Casa' | 'Beleza' | 'Todos';
