import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchProperties();
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

  if (loading) {
    return <div className="text-center mt-8">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (properties.length === 0) {
    return <div className="text-center mt-8">No properties found.</div>;
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                {/* Vacant/Occupied Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.tenants && property.tenants.length > 0
                        ? 'bg-green-100 text-green-800' // Occupied
                        : 'bg-red-100 text-red-800' // Vacant
                    }`}
                  >
                    {property.tenants && property.tenants.length > 0 ? 'Occupied' : 'Vacant'}
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
      </div>
    </section>
  );
};

export default PropertyList;