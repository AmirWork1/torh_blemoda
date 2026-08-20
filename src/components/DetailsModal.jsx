import React, { useState } from 'react';
import { generateSafeFileName, MAX_TEXT_LENGTH } from './fileValidation';





export default function DetailsModal({ file, onCancel, onSubmit }) {
  const [uploaderName, setUploaderName] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [year, setYear] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ולידציה לשנה עברית (תש..) או לועזית (4 ספרות)
  const isValidYear = (value) => /^(תש[א-ת]"?[א-ת]?|\d{4})$/.test(value.trim());

  const isFormValid =
    uploaderName.trim().length > 0 &&
    uploaderName.trim().length <= MAX_TEXT_LENGTH &&
    lessonContent.trim().length > 0 &&
    lessonContent.trim().length <= MAX_TEXT_LENGTH &&
    isValidYear(year);


    
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit({
        uploaderName: uploaderName.trim(),
        lessonContent: lessonContent.trim(),
        year: year.trim(),
      });
    } catch (err) {
      setSubmitError('אירעה שגיאה בהעלאה. נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onKeyDown={(e) => e.key === 'Escape' && !isSubmitting && onCancel()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-2">
          <div className="modal-header border-0 d-flex justify-content-between align-items-center">
            <h5 className="modal-title fw-bold text-primary">השלמת פרטי הסיכום</h5>
            <button
              type="button"
              className="btn-close m-0"
              onClick={onCancel}
              disabled={isSubmitting}
            ></button>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="modal-body text-start">
              <div className="alert alert-info py-2 px-3 mb-4 d-flex align-items-center justify-content-between">
                <span className="text-truncate me-2 small fw-semibold">📎 {file.name}</span>
                <span className="badge bg-primary">קובץ נקלט</span>
              </div>

              <div className="mb-3">
                <label htmlFor="modalUploader" className="form-label fw-semibold">
                  שם כותב/מעלה הסיכום
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="modalUploader"
                  placeholder="ישראל ישראלי"
                  value={uploaderName}
                  maxLength={MAX_TEXT_LENGTH}
                  onChange={(e) => setUploaderName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="modalContent" className="form-label fw-semibold">
                  תוכן השיעור / נושא
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="modalContent"
                  placeholder="למשל: הלכות שבת, עיון בבא קמא"
                  value={lessonContent}
                  maxLength={MAX_TEXT_LENGTH}
                  onChange={(e) => setLessonContent(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="modalYear" className="form-label fw-semibold">
                  שנת מסירת השיעור
                </label>
                <input
                  type="text"
                  className={`form-control ${year && !isValidYear(year) ? 'is-invalid' : ''}`}
                  id="modalYear"
                  placeholder='למשל: תשפ"ו, 2026'
                  value={year}
                  maxLength={10}
                  onChange={(e) => setYear(e.target.value)}
                />
                {year && !isValidYear(year) && (
                  <div className="invalid-feedback">יש להזין שנה תקינה</div>
                )}
              </div>

              {submitError && (
                <div className="alert alert-danger py-2 small mb-0">{submitError}</div>
              )}
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                ביטול
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4 fw-bold"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    מעלה...
                  </>
                ) : (
                  'אשר ופרסם'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

