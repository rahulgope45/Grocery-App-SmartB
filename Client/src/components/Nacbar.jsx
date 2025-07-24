import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { assets } from '../assets/assets';
import { useAppcontext } from '../context/Appcontext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setShowUserLogin } = useAppcontext();

  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const logout = async () => {
    // Handle logout logic
      setUser(null);
       navigate('/');
  };

  return (
    <nav className="bg-primary text-main dark:text-main px-6 md:px-12 lg:px-20 py-3 shadow-sm flex items-center justify-between transition-colors duration-300">

      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(true)}>
        <img src="/shopeeicon.svg" alt="Logo" className="h-8 w-auto" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-main">Shopee</h1>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className="text-main hover:text-yellow-300 transition">Home</NavLink>
        <NavLink to="/products" className="text-main hover:text-yellow-300 transition">All Products</NavLink>
        <NavLink to="/contact" className="text-main hover:text-yellow-300 transition">Contact</NavLink>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full bg-surface">
          <input
            className="py-1.5 w-full bg-transparent text-main outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt='Search Icon' className='w-4 h-4' />
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
          <div className="bg-white rounded-full p-2 shadow-md">
            <img src={assets.nav_cart_icon} alt="Cart icon" className="w-4" />
            <span className="absolute -top-2 -right-3 text-xs text-white bg-primary hover:bg-primary-hover w-[18px] h-[18px] rounded-full flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        {/* Auth/Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full transition"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-6 cursor-pointer" alt="User" />
            <ul className="absolute top-10 right-0 bg-surface shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200">
              <li className="p-1.5 pl-3 hover:bg-primary-hover cursor-pointer text-main" onClick={() => navigate("/my-orders")}>
                My Orders
              </li>
              <li className="p-1.5 pl-3 hover:bg-primary-hover cursor-pointer text-main" onClick={logout}>
                Logout
              </li>
            </ul>
          </div>
        )}

        {/* Theme Toggle */}
        <div className="cursor-pointer transition duration-300" onClick={toggleTheme}>
          {dark ? (
            <i className="bi bi-brightness-high-fill text-yellow-400 text-xl"></i>
          ) : (
            <i className="bi bi-moon-fill text-gray-700 dark:text-white text-xl"></i>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" className="sm:hidden text-main">
        <div className="bg-white rounded-full p-2 shadow-md">
          <img src={assets.menu_icon} alt="Menu" />
        </div>
      </button>

      {/* Mobile Menu */}
      <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-body dark:bg-body shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden  z-50`}>
        <NavLink to="/" className="text-main hover:text-[var(--color-primary)] transition">Home</NavLink>
        <NavLink to="/products" className="text-main hover:text-[var(--color-primary)] transition">All Products</NavLink>
        <NavLink to="/contact" className="text-main hover:text-[var(--color-primary)] transition">Contact</NavLink>
        {user && (
          <NavLink to="/my-orders" className="text-main hover:text-[var(--color-primary)] transition">My Orders</NavLink>
        )}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(false)}
            className="px-6 py-2 mt-2 bg-primary hover:bg-primary-hover text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full transition"
          >
            Logout
          </button>
        )}
        <div className="cursor-pointer mt-2" onClick={toggleTheme}>
          {dark ? (
            <i className="bi bi-brightness-high-fill text-yellow-400 text-xl"></i>
          ) : (
            <i className="bi bi-moon-fill text-gray-700 text-xl"></i>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
