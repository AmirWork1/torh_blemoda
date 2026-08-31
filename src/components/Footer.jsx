import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-info text-white py-4 mt-5 border-top border-2">
      <div className="container">
        <div className="row align-items-center justify-content-between text-center text-md-start">
          <div className="col-md-auto mb-3 mb-md-0 text-md-start">
            <h5 className="font-serif fw-bold text-white mb-1">סיכומי הרב יצחק</h5>
            <p className="small mb-0" style={{ color: 'var(--theme-bg)' }}>ארכיון שיעורים וסיכומים להורדה וצפייה</p>
          </div>
          <div className="col-md-auto">
            <ul className="list-unstyled d-flex justify-content-center gap-4 mb-0">
              <li> 
                 <Link to="/" className="text-decoration-none footer-link">דף הבית</Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none footer-link">אודות</Link>
              </li>
              <li>
                <Link to="/UploadFile" className="text-decoration-none footer-link">העלאת סיכום</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3" style={{ borderColor: 'rgba(244, 236, 225, 0.15)' }} />
        <div className="text-center small" style={{ color: 'var(--theme-bg)' }}>
          © {new Date().getFullYear()} כל הזכויות שמורות לבית המדרש. נבנה באהבה לתורה ולומדיה.
        </div>
      </div>
    </footer>
  );
}
