import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      {/* Permanent Professional Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>LearnPro</h1>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/browse" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
             <span className="material-symbols-outlined">library_books</span>
             <span>Browse Courses</span>
          </NavLink>
          
          <div style={{ flex: 1 }}></div>

          <button onClick={handleLogout} className="nav-link" style={{ marginBottom: '1rem' }}>
            <span className="material-symbols-outlined">logout</span>
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="top-header">
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>school</span>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>Engineering Portal</span>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user?.fullName || 'User'}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Student ID: 2026-LPRO</div>
                </div>
                <div className="user-avatar-small" style={{ background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: '20px' }}>person</span>
                </div>
           </div>
        </header>
        
        <div className="page-body">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
