import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PropertyList from './components/PropertyList';
import TenantList from './components/TenantList';
import PaymentList from './components/PaymentList';
import AddProperty from './components/AddProperty';
import AddTenant from './components/AddTenant';
import AddPayment from './components/AddPayment';
import EditTenant from './components/EditTenant'; 

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
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/edit-property/:id" element={<AddProperty />} />
          <Route path="/add-tenant" element={<AddTenant />} />
          <Route path="/edit-tenant/:id" element={<EditTenant />} /> 
          <Route path="/add-payment" element={<AddPayment />} />
          <Route path="/edit-payment/:id" element={<AddPayment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;