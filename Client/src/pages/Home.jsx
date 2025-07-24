import React from 'react'
import Mainbanner from '../components/Mainbanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'

function Home() {
  return (
    <div className='mt-10'>
        <Mainbanner/>
        <Categories/> 
        <BestSeller/>
        <BottomBanner/>
        
    </div>
  )
}

export default Home