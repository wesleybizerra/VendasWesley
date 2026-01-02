
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Star,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { useShop } from '../ShopContext.tsx';

const Home: React.FC = () => {
  const { products, addToCart } = useShop();
  const featured = products.slice(0, 4);

  return (
    <div className="animate-slideUp">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.25]"
            alt="Hero Lux"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-500 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-500/30">
              <Award className="w-4 h-4" /> Excelência Garantida
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black text-white leading-tight">
              Onde o <span className="text-amber-500">Luxo</span> encontra a <span className="text-slate-400">Exclusividade</span>.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
              Descubra nossa curadoria premium de produtos que definem o seu estilo de vida. Qualidade impecável e entrega imediata.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link to="/store" className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-10 py-5 rounded-full font-black text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl shadow-amber-500/30 uppercase tracking-tighter">
                Comprar Agora <ArrowRight className="w-6 h-6" />
              </Link>
              <Link to="/about" className="bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center uppercase tracking-tighter">
                Nossa História
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Truck, title: "Frete VIP", desc: "Entrega expressa e segura" },
              { icon: ShieldCheck, title: "Compra Blindada", desc: "Certificado SSL e Pagamento Seguro" },
              { icon: Clock, title: "Suporte 24/7", desc: "Atendimento premium humanizado" },
              { icon: Star, title: "Garantia Real", desc: "Sua satisfação ou seu dinheiro de volta" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <item.icon className="w-6 h-6 text-amber-500 group-hover:text-slate-950" />
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase text-sm">{item.title}</h4>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-xs flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Tendências
              </span>
              <h2 className="text-5xl font-serif font-black text-white">Coleção em Destaque</h2>
            </div>
            <Link to="/store" className="text-slate-400 hover:text-amber-500 flex items-center gap-2 font-bold transition-all">
              Explorar tudo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product) => (
              <div key={product.id} className="group bg-slate-900/40 rounded-[2rem] p-4 border border-slate-800 hover:border-amber-500/40 transition-all duration-500 overflow-hidden flex flex-col">
                <Link to={`/product/${product.id}`} className="block aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </div>
                </Link>
                <div className="px-2 space-y-3 flex-grow">
                  <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">{product.category}</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-black text-white">R$ {product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white text-slate-950 p-3 rounded-2xl hover:bg-amber-500 transition-all active:scale-90"
                    >
                      <Zap className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-serif font-black text-white mb-8">O que nossos clientes dizem</h2>
          <div className="bg-slate-900 p-12 rounded-[3rem] border border-slate-800 relative shadow-2xl">
             <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />)}
             </div>
             <p className="text-2xl font-light italic text-slate-300 mb-8 leading-relaxed">
              "A LuxStore superou todas as minhas expectativas. O atendimento é impecável e o produto chegou antes do prazo com uma embalagem incrível. Definitivamente a melhor experiência de compra online que já tive."
             </p>
             <div className="flex items-center justify-center gap-4">
               <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center font-bold text-slate-950">RA</div>
               <div className="text-left">
                 <p className="text-white font-bold">Ricardo Almeida</p>
                 <p className="text-slate-500 text-sm">Empresário | Cliente Premium</p>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
