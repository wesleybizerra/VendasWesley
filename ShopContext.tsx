
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order } from './types.ts';
import { MOCK_PRODUCTS } from './constants.ts';

declare const emailjs: any;

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => Promise<string>;
  getCartTotal: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luxstore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('luxstore_orders');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    const initInterval = setInterval(() => {
      if (typeof emailjs !== 'undefined') {
        emailjs.init("16mv5a0zsCBmi5uHH");
        console.log("EmailJS Inicializado");
        clearInterval(initInterval);
      }
    }, 500);
    return () => clearInterval(initInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('luxstore_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxstore_orders', JSON.stringify(orders));
  }, [orders]);

  const sendOrderEmail = async (order: Order) => {
    if (typeof emailjs === 'undefined') return;

    const templateParams = {
      order_id: order.id,
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_address: `${order.customer.address}, ${order.customer.city}/${order.customer.state}`,
      total_price: `R$ ${order.total.toFixed(2)}`,
      payment_method: order.paymentMethod.toUpperCase(),
      items_summary: order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')
    };

    try {
      await emailjs.send("service_u5gxb5g", "template_ycpaidq", templateParams);
    } catch (err) {
      console.error('EmailJS Error:', err);
    }
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async (orderData: Omit<Order, 'id' | 'date' | 'status'>): Promise<string> => {
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const newOrder: Order = { ...orderData, id: orderId, date: new Date().toISOString(), status: 'paid' };
    setOrders(prev => [newOrder, ...prev]);
    await sendOrderEmail(newOrder); 
    // NOTA: clearCart() removido daqui para não interromper o redirecionamento do checkout
    return orderId;
  };

  const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <ShopContext.Provider value={{ products, cart, orders, addToCart, removeFromCart, updateQuantity, clearCart, placeOrder, getCartTotal }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};
