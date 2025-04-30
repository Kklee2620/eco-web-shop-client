
import React, { useState } from "react";
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

// Dữ liệu mẫu
const mockUsers: AdminUser[] = [
  {
    isLoggedIn: true,
    userId: "user1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=4D7C0F&color=fff",
    role: "user",
    status: "active",
    createdAt: "2025-02-15T10:30:00",
    lastLogin: "2025-04-29T15:45:00",
    totalOrders: 12,
    totalSpent: 8500000,
  },
  {
    isLoggedIn: true,
    userId: "user2",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=4D7C0F&color=fff",
    role: "user",
    status: "active",
    createdAt: "2025-01-20T09:15:00",
    lastLogin: "2025-04-28T14:20:00",
    totalOrders: 8,
    totalSpent: 5200000,
  },
  {
    isLoggedIn: true,
    userId: "user3",
    name: "Lê Văn C",
    email: "levanc@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Le+Van+C&background=4D7C0F&color=fff",
    role: "user",
    status: "inactive",
    createdAt: "2025-03-05T11:45:00",
    lastLogin: "2025-04-20T10:30:00",
    totalOrders: 3,
    totalSpent: 1850000,
  },
  {
    isLoggedIn: true,
    userId: "user4",
    name: "Admin",
    email: "admin@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Admin&background=4D7C0F&color=fff",
    role: "admin",
    status: "active",
    createdAt: "2025-01-01T08:00:00",
    lastLogin: "2025-04-30T08:30:00",
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    isLoggedIn: true,
    userId: "user5",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    avatarUrl: "https://ui-avatars.com/api/?name=Pham+Thi+D&background=4D7C0F&color=fff",
    role: "user",
    status: "banned",
    createdAt: "2025-02-10T13:25:00",
    lastLogin: "2025-04-15T09:45:00",
    totalOrders: 2,
    totalSpent: 750000,
  },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search
    console.log("Searching for:", searchTerm);
  };

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive" | "banned") => {
    setUsers(users.map(user => 
      user.userId === userId ? { ...user, status: newStatus } : user
    ));
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
                {users.map((user) => (
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
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Người dùng"}
                      </span>
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
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Gửi email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Hiển thị {users.length} người dùng
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
