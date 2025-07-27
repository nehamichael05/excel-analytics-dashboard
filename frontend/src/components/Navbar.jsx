import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
    <div className="font-bold text-xl">Excel Analytics Dashboard</div>
    <div className="space-x-4">
      <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      <Link to="/upload" className="hover:underline">Upload</Link>
      <Link to="/chart" className="hover:underline">Charts</Link>
      <Link to="/history" className="hover:underline">History</Link>
      <Link to="/admin" className="hover:underline">Admin</Link>
      <Link to="/login" className="hover:underline">Logout</Link>
    </div>
  </nav>
);

export default Navbar;
