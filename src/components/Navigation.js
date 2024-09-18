// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../auth';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="navbar px-5 navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Mental Health App</a>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/daily-log">Add</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-logs">View</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
