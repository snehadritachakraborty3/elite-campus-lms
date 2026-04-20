import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Book, Users, Trash2, Edit } from 'lucide-react';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', category: '', duration: '' });

    useEffect(() => {
        fetchInstructorCourses();
    }, []);

    const fetchInstructorCourses = async () => {
        try {
            const response = await api.get('/instructor/courses');
            setCourses(response.data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/instructor/courses', newCourse);
            setShowCreate(false);
            setNewCourse({ title: '', description: '', category: '', duration: '' });
            fetchInstructorCourses();
        } catch (error) {
            console.error("Failed to create course", error);
        }
    };

    return (
        <div className="animate-fade">
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Instructor Panel</h1>
                    <p>Manage your courses and curriculum</p>
                </div>
                <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setShowCreate(true)}>
                    <Plus size={20} /> Create New Course
                </button>
            </div>

            {showCreate && (
                <div className="modal-overlay">
                    <div className="modal-card">
                        <h2>Create Course</h2>
                        <form onSubmit={handleCreate}>
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input className="form-input" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <input className="form-input" value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea className="form-input" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} required />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary">Create</button>
                                <button type="button" className="btn" onClick={() => setShowCreate(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="course-grid">
                {courses.length > 0 ? courses.map(course => (
                    <div key={course.id} className="course-card">
                        <div className="course-banner">{course.title}</div>
                        <div className="course-content">
                            <span className="course-category">{course.category}</span>
                            <h3>{course.title}</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button className="btn btn-sm"><Edit size={16} /> Edit Curriculum</button>
                                <button className="btn btn-danger btn-sm"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <p>You haven't created any courses yet.</p>
                )}
            </div>
        </div>
    );
};

export default InstructorDashboard;
