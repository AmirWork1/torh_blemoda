import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='container-fluid bg-info'>
      <div className='container p-2'>
        <div className='row align-items-center'>
          <div className='logo col-auto'>
            <h2>Mornig</h2>
          </div>
          <nav className='col-auto'>
            <ul className='d-md-flex'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
