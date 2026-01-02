
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './ShopContext.tsx';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Store from './pages/Store.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Checkout from './pages/Checkout.tsx';
import Admin from './pages/Admin.tsx';

const App: React.FC = () => {
  return (
    <ShopProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<div className="p-20 text-center text-white font-serif text-4xl">LuxStore: Excelência em cada detalhe.</div>} />
            <Route path="/contact" element={<div className="p-20 text-center text-white font-serif text-4xl">Suporte Premium: (11) 99999-9999</div>} />
          </Routes>
        </Layout>
      </Router>
    </ShopProvider>
  );
};

export default App;
