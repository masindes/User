import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddTenant = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    unit_name: '',
    property_id: '',
  });

  // Fetch tenant details if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/tenant/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch tenant');
          return response.json();
        })
        .then(data => setFormData(data))
        .catch(error => console.error('Error fetching tenant:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? 'PATCH' : 'POST';
      const url = id ? `http://localhost:5000/tenant/${id}` : 'http://localhost:5000/tenant';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save tenant');
      
      alert(id ? 'Tenant updated successfully!' : 'Tenant added successfully!');
      navigate('/tenants'); // Redirect to tenants page
    } catch (error) {
      console.error('Error saving tenant:', error);
      alert('Failed to save tenant. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        const response = await fetch(`http://localhost:5000/tenant/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete tenant');
        
        alert('Tenant deleted successfully!');
        navigate('/tenants'); // Redirect to tenants page
      } catch (error) {
        console.error('Error deleting tenant:', error);
        alert('Failed to delete tenant. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Tenant' : 'Add Tenant'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Unit Name</label>
          <input
            type="text"
            name="unit_name"
            value={formData.unit_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Property ID</label>
          <input
            type="text"
            name="property_id"
            value={formData.property_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
        >
          {id ? 'Update Tenant' : 'Add Tenant'}
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          >
            Delete Tenant
          </button>
        )}
      </form>
    </div>
  );
};

export default AddTenant;
