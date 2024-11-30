import React from 'react';
import './LoginFirst.css'; // Import the CSS file
import { Link } from 'react-router-dom';
function LoginFirst() {
  return (
    <div className="loginFirst-container">
      <div className="loginFirst-message">
        <h1 className="loginFirst-title">Access Restricted</h1>
        <p className="loginFirst-text">
          You need to be logged in to view this page.
        </p>
        <Link to="/login" className="loginFirst-button" aria-label="Go to Login Page">Login</Link>
      </div>
    </div>
  );
}

export default LoginFirst;

