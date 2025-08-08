import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'


axios.defaults.withCredentials =true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuerry] = useState({});

 //Fetch Seller status
 const fetchSeller = async () =>{
  try {
    const {data} = await axios.get('/api/seller/is-auth');
    if(data.success){
      setIsSeller(true)
    }else{
      setIsSeller(false)
    }
  } catch (error) {
    setIsSeller(false)
    
  }
 }

 //Fetch User Auth status, USer data and cart Items

const fetchUser = async () => {
  try {
    const { data } = await axios.get('/api/user/is-auth');
    if (data.success) {
      setUser(data.user);
      setCartItems(data.user.cartItems || {}); // always an object
    } else {
      setUser(null);
      setCartItems({}); // Fallback
    }
  } catch (error) {
  console.error("fetchUser error:", error?.response?.data || error.message);

  // Only set user null if 401
  if (error.response?.status === 401) {
    setUser(null);
    setCartItems({});
  }
}
};





  // Fetch Products
  const fetchproducts = async () => {
    try {
      const {data} =await axios.get('./api/product/list')
      if(data.success){
        setProduct(data.products)
      }else{
        toast.error(data.message)

      }
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  // Add to cart
const addToCart = async (itemId) => {
  if (!user) return toast.error("Please login first");

  let cartData = structuredClone(cartItems);
  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  try {
    const { data } = await axios.post('/api/cart/update', {
      userId: user._id,
      cartItems: cartData,
    });

    if (data.success) {
      setCartItems(cartData);
      toast.success("Added to cart");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  // Update Cart Item Quantity
const updateCartItem = async (itemId, quantity) => {
  if (!user) return toast.error("Please login first");

  let cartData = structuredClone(cartItems);
  cartData[itemId] = quantity;

  try {
    const { data } = await axios.post('/api/cart/update', {
      userId: user._id,
      cartItems: cartData,
    });

    if (data.success) {
      setCartItems(cartData);
      toast.success("Cart updated");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  // Remove Product from cart
  const removeFromCart = async (itemId) => {
  if (!user) return toast.error("Please login first");

  let cartData = structuredClone(cartItems || {});
  if (cartData[itemId]) {
    cartData[itemId] -= 1;
    if (cartData[itemId] <= 0) {
      delete cartData[itemId];
    }
  }

  try {
    const { data } = await axios.post('/api/cart/update', {
      userId: user._id,
      cartItems: cartData,
    });

    if (data.success) {
      setCartItems(cartData);
      toast.success("Removed from cart");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};



  //Get Cart Item
  const getCartCount =() =>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  // Get Cart Total Amount
const getCartAmount = () => {
  let totalAmount = 0;
  for (const items in cartItems) {
    let itemInfo = products.find((product) => String(product._id) === items);
    if (itemInfo && cartItems[items] > 0) {
      totalAmount += itemInfo.offerPrice * cartItems[items];
    }
  }
  return Math.floor(totalAmount * 100) / 100;
};




  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchproducts();
    
  }, []);

  useEffect(() =>{
    const updateCart = async ()=>{
         try {
      const {data} =await axios.post('/api/cart/update', {cartItems})
      if(!data.success){
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    }
    if(user){
      updateCart()
    }

  },[cartItems])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuerry,
    getCartAmount,
    getCartCount,
    axios,
    fetchproducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppcontext = () => {
  return useContext(AppContext);
};
