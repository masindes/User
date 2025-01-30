import React from 'react';
import logo from '../assets/images/logo.png'; 
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-sky-700 border-b border-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <NavLink to="/" className="flex flex-shrink-0 items-center mr-4">
              <img
                className="h-10 w-auto" 
                src={logo} 
                alt="Rent Management Logo"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Rent Management
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-black rounded-md px-3 py-2'
                      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/properties"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-black rounded-md px-3 py-2'
                      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                  }
                >
                  Properties
                </NavLink>
                <NavLink
                  to="/tenants"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-black rounded-md px-3 py-2'
                      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                  }
                >
                  Tenants
                </NavLink>
                <NavLink
                  to="/payments"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white bg-black rounded-md px-3 py-2'
                      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                  }
                >
                  Payments
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;