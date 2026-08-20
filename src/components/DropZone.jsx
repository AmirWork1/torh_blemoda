
import React, { useState, useRef } from 'react';
import { validateFile, MAX_SIZE_MB } from './fileValidation'; // שינוי נתיב לייבוא ישיר באותה תיקייה

export default function DropZone({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null); // שימוש ב-Ref לניהול ה-input

  const processFile = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
    e.target.value = ''; // איפוס ה-input
  };

  const handleClick = () => {
    fileInputRef.current.click(); // פתיחת חלון בחירת קובץ
  };

  return (
    <div className="card shadow-sm p-4 text-center">
      <h3 className="text-primary fw-bold mb-4">ארכיון סיכומי שיעורים</h3>
      <p className="text-muted">שתפו סיכומים והערות עם שאר חברי הקהילה</p>

      <div
        className={`border border-2 rounded-3 p-5 position-relative ${
          isDragging ? 'border-success bg-success bg-opacity-10' : 'border-primary bg-light'
        }`}
        style={{ borderStyle: 'dashed', cursor: 'pointer', transition: 'all 0.2s' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick} // לחיצה על כל אזור הדיב תפתח את חלון בחירת הקובץ
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // הסתרת ה-input המובנה לחלוטין למניעת כפל אירועים
          onChange={handleFileChange}
          accept=".pdf,image/jpeg,image/png,image/webp"
        />
        
        {/* שימוש ב-pointerEvents: 'none' למניעת ריצוד (flickering) של הגרירה מעל טקסטים */}
        <div className="py-3" style={{ pointerEvents: 'none' }}>
          <span style={{ fontSize: '3.5rem' }}>{isDragging ? '📥' : '📁'}</span>
          <h5 className="mt-3 text-dark fw-bold">
            {isDragging ? 'שחרר כאן להעלאה' : 'גרור את הסיכום לכאן'}
          </h5>
          <p className="text-muted small mb-0">
            או לחץ כדי לבחור קובץ מהמחשב (PDF/תמונה, עד {MAX_SIZE_MB}MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger mt-3 py-2 small mb-0" role="alert">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
