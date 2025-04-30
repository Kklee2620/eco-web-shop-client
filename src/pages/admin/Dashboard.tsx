
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Users, ShoppingBag, Package, CreditCard,
  TrendingUp, TrendingDown
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice, formatDate } from "@/utils/formatters";

const statsCards = [
  {
    title: "Tổng doanh thu",
    value: "12.500.000 ₫",
    icon: CreditCard,
    change: "+12%",
    trend: "up",
    description: "So với tháng trước",
  },
  {
    title: "Sản phẩm",
    value: "245",
    icon: Package,
    change: "+5%",
    trend: "up",
    description: "So với tháng trước",
  },
  {
    title: "Đơn hàng",
    value: "382",
    icon: ShoppingBag,
    change: "-2%",
    trend: "down",
    description: "So với tháng trước",
  },
  {
    title: "Khách hàng",
    value: "512",
    icon: Users,
    change: "+8%",
    trend: "up",
    description: "So với tháng trước",
  },
];

const recentOrders = [
  {
    id: "ORD-123456",
    date: "2025-04-29T12:20:00",
    customer: "Nguyễn Văn A",
    total: 1250000,
    status: "delivered",
  },
  {
    id: "ORD-123455",
    date: "2025-04-29T11:45:30",
    customer: "Trần Thị B",
    total: 950000,
    status: "processing",
  },
  {
    id: "ORD-123454",
    date: "2025-04-28T16:30:00",
    customer: "Lê Văn C",
    total: 2150000,
    status: "shipped",
  },
  {
    id: "ORD-123453",
    date: "2025-04-28T09:15:00",
    customer: "Phạm Thị D",
    total: 1650000,
    status: "pending",
  },
  {
    id: "ORD-123452",
    date: "2025-04-27T14:50:00",
    customer: "Hoàng Văn E",
    total: 850000,
    status: "delivered",
  },
];

const Dashboard: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-purple-100 text-purple-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered": return "Đã giao";
      case "shipped": return "Đang giao";
      case "processing": return "Đang xử lý";
      case "pending": return "Chờ xác nhận";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Bảng điều khiển</h1>
        <div className="flex items-center gap-2">
          <select className="rounded-md border border-gray-300 px-3 py-1.5 text-sm">
            <option>30 ngày qua</option>
            <option>90 ngày qua</option>
            <option>12 tháng qua</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h3 className="mt-1 text-2xl font-semibold">{card.value}</h3>
              </div>
              <div className="rounded-full bg-gray-100 p-3">
                <card.icon className="h-6 w-6 text-gray-700" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {card.trend === "up" ? (
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span
                className={
                  card.trend === "up" ? "text-green-500" : "text-red-500"
                }
              >
                {card.change}
              </span>
              <span className="ml-1 text-gray-500">{card.description}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <div className="p-6">
          <h3 className="mb-4 text-lg font-medium">Đơn hàng gần đây</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="text-sm text-primary hover:underline">
              Xem tất cả đơn hàng
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
