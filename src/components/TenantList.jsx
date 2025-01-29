import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TenantList = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tenant');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    fetchTenants();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Tenants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenants.map(tenant => (
            <div key={tenant.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{tenant.name}</h3>
                  <p className="text-gray-600">{tenant.phone}</p>
                </div>
                <div className="mb-5">
                  <p>{tenant.email}</p>
                </div>
                <h3 className="text-indigo-500 mb-2">Unit: {tenant.unit_name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TenantList;