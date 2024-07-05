import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Navbar = ({ isLoggedIn, setIsLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolltoY, setScrollToY] = useState(0);
  const [setScroll, setSetScroll] = useState(true);

  const onScroll = () => {
    const scrolledUp = window.scrollY || document.documentElement.scrollTop;
    setScrollToY(scrolledUp);
    const scrolled = scrolltoY >= 300;
    if (scrolled) {
      setSetScroll(false);
    } else {
      setSetScroll(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrolltoY]);

  return (
    <div className={`fixed z-50 flex flex-col justify-center items-center w-full h-18 backdrop-blur-lg transition-all duration-1000 ${setScroll ? 'top-0' : 'top-[-110px]'}`}>
      <nav
        id="myNav"
        className={`bg-black backdrop-blur-lg rounded-full py-2 border-2 border-[#FB5607] transition-all duration-2000 mt-4 w-11/12 shadow-md ${setScroll ? '' : 'w-3/5'} `}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/">
            <img src={logo} alt="Logo" width={120} height={10} loading="lazy" />
          </Link>

          <div className="hidden md:flex items-center gap-x-8">
            <ul className="text-orange-600 flex gap-x-8 text-xl">
              <li className="hover:text-white">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-white">
                <Link to="/shop">Shop</Link>
              </li>
              <li className="hover:text-white">
                <Link to="/about">About</Link>
              </li>
              <li className="hover:text-white">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <button className="nav-btn py-2 px-4 text-white bg-[#fb5607] rounded-md">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="nav-btn text-white bg-[#fb5607] py-2 px-4 rounded-md">
                    Sign up
                  </button>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to="/dashboard">
                  <button className="nav-btn py-2 px-4 text-white bg-[#fb5607] rounded-md">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={() => {
                    onLogout();  // Correctly use the passed onLogout function
                    toast('Logged out successfully!');
                    localStorage.removeItem('token');
                    window.location.href = '/';
                  }}
                  className="nav-btn text-white bg-[#fb5607] py-2 px-4 rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className=" bg-black block md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-[#f3f3f3] py-3">
            <ul className="text-orange-600 flex flex-col items-center gap-y-3 text-xl">
              <li>
                <Link to="/" onClick={() => setIsOpen(!isOpen)}>Home</Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setIsOpen(!isOpen)}>Shop</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsOpen(!isOpen)}>About</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsOpen(!isOpen)}>Contact</Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <Link to="/dashboard" onClick={() => setIsOpen(!isOpen)}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/cart" onClick={() => setIsOpen(!isOpen)}>Cart</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toast('Logged out successfully!');
                        localStorage.removeItem('token');
                        window.location.href = '/';
                      }}
                      className="nav-btn"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li>
                    <Link to="/login" onClick={() => setIsOpen(!isOpen)}>
                      <button className="nav-btn">Log in</button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={() => setIsOpen(!isOpen)}>
                      <button className="nav-btn">Sign up</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;