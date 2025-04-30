
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Search, Filter, ArrowUpDown, MoreHorizontal, 
  Mail, Lock, UserCheck, UserX 
} from "lucide-react";
import { AdminUser } from "@/types/admin";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminUserRoleManager from "@/components/admin/AdminUserRoleManager";

const Users: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // Lấy danh sách người dùng từ Supabase auth.users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;

      // Fetch user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
        // Không throw lỗi ở đây để vẫn hiển thị được danh sách người dùng
      }

      // Convert to AdminUser format
      const formattedUsers: AdminUser[] = authUsers.users.map(authUser => {
        // Find role for this user
        const userRole = userRoles?.find(role => role.user_id === authUser.id);
        
        return {
          isLoggedIn: true,
          userId: authUser.id,
          name: authUser.user_metadata?.name || "Người dùng",
          email: authUser.email || "",
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.user_metadata?.name || "User")}&background=4D7C0F&color=fff`,
          role: userRole?.role || 'user',
          status: authUser.banned ? "banned" : (authUser.email_confirmed_at ? "active" : "inactive"),
          createdAt: authUser.created_at || new Date().toISOString(),
          lastLogin: authUser.last_sign_in_at || undefined,
          totalOrders: 0, // These would need to be fetched from orders table
          totalSpent: 0,
        };
      });

      setUsers(formattedUsers);
      setTotalCount(formattedUsers.length);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
      toast.error("Không thể tải danh sách người dùng");
      
      // Fallback to some sample data
      setUsers([
        {
          isLoggedIn: true,
          userId: "user1",
          name: "Admin",
          email: "admin@example.com",
          avatarUrl: "https://ui-avatars.com/api/?name=Admin&background=4D7C0F&color=fff",
          role: "admin",
          status: "active",
          createdAt: "2025-01-01T08:00:00",
          lastLogin: "2025-04-30T08:30:00",
          totalOrders: 0,
          totalSpent: 0,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Search users with Supabase RPC call
      // You would need to create a stored procedure in Supabase for this
      const { data, error } = await supabase.rpc('search_users', {
        search_term: searchTerm
      });
      
      if (error) throw error;
      
      if (data) {
        setUsers(data);
        setTotalCount(data.length);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      toast.error("Không thể tìm kiếm người dùng");
      
      // Filter locally as fallback
      const filteredUsers = users.filter(
        user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setUsers(filteredUsers);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: "active" | "inactive" | "banned") => {
    try {
      // Update user status in Supabase
      if (newStatus === "banned") {
        const { error } = await supabase.auth.admin.updateUserById(
          userId,
          { banned: true }
        );
        if (error) throw error;
      } else if (newStatus === "active") {
        const { error } = await supabase.auth.admin.updateUserById(
          userId,
          { banned: false }
        );
        if (error) throw error;
      }
      
      // Update local state
      setUsers(users.map(user => 
        user.userId === userId ? { ...user, status: newStatus } : user
      ));
      
      toast.success(`Đã cập nhật trạng thái người dùng thành ${getStatusText(newStatus)}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái người dùng");
    }
  };

  const handleSendPasswordReset = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success("Đã gửi email đặt lại mật khẩu");
    } catch (error) {
      console.error("Lỗi khi gửi email đặt lại mật khẩu:", error);
      toast.error("Không thể gửi email đặt lại mật khẩu");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-yellow-100 text-yellow-800";
      case "banned": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Đang hoạt động";
      case "inactive": return "Không hoạt động";
      case "banned": return "Đã khóa";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý người dùng</h1>
        <Button onClick={fetchUsers}>Làm mới</Button>
      </div>

      <Card>
        <div className="p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  className="w-full pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>

              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sắp xếp
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead className="hidden md:table-cell">Vai trò</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="hidden md:table-cell">Đăng ký</TableHead>
                    <TableHead className="hidden lg:table-cell">Lần cuối đăng nhập</TableHead>
                    <TableHead className="hidden lg:table-cell">Đơn hàng</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        Không có người dùng nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.userId}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <img
                                src={user.avatarUrl}
                                alt={`Avatar of ${user.name}`}
                              />
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium">{user.name}</span>
                              <span className="text-xs text-gray-500">
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <AdminUserRoleManager
                            userId={user.userId}
                            currentRole={user.role}
                            onRoleChange={(newRole) => {
                              setUsers(users.map(u => 
                                u.userId === user.userId ? { ...u, role: newRole as any } : u
                              ));
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {getStatusText(user.status)}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {formatDate(user.createdAt)}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {user.lastLogin ? formatDate(user.lastLogin) : "Chưa đăng nhập"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {user.totalOrders || 0} đơn
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                // Implement send email functionality
                                toast.success("Tính năng gửi email sẽ được phát triển sau");
                              }}>
                                <Mail className="mr-2 h-4 w-4" />
                                Gửi email
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendPasswordReset(user.email)}>
                                <Lock className="mr-2 h-4 w-4" />
                                Đặt lại mật khẩu
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.role !== "admin" && (
                                <>
                                  {user.status !== "active" && (
                                    <DropdownMenuItem
                                      onClick={() => handleStatusChange(user.userId, "active")}
                                    >
                                      <UserCheck className="mr-2 h-4 w-4" />
                                      Kích hoạt tài khoản
                                    </DropdownMenuItem>
                                  )}
                                  {user.status !== "inactive" && (
                                    <DropdownMenuItem
                                      onClick={() => handleStatusChange(user.userId, "inactive")}
                                    >
                                      <UserX className="mr-2 h-4 w-4" />
                                      Vô hiệu hóa tài khoản
                                    </DropdownMenuItem>
                                  )}
                                  {user.status !== "banned" && (
                                    <DropdownMenuItem
                                      onClick={() => handleStatusChange(user.userId, "banned")}
                                      className="text-red-600"
                                    >
                                      <UserX className="mr-2 h-4 w-4" />
                                      Khóa tài khoản
                                    </DropdownMenuItem>
                                  )}
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Hiển thị {users.length} / {totalCount} người dùng
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled={true}>
                Trước
              </Button>
              <Button variant="outline" size="sm" disabled={true}>
                Tiếp
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Users;
