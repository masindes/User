import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddTenant = () => {
  const { id } = useParams(); // Get the tenant ID from the URL (for editing)
  const navigate = useNavigate();
  const [tenant, setTenant] = useState({
    name: '',
    phone: '',
    unit_id: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tenant details if editing
  useEffect(() => {
    if (id) {
      const fetchTenant = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/tenant/${id}`);
          setTenant(response.data);
        } catch (error) {
          console.error('Error fetching tenant:', error);
          setError('Failed to fetch tenant details. Please try again later.');
        }
      };
      fetchTenant();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!tenant.name || !tenant.phone || !tenant.unit_id || !tenant.email) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    try {
      if (id) {
        // Update existing tenant
        await axios.put(`http://localhost:5000/tenant/${id}`, tenant);
        console.log('Tenant updated successfully');
      } else {
        // Create new tenant
        await axios.post('http://localhost:5000/tenant', tenant);
        console.log('Tenant added successfully');
      }
      navigate('/tenants'); // Redirect to the tenants list
    } catch (error) {
      console.error('Error saving tenant:', error);
      setError('Failed to save tenant. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          {id ? 'Edit Tenant' : 'Add Tenant'}
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
              type="tel"
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
              type="number"
              name="unit_id"
              value={tenant.unit_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 w-full ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {id ? 'Updating...' : 'Adding...'}
              </span>
            ) : (
              id ? 'Update Tenant' : 'Add Tenant'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTenant;