import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/categories", label: "Categories", icon: Tag },
  { to: "/orders", label: "Orders", icon: ShoppingBag },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuth();

  return (
    <aside
      className={`fixed md:static top-0 left-0 z-50 w-60 bg-[#3F010C] text-gray-200 h-screen flex flex-col transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0`}
    >
      <div className="p-5 text-lg font-semibold border-b border-gray-800 flex items-center justify-between">
        <span>THATHWAM SAREES ADMIN</span>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? "bg-[#3F010C] text-white"
                  : "hover:bg-[#3F010C]/10"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-3 m-3 text-sm rounded-md hover:bg-[#3F010C]/10"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}


