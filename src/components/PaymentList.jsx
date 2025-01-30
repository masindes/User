import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/payment');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-sky-900 mb-6 text-center">
          Payments
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {payments.map(payment => (
            <div key={payment.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{payment.payment_type}</h3>
                  <p className="text-gray-600">Status: {payment.status}</p>
                </div>
                <div className="mb-5">
                  <p>Amount: ${payment.amount}</p>
                </div>
                <h3 className="text-red-500 mb-2">Date: {payment.payment_date}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentList;