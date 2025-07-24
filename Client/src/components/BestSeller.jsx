import React from 'react'
import ProductCard from './ProductCard'
import { useAppcontext } from '../context/Appcontext'

function BestSeller() {
  const {products} = useAppcontext();
  return (
    <div className='mt-5 px-5 md:px-16 py-10 bg-body dark:bg-body text-main'>
        <p className='text-3xl font-semibold mb-6 text-color-primary'>Best Sellers</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
          {products.filter((product) => product.inStock).slice(0,5).map((product, index)=>(
             <ProductCard key={index} product={product}/>
          ))}
           
        </div>

    </div>
  )
}

export default BestSeller