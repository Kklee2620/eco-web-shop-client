
import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Admin: React.FC = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState<boolean>(true);

  // Kiểm tra quyền admin
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user?.isLoggedIn || !user?.userId) {
        setIsAdmin(false);
        setIsCheckingRole(false);
        toast.error("Vui lòng đăng nhập để tiếp tục");
        navigate("/login");
        return;
      }

      try {
        // Kiểm tra xem người dùng có phải là admin không
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.userId)
          .eq("role", "admin")
          .single();

        if (error && error.code !== "PGRST116") { // PGRST116 là lỗi "không tìm thấy bản ghi"
          console.error("Lỗi khi kiểm tra vai trò:", error);
          throw error;
        }

        // Nếu có dữ liệu trả về, người dùng là admin
        // Hoặc fallback: kiểm tra theo email admin@example.com
        if (data || user.email === 'admin@example.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          toast.error("Bạn không có quyền truy cập vào trang Admin");
          navigate("/");
        }
      } catch (error) {
        console.error("Lỗi kiểm tra quyền admin:", error);
        setIsAdmin(false);
        toast.error("Đã xảy ra lỗi khi kiểm tra quyền truy cập");
        navigate("/");
      } finally {
        setIsCheckingRole(false);
      }
    };

    checkAdminRole();
  }, [user, navigate]);

  if (isLoading || isCheckingRole || isAdmin === null) {
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

// Components imports go at the top of the file
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default Admin;
