import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Properties",
    category: [
      {
        name: "For Sale",
        path: "/sale",
      },
      {
        name: "For Rent",
        path: "/rent",
      },
    ],
  },
  {
    name: "Listings",
    path: "/listings",
  },
  {
    name: "Agents",
    path: "/agents",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];


  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 relative z-50 ">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-1">
          <span className="text-gray-900">Home</span>
          <span className="text-purple-600">Base</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <li key={index} className="relative group">
              {link.category ? (
                <div className="flex items-center gap-1 cursor-pointer py-2 text-gray-600 hover:text-purple-600 font-medium transition-colors">
                  {link.name}
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  
                  {/* Dropdown Menu */}
                  <ul className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                    {link.category.map((sublink, idx) => (
                      <li key={idx}>
                        <NavLink 
                          to={sublink.path}
                          className={({ isActive }) => 
                            `block px-4 py-3 text-sm font-medium transition-colors ${
                              isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                            }`
                          }
                        >
                          {sublink.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => 
                    `py-2 text-gray-600 font-medium transition-colors hover:text-purple-600 flex relative ${
                      isActive ? 'text-purple-600 after:content-[""] after:absolute after:left-0 after:-bottom-[21px] after:w-full after:h-0.5 after:bg-purple-600' : ''
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Call to Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink 
            to="/login"
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Sign In
          </NavLink>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-sm shadow-purple-200 transition-colors">
            Add Listing
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-600 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-md p-1"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col px-4 pt-2 pb-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
          {navLinks.map((link, index) => (
            <div key={index} className="border-b border-gray-50 pb-2">
              {link.category ? (
                <div>
                  <button 
                    onClick={() => setMobileDropdown(!mobileDropdown)}
                    className="flex items-center justify-between w-full py-3 text-gray-700 font-medium hover:text-purple-600"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileDropdown && (
                    <div className="flex flex-col space-y-1 pl-4 mt-1">
                      {link.category.map((sublink, idx) => (
                        <NavLink 
                          key={idx}
                          to={sublink.path}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) => 
                            `block px-3 py-2 text-sm font-medium transition-colors ${
                              isActive ? 'text-purple-600 bg-purple-50 rounded-md' : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600 rounded-md'
                            }`
                          }
                        >
                          {sublink.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink 
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    `block py-3 px-3 text-gray-700 font-medium transition-colors hover:text-purple-600 ${
                      isActive ? 'text-purple-600 bg-purple-50 rounded-md' : 'hover:bg-gray-50 rounded-md'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-3 pt-6">
            <NavLink 
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-center py-3 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Sign In
            </NavLink>
            <button className="text-center py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md shadow-purple-200 transition-colors">
              Add Listing
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar