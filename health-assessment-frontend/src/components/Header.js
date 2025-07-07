import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const servicesDropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesDropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
    closeMenus();
  };
  


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setServicesDropdownOpen(false);
  };

  const toggleServicesDropdown = (e) => {
    e.preventDefault();
    setServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const isServicesActive = () => {
    const servicePaths = ['/services', '/blood-donation', '/upload', '/medicine-centers', '/health-form'];
    return servicePaths.some(path => location.pathname.startsWith(path));
  };
  
  const Link = ({ to, children, className }) => {
    const isAnchor = to.startsWith('/#');
    
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const id = to.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      closeMenus();
    };

    if (isAnchor) {
      return (
        <a href={to.replace('/#', '#')} className={className} onClick={handleAnchorClick}>
          {children}
        </a>
      );
    }
    
    const handleHomeClick = () => {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      closeMenus();
    };
    
    if (to === '/') {
      return (
        <RouterLink to={to} className={className} onClick={handleHomeClick}>
          {children}
        </RouterLink>
      );
    }

    return (
      <RouterLink to={to} className={className} onClick={closeMenus}>
        {children}
      </RouterLink>
    );
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <RouterLink to="/" onClick={closeMenus}>
            <span className="logo-icon">⚕️</span>
            <span className="logo-text">HealthConnect</span>
          </RouterLink>
        </div>

        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/#about" className="">About</Link></li>
            
            <li className="nav-item-dropdown" ref={servicesDropdownRef}>
              <a 
                href="/services"
                className={`dropdown-toggle ${isServicesActive() ? 'active' : ''}`}
                onClick={toggleServicesDropdown}
              >
                Services
              </a>
              <ul className={`dropdown-menu ${isServicesDropdownOpen ? 'active' : ''}`}>
                <li><Link to="/#services" onClick={() => { closeMenus(); setServicesDropdownOpen(false); }}>All Services</Link></li>
                <li><Link to="/blood-donation" onClick={() => { closeMenus(); setServicesDropdownOpen(false); }}>Blood Donation</Link></li>
                <li><Link to="/doctor-register" onClick={() => { closeMenus(); setServicesDropdownOpen(false); }}>Doctor Registration</Link></li>
                <li><Link to="/medicine-center-register" onClick={() => { closeMenus(); setServicesDropdownOpen(false); }}>Medicine Centre Registration</Link></li>
                <li><Link to="/upload" onClick={() => { closeMenus(); setServicesDropdownOpen(false); }}>Upload Report</Link></li>
                <li><Link to="/medicine-centers" onClick={() => { closeMenus(); setServicesDropdownOpen(false); }}>Medicine Centers</Link></li>
                <li><Link to="/health-form" onClick={() => { closeMenus(); setServicesDropdownOpen(false); }}>Take Assessment</Link></li>
              </ul>
            </li>

            <li><Link to="/doctors">Find Doctors</Link></li>

            {isLoggedIn && (
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {isLoggedIn ? (
            <div className="user-menu">
              <div className="user-name">
                <span className="premium-badge">⭐</span>
                {user?.name || 'User'}
              </div>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <RouterLink to="/login" className="btn btn-outline" onClick={closeMenus}>
                Login
              </RouterLink>
              <RouterLink to="/register" className="btn btn-primary" onClick={closeMenus}>
                Register
              </RouterLink>
            </>
          )}
        </div>

        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Header; 