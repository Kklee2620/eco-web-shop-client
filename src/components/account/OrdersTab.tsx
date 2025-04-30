
import React from 'react';
import { Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Order } from '@/types/account';
import { formatDate, formatPrice, getStatusColor, getStatusText } from '@/utils/formatters';

interface OrdersTabProps {
  orders: Order[];
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn hàng của tôi</CardTitle>
        <CardDescription>Xem lịch sử và trạng thái đơn hàng của bạn.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="border rounded-lg p-4 hover:border-eco-primary transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={getStatusColor(order.status)}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm">{order.items} sản phẩm</p>
                    <p className="font-medium">{formatPrice(order.total)}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center"
                  >
                    Chi tiết <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-medium text-lg mb-1">Chưa có đơn hàng nào</h3>
            <p className="text-gray-500 mb-4">Bạn chưa đặt đơn hàng nào</p>
            <Button>Mua sắm ngay</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
