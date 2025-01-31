import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from the backend
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

  // Delete a property
  const handleDelete = async (propertyId) => {
    console.log('Deleting property with ID:', propertyId); // Debugging
    try {
      const response = await axios.delete(`http://localhost:5000/property/${propertyId}`);
      console.log('Delete response:', response.data); // Debugging
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
      );
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('Failed to delete property. Please try again.');
    }
  };

  // Show more properties
  const handleShowMore = () => {
    setVisibleProperties((prev) => prev + 9);
  };

  // Show fewer properties
  const handleShowLess = () => {
    setVisibleProperties(9);
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
  if (properties.length === 0) {
    return (
      <div className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto text-center">
          <h2 className="text-3xl font-bold text-sky-700 mb-6">No Properties Found</h2>
          <Link
            to="/add-property"
            className="bg-sky-700 text-white px-6 py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Add Property
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.slice(0, visibleProperties).map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md relative"
            >
              <div className="p-4">
                {/* Property Details */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{property.name}</h3>
                  <p className="text-gray-600">{property.address}</p>
                  <p className="text-gray-600">Rent: ${property.rent}</p>
                  <p className="text-gray-600">Bedrooms: {property.bedrooms}</p>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex space-x-2 mt-2">
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

        {/* Show More / Show Less Buttons */}
        <div className="text-center mt-6">
          {visibleProperties < properties.length && (
            <button
              onClick={handleShowMore}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 mr-2"
            >
              Show More
            </button>
          )}
          {visibleProperties > 9 && (
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

export default PropertyList;