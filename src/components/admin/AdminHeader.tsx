
import React from "react";
import { Bell, Search } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Avatar } from "@/components/ui/avatar";

const AdminHeader: React.FC = () => {
  const { user } = useUser();

  return (
    <header className="bg-white border-b p-4">
      <div className="flex items-center justify-between">
        <div className="w-64">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full rounded-md border border-gray-200 pl-8 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-1 rounded-full hover:bg-gray-100">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <img
                src={user?.avatarUrl || "https://ui-avatars.com/api/?name=Admin&background=4D7C0F&color=fff"}
                alt="Avatar"
              />
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user?.name || "Admin"}</p>
              <p className="text-xs text-gray-500">{user?.email || "admin@example.com"}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
