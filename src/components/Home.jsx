import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState(9); // Number of properties to show initially

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleViewMore = () => {
    // Increase the number of visible properties by 9 (or any desired number)
    setVisibleProperties((prev) => prev + 9);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-indigo-700 py-20 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Rent Management System
            </h1>
            <p className="my-4 text-xl text-white">
              Manage your properties, tenants, and payments efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
            {/* Add Property Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Add Property</h2>
              <p className="mt-2 mb-4">
                Add a new property to your portfolio.
              </p>
              <Link
                to="/add-property"
                className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
              >
                Add Property
              </Link>
            </div>

            {/* Add Tenant Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Add Tenant</h2>
              <p className="mt-2 mb-4">
                Add a new tenant to your property.
              </p>
              <Link
                to="/add-tenant"
                className="inline-block bg-sky-500 text-white rounded-lg px-4 py-2 hover:bg-black"
              >
                Add Tenant
              </Link>
            </div>

            {/* Add Payment Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">Add Payment</h2>
              <p className="mt-2 mb-4">
                Record a new payment from a tenant.
              </p>
              <Link
                to="/add-payment"
                className="inline-block bg-sky-500 text-white rounded-lg px-4 py-2 hover:bg-black"
              >
                Add Payment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Properties Section */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-sky-500 mb-6 text-center">
            Browse Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(0, visibleProperties).map(property => (
              <div key={property.id} className="bg-white rounded-xl shadow-md relative">
                <div className="p-4">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold">{property.name}</h3>
                    <p className="text-gray-600">{property.location}</p>
                  </div>
                  <div className="mb-5">
                    <p>{property.description}</p>
                  </div>
                  <h3 className="text-red-500 mb-2">Rent: ${property.rent}</h3>
                </div>
              </div>
            ))}
          </div>
          {/* View More Button */}
          {visibleProperties < properties.length && (
            <div className="text-center mt-6">
              <button
                onClick={handleViewMore}
                className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;