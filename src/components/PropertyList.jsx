import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProperties, setVisibleProperties] = useState(9); // Initially show 9 properties

  // Fetch properties and tenants
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tenant');
        setTenants(response.data);  // Assuming tenant data is fetched from 'tenant' endpoint
      } catch (error) {
        console.error('Error fetching tenants:', error);
        setError('Failed to fetch tenants. Please try again later.');
      }
    };

    fetchProperties();
    fetchTenants();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`http://localhost:5000/property/${id}`);
        setProperties(properties.filter((property) => property.id !== id));
        alert('Property deleted successfully!');
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  const handleAssignTenant = async (propertyId, tenantId) => {
    try {
      // Send the updated property data with the assigned tenant
      await axios.put(`http://localhost:5000/property/${propertyId}`, { tenantId });
      setProperties(
        properties.map((property) =>
          property.id === propertyId ? { ...property, tenantId } : property
        )
      );
      alert('Tenant assigned successfully!');
    } catch (error) {
      console.error('Error assigning tenant:', error);
      alert('Failed to assign tenant. Please try again.');
    }
  };

  const loadMoreProperties = () => {
    setVisibleProperties((prev) => prev + 9); // Show 9 more properties
  };

  const showLessProperties = () => {
    setVisibleProperties(9); // Reset to show only 9 properties
  };

  if (loading) {
    return <div className="text-center mt-8">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (properties.length === 0) {
    return <div className="text-center mt-8">No properties found.</div>;
  }

  // Slice the properties array to show only the visible ones
  const propertiesToShow = properties.slice(0, visibleProperties);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {propertiesToShow.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                {/* Vacant/Occupied Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.tenantId ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {property.tenantId ? 'Occupied' : 'Vacant'}
                  </span>
                </div>

                {/* Property Details */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{property.name}</h3>
                  <p className="text-gray-600">{property.location}</p>
                </div>
                <div className="mb-5">
                  <p>{property.description}</p>
                </div>
                <h3 className="text-red-500 mb-2">Rent: ${property.rent}</h3>

                {/* Tenant Assignment */}
                {!property.tenantId && (
                  <div className="mb-4">
                    <select
                      onChange={(e) => handleAssignTenant(property.id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="">Assign Tenant</option>
                      {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Edit and Delete Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-property/${property.id}`}
                    className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button for loading more properties */}
        {visibleProperties < properties.length ? (
          <div className="text-center mt-6">
            <button
              onClick={loadMoreProperties}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800"
            >
              Load More
            </button>
          </div>
        ) : (
          <div className="text-center mt-6">
            <button
              onClick={showLessProperties}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyList;
