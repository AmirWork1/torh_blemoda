import React, { useState } from 'react';
import { validateFile, MAX_SIZE_MB } from '../components/fileValidation';

export default function DropZone({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

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
    // מאפס את ה-input כדי לאפשר בחירה חוזרת של אותו קובץ
    e.target.value = '';
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
      >
        <input
          type="file"
          className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
          style={{ cursor: 'pointer' }}
          onChange={handleFileChange}
          accept=".pdf,image/jpeg,image/png,image/webp"
        />
        <div className="py-3">
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


// import React from 'react';

// export default function DropZone({ onFileSelect }) {
//   const handleDragOver = (e) => e.preventDefault();

//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       onFileSelect(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       onFileSelect(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="card shadow-sm p-4 text-center">
//       <h3 className="text-primary fw-bold mb-4">ארכיון סיכומי שיעורים</h3>
//       <p className="text-muted">שתפו סיכומים והערות עם שאר חברי הקהילה</p>
      
//       <div 
//         className="border border-2 border-primary border-dashed rounded-3 p-5 bg-light position-relative"
//         style={{ borderStyle: 'dashed', cursor: 'pointer', transition: 'all 0.2s' }}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         <input 
//           type="file" 
//           className="position-absolute top-0 start-0 w-100 h-100 opacity-0" 
//           style={{ cursor: 'pointer' }}
//           onChange={handleFileChange}
//           accept=".pdf,image/*"
//         />
//         <div className="py-3">
//           <span style={{ fontSize: '3.5rem' }}>📁</span>
//           <h5 className="mt-3 text-dark fw-bold">גרור את הסיכום לכאן</h5>
//           <p className="text-muted small mb-0">או לחץ כדי לבחור קובץ מהמחשב</p>
//         </div>
//       </div>
//     </div>
//   );
// }