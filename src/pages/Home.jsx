import React, { useContext, useState } from 'react';
import { AppContext } from '../contexxt/appContext';

export default function Home() {
  const { summaries, loading, error, refreshSummaries } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  // סינון סיכומים לפי חיפוש (שם מעלה, תוכן השיעור או שנה) בצורה מאובטחת
  const filteredSummaries = summaries.filter((item) => {
    const term = searchTerm.toLowerCase();
    
    // המרה בטוחה של שדות לטקסט למקרה שהם מספרים (כמו שנה) או ערכים ריקים
    const uploaderName = (item.uploaderName || '').toString().toLowerCase();
    const lessonContent = (item.lessonContent || '').toString().toLowerCase();
    const year = (item.year || '').toString().toLowerCase();
    
    return (
      uploaderName.includes(term) ||
      lessonContent.includes(term) ||
      year.includes(term)
    );
  });

  return (
    <div className="container mt-5" style={{ direction: 'rtl' }}>
      {/* כותרת הדף */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="fw-bold text-primary mb-1">מאגר סיכומי השיעורים</h1>
          <p className="text-muted mb-0">כאן מוצגים סיכומים שעברו בדיקה ואושרו על ידי המנהל</p>
        </div>
        <button 
          onClick={refreshSummaries} 
          className="btn btn-outline-primary d-flex align-items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              טוען...
            </>
          ) : (
            <>🔄 רענן רשימה</>
          )}
        </button>
      </div>

      {/* תיבת חיפוש */}
      <div className="card shadow-sm p-3 mb-4 bg-light">
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">🔍</span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="חפש לפי שם כותב, נושא השיעור או שנת מסירה..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* מצב טעינה */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">טוען...</span>
          </div>
          <p className="mt-3 text-muted">טוען את הסיכומים מתוך Google Drive...</p>
        </div>
      )}

      {/* הודעת שגיאה */}
      {error && !loading && (
        <div className="alert alert-danger shadow-sm d-flex align-items-center" role="alert">
          <span className="me-2" style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {/* רשימת הסיכומים */}
      {!loading && !error && (
        <>
          {filteredSummaries.length === 0 ? (
            <div className="text-center py-5 border border-2 rounded-3 bg-white shadow-sm" style={{ borderStyle: 'dashed' }}>
              <span style={{ fontSize: '4rem' }}>📁</span>
              <h4 className="fw-bold mt-3 text-dark">לא נמצאו סיכומים</h4>
              <p className="text-muted">
                {searchTerm ? 'נסה לחפש מונח אחר' : 'אין עדיין סיכומים מאושרים להצגה. העלה את הסיכום הראשון שלך!'}
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredSummaries.map((summary, index) => {
                // עיצוב תאריך העלאה
                const formattedDate = summary.date 
                  ? new Date(summary.date).toLocaleDateString('he-IL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : '';

                return (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm hover-shadow transition" style={{ transition: 'all 0.3s' }}>
                      <div className="card-header bg-primary bg-opacity-10 border-0 pt-3 pb-2">
                        <span className="badge bg-primary float-start">{summary.year}</span>
                        <h5 className="card-title fw-bold text-primary text-truncate mb-0" title={summary.lessonContent}>
                          {summary.lessonContent}
                        </h5>
                      </div>
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div className="mb-4">
                          <p className="card-text mb-2 text-dark">
                            <strong>👤 כותב הסיכום:</strong> {summary.uploaderName}
                          </p>
                          <p className="card-text mb-2 text-muted small">
                            <strong>📄 שם הקובץ:</strong> {summary.fileName}
                          </p>
                          {formattedDate && (
                            <p className="card-text text-muted small">
                              <strong>📅 תאריך העלאה:</strong> {formattedDate}
                            </p>
                          )}
                        </div>
                        <a
                          href={summary.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-100 fw-bold py-2 mt-auto d-flex align-items-center justify-content-center gap-2"
                        >
                          👁️ צפה בסיכום בדרייב
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

