
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
import { Search, Filter, ArrowUpDown, Eye, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatPrice, formatDate, getStatusColor, getStatusText } from "@/utils/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dữ liệu mẫu
const mockOrders = [
  {
    id: "ORD12345",
    orderNumber: "#12345",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      id: "user1"
    },
    date: "2025-04-29T12:20:00",
    status: "delivered",
    total: 1250000,
    items: 3,
  },
  {
    id: "ORD12346",
    orderNumber: "#12346",
    customer: {
      name: "Trần Thị B",
      email: "tranthib@example.com",
      id: "user2"
    },
    date: "2025-04-29T11:45:30",
    status: "processing",
    total: 950000,
    items: 2,
  },
  {
    id: "ORD12347",
    orderNumber: "#12347",
    customer: {
      name: "Lê Văn C",
      email: "levanc@example.com",
      id: "user3"
    },
    date: "2025-04-28T16:30:00",
    status: "shipped",
    total: 2150000,
    items: 5,
  },
  {
    id: "ORD12348",
    orderNumber: "#12348",
    customer: {
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      id: "user4"
    },
    date: "2025-04-28T09:15:00",
    status: "pending",
    total: 1650000,
    items: 4,
  },
  {
    id: "ORD12349",
    orderNumber: "#12349",
    customer: {
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      id: "user5"
    },
    date: "2025-04-27T14:50:00",
    status: "delivered",
    total: 850000,
    items: 1,
  },
  {
    id: "ORD12350",
    orderNumber: "#12350",
    customer: {
      name: "Đỗ Thị F",
      email: "dothif@example.com",
      id: "user6"
    },
    date: "2025-04-26T13:25:00",
    status: "cancelled",
    total: 1850000,
    items: 3,
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search
    console.log("Searching for:", searchTerm);
  };

  const handleStatusChange = (newStatus: string, orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any } 
        : order
    ));
  };

  const filteredOrders = statusFilter === "all"
    ? orders
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Quản lý đơn hàng</h1>
      </div>

      <Card>
        <div className="p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm theo mã đơn hàng hoặc tên khách hàng..."
                  className="w-full pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            <div className="flex items-center gap-2">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="pending">Chờ xác nhận</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="shipped">Đang giao</SelectItem>
                  <SelectItem value="delivered">Đã giao</SelectItem>
                  <SelectItem value="cancelled">Đã hủy</SelectItem>
                </SelectContent>
              </Select>

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
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead className="hidden md:table-cell">Ngày đặt</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="hidden md:table-cell">Số lượng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{order.customer.name}</span>
                        <span className="hidden text-xs text-gray-500 sm:inline-block">
                          {order.customer.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(order.date)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
                          order.status as any
                        )}`}
                      >
                        {getStatusText(order.status as any)}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.items} sản phẩm
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-primary">
                        {formatPrice(order.total)}
                      </div>
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
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            disabled={order.status === "pending"}
                            onClick={() => handleStatusChange("pending", order.id)}
                          >
                            Cập nhật: Chờ xác nhận
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            disabled={order.status === "processing"}
                            onClick={() => handleStatusChange("processing", order.id)}
                          >
                            Cập nhật: Đang xử lý
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            disabled={order.status === "shipped"}
                            onClick={() => handleStatusChange("shipped", order.id)}
                          >
                            Cập nhật: Đang giao
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            disabled={order.status === "delivered"}
                            onClick={() => handleStatusChange("delivered", order.id)}
                          >
                            Cập nhật: Đã giao
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            disabled={order.status === "cancelled"}
                            onClick={() => handleStatusChange("cancelled", order.id)}
                            className="text-red-600"
                          >
                            Cập nhật: Đã hủy
                          </DropdownMenuItem>
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
              Hiển thị {filteredOrders.length} / {orders.length} đơn hàng
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

export default Orders;
