
import { Product } from './types.ts';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camisa Premium Azul Cielo',
    description: 'Camisa social de corte slim fit, confeccionada em algodão egípcio de alta qualidade. Toque macio, brilho natural e extrema durabilidade para o homem moderno.',
    price: 189.90,
    originalPrice: 259.00,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'Moda',
    stock: 50,
    rating: 4.9,
    reviews: 42,
    features: ['100% Algodão Egípcio', 'Corte Slim Fit', 'Tecido respirável', 'Fácil de passar']
  },
  {
    id: '7',
    name: 'Relógio Cronógrafo Imperial',
    description: 'Design clássico com acabamento em ouro 18k e pulseira de couro legítimo. Precisão suíça para homens que não abrem mão do estilo.',
    price: 1290.00,
    originalPrice: 1800.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    category: 'Acessórios',
    stock: 12,
    rating: 4.9,
    reviews: 128,
    features: ['Resistente à água 50m', 'Vidro de Safira', 'Garantia de 2 anos', 'Movimento Quartzo']
  },
  {
    id: '2',
    name: 'Headphone Elite Sound Z1',
    description: 'Cancelamento de ruído ativo e som de alta fidelidade. O som mais limpo que você já ouviu em um design confortável.',
    price: 899.00,
    originalPrice: 1100.00,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Eletrônicos',
    stock: 45,
    rating: 4.8,
    reviews: 256,
    features: ['40h de bateria', 'Bluetooth 5.2', 'Microfones beamforming', 'Dobrável']
  },
  {
    id: '3',
    name: 'Bolsa de Couro Noir',
    description: 'Elegância e praticidade em couro italiano selecionado. Perfeita para qualquer ocasião.',
    price: 549.90,
    image: 'https://images.unsplash.com/photo-1584917033951-4091ca2753a4?auto=format&fit=crop&q=80&w=800',
    category: 'Moda',
    stock: 8,
    rating: 5.0,
    reviews: 84,
    features: ['Couro legítimo', 'Forro em seda', 'Compartimento para notebook', 'Design exclusivo']
  },
  {
    id: '4',
    name: 'Kit Perfume Essence Gold',
    description: 'Notas amadeiradas e toques de baunilha. Fragrância marcante que dura o dia todo.',
    price: 389.00,
    originalPrice: 450.00,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    category: 'Beleza',
    stock: 30,
    rating: 4.7,
    reviews: 312,
    features: ['Eau de Parfum', 'Frasco de 100ml', 'Fixação 12h', 'Inclui miniatura']
  },
  {
    id: '5',
    name: 'Luminária Minimalista Lux',
    description: 'Iluminação suave para ambientes modernos. Controle por toque e design premiado.',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800',
    category: 'Casa',
    stock: 15,
    rating: 4.9,
    reviews: 45,
    features: ['LED inteligente', 'Intensidade regulável', 'Bivolt', 'Economia de energia']
  },
  {
    id: '6',
    name: 'Smartphone Pro Vision X',
    description: 'O futuro na palma da sua mão. Câmera de 200MP e tela de 120Hz.',
    price: 4599.00,
    originalPrice: 5200.00,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    category: 'Eletrônicos',
    stock: 20,
    rating: 4.9,
    reviews: 89,
    features: ['512GB Armazenamento', '12GB RAM', 'Carregamento ultra-rápido', 'Resistente à água']
  }
];

export const CATEGORIES: string[] = ['Todos', 'Eletrônicos', 'Moda', 'Acessórios', 'Casa', 'Beleza'];
