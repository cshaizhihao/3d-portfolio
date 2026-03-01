import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { configAPI } from '../api';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [navConfig, setNavConfig] = useState({
    navLogoTitle: 'ZAKI.DEV',
    navLogoSubtitle: 'CYBERPUNK PORTFOLIO',
    navHomeLabel: 'HOME',
    navProjectsLabel: 'PROJECTS',
    navAboutLabel: 'ABOUT',
    navKomariLabel: 'KOMARI',
    navAdminLabel: 'ADMIN',
    navGalleryLabel: 'GALLERY',
    navSettingsLabel: 'SETTINGS',
    navLoginLabel: 'LOGIN',
    navLogoutLabel: 'LOGOUT',
  });

  useEffect(() => {
    const fetchNavConfig = async () => {
      try {
        const response = await configAPI.getPublicConfigs();
        const publicConfig = response.data || {};
        setNavConfig((prev) => ({ ...prev, ...publicConfig }));
      } catch (error) {
        // 使用默认值
      }
    };

    fetchNavConfig();
  }, []);

  const navItems = [
    { path: '/', label: navConfig.navHomeLabel, icon: '🏠' },
    { path: '/projects', label: navConfig.navProjectsLabel, icon: '💼' },
    { path: '/about', label: navConfig.navAboutLabel, icon: '👤' },
    { path: '/komari', label: navConfig.navKomariLabel || 'KOMARI', icon: '🛰️' },
  ];

  // 根据登录状态添加不同的菜单项
  if (user) {
    if (isAdmin) {
      navItems.push({ path: '/admin', label: navConfig.navAdminLabel, icon: '⚙️' });
      navItems.push({ path: '/gallery', label: navConfig.navGalleryLabel, icon: '📸' });
      navItems.push({ path: '/settings', label: navConfig.navSettingsLabel, icon: '🔧' });
    }
  } else {
    navItems.push({ path: '/login', label: navConfig.navLoginLabel, icon: '🔐' });
  }

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getAvatarUrl = (avatar) => {
    if (!avatar) return null;
    if (avatar.startsWith('http')) return avatar;
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || window.location.origin;
    return `${baseUrl}${avatar}`;
  };

  return (
    <nav className="cyber-nav">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-text glitch" data-text={navConfig.navLogoTitle}>
            {navConfig.navLogoTitle}
          </span>
          <span className="logo-subtitle">// {navConfig.navLogoSubtitle}</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              <span className="nav-underline"></span>
            </Link>
          ))}
          
          {user && (
            <button onClick={handleLogout} className="nav-link logout-btn">
              <span className="nav-icon">🚪</span>
              <span className="nav-label">{navConfig.navLogoutLabel}</span>
            </button>
          )}
          
          {user && (
            <Link to="/profile" className="user-badge">
              {user.avatar ? (
                <img 
                  src={getAvatarUrl(user.avatar)} 
                  alt={user.username}
                  className="user-avatar-img"
                />
              ) : (
                <span className="user-icon">👤</span>
              )}
              <span className="user-name">{user.username}</span>
              {isAdmin && <span className="admin-badge">ADMIN</span>}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={`nav-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-mobile-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
        
        {user && (
          <button onClick={handleLogout} className="nav-mobile-link logout-btn">
            <span className="nav-icon">🚪</span>
            <span className="nav-label">{navConfig.navLogoutLabel}</span>
          </button>
        )}
      </div>

      {/* Scanline Effect */}
      <div className="scanline"></div>
    </nav>
  );
}

export default Navigation;
