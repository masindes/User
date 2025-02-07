import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTenant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenant, setTenant] = useState({
    name: '',
    phone: '',
    email: '',
    unit_id: '',
    property_id: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tenant details from the backend
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await fetch(`https://rent-management-app.onrender.com/tenant/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tenant details.');
        }
        const data = await response.json();
        setTenant(data);
      } catch (error) {
        console.error('Error fetching tenant details:', error);
        setError('Failed to fetch tenant details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenant((prevTenant) => ({
      ...prevTenant,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://rent-management-app.onrender.com/tenant/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tenant),
      });

      if (!response.ok) {
        throw new Error('Failed to update tenant details.');
      }

      navigate('/tenants'); // Redirect to the tenant list after successful update
    } catch (error) {
      console.error('Error updating tenant details:', error);
      setError('Failed to update tenant details. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-700"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto text-center">
          <div className="text-red-500 text-xl font-bold mb-4">{error}</div>
          <button
            onClick={() => navigate('/tenants')}
            className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Back to Tenants
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Edit Tenant
        </h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={tenant.name}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={tenant.phone}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={tenant.email}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit_id">
              Unit ID
            </label>
            <input
              type="text"
              id="unit_id"
              name="unit_id"
              value={tenant.unit_id}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="property_id">
              Property ID
            </label>
            <input
              type="text"
              id="property_id"
              name="property_id"
              value={tenant.property_id}
              onChange={handleInputChange}
              className="border px-2 py-1 rounded w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditTenant;