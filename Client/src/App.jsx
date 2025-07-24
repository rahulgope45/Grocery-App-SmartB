import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Nacbar"; 
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className="bg-body text-main min-h-screen transition-colors duration-300">
      {!isSellerPath && <Navbar />}

      <Toaster/>
      
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  );
}

export default App;