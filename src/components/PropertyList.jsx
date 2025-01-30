import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/property');
        console.log('Fetched properties:', response.data); // Debugging
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
          {properties.map(property => (
            <div key={property.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{property.name}</h3>
                  <p className="text-gray-600">{property.location}</p>
                </div>
                <div className="mb-5">
                  <p>{property.description}</p>
                </div>
                <h3 className="text-sky-500 mb-2">Rent: ${property.rent}</h3>

                {/* Vacant/Occupied Button */}
                <div className="mb-4">
                  <button
                    className={`px-4 py-2 rounded-lg text-white ${
                      property.tenants && property.tenants.length > 0
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-black'
                    }`}
                  >
                    {property.tenants && property.tenants.length > 0 ? 'Occupied' : 'Vacant'}
                  </button>
                </div>

                {/* Tenant and Payment Details */}
                {property.tenants && property.tenants.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Tenant Details</h4>
                    {property.tenants.map(tenant => (
                      <div key={tenant.id} className="mb-4">
                        <p><strong>Name:</strong> {tenant.name}</p>
                        <p><strong>Phone:</strong> {tenant.phone}</p>
                        <p><strong>Email:</strong> {tenant.email}</p>
                        <p><strong>Unit:</strong> {tenant.unit_name}</p>

                        {/* Payment Details */}
                        <h4 className="text-lg font-semibold mt-2">Payments</h4>
                        {tenant.payments && tenant.payments.length > 0 ? (
                          tenant.payments.map(payment => (
                            <div key={payment.id} className="mb-2">
                              <p><strong>Type:</strong> {payment.payment_type}</p>
                              <p><strong>Amount:</strong> ${payment.amount}</p>
                              <p><strong>Date:</strong> {payment.payment_date}</p>
                              <p><strong>Status:</strong> {payment.status}</p>
                            </div>
                          ))
                        ) : (
                          <p>No payments recorded.</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyList;