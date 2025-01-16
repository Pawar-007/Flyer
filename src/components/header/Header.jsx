import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../style/header.css'; 
import { logoutuser } from '../../services/handleRequest.js';
import token from '../../token.js';
import { UserContext } from '../../contex/userContext.js';
import { AuthContext } from '../access/authProvider.jsx';

function TeachMore() {
  return (
    <div className='teach-more-dropdown'>
      <p>Here you can teach students and start a career as a teacher</p>
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] =useContext(UserContext);
  const {profilePhoto,setProfilePhoto}=useContext(AuthContext);
  
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  async function handleLogout() {
    const token = localStorage.getItem("Token"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found for logout.");
      alert("You are not logged in.");
      return;
    }
  
    try {
      // Call the logoutuser function with the token
      const userOut = await logoutuser(`${token}`);
      console.log("userOut",userOut);
      if (userOut.ok) { 
        localStorage.removeItem("profilePhoto");
        localStorage.removeItem('Token');
        setIsLoggedIn(false);
        alert("Successfully logged out.");
      } else {
        console.error("Failed to log out:", userOut.statusText);
        localStorage.removeItem('Token');
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout. Please try again.");
    }
  }

  return (
    <div className="course-cont-head">
      <header className="header">
      <Link to="/" className='header_title'>FLYER</Link>
      <input type="text" placeholder='Search here' id='SearchBar' />
      <nav className="header-nav">
        <div className="header-actions">
          <div className='instructor-page'  
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <Link to="/instructor" className='nav-link' id='teach'>
              <p>Teach on FLYER</p>
            </Link>
            {isOpen && <TeachMore />}
          </div>
          <div>
            <Link to="" className="nav-link" >
              <p>About</p>
            </Link>
          </div>
          <div className='auth'>
            {isLoggedIn ? (
              <>
              <Link onClick={handleLogout} to="/" className="nav-link">
                <p>Logout</p>
              </Link>
              <a href="" className='profile-fit' >
                <img src={profilePhoto} alt="profile"  />
              </a>
              </>
            ) : (
              <>
              <Link to="/login"  className="nav-link">
                <p>Login</p>
              </Link>
              <Link to="/signup" className="nav-link">
              <p>Signup</p>
            </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
    </div>
  
  );
}
