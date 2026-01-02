
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../ShopContext.tsx';
import { CATEGORIES } from '../constants.ts';
import { Star, Filter, ArrowUpDown, ChevronRight } from 'lucide-react';

const Store: React.FC = () => {
  const { products, addToCart } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('rating');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest mb-10">
          <Link to="/" className="hover:text-amber-500">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-300">Loja</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 space-y-10">
            <div>
              <h3 className="flex items-center gap-2 text-white font-bold mb-6">
                <Filter className="w-4 h-4 text-amber-500" /> Categorias
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                      selectedCategory === cat 
                        ? 'bg-amber-500 text-slate-950' 
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <h3 className="flex items-center gap-2 text-white font-bold mb-6">
                <ArrowUpDown className="w-4 h-4 text-amber-500" /> Ordenar Por
              </h3>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-slate-300 text-sm outline-none focus:border-amber-500"
              >
                <option value="rating">Popularidade</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </aside>

          <div className="flex-grow">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-serif font-black text-white">Coleção <span className="text-amber-500">{selectedCategory}</span></h1>
              <span className="text-slate-500 text-sm">{filteredProducts.length} produtos encontrados</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-slate-900/40 rounded-3xl border border-slate-800 hover:border-amber-500/30 transition-all p-4">
                  <Link to={`/product/${product.id}`} className="block aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Promoção</div>
                    )}
                  </Link>
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1 block">{product.category}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors line-clamp-1">{product.name}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.originalPrice && <span className="text-xs text-slate-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>}
                        <span className="text-xl font-black text-white">R$ {product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-sm font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-slate-800 hover:bg-amber-500 text-white hover:text-slate-950 font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
