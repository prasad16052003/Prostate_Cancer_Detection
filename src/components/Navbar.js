import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
const Navbar = ({ onLoginClick }) => {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-green-600">ProCare</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-600 hover:text-green-600 transition">Home</a>
          <a href="#features" className="text-gray-600 hover:text-green-600 transition">Features</a>
          <a href="#services" className="text-gray-600 hover:text-green-600 transition">Services</a>
          <a href="#doctors" className="text-gray-600 hover:text-green-600 transition">Doctors</a>
          <a href="#about" className="text-gray-600 hover:text-green-600 transition">About</a>
          {/* Trigger Login Modal */}
          <button
            onClick={onLoginClick}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Login
          </button>
          {/* Sign-Up Button (Navigates to /signup) */}
          <Link
            to="/signup"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Sign Up
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
