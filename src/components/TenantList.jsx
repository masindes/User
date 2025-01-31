import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tenants');
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
    try {
      await axios.delete(`http://localhost:5000/tenant/${id}`);
      setTenants(tenants.filter((tenant) => tenant.id !== id));
      console.log('Tenant deleted successfully');
    } catch (error) {
      console.error('Error deleting tenant:', error);
      setError('Failed to delete tenant. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Tenant List</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Phone</th>
                <th className="text-left py-2">Unit ID</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="border-t">
                  <td className="py-2">{tenant.name}</td>
                  <td className="py-2">{tenant.email}</td>
                  <td className="py-2">{tenant.phone}</td>
                  <td className="py-2">{tenant.unit_id}</td>
                  <td className="py-2">
                    <Link
                      to={`/tenant/edit/${tenant.id}`}
                      className="text-sky-700 hover:text-sky-800 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(tenant.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantList;