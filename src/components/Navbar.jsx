import React from 'react'
import { logoutUser } from '../services/Storage'
import { Link, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../services/Auth'
import '../styles/Navbar.css'

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* Brand with icon */}
        <Link className="navbar-brand" to="/dashboard">
          <span className="brand-text">ZORO</span>
        </Link>
        
        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Register Link (only when not authenticated) */}
            {!isAuthenticated() && (
              <li className={`nav-item ${location.pathname === '/register' ? 'active' : ''}`}>
                <Link className="nav-link" to="/register">
                  <span className="nav-icon">📝</span> Register
                  <span className="notification-badge">!</span>
                </Link>
              </li>
            )}
            
            {/* Login Link (only when not authenticated) */}
            {!isAuthenticated() && (
              <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                <Link className="nav-link" to="/login">
                  <span className="nav-icon">🔐</span> Login
                </Link>
              </li>
            )}
            
            {/* Dashboard Link (only when authenticated) */}
            {isAuthenticated() && (
              <li className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <Link className="nav-link" to="/dashboard">
                  <span className="nav-icon">📊</span> Dashboard
                </Link>
              </li>
            )}
            
            {/* Logout Link (only when authenticated) */}
            {isAuthenticated() && (
              <li className="nav-item">
                <Link 
                  onClick={logoutUser} 
                  className="nav-link" 
                  to="/login"
                >
                  <span className="nav-icon">🚪</span> Logout
                </Link>
              </li>
            )}
          </ul>
          
          {/* User Welcome Text (when authenticated) */}
          {isAuthenticated() && (
            <div className="user-welcome ms-lg-3 mt-3 mt-lg-0">
              <span className="welcome-icon">👋</span>
              <span>Welcome Back!</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar