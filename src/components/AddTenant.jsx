import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTenant = () => {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState({
    name: '',
    email: '',
    phone: '',
    unit_id: '',
    property_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!tenant.name || !tenant.email || !tenant.phone) {
      setError('Name, Email, and Phone are required fields.');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/tenant', tenant);
      navigate('/tenants'); // Redirect to the tenants list
    } catch (error) {
      console.error('Error adding tenant:', error);
      setError('Failed to add tenant. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Add Tenant
        </h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={tenant.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={tenant.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={tenant.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Unit ID</label>
            <input
              type="text"
              name="unit_id"
              value={tenant.unit_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Property ID</label>
            <input
              type="text"
              name="property_id"
              value={tenant.property_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className={`bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Tenant'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTenant;