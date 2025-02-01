import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: '',
    address: '',
    rent: '',
    bedrooms: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!property.name || !property.address || !property.rent || !property.bedrooms) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    if (isNaN(property.rent) || property.rent <= 0) {
      setError('Please enter a valid rent value (must be a positive number).');
      setLoading(false);
      return;
    }

    if (isNaN(property.bedrooms) || property.bedrooms <= 0) {
      setError('Please enter a valid number of bedrooms (must be a positive number).');
      setLoading(false);
      return;
    }

    try {
      // Send POST request to add a new property
      const response = await axios.post('http://localhost:5000/property', property);
      console.log('Property Added Successfully:', response.data);
      navigate('/properties'); // Redirect to the property list
    } catch (err) {
      console.error('Error adding property:', err);
      setError('Failed to add property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Add Property</h2>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {/* Add Property Form */}
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
            {loading ? 'Adding...' : 'Add Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;