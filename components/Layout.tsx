
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Instagram, 
  Twitter, 
  Facebook, 
  MessageCircle, 
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
  User
} from 'lucide-react';
import { useShop } from '../ShopContext.tsx';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 text-slate-400 hover:text-gold transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <span className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent uppercase tracking-widest font-serif">LuxStore</span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-300">
          <Link to="/" className="hover:text-amber-500 transition-colors">Início</Link>
          <Link to="/store" className="hover:text-amber-500 transition-colors">Loja</Link>
          <Link to="/about" className="hover:text-amber-500 transition-colors">Sobre</Link>
          <Link to="/contact" className="hover:text-amber-500 transition-colors">Contato</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/admin" className="p-2 text-slate-400 hover:text-amber-500 transition-colors">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/checkout" className="relative p-2 text-slate-400 hover:text-amber-500 transition-colors">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-950">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-80 bg-slate-900 shadow-2xl p-6">
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-serif font-bold text-amber-500">LuxStore</span>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-medium text-slate-200">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between">Início <ChevronRight className="w-4 h-4" /></Link>
              <Link to="/store" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between">Loja <ChevronRight className="w-4 h-4" /></Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between">Sobre <ChevronRight className="w-4 h-4" /></Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between">Contato <ChevronRight className="w-4 h-4" /></Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-amber-500 uppercase tracking-widest">LuxStore</h3>
            <p className="text-slate-400 leading-relaxed">
              Excelência e sofisticação em cada detalhe. A maior curadoria de produtos premium do Brasil, entregando estilo e qualidade na sua porta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-500 hover:text-slate-950 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/store" className="hover:text-amber-500 transition-colors">Novidades</Link></li>
              <li><Link to="/store" className="hover:text-amber-500 transition-colors">Mais Vendidos</Link></li>
              <li><Link to="/store" className="hover:text-amber-500 transition-colors">Promoções</Link></li>
              <li><Link to="/admin" className="hover:text-amber-500 transition-colors">Minha Conta</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Institucional</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">Quem Somos</Link></li>
              <li><Link to="/privacy" className="hover:text-amber-500 transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="hover:text-amber-500 transition-colors">Termos de Uso</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Ajuda e Suporte</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Segurança</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <span className="text-sm">Checkout 100% Seguro</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <CreditCard className="w-6 h-6 text-amber-500" />
                <span className="text-sm">Parcelamento em até 12x</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Truck className="w-6 h-6 text-blue-500" />
                <span className="text-sm">Entrega Expressa Segura</span>
              </div>
              <img src="https://img.shields.io/badge/Mercado%20Pago-Seguro-blue" alt="Mercado Pago" className="h-6 opacity-70" />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© 2024 LuxStore Premium E-commerce. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <span>CNPJ: 00.000.000/0001-00</span>
            <span>Atendimento: (11) 99999-9999</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton: React.FC = () => (
  <a 
    href="https://wa.me/5511999999999" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 transform hover:scale-110 transition-all flex items-center justify-center"
  >
    <MessageCircle className="w-7 h-7" />
  </a>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
