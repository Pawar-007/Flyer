import React from 'react'
import Header from '@components/header/Header.jsx';  // Correct relative path
import Footer from '@components/footer/Footer.jsx'; 
import { Outlet } from 'react-router-dom'
import "./layout.css"
function Layout() {
  return (
    <div className="layout">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout;
