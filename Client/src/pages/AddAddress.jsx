import React, { useState } from 'react'
import { assets } from '../assets/assets'

 const InputField =({ type, placeholder, name, handleChange, address}) =>(
    <input 
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    />
  )

function AddAddress() {

  const [address, setAddress] =useState({
    firstName: '',
    lastName: '',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',

  })

  const handleChange =(e)=>{
    const{ name, value} = e.target;
    setAddress((prevAddress) =>({
      ...prevAddress,
      [name]: value,

    }))
  }

  const onSubmitHandler =async(e) =>{
    e.preventDefault();
  }
 





  return (
    <div className="mt-16 pb-16 px-4">
  {/* Heading */}
  <p className="text-2xl md:text-3xl text-gray-600 text-center md:text-left">
    Add Shipping
    <span className="font-semibold text-primary ml-2">Address</span>
  </p>

  <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start mt-10 gap-8">
    {/* Form Section */}
    <div className="flex-1 max-w-md w-full bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <form onSubmit={onSubmitHandler} className="space-y-4 text-sm">
        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            handleChange={handleChange}
            address={address}
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <InputField
            handleChange={handleChange}
            address={address}
            name="lastName"
            type="text"
            placeholder="Last Name"
          />
        </div>

        {/* Email */}
        <InputField
          handleChange={handleChange}
          address={address}
          name="email"
          type="email"
          placeholder="Email Address"
        />

        {/* Street */}
        <InputField
          handleChange={handleChange}
          address={address}
          name="street"
          type="text"
          placeholder="Street"
        />

        {/* City & State */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            handleChange={handleChange}
            address={address}
            name="city"
            type="text"
            placeholder="City"
          />
          <InputField
            handleChange={handleChange}
            address={address}
            name="state"
            type="text"
            placeholder="State"
          />
        </div>

        {/* Zipcode & Country */}
        <div className="grid grid-cols-2 gap-4">
          <InputField
            handleChange={handleChange}
            address={address}
            name="zipcode"
            type="number"
            placeholder="Zipcode"
          />
          <InputField
            handleChange={handleChange}
            address={address}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>

        {/* Phone */}
        <InputField
          handleChange={handleChange}
          address={address}
          name="phone"
          type="number"
          placeholder="Phone"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition cursor-pointer uppercase tracking-wide font-semibold"
        >
          Save Address
        </button>
      </form>
    </div>

    {/* Image Section */}
    <img
      className="md:mr-16 mb-8 md:mb-0 max-w-xs md:max-w-sm"
      src={assets.add_address_iamge}
      alt="Add Address"
    />
  </div>
</div>
  )
}

export default AddAddress