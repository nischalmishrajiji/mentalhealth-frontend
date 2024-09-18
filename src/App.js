// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import DailyLogForm from './components/DailyLogForm';
import DailyLogView from './components/DailyLogView';
import Navigation from './components/Navigation';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Check if token exists

  useEffect(() => {
    const handleStorageChange = () => {
      // Update authentication state on local storage change
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div>
        <Navigation isAuthenticated={isAuthenticated} /> {/* Pass the authentication state */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> {/* Pass setter */}
          <Route path="/daily-log" element={<DailyLogForm />} />
          <Route path="/view-logs" element={<DailyLogView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
