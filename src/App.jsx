import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyList from './components/PropertyList';
import TenantList from './components/TenantList';
import PaymentList from './components/PaymentList';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/tenants" element={<TenantList />} />
          <Route path="/payments" element={<PaymentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;