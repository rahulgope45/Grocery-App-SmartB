import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <nav className="bg-primary text-white dark:text-main px-6 md:px-12 lg:px-20 py-3 shadow-sm flex items-center justify-between transition-colors">

      {/* Logo + Brand */}
      <NavLink to="./" className="flex items-center gap-2">
        <img src="/shopeeicon.svg" alt="Logo" className="h-8 w-auto" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Shopee</h1>
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="./" className="text-main dark:text-main hover:text-primary dark:hover:text-color-primary transition">Home</NavLink>
        <NavLink to="./" className="text-main dark:text-main hover:text-primary dark:hover:text-color-primary transition">All Products</NavLink>
        <NavLink to="./" className="text-main dark:text-main hover:text-primary dark:hover:text-color-primary transition">Contact</NavLink>

        {/* Search bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full bg-surface">
          <input
            className="py-1.5 w-full bg-transparent text-main dark:text-main outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Cart Icon */}
        <div className="relative cursor-pointer">
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary- hover:bg-primary-hover w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>

        {/* Login Button */}
        <button className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full transition">
          Login
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 border rounded-full bg-surface text-main dark:bg-bg-surface dark:text-main transition"
        >
          Toggle Theme
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
          <rect width="21" height="1.5" rx=".75" fill="currentColor" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="currentColor" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="currentColor" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-surface shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <a href="#" className="text-main">Home</a>
        <a href="#" className="text-main">About</a>
        <a href="#" className="text-main">Contact</a>
        <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-hover text-white rounded-full text-sm">
          Login
        </button>
      </div>

    </nav>
  );
};

export default Navbar;