import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTenant, setNewTenant] = useState({
    name: '',
    email: '',
    phone: '',
    unit_id: '',
    property_id: '',
  });
  const [newProperty, setNewProperty] = useState({
    name: '',
    address: '',
    rent: '',
    bedrooms: '',
  });
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://rent-management-app.onrender.com/property');
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
        const response = await axios.get('https://rent-management-app.onrender.com/tenant');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchProperties();
    fetchTenants();
  }, []);

  const handleAddTenant = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://rent-management-app.onrender.com/tenant', newTenant);
      setTenants((prevTenants) => [...prevTenants, response.data]);
      setNewTenant({
        name: '',
        email: '',
        phone: '',
        unit_id: '',
        property_id: '',
      }); // Reset form after successful add
    } catch (error) {
      console.error('Error adding tenant:', error);
      setError('Failed to add tenant. Please try again.');
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://rent-management-app.onrender.com/property', newProperty);
      setProperties((prevProperties) => [...prevProperties, response.data]);
      setNewProperty({
        name: '',
        address: '',
        rent: '',
        bedrooms: '',
      }); // Reset form after successful add
    } catch (error) {
      console.error('Error adding property:', error);
      setError('Failed to add property. Please try again.');
    }
  };

  // Handle view more and view less buttons
  const handleViewMore = () => setVisibleProperties((prev) => prev + 9);
  const handleViewLess = () => setVisibleProperties(9);

  // Loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto text-center">
          <div className="text-red-500 text-xl font-bold mb-4">{error}</div>
          <button onClick={() => window.location.reload()} className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-sky-900 py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Rent Management System
          </h1>
          <p className="my-4 text-xl text-white">Manage your properties, tenants, and payments efficiently.</p>
        </div>
      </section>

      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Add Property Form */}
              <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h2 className="text-3xl font-bold mb-4">Add Property</h2>
                <form onSubmit={handleAddProperty}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={newProperty.address}
                    onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Rent"
                    value={newProperty.rent}
                    onChange={(e) => setNewProperty({ ...newProperty, rent: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Bedrooms"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <button
                    type="submit"
                    className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black"
                  >
                    Add Property
                  </button>
                </form>
              </div>

              {/* Add Tenant Form */}
              <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h2 className="text-3xl font-bold mb-4">Add Tenant</h2>
                <form onSubmit={handleAddTenant}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newTenant.email}
                    onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={newTenant.phone}
                    onChange={(e) => setNewTenant({ ...newTenant, phone: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Unit ID"
                    value={newTenant.unit_id}
                    onChange={(e) => setNewTenant({ ...newTenant, unit_id: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Property ID"
                    value={newTenant.property_id}
                    onChange={(e) => setNewTenant({ ...newTenant, property_id: e.target.value })}
                    className="w-full p-2 mb-4 border rounded"
                  />
                  <button
                    type="submit"
                    className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black"
                  >
                    Add Tenant
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Browse Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(0, visibleProperties).map((property) => (
              <div key={property.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-sky-700">{property.name}</h3>
                <p className="mt-2">{property.address}</p>
                <p className="mt-2 text-lg text-sky-600">Rent: ${property.rent}</p>
                <p className="mt-2">Bedrooms: {property.bedrooms}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            {visibleProperties < properties.length ? (
              <button onClick={handleViewMore} className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black">
                View More
              </button>
            ) : (
              <button onClick={handleViewLess} className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black">
                View Less
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
