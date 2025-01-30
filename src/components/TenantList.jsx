import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tenant');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
        setError('Failed to fetch tenants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      try {
        await axios.delete(`http://localhost:5000/tenant/${id}`);
        setTenants(tenants.filter((tenant) => tenant.id !== id));
        alert('Tenant deleted successfully!');
      } catch (error) {
        console.error('Error deleting tenant:', error);
        alert('Failed to delete tenant. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading tenants...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (tenants.length === 0) {
    return <div className="text-center mt-8">No tenants found.</div>;
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Tenants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                {/* Tenant Details */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{tenant.name}</h3>
                  <p className="text-gray-600">{tenant.phone}</p>
                  <p className="text-gray-600">{tenant.email}</p>
                  <p className="text-gray-600">Unit: {tenant.unit_name}</p>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-tenant/${tenant.id}`}
                    className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TenantList;