import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigation = [
    { name: 'Home', href: '/welcome' },
    { name: 'Explore Research Grants', href: '/research-grants' },
    { name: 'Find Groups', href: '/find-groups' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/welcome" className="logo-container">
          <img 
            src={isDarkMode ? "/logo_dark.png" : "/logo_light.png"} 
            alt="FundBridge Logo" 
            className="navbar-logo"
          />
        </Link>
        
        <div className="nav-links">
          {navigation.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 