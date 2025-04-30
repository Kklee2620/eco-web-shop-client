
import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Layout from "@/components/layout/Layout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { toast } from "sonner";

const Admin: React.FC = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Kiểm tra quyền admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (user?.isLoggedIn && user?.userId) {
        // TODO: Thay thế bằng kiểm tra quyền admin trong database
        // Hiện tại giả định là admin có email = 'admin@example.com'
        if (user.email === 'admin@example.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast.error("Bạn không có quyền truy cập vào trang Admin");
          navigate("/");
        }
      } else if (!isLoading && !user?.isLoggedIn) {
        setIsAdmin(false);
        toast.error("Vui lòng đăng nhập để tiếp tục");
        navigate("/login");
      }
    };

    checkAdminRole();
  }, [user, isLoading, navigate]);

  if (isLoading || isAdmin === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
