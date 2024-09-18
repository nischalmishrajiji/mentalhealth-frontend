// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../api';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('userId', response.data.userId);
      alert('Login successful!');
      console.log(response.data.accessToken);
      console.log(response.data.userId);
      setIsAuthenticated(true);
      // Redirect to the view logs page
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
