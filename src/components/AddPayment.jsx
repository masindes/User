import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddPayment = () => {
  const { id } = useParams(); // For editing an existing payment
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    payment_type: '',
    amount: '',
    payment_date: '',
    status: '',
    tenant_id: '',
  });

  // Fetch payment details if editing
  React.useEffect(() => {
    if (id) {
      axios.get(`https://rent-management-app.onrender.com/payment/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching payment:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing payment
        await axios.patch(`https://rent-management-app.onrender.com/payment/${id}`, formData);
        alert('Payment updated successfully!');
      } else {
        // Add new payment
        await axios.post('https://rent-management-app.onrender.com/payment', formData);
        alert('Payment added successfully!');
      }
      navigate('/payments'); // Redirect to payments page
    } catch (error) {
      console.error('Error saving payment:', error);
      alert('Failed to save payment. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`https://rent-management-app.onrender.com/payment/${id}`);
        alert('Payment deleted successfully!');
        navigate('/payments'); // Redirect to payments page
      } catch (error) {
        console.error('Error deleting payment:', error);
        alert('Failed to delete payment. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Payment' : 'Add Payment'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Payment Type</label>
          <input
            type="text"
            name="payment_type"
            value={formData.payment_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Payment Date</label>
          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tenant ID</label>
          <input
            type="text"
            name="tenant_id"
            value={formData.tenant_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
        >
          {id ? 'Update Payment' : 'Add Payment'}
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
          >
            Delete Payment
          </button>
        )}
      </form>
    </div>
  );
};

export default AddPayment;