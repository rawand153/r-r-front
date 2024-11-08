
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../img/logo.png";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminActive, setadminActive] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => { user ? setadminActive(true) : setadminActive(false) }, [])
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.removeItem('user')
    setadminActive(false)
    // dispatch logout action
    navigate('/')
    window.location.reload();
  }
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (


    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow">
      <div className="container">

        <Link className="nav-link" to="/">
          <img src={logo} alt="logo" height="35" className="d-inline-block align-text-top" />
        </Link>
        <button
          onClick={toggleMenu}
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            width="30" // Adjust width and height as needed
            height="30"
          >
            {isOpen ? (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            ) : (
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 1h11M3 7h11M3 13h11"
              />
            )}
          </svg>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'd-block' : 'd-none'} justify-content-end`} id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          {/* Search Form */}


          {!adminActive && (
            <ul className="navbar-nav ">
              <li className="nav-item active ">

                <Link className="nav-link" to="/login">Login</Link>
              </li>

            </ul>)}
          {adminActive && (
            <ul className="navbar-nav ">
              <hr className="my-2" />
              <li className="nav-item active ">
                <button className="btn btn-outline-light" onClick={handleClick}>Log out</button>

              </li>

            </ul>)}

        </div>
      </div>
    </nav>


  )
}

export default Navbar