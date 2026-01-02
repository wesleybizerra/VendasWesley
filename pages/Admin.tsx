
import React, { useState } from 'react';
import { useShop } from '../ShopContext.tsx';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

const Admin: React.FC = () => {
  const { products, orders } = useShop();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products'>('dashboard');

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const avgTicket = orders.length > 0 ? totalSales / orders.length : 0;

  return (
    <div className="min-h-screen bg-slate-950 flex animate-slideUp">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-8 hidden lg:block">
        <h2 className="text-xl font-serif font-black text-amber-500 mb-12 tracking-widest uppercase">Admin Lux</h2>
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'orders' ? 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <ShoppingCart className="w-5 h-5" /> Pedidos
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'products' ? 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Package className="w-5 h-5" /> Produtos
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            <header className="flex justify-between items-center">
              <h1 className="text-4xl font-black">Visão Geral</h1>
              <div className="bg-slate-900 px-6 py-3 rounded-full border border-slate-800 text-slate-400 text-sm">
                Atualizado agora
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Vendas Totais', val: `R$ ${totalSales.toFixed(2)}`, icon: DollarSign, color: 'text-green-500' },
                { label: 'Pedidos', val: orders.length, icon: ShoppingCart, color: 'text-amber-500' },
                { label: 'Ticket Médio', val: `R$ ${avgTicket.toFixed(2)}`, icon: TrendingUp, color: 'text-blue-500' },
                { label: 'Novos Clientes', val: orders.length, icon: Users, color: 'text-purple-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
                  <stat.icon className={`w-8 h-8 mb-6 ${stat.color}`} />
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black mt-2">{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 p-10">
               <h3 className="text-xl font-black mb-8">Pedidos Recentes</h3>
               {orders.length === 0 ? (
                 <p className="text-slate-500 text-center py-10">Nenhum pedido realizado ainda.</p>
               ) : (
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="text-slate-500 border-b border-slate-800">
                         <th className="pb-6 font-bold uppercase text-xs tracking-widest">ID</th>
                         <th className="pb-6 font-bold uppercase text-xs tracking-widest">Cliente</th>
                         <th className="pb-6 font-bold uppercase text-xs tracking-widest">Total</th>
                         <th className="pb-6 font-bold uppercase text-xs tracking-widest">Status</th>
                         <th className="pb-6"></th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-800">
                        {orders.map(order => (
                          <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                            <td className="py-6 font-mono text-amber-500">#{order.id}</td>
                            <td className="py-6 font-bold">{order.customer.name}</td>
                            <td className="py-6 font-black text-lg">R$ {order.total.toFixed(2)}</td>
                            <td className="py-6">
                               <span className="bg-green-500/20 text-green-500 px-4 py-1.5 rounded-full text-xs font-bold uppercase flex items-center gap-2 w-fit">
                                 <CheckCircle className="w-3 h-3" /> Pago
                               </span>
                            </td>
                            <td className="py-6 text-right">
                               <button className="p-3 bg-slate-800 rounded-xl hover:bg-amber-500 hover:text-slate-950 transition-all">
                                 <ChevronRight className="w-4 h-4" />
                               </button>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                 </div>
               )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
           <div className="space-y-8">
              <h1 className="text-4xl font-black">Gerenciar Pedidos</h1>
              <div className="bg-slate-900 border border-slate-800 p-12 rounded-[2.5rem] text-center">
                 <ShoppingCart className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                 <p className="text-slate-500">Módulo de gestão avançada de pedidos.</p>
              </div>
           </div>
        )}

        {activeTab === 'products' && (
           <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black">Inventário</h1>
                <button className="bg-amber-500 text-slate-950 font-black px-8 py-3 rounded-full hover:scale-105 transition-all">Adicionar Produto</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {products.map(p => (
                   <div key={p.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex gap-6">
                      <img src={p.image} className="w-24 h-24 rounded-2xl object-cover" />
                      <div className="flex-grow">
                        <p className="font-bold text-lg">{p.name}</p>
                        <p className="text-amber-500 font-black">R$ {p.price.toFixed(2)}</p>
                        <div className="flex gap-4 mt-4">
                           <button className="text-xs font-bold text-slate-500 hover:text-white underline">Editar</button>
                           <button className="text-xs font-bold text-red-500 hover:text-red-400 underline">Excluir</button>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className="text-xs text-slate-500 uppercase font-black">Estoque</span>
                         <p className="font-black text-2xl">{p.stock}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
