
import React, { useState, useEffect } from 'react';
import { useShop } from '../ShopContext.tsx';
import { 
  ShieldCheck, ArrowLeft, Lock, CreditCard, QrCode, Truck, Loader2, ExternalLink, MapPin, AlertCircle, Trash2, Plus, Minus, ShoppingCart, RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// ATENÇÃO: Substitua pelo SEU link do Render (ex: https://meu-backend.onrender.com)
const BACKEND_URL = "https://luxstore-backend.onrender.com"; 

const Checkout: React.FC = () => {
  const { cart, getCartTotal, placeOrder, removeFromCart, updateQuantity, clearCart } = useShop();
  const navigate = useNavigate();
  const [loadingZip, setLoadingZip] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  const [step, setStep] = useState<'details' | 'payment' | 'processing'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [formData, setFormData] = useState({
    name: '', email: '', cpf: '', zipCode: '', address: '', city: '', state: ''
  });

  // Verifica se o servidor está vivo ao abrir a página
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(BACKEND_URL, { method: 'GET' });
        if (res.ok) setServerStatus('online');
        else setServerStatus('offline');
      } catch (e) {
        setServerStatus('offline');
      }
    };
    checkServer();
  }, []);

  const handleZipCode = async (zip: string) => {
    const cleanZip = zip.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, zipCode: cleanZip }));
    if (cleanZip.length === 8) {
      setLoadingZip(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanZip}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({ ...prev, address: `${data.logradouro}, ${data.bairro}`, city: data.localidade, state: data.uf }));
        }
      } catch (e) { console.error("Erro CEP"); } finally { setLoadingZip(false); }
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 49.90;
  const total = subtotal + shipping;

  const handleFinalize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep('payment');
        return;
    }

    setStep('processing');
    setError(null);

    try {
      if (serverStatus === 'offline') {
        throw new Error("O servidor de pagamentos parece estar offline. Tente novamente em instantes.");
      }

      await placeOrder({
        items: cart,
        total,
        customer: formData,
        paymentMethod,
      });

      const response = await fetch(`${BACKEND_URL}/create_preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'BRL'
          })),
          customer: formData,
          total: total
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro na comunicação com o Mercado Pago.");
      }

      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("Link de pagamento não gerado.");
      }

    } catch (err: any) {
      console.error("Erro no Checkout:", err);
      setError(err.message || "Erro de conexão. Verifique se o backend está rodando no Render.");
      setStep('payment');
    }
  };

  if (cart.length === 0 && step === 'details') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <ShoppingCart className="w-16 h-16 text-slate-700 mb-6" />
        <h2 className="text-3xl font-serif font-black mb-4">Seu carrinho está vazio</h2>
        <Link to="/store" className="bg-amber-500 text-slate-950 px-10 py-4 rounded-full font-black uppercase">Explorar Loja</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-16">
      <div className="container mx-auto px-6">
        {/* Barra de Status do Servidor (Debug) */}
        <div className="mb-8 flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${serverStatus === 'online' ? 'bg-green-500 shadow-[0_0_10px_green]' : serverStatus === 'offline' ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-amber-500 animate-pulse'}`}></div>
             <span className="text-xs font-bold uppercase tracking-tighter text-slate-400">
               Status do Sistema: {serverStatus === 'online' ? 'Pronto para pagar' : serverStatus === 'offline' ? 'Servidor Offline' : 'Verificando...'}
             </span>
          </div>
          {serverStatus === 'offline' && (
            <button onClick={() => window.location.reload()} className="text-amber-500 text-xs flex items-center gap-2 hover:underline">
              <RefreshCw className="w-3 h-3" /> Tentar Reconectar
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <h1 className="text-4xl font-serif font-black text-white">Finalizar Compra</h1>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-2xl space-y-2 animate-slideUp">
                <div className="flex items-center gap-4">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p className="font-bold">Atenção</p>
                </div>
                <p className="text-sm opacity-80">{error}</p>
              </div>
            )}

            {step === 'processing' ? (
              <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-[3rem] border border-slate-800">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-6" />
                <p className="text-2xl font-black text-white uppercase tracking-tighter">Processando Segurança</p>
                <p className="text-slate-400 text-sm mt-2">Você será redirecionado para o Mercado Pago...</p>
              </div>
            ) : (
              <form onSubmit={handleFinalize} className="space-y-8">
                {step === 'details' ? (
                  <div className="space-y-6 animate-slideUp">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input placeholder="Nome Completo" required className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-amber-500" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      <input placeholder="E-mail" type="email" required className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-amber-500" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      <input placeholder="CPF" required className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-amber-500" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} />
                      <input placeholder="CEP" required className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-amber-500" value={formData.zipCode} onChange={e => handleZipCode(e.target.value)} />
                      <div className="md:col-span-2">
                        <input placeholder="Endereço Completo" required className="w-full bg-slate-900 border border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-amber-500" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-amber-500 text-slate-950 font-black py-6 rounded-2xl text-xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20">IR PARA PAGAMENTO</button>
                  </div>
                ) : (
                  <div className="space-y-8 animate-slideUp">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button type="button" onClick={() => setPaymentMethod('pix')} className={`p-8 rounded-3xl border transition-all ${paymentMethod === 'pix' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900 opacity-50'}`}>
                        <QrCode className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                        <span className="block text-center font-bold text-white uppercase text-xs tracking-widest">PIX</span>
                      </button>
                      <button type="button" onClick={() => setPaymentMethod('credit_card')} className={`p-8 rounded-3xl border transition-all ${paymentMethod === 'credit_card' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900 opacity-50'}`}>
                        <CreditCard className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                        <span className="block text-center font-bold text-white uppercase text-xs tracking-widest">CARTÃO</span>
                      </button>
                      <button type="button" onClick={() => setPaymentMethod('boleto')} className={`p-8 rounded-3xl border transition-all ${paymentMethod === 'boleto' ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-900 opacity-50'}`}>
                        <Truck className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                        <span className="block text-center font-bold text-white uppercase text-xs tracking-widest">BOLETO</span>
                      </button>
                    </div>
                    <button type="submit" className="w-full bg-amber-500 text-slate-950 font-black py-6 rounded-2xl text-2xl flex items-center justify-center gap-4 hover:bg-amber-400 transition-all">
                      PAGAR AGORA <ExternalLink className="w-6 h-6" />
                    </button>
                    <button type="button" onClick={() => setStep('details')} className="w-full text-slate-500 font-bold hover:text-white transition-colors">← Voltar para endereço</button>
                  </div>
                )}
              </form>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 sticky top-32 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 text-white">Seu Pedido</h3>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <img src={item.image} className="w-16 h-16 rounded-2xl object-cover border border-slate-800" />
                    <div className="flex-grow">
                      <p className="font-bold text-white text-sm line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center bg-slate-950 rounded-lg border border-slate-800 px-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-slate-500 hover:text-amber-500"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-slate-500 hover:text-amber-500"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-amber-500 font-black text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-6 space-y-4">
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>Entrega Expressa</span>
                  <span className="font-bold text-green-500">{shipping === 0 ? 'GRÁTIS' : `R$ ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-3xl font-black text-amber-500 pt-6 border-t border-slate-800 mt-4">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
