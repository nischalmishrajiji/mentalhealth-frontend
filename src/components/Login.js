// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { loginUser } from "../api";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import withAuthRedirect from '../middleware/withAuthRedirect';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const [show, setShow] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("userId", response.data.userId);
      console.log(response);
      setIsAuthenticated(true);
      // Redirect to the view logs page
      navigate("/view-logs");
    } catch (error) {
      setShowTitle('Fail');
      setShowBody('something went wrong, please try again');
      handleShow();
      console.error(error);
    }
  };

  return (
    <div className="container col-10 col-sm-6 col-md-4 col-lg-3 mt-5">
      <form onSubmit={handleSubmit} className="form-signin card p-4">
        <h2 className="text-center">Login</h2>
        <br />
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
        <br />
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
          <br />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
      <div className="text-center mt-3">
        <span>Don't have an account? </span>
        <Link to="/register">Create new account</Link>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{showTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{showBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withAuthRedirect(Login);
