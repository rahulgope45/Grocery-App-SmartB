import React, { useEffect, useState } from 'react';
import { useAppcontext } from '../context/Appcontext';
import ProductCard from '../components/ProductCard';

function AllProducts() {
  const { products, searchQuery } = useAppcontext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-20 px-5 md:px-16 flex flex-col gap-6">
      {/* Heading */}
      <div className="flex flex-col items-center text-center">
        <p className="text-2xl md:text-3xl font-bold uppercase text-main">
          All Products
        </p>
        <div className="w-16 h-1 bg-primary rounded-full mt-1"></div>
      </div>

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
        {filteredProducts
        .filter(product => product.inStock)
        .map((product, index) => (
      <ProductCard key={index} product={product} />
       ))}
      </div>


      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No products found.</p>
      )}
    </div>
  );
}

export default AllProducts;
