import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePayments, setVisiblePayments] = useState(9); // Initially show 9 payments

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payment');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError('Failed to fetch payments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`http://localhost:5000/payment/${id}`);
        setPayments(payments.filter((payment) => payment.id !== id));
        alert('Payment deleted successfully!');
      } catch (error) {
        console.error('Error deleting payment:', error);
        alert('Failed to delete payment. Please try again.');
      }
    }
  };

  const loadMorePayments = () => {
    setVisiblePayments((prev) => prev + 9); // Show 9 more payments
  };

  const showLessPayments = () => {
    setVisiblePayments(9); // Reset to show only 9 payments
  };

  if (loading) {
    return <div className="text-center mt-8">Loading payments...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (payments.length === 0) {
    return <div className="text-center mt-8">No payments found.</div>;
  }

  // Slice the payments array to show only the visible ones
  const paymentsToShow = payments.slice(0, visiblePayments);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Payments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentsToShow.map((payment) => (
            <div key={payment.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                {/* Payment Details */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{payment.payment_type}</h3>
                  <p className="text-gray-600">Amount: ${payment.amount}</p>
                  <p className="text-gray-600">Date: {payment.payment_date}</p>
                  <p className="text-gray-600">Status: {payment.status}</p>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/edit-payment/${payment.id}`}
                    className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(payment.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button for loading more payments */}
        {visiblePayments < payments.length ? (
          <div className="text-center mt-6">
            <button
              onClick={loadMorePayments}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800"
            >
              Load More
            </button>
          </div>
        ) : (
          <div className="text-center mt-6">
            <button
              onClick={showLessPayments}
              className="bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentList;
