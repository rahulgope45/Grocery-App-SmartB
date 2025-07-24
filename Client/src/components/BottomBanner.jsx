import React from 'react'
import { assets } from '../assets/assets'

function BottomBanner() {
  return (
    <div className='relative mt-24'>
        <img src={assets.bottom_banner_image} alt="Banner" className='w-full hidden md:block' />
        <img src={assets.bottom_banner_image_sm} alt="Banner" className='w-full  md:hidden' />
        <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
            

        </div>
    </div>
  )
}

export default BottomBanner