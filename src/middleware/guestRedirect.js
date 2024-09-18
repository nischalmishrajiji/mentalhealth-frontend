import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const guestRedirect = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
      const token = localStorage.getItem('token'); // Replace with your token retrieval method
      if (!token) {
        navigate('/login');
      }
    });

    return <WrappedComponent {...props} />;
  };
};

export default guestRedirect;
