import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Header.css'; // Import CSS file for styling

const Header = () => {
  return (
    <header className="main-header">
      <nav className="navbar">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link to="/category-listing">Category Listing</Link>
          </li>
          <li className="nav-item">
            <Link to="/videos">Videos</Link>
          </li>
          <li className="nav-item">
            <Link to="/add-video">Add Video</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;