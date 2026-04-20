import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { BookOpen, Layers, User, ChevronRight, Play, CheckCircle } from 'lucide-react';

const CourseList = () => {
  const navigate = useNavigate();
  
  // FALLBACK DATA for instant demo resilience - ensures the UI NEVER shows "Initializing"
  const demoFallback = [
    {
      id: 1,
      category: 'COMPUTER SCIENCE',
      title: 'Full Stack Systems',
      description: 'Professional degree program in COMPUTER SCIENCE. Gain industry-ready skills with our advanced curriculum.',
      instructorName: 'Dr. Alan Turing',
      units: [
        { id: 101, position: 1, title: 'Front-End Architecture', lessons: [{id:1, title:'Chapter 1.1: Component Design'}, {id:2, title:'Chapter 1.2: State Management'}] },
        { id: 102, position: 2, title: 'Server-Side Logic', lessons: [{id:3, title:'Chapter 2.1: API Design'}, {id:4, title:'Chapter 2.2: DB Integration'}] },
        { id: 103, position: 3, title: 'Deployment & Scale', lessons: [{id:5, title:'Chapter 3.1: Cloud Hosting'}, {id:6, title:'Chapter 3.2: CI/CD Pipelines'}] }
      ]
    },
    {
      id: 2,
      category: 'MECHANICAL ENGINEERING',
      title: 'Thermodynamics & Design',
      description: 'Professional degree program in MECHANICAL ENGINEERING. Gain industry-ready skills with our advanced curriculum.',
      instructorName: 'Dr. James Watt',
      units: [
        { id: 201, position: 1, title: 'Thermal Systems', lessons: [{id:7, title:'Chapter 1.1: Heat Transfer'}, {id:8, title:'Chapter 1.2: Energy Cycles'}] },
        { id: 202, position: 2, title: 'Machine Design', lessons: [{id:9, title:'Chapter 2.1: Kinematics'}, {id:10, title:'Chapter 2.2: Stress Analysis'}] },
        { id: 203, position: 3, title: 'Fluid Mechanics', lessons: [{id:11, title:'Chapter 3.1: Laminar Flow'}, {id:12, title:'Chapter 3.2: Hydraulics'}] }
      ]
    },
    {
      id: 3,
      category: 'CIVIL ENGINEERING',
      title: 'Structural Mechanics',
      description: 'Professional degree program in CIVIL ENGINEERING. Gain industry-ready skills with our advanced curriculum.',
      instructorName: 'Dr. Gustave Eiffel',
      units: [
        { id: 301, position: 1, title: 'Statics & Dynamics', lessons: [{id:13, title:'Chapter 1.1: Force Equilibrium'}, {id:14, title:'Chapter 1.2: Beam Analysis'}] },
        { id: 302, position: 2, title: 'Material Science', lessons: [{id:15, title:'Chapter 2.1: Concrete Strength'}, {id:16, title:'Chapter 2.2: Steel Structures'}] },
        { id: 303, position: 3, title: 'Hydrology', lessons: [{id:17, title:'Chapter 3.1: Water Systems'}, {id:18, title:'Chapter 3.2: Environmental Impact'}] }
      ]
    }
  ];

  const [courses, setCourses] = useState(demoFallback);
  const [activeTab, setActiveTab] = useState('COMPUTER SCIENCE');
  const [loading, setLoading] = useState(false); // Immediate load with fallback

  useEffect(() => {
    // Background sync - but the UI remains functional immediately via fallback
    api.get('/courses')
      .then(res => {
        if (res.data && res.data.length > 0) setCourses(res.data);
      })
      .catch(e => console.error("Cloud Sync Failed - Using local repository."));
  }, []);

  const currentCourse = courses.find(c => c.category === activeTab);

  return (
    <div className="px-12 py-10 animate-fade">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>Academic Explorer</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Instant access to specialized engineering curriculum.</p>
      </div>

      {/* 3 Subject Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
        {['COMPUTER SCIENCE', 'MECHANICAL ENGINEERING', 'CIVIL ENGINEERING'].map(tab => (
            <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '1.5rem 2.5rem',
                  borderRadius: '16px',
                  border: activeTab === tab ? 'none' : '1px solid var(--border)',
                  background: activeTab === tab ? 'var(--primary)' : 'white',
                  color: activeTab === tab ? 'white' : 'var(--text-main)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: activeTab === tab ? '0 20px 40px rgba(30, 64, 175, 0.15)' : 'none',
                  transform: activeTab === tab ? 'translateY(-2px)' : 'none'
                }}
            >
                <Layers size={20} />
                {tab}
            </button>
        ))}
      </div>

      <div className="animate-fade">
        {currentCourse ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
              {/* Subject Sidebar Card */}
              <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '100px', borderTop: '4px solid var(--primary)' }}>
                  <div style={{ padding: '0.25rem 0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '4px', fontSize: '10px', fontWeight: 800, display: 'inline-block', marginBottom: '1.5rem' }}>
                        ACTIVE TRACK
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>{currentCourse.title}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                      {currentCourse.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User color="var(--primary)" size={20} />
                      </div>
                      <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{currentCourse.instructorName}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Lead Academic</div>
                      </div>
                  </div>
              </div>

              {/* 3 Units of Topics - INSTANT RENDER */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', borderBottom: '2px solid var(--primary-light)', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <BookOpen size={20} /> Curriculum Units
                  </h3>
                  
                  {currentCourse.units?.slice(0,3).map((unit, uIdx) => (
                      <div key={unit.id} className="card animate-fade" style={{ background: 'white', padding: 0 }}>
                          <div style={{ padding: '1.5rem', background: 'var(--primary-light)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ fontWeight: 800, color: 'var(--primary)' }}>UNIT {unit.position}: {unit.title}</div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>TOPICS UNLOCKED</div>
                          </div>
                          <div style={{ padding: '1rem 0' }}>
                              {unit.lessons?.map((lesson, lIdx) => (
                                  <div 
                                      key={lesson.id} 
                                      className="lesson-row" 
                                      style={{ padding: '1rem 2rem', borderBottom: lIdx === unit.lessons.length - 1 ? 'none' : '1px solid var(--background)', cursor: 'pointer' }}
                                      onClick={() => navigate(`/course/${currentCourse.id}`)}
                                  >
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <Play size={14} color="var(--primary)" />
                                          </div>
                                          <div style={{ flex: 1, fontWeight: 600, fontSize: '0.9rem' }}>{lesson.title}</div>
                                          <CheckCircle size={18} color="#e2e8f0" />
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        ) : (
          <div style={{ padding: '5rem', textAlign: 'center' }}>Initialing Local Cache...</div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
