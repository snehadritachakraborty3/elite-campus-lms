import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ChevronRight, FileText, Play, Monitor, MessageSquare, BookOpen, Clock } from 'lucide-react';

const CourseViewer = () => {
  const { id } = useParams();
  
  // FALLBACK DATA for instant demo resilience - ensures the UI NEVER shows a blank screen
  const demoFallback = {
    "1": {
      id: 1,
      category: 'COMPUTER SCIENCE',
      title: 'Full Stack Systems',
      description: 'Software engineering focusing on distributed systems. Gain industry-ready skills with our advanced curriculum.',
      instructorName: 'Dr. Alan Turing',
      units: [
        { id: 101, position: 1, title: 'Front-End Architecture', lessons: [
            {id:1, title:'Chapter 1.1: Component Design', content: 'Component-based architecture involves breaking down a UI into independent, reusable pieces. Focus on props, state isolation, and lifecycle hooks for maximum reusability.'}, 
            {id:2, title:'Chapter 1.2: State Management', content: 'Global state management strategies using Context API and Redux for complex data flows.'}
        ] },
        { id: 102, position: 2, title: 'Server-Side Logic', lessons: [
            {id:3, title:'Chapter 2.1: API Design', content: 'Mastering RESTful principles, JSON serialization, and Spring Boot Controller design for secure data exchange.'}
        ] },
        { id: 103, position: 3, title: 'Deployment & Scale', lessons: [
            {id:5, title:'Chapter 3.1: Cloud Hosting', content: 'Strategies for CDN integration, Load Balancing, and Kubernetes containerization in high-traffic environments.'}
        ] }
      ]
    },
    "2": {
      id: 2,
      category: 'MECHANICAL ENGINEERING',
      title: 'Thermodynamics & Design',
      description: 'Advanced study of thermal energy and machine dynamics. Industry-ready skills for mechanical engineers.',
      instructorName: 'Dr. James Watt',
      units: [
        { id: 201, position: 1, title: 'Thermal Systems', lessons: [
            {id:7, title:'Chapter 1.1: Heat Transfer', content: 'Analysis of conduction, convection, and radiation in industrial thermal systems. Learning the Fourier\'s Law applications.'}
        ] },
        { id: 202, position: 2, title: 'Machine Design', lessons: [
            {id:9, title:'Chapter 2.1: Kinematics', content: 'Mechanism Synthesis: Designing linkages and gear trains for precise motion control in robotics.'}
        ] },
        { id: 203, position: 3, title: 'Fluid Mechanics', lessons: [
            {id:11, title:'Chapter 3.1: Laminar Flow', content: 'Study of fluid dynamics at low Reynolds numbers and the Navier-Stokes equations.'}
        ] }
      ]
    },
    "3": {
        id: 3,
        category: 'CIVIL ENGINEERING',
        title: 'Structural Mechanics',
        description: 'Mastering the physics of large-scale infrastructure. Professional study of statics and dynamics.',
        instructorName: 'Dr. Gustave Eiffel',
        units: [
          { id: 301, position: 1, title: 'Statics & Dynamics', lessons: [
              {id:13, title:'Chapter 1.1: Force Equilibrium', content: 'Stress Analysis: Calculating the internal forces and deformations in reinforced concrete beams under varying loads.'}
          ] },
          { id: 302, position: 2, title: 'Material Science', lessons: [
              {id:15, title:'Chapter 2.1: Concrete Strength', content: 'Detailed analysis of compressive strength and material properties of modern infrastructure components.'}
          ] }
        ]
      }
  };

  const [course, setCourse] = useState(demoFallback[id] || null);
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(!demoFallback[id]);

  useEffect(() => {
    // If we have fallback data for this ID, use it immediately
    if (demoFallback[id]) {
        const fall = demoFallback[id];
        setCourse(fall);
        if (fall.units?.[0]) {
            setActiveUnitId(fall.units[0].id);
            setSelectedLesson(fall.units[0].lessons?.[0]);
        }
        setLoading(false);
    }

    // Try to sync with backend in background
    api.get(`/courses/${id}`)
      .then(res => {
        if (res.data) {
            setCourse(res.data);
            if (res.data.units?.[0]) {
                setActiveUnitId(res.data.units[0].id);
                setSelectedLesson(res.data.units[0].lessons?.[0]);
            }
        }
      })
      .catch(e => console.log("Cloud Sync Mode: Offline"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading && !course) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Academic Curriculum...</div>;
  if (!course) return <div style={{ textAlign: 'center', padding: '5rem' }}>Course not found in Elite Repository.</div>;

  const activeUnit = course.units?.find(u => u.id === activeUnitId) || course.units?.[0];

  return (
    <div className="app-container" style={{ minHeight: 'calc(100vh - 72px)', background: 'white' }}>
      {/* Curriculum Sidebar */}
      <aside style={{ width: '320px', background: 'white', borderRight: '1px solid var(--border)', padding: '1.5rem', overflowY: 'auto' }}>
         <h4 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '1px' }}>CURRICULUM</h4>
         {course.units?.map(unit => (
            <div key={unit.id} style={{ marginBottom: '1.5rem' }}>
                <div 
                    style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: activeUnitId === unit.id ? 'var(--primary)' : 'inherit' }}
                    onClick={() => setActiveUnitId(unit.id)}
                >
                    <ChevronRight size={16} style={{ transition: '0.2s', transform: activeUnitId === unit.id ? 'rotate(90deg)' : 'none' }} />
                    {unit.title}
                </div>
                {activeUnitId === unit.id && (
                    <div style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {unit.lessons?.map(lesson => (
                            <div 
                                key={lesson.id}
                                style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', background: selectedLesson?.id === lesson.id ? 'var(--primary-light)' : 'transparent', color: selectedLesson?.id === lesson.id ? 'var(--primary)' : 'var(--text-muted)' }}
                                onClick={() => setSelectedLesson(lesson)}
                            >
                                <FileText size={14} /> {lesson.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
         ))}
      </aside>

      {/* Content Viewer */}
      <main style={{ flex: 1, padding: '3rem 5rem', background: 'white', overflowY: 'auto' }}>
          {selectedLesson ? (
              <div className="animate-fade">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      <BookOpen size={14} /> {course.title} &gt; {activeUnit?.title} &gt; {selectedLesson.title}
                  </div>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>{selectedLesson.title}</h1>
                  
                  <div style={{ background: 'var(--background)', padding: '2.5rem', borderRadius: '16px', minHeight: '500px', border: '1px solid var(--border)' }}>
                      <div style={{ padding: '1.5rem', background: 'white', borderLeft: '4px solid var(--primary)', borderRadius: '8px', marginBottom: '3rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                          <h4 style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>Module Objective</h4>
                          <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6 }}>{selectedLesson.content}</p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                              <div style={{ background: 'var(--primary-light)', padding: '0.75rem', borderRadius: '8px' }}><Play size={20} color="var(--primary)" /></div>
                              <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Lecture Presentation</div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>15 mins • Video Tutorial</div>
                              </div>
                              <ChevronRight size={18} color="var(--border)" />
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                              <div style={{ background: '#f5f3ff', padding: '0.75rem', borderRadius: '8px' }}><Monitor size={20} color="#7c3aed" /></div>
                              <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Hands-on Lab Exercise</div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interactive Virtual Environment</div>
                              </div>
                              <ChevronRight size={18} color="var(--border)" />
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                              <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px' }}><MessageSquare size={20} color="#ef4444" /></div>
                              <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Module Discussion Forum</div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Q&A with Instructor</div>
                              </div>
                              <ChevronRight size={18} color="var(--border)" />
                          </div>
                      </div>
                  </div>
              </div>
          ) : (
              <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>Select a chapter from the sidebar to begin.</div>
          )}
      </main>
    </div>
  );
};

export default CourseViewer;
