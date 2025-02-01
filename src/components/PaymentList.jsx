import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentList = () => {
  const [payments, setPayments] = useState([]); // State to store the list of payments
  const navigate = useNavigate();

  // Fetch payments from the backend
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('https://rent-management-app.onrender.com/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-payment/${id}`); // Navigate to the edit payment page
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`http://localhost:5000/payment/${id}`);
        alert('Payment deleted successfully!');
        fetchPayments(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting payment:', error);
        alert('Failed to delete payment. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Payment List</h2>
      <button
        onClick={() => navigate('/add-payment')}
        className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800 mb-4"
      >
        Add New Payment
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Payment Type</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Payment Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Tenant ID</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{payment.id}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.payment_type}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(payment.payment_date).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{payment.status}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.tenant_id}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(payment.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;