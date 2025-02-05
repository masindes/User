import React, { useState } from 'react';
import logo from '../assets/images/logo.png'; // Ensure the path to your logo is correct
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-sky-700 border-b border-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="Rent Management Logo"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Rent Management
              </span>
            </NavLink>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:ml-auto">
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

        {/* Mobile Menu (Conditionally Rendered) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 px-2 pb-3 pt-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'text-white bg-black rounded-md px-3 py-2'
                    : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
                }
                onClick={toggleMenu}
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
                onClick={toggleMenu}
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
                onClick={toggleMenu}
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
                onClick={toggleMenu}
              >
                Payments
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;