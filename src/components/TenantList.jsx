import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [visibleTenants, setVisibleTenants] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tenants from the backend
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('https://rent-management-app.onrender.com/tenant');
        if (!response.ok) {
          throw new Error('Failed to fetch tenants.');
        }
        const data = await response.json();
        setTenants(data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
        setError('Failed to fetch tenants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  // Assign a unit to a tenant
  const handleAssignUnit = async (tenantId, unitId) => {
    try {
      const response = await fetch(`https://rent-management-app.onrender.com/tenant/${tenantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unit_id: unitId }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign unit.');
      }

      setTenants((prevTenants) =>
        prevTenants.map((tenant) =>
          tenant.id === tenantId ? { ...tenant, unit_id: unitId } : tenant
        )
      );
    } catch (error) {
      console.error('Error assigning unit:', error);
      setError('Failed to assign unit. Please try again.');
    }
  };

  // Delete a tenant
  const handleDelete = async (tenantId) => {
    try {
      const response = await fetch(`https://rent-management-app.onrender.com/tenant/${tenantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tenant.');
      }

      setTenants((prevTenants) =>
        prevTenants.filter((tenant) => tenant.id !== tenantId)
      );
    } catch (error) {
      console.error('Error deleting tenant:', error);
      setError('Failed to delete tenant. Please try again.');
    }
  };

  // Show more tenants
  const handleShowMore = () => {
    setVisibleTenants((prev) => prev + 9);
  };

  // Show fewer tenants
  const handleShowLess = () => {
    setVisibleTenants(9);
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
            onClick={() => window.location.reload()}
            className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (tenants.length === 0) {
    return (
      <div className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto text-center">
          <h2 className="text-3xl font-bold text-sky-700 mb-6">No Tenants Found</h2>
          <Link
            to="/add-tenant"
            className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Add Tenant
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Tenants
        </h2>
        <div className="text-center mb-6">
          <Link
            to="/add-tenant"
            className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Add New Tenant
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenants.slice(0, visibleTenants).map((tenant) => (
            <div
              key={tenant.id}
              className="bg-white rounded-xl shadow-md relative"
            >
              <div className="p-4">
                {/* Tenant Details */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{tenant.name}</h3>
                  <p className="text-gray-600">Phone: {tenant.phone}</p>
                  <p className="text-gray-600">Email: {tenant.email}</p>
                  <p className="text-gray-600">
                    Unit ID: {tenant.unit_id || 'Unassigned'}
                  </p>
                  <p className="text-gray-600">Property ID: {tenant.property_id}</p>
                </div>

                {/* Assign Unit */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Unit ID"
                    onBlur={(e) => handleAssignUnit(tenant.id, e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex space-x-2 mt-2">
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

        {/* Show More / Show Less Buttons */}
        <div className="text-center mt-6">
          {visibleTenants < tenants.length && (
            <button
              onClick={handleShowMore}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 mr-2"
            >
              Show More
            </button>
          )}
          {visibleTenants > 9 && (
            <button
              onClick={handleShowLess}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TenantList;
