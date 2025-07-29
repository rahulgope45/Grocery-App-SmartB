import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Nacbar"; 
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppcontext } from "./context/Appcontext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Oders from "./pages/seller/Oders";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin , isSeller} = useAppcontext()
  return (
    <div className="bg-body text-main min-h-screen transition-colors duration-300">
      {!isSellerPath && <Navbar />}
      {showUserLogin ? <Login/> : null}

      <Toaster/>
      
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
                <Route index element={isSeller ? <AddProduct/> : null }/>
                <Route path="product-list" element={ <ProductList/>}/>
                <Route path="orders" element={ <Oders/>}/>
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  );
}

export default App;