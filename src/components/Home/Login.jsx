import React, { useState, useEffect,useContext } from 'react';
import '../../style/login.css'; // Updated CSS for enhanced styling
import Home from './Home';
import { LoginUser } from '../../services/handleRequest.js';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contex/userContext.js';
import { AuthContext } from '../access/authProvider.jsx';
import avtar from './../../assets/smile-icon.png';

const LoginPage = ({ email, setEmail, username, setUsername, password, setPassword, error, handleSubmit, logInUser}) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div> 
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            className="login-button"
            onClick={() => logInUser(email, username, password)}
          >
            Login
          </button>
          <a href="signup">new registration</a>
        </form>
      </div>
    </div>
  );
};

function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);
  const {profilePhoto,setProfilePhoto}=useContext(AuthContext);
  const navigate=useNavigate();
  useEffect(() => {
    // Check if the user is already logged in by looking for the token in localStorage
    const token = localStorage.getItem('Token');
    
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  async function logInUser(email, username, password) {
    try {
      const login = await LoginUser(email, username, password);
      const data = await login.json();
      
      if (login.ok) {
        localStorage.setItem("Token",data.token)
        setIsLoggedIn(true);
        if(data.data.coverImage){
          setProfilePhoto(data.data.coverImage);
          localStorage.setItem("avtar",data.data.coverImage)
        }
        else{
          setProfilePhoto(avtar);
          localStorage.setItem("avtar",avtar);
        }
        navigate("/")
      } else {
        setError('Login failed. Please check your credentials.');
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || username === '' || password === '') {
      setError('All fields are required');
      return;
    }
    setError('');
    logInUser(email, username, password);
  };
  return (
     <LoginPage
      email={email}
      setEmail={setEmail}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      handleSubmit={handleSubmit}
      logInUser={logInUser}
    />
  );
}

export default Login; 
