
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, ShoppingBag, Users, FileText, 
  Settings, LogOut, Package, 
} from "lucide-react";
import { useUser } from "@/context/UserContext";

const navItems = [
  { icon: LayoutDashboard, label: "Bảng điều khiển", href: "/admin" },
  { icon: Package, label: "Sản phẩm", href: "/admin/products" },
  { icon: ShoppingBag, label: "Đơn hàng", href: "/admin/orders" },
  { icon: Users, label: "Khách hàng", href: "/admin/users" },
  { icon: FileText, label: "Bài viết", href: "/admin/blog" },
  { icon: Settings, label: "Cài đặt", href: "/admin/settings" },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-5 mt-3 border-b border-gray-700 pb-3">Admin Panel</h2>

        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href || 
                            (item.href !== "/admin" && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-md transition-colors hover:bg-gray-800",
                  isActive && "bg-gray-800 text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 p-3 rounded-md text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
