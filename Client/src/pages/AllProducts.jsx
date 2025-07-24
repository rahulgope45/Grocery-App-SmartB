import React from 'react'
import { useAppcontext } from '../context/Appcontext'

function AllProducts() {

const {products} =useAppcontext();

  return (
    <div className='mt-16 flex flex-col'>
         <div className='flex flex-col items-end-col'>
            <p>All Products</p>
            <div className='w-16 h0.5 bg-primary rounded full'></div>

         </div>
    </div>
  )
}

export default AllProducts