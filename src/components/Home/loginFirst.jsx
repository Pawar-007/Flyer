import React from 'react';
import './LoginFirst.css'; // Import the CSS file

function LoginFirst() {
  return (
    <div className="loginFirst-container">
      <div className="loginFirst-message">
        <h1 className="loginFirst-title">Access Restricted</h1>
        <p className="loginFirst-text">
          You need to be logged in to view this page.
        </p>
        <a href="/login" className="loginFirst-button">Login</a>
      </div>
    </div>
  );
}

export default LoginFirst;

