import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='container-fluid bg-info'>
      <div className='container p-2'>
        <div className='row align-items-center'>
          <div className='logo col-auto'>
            <h2>בית המדרש של מו"ר הרב יצחק בן שחר</h2>
          </div>
          <nav className='col-auto'>
            <ul className='d-md-flex'>
              <li><Link to="/">בית</Link></li>
              <li><Link to="/about">אודות</Link></li>
              <li><Link to="/UploadFile">העלאת סיכומים</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
