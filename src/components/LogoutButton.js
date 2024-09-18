import React from 'react';
import { logout } from '../auth';

const LogoutButton = () => {
  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;