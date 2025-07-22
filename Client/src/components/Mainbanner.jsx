import React,{useState,useEffect} from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

function Mainbanner() {

 const messages = [
    "Freshness You Can Trust",
    "Organic Goodness Delivered",
    "Farm to Table, Everyday",
    "Only the Best for Your Basket",
    "Savings You Will Love",
  ];

  const[ index,setIndex] =useState(0)

  useEffect(() =>{
    const interval =setInterval(() =>{
      setIndex(prev => (prev +1) % messages.length)
    },3000);
    return () =>clearInterval(interval)
  },[])



  return (
    <div className="relative w-full bg-body dark:bg-body text-main">
      {/* Background images */}
      <img src={assets.main_banner_bg} alt="Banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="Mobile Banner" className="w-full md:hidden" />

      {/* Overlay content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-5 md:px-16 py-12">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-xl text-yellow-600 dark:text-main">
          {messages[index]}<br className="hidden md:block" />
          <span className="text-color-primary-hover">-Explore Today!</span>
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/products"
            className="flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-hover transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              className="md:hidden transition group-focus:translate-x-1"
            />
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-hover transition rounded text-white cursor-pointer"
          >
            Explore Deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="md:hidden transition group-focus:translate-x-1"
            />
          </Link>
        </div>
      </div>
       
    </div>
  );
}

export default Mainbanner;
