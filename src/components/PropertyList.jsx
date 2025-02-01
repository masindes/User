import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [visibleProperties, setVisibleProperties] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/property');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data);
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
    try {
      const response = await fetch(`http://localhost:5000/property/${propertyId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
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

  // Handle edit button click
  const handleEdit = (property) => {
    setEditingProperty(property);
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (
      !editingProperty.name ||
      !editingProperty.address ||
      !editingProperty.rent ||
      !editingProperty.bedrooms
    ) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    if (isNaN(editingProperty.rent) || editingProperty.rent <= 0) {
      setError('Please enter a valid rent value (must be a positive number).');
      setLoading(false);
      return;
    }

    if (isNaN(editingProperty.bedrooms) || editingProperty.bedrooms <= 0) {
      setError('Please enter a valid number of bedrooms (must be a positive number).');
      setLoading(false);
      return;
    }

    try {
      // Send PATCH request to update the property
      const response = await fetch(
        `http://localhost:5000/property/${editingProperty.id}`,
        {
          method: 'PATCH', // Updated to PATCH
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingProperty),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update property');
      }
      const updatedProperty = await response.json();
      console.log('Property Updated Successfully:', updatedProperty);

      // Update the properties list with the edited property
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === editingProperty.id ? editingProperty : property
        )
      );

      // Reset editing state
      setEditingProperty(null);
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to update property. Please try again.');
    } finally {
      setLoading(false);
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
                  <button
                    onClick={() => handleEdit(property)}
                    className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
                  >
                    Edit
                  </button>
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

        {/* Edit Form Modal */}
        {editingProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-sky-700 mb-6">Edit Property</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editingProperty.name}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={editingProperty.address}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, address: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Rent</label>
                  <input
                    type="number"
                    name="rent"
                    value={editingProperty.rent}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, rent: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={editingProperty.bedrooms}
                    onChange={(e) =>
                      setEditingProperty({ ...editingProperty, bedrooms: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProperty(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyList;