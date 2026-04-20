import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Book, Award, Clock, TrendingUp, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get('/courses/my-courses')
      .then(res => setCourses(res.data))
      .catch(e => console.log(e));
  }, []);

  return (
    <div className="px-8 py-8 animate-fade">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Welcome back, {user?.fullName}!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Continue where you left off in your engineering curriculum.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', opacity: 0.8 }}>
                <TrendingUp size={18} /> <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>PROGRESS</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>76%</div>
            <div className="progress-container" style={{ background: 'rgba(255,255,255,0.2)', marginTop: '1rem' }}>
                <div className="progress-fill" style={{ background: 'white', width: '76%' }}></div>
            </div>
        </div>

        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <Book size={18} /> <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>COURSES</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>5</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Academic Subjects</p>
        </div>

        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <Award size={18} /> <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>CREDITS</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>120</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Earned this semester</p>
        </div>

        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <Clock size={18} /> <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>HOURS</span>
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>45h</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Learning time</p>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>Recent Activity</h2>
        {courses.length > 0 ? (
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }} onClick={() => navigate(`/course/${courses[0].id}`)}>
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Book size={24} color="var(--primary)" />
                </div>
                <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 700 }}>{courses[0].title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Paused at Chapter 1.2 • Continue Learning</p>
                </div>
                <ChevronRight color="var(--border)" />
            </div>
        ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No recent activity. Start a course to see it here.</p>
                <button onClick={() => navigate('/browse')} className="nav-link" style={{ background: 'var(--primary)', color: 'white', marginTop: '1rem', display: 'inline-flex', width: 'auto' }}>
                    Browse courses
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
