import React from 'react';
import { Award, Download, X, Bookmark } from 'lucide-react';

const CertificateModal = ({ isOpen, onClose, courseTitle, userName }) => {
    if (!isOpen) return null;

    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="modal-overlay">
            <div className="certificate-card animate-fade">
                <button className="close-btn" onClick={onClose}><X size={24} /></button>
                
                <div className="certificate-inner">
                    <Award className="cert-icon" size={64} />
                    <h1>Certificate of Completion</h1>
                    <p className="cert-subtitle">This is to certify that</p>
                    <h2 className="cert-name">{userName}</h2>
                    <p className="cert-text">has successfully completed the course</p>
                    <h3 className="cert-course-title">{courseTitle}</h3>
                    
                    <div className="cert-footer">
                        <div className="cert-sign">
                            <span className="sign-line"></span>
                            <p>Program Director</p>
                        </div>
                        <div className="cert-date">
                            <strong>{date}</strong>
                            <p>Completion Date</p>
                        </div>
                    </div>

                    <div className="cert-badge">
                        <Bookmark size={40} />
                        <span>Verified</span>
                    </div>
                </div>

                <div className="cert-actions">
                    <button className="btn btn-primary" onClick={() => window.print()}>
                        <Download size={20} /> Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CertificateModal;
