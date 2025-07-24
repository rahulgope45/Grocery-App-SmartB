import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Nacbar"; 
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppcontext } from "./context/Appcontext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin} = useAppcontext()
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
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  );
}

export default App;