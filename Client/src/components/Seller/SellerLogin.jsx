import React, { useEffect, useState } from "react";
import { useAppcontext } from "../../context/Appcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function SellerLogin() {
  const { isSeller, setIsSeller } = useAppcontext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const {data} = await axios.post('/api/seller/login' , {email, password})
      if(data.success){
        setIsSeller(true)
        navigate('/seller')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
    
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-sm"
      >
        <div className="flex flex-col gap-6 bg-white m-auto items-start p-8 sm:p-10 rounded-xl shadow-xl border border-gray-200 w-[320px] sm:w-[360px]">
          {/* Title */}
          <p className="text-2xl font-semibold text-center w-full">
            <span className="text-primary">Seller</span> Login
          </p>

          {/* Email */}
          <div className="w-full">
            <p className="mb-1 font-medium">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-primary"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div className="w-full">
            <p className="mb-1 font-medium">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:border-primary"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white w-full py-2 rounded-md font-medium transition"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
}

export default SellerLogin;
