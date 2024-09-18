import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Navigation = ({ isAuthenticated }) => {
  return (
    <nav>
      {!isAuthenticated && ( // Show these links only if not authenticated
        <>
          <Link to="/register">Register</Link> | 
          <Link to="/login">Login</Link>
        </>
      )}
      {isAuthenticated && ( // Show these links only if authenticated
        <>
          <Link to="/daily-log">Daily Log</Link> | 
          <Link to="/view-logs">View Logs</Link> 
          <LogoutButton />
        </>
      )}
    </nav>
  );
};

export default Navigation;
