import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppcontext } from "../../context/Appcontext";

const SellerLayout = () => {
  const { setSeller } = useAppcontext();

  const sidebarLinks = [
    { name: "Add Products", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = () => {
    setSeller(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-sm">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="cursor-pointer w-32 md:w-40" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border border-gray-300 rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Body with Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r border-gray-300 bg-white pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 transition-colors ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-50 border-indigo-500 text-indigo-500 font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`
              }
            >
              <img src={item.icon} alt="" className="w-6 h-6" />
              <p className="hidden md:block">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
