// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../api';
import { Link } from 'react-router-dom';
import withAuthRedirect from '../middleware/withAuthRedirect';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      alert('Registration successful!');
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="container col-10 col-sm-6 col-md-4 col-lg-3 mt-5">
    <form onSubmit={handleSubmit} className="form-signin card p-4">
      <h2 className="text-center">Register</h2>
      <br/>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          className="form-control" 
          id="username" 
          placeholder="Enter your username" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="password" 
          placeholder="Enter your password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br/>
      </div>
      <button type="submit" className="btn btn-primary btn-block">Register</button>
    </form>
    <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login">Login into your account</Link>
          </div>
  </div>
  );
};

export default withAuthRedirect(Register);