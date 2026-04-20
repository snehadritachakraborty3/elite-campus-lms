import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Lock, Mail, Shield, AlertCircle } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(username, password, fullName, role);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        <h1 className="auth-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Join LearnPro</h1>
        <p className="auth-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Experience the advanced engineering portal</p>
        
        {error && (
            <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '1rem', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
            </div>
        )}
        {success && <div className="alert alert-success" style={{ marginBottom: '1.5rem', padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '8px', textAlign: 'center' }}>Account created! Redirecting...</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Enter your full name"
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">I want to be a:</label>
            <div style={{ position: 'relative' }}>
                <Shield size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="STUDENT">Student (Explore & Learn)</option>
                  <option value="INSTRUCTOR">Instructor (Teach & Manage)</option>
                </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Choose a username"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="Create a strong password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Get Started <UserPlus size={18} style={{ marginLeft: '0.5rem' }} />
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in here</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
