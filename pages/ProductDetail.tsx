
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../ShopContext.tsx';
import { Star, Truck, ShieldCheck, Undo2, ChevronRight, Package, CreditCard, Share2 } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { products, addToCart } = useShop();
  const [zipCode, setZipCode] = useState('');
  const [shippingResult, setShippingResult] = useState<{ price: number, days: number } | null>(null);

  const product = products.find(p => p.id === id);

  if (!product) return <div className="min-h-screen flex items-center justify-center text-white">Produto não encontrado.</div>;

  const calculateShipping = () => {
    if (zipCode.length < 8) return;
    setTimeout(() => {
      setShippingResult({
        price: zipCode.startsWith('0') ? 15.90 : 24.90,
        days: zipCode.startsWith('0') ? 3 : 7
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest mb-10">
          <Link to="/" className="hover:text-amber-500">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/store" className="hover:text-amber-500">Loja</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-300">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-800">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-10">
            <h1 className="text-4xl md:text-5xl font-serif font-black text-white">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-white">R$ {product.price.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-5 rounded-2xl text-xl transition-all shadow-2xl shadow-amber-500/20"
            >
              COMPRAR AGORA
            </button>
            <p className="text-slate-400 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
