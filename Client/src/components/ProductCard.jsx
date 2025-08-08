import React from "react";
import { assets } from "../assets/assets";
import { useAppcontext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems = {} } = useAppcontext();
  const navigate = useNavigate();

  if (!product || !product._id) return null;

  const quantity = cartItems?.[product._id] ?? 0;

  return (
    <div
      className="
        border border-gray-200 rounded-lg shadow-sm 
        p-3 md:p-4 w-full max-w-[280px]
        hover:shadow-md transition
        flex flex-col
      "
    >
      {/* Image Section */}
      <div
        className="group cursor-pointer flex items-center justify-center mb-3"
        onClick={() => {
          navigate(`/products/${product.category?.toLowerCase?.()}/${product._id}`);
          scrollTo(0, 0);
        }}
      >
        <img
          className="
            w-full h-40 md:h-48 object-cover 
            rounded-md group-hover:scale-105 
            transition-transform duration-300
          "
          src={product.image?.[0]}
          alt={product.name}
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col flex-1">
        {/* Category */}
        <p className="text-gray-400 text-xs uppercase tracking-wide">
          {product.category}
        </p>

        {/* Name */}
        <p className="text-gray-800 font-medium text-base md:text-lg truncate">
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-3 h-3 md:w-4 md:h-4"
                alt="star"
              />
            ))}
          <span className="text-xs text-gray-500">(4)</span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-end justify-between mt-3">
          {/* Price */}
          <p className="text-indigo-500 font-semibold text-sm md:text-lg">
            {currency}
            {product.offerPrice}
            <span className="text-gray-400 line-through ml-1 text-xs md:text-sm">
              {currency}
              {product.price}
            </span>
          </p>

          {/* Cart Buttons */}
          <div
            className="text-indigo-500"
            onClick={(e) => e.stopPropagation()}
          >
            {quantity === 0 ? (
              <button
                className="
                  flex items-center justify-center gap-1 bg-white border border-indigo-300 
                  w-16 md:w-20 h-[34px] rounded text-indigo-600 text-sm font-medium
                  hover:bg-indigo-50 transition
                "
                onClick={() => addToCart(product._id)}
              >
                <img
                  src={assets.cart_icon}
                  alt="cart_icon"
                  className="w-4 h-4"
                />
                Add
              </button>
            ) : (
              <div
                className="
                  flex items-center justify-center gap-2 bg-white border border-indigo-300
                  w-16 md:w-20 h-[34px] rounded select-none
                "
              >
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="cursor-pointer text-md px-2"
                >
                  -
                </button>
                <span className="w-5 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="cursor-pointer text-md px-2"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
