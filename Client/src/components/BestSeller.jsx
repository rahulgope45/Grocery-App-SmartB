import React from 'react'
import ProductCard from './ProductCard'

function BestSeller() {
  return (
    <div className='mt-5 px-5 md:px-16 py-10 bg-body dark:bg-body text-main'>
        <p className='text-3xl font-semibold mb-6 text-color-primary'>Best Sellers</p>
        <div>
            <ProductCard/>
        </div>

    </div>
  )
}

export default BestSeller