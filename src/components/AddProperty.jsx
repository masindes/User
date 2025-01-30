import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddProperty = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    rent: '',
  });

  // Fetch property details if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/property/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch property');
          return response.json();
        })
        .then(data => setFormData(data))
        .catch(error => console.error('Error fetching property:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = id ? 'PATCH' : 'POST';
      const url = id ? `http://localhost:5000/property/${id}` : 'http://localhost:5000/property';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save property');

      alert(id ? 'Property updated successfully!' : 'Property added successfully!');
      navigate('/properties'); // Redirect to properties page
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await fetch(`http://localhost:5000/property/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete property');

        alert('Property deleted successfully!');
        navigate('/properties'); // Redirect to properties page
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Property' : 'Add Property'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rent</label>
          <input
            type="number"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
        >
          {id ? 'Update Property' : 'Add Property'}
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          >
            Delete Property
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProperty;
