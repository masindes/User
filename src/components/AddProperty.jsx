import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: '',
    address: '',
    rent: '',
    bedrooms: '', // Bedrooms field is part of the state
  });
  const [loading, setLoading] = useState(false); // Track the loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value }); // Updates the property state, including bedrooms
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation: check if all fields are filled
    if (!property.name || !property.address || !property.rent || !property.bedrooms) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    // Validate rent input
    if (isNaN(property.rent) || property.rent <= 0) {
      setError('Please enter a valid rent value (must be a positive number).');
      setLoading(false);
      return;
    }

    // Validate bedrooms input
    if (isNaN(property.bedrooms) || property.bedrooms <= 0) {
      setError('Please enter a valid number of bedrooms (must be a positive number).');
      setLoading(false);
      return;
    }

    try {
      // Sending POST request to the backend
      const response = await axios.post('http://localhost:5000/property', property, {
        headers: {
          'Content-Type': 'application/json', // Explicitly setting Content-Type
        },
      });

      console.log('Property Added Successfully:', response.data);
      navigate('/properties'); // Redirect to the property list after successful addition
    } catch (err) {
      console.error('Error adding property:', err);

      // Handling the error from the backend response
      if (err.response) {
        setError(err.response.data.message || 'Failed to add property. Please try again.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Add Property</h2>

        {/* Show error message */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={property.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={property.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Rent</label>
            <input
              type="number"
              name="rent"
              value={property.rent}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={property.bedrooms}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className={`bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 w-full ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding...
              </span>
            ) : (
              'Add Property'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;