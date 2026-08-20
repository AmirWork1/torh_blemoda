import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar navbar-expand-md navbar-dark bg-info py-2 shadow-sm">
      <div className="container">
        {/* לוגו / שם האתר */}
        <Link className="navbar-brand font-serif fw-bold fs-3 text-white m-0" to="/" onClick={closeMenu}>
          סיכומי הרב יצחק
        </Link>
        
        {/* כפתור המבורגר (שלושה קווים) שמופיע במסכים קטנים */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* תפריט הקישורים שמתקפל */}
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-0 gap-1 mt-2 mt-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                🏠 דף הבית
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                ℹ️ אודות
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/UploadFile" onClick={closeMenu}>
                📤 העלאת סיכום
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
