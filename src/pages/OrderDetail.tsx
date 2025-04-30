
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/UserContext';
import { ArrowLeft, Package, Truck, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  options: { name: string; value: string }[];
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
  };
  statusUpdates: {
    status: string;
    date: string;
    description: string;
  }[];
}

// Mock API function
const mockGetOrderDetail = async (id: string): Promise<OrderDetail | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (id === '1') {
    return {
      id: '1',
      orderNumber: 'ECO123456',
      date: '2025-04-22T10:30:00',
      status: 'delivered',
      items: [
        {
          id: '1',
          name: 'Bình nước thép không gỉ',
          imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
          price: 150000,
          quantity: 1,
          options: [
            { name: 'Màu sắc', value: 'Xanh lá' },
            { name: 'Dung tích', value: '500ml' }
          ]
        },
        {
          id: '2',
          name: 'Túi vải hữu cơ',
          imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
          price: 120000,
          quantity: 2,
          options: [
            { name: 'Kích thước', value: 'Trung bình' }
          ]
        },
        {
          id: '3',
          name: 'Bàn chải tre',
          imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04',
          price: 30000,
          quantity: 2,
          options: []
        }
      ],
      subtotal: 420000,
      shippingFee: 30000,
      total: 450000,
      paymentMethod: 'Thanh toán khi nhận hàng (COD)',
      shippingAddress: {
        fullName: 'Nguyễn Văn A',
        phone: '0901234567',
        address: '123 Đường Lê Lợi',
        ward: 'Phường Bến Nghé',
        district: 'Quận 1',
        city: 'TP. Hồ Chí Minh'
      },
      statusUpdates: [
        {
          status: 'delivered',
          date: '2025-04-24T15:20:00',
          description: 'Đơn hàng đã được giao thành công'
        },
        {
          status: 'shipped',
          date: '2025-04-23T09:15:00',
          description: 'Đơn hàng đang được giao'
        },
        {
          status: 'processing',
          date: '2025-04-22T14:30:00',
          description: 'Đơn hàng đang được xử lý'
        },
        {
          status: 'pending',
          date: '2025-04-22T10:30:00',
          description: 'Đơn hàng đã được xác nhận'
        }
      ]
    };
  }
  
  return null;
};

// Helper functions
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const getStatusColor = (status: OrderDetail['status']): string => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: OrderDetail['status']): string => {
  switch (status) {
    case 'pending': return 'Chờ xác nhận';
    case 'processing': return 'Đang xử lý';
    case 'shipped': return 'Đang giao';
    case 'delivered': return 'Đã giao';
    case 'cancelled': return 'Đã hủy';
    default: return status;
  }
};

const getStatusIcon = (status: OrderDetail['status']): React.ReactNode => {
  switch (status) {
    case 'pending': return <Clock className="h-5 w-5" />;
    case 'processing': return <Package className="h-5 w-5" />;
    case 'shipped': return <Truck className="h-5 w-5" />;
    case 'delivered': return <CheckCircle2 className="h-5 w-5" />;
    case 'cancelled': return <XCircle className="h-5 w-5" />;
    default: return <AlertCircle className="h-5 w-5" />;
  }
};

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: isUserLoading } = useUser();
  
  useEffect(() => {
    const fetchOrderDetail = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const data = await mockGetOrderDetail(id);
          setOrder(data);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrderDetail();
  }, [id]);
  
  // Redirect to login if not authenticated
  if (!isUserLoading && (!user || !user.isLoggedIn)) {
    return <Navigate to="/login" replace />;
  }
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12 flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-eco-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }
  
  if (!order) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="text-center py-16">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Không tìm thấy đơn hàng</h1>
            <p className="text-gray-500 mb-6">Đơn hàng bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền truy cập.</p>
            <Button asChild>
              <Link to="/account">Quay lại Tài khoản</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container-custom py-12">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            asChild 
            variant="outline" 
            size="sm"
            className="flex items-center"
          >
            <Link to="/account">
              <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại đơn hàng của tôi
            </Link>
          </Button>
        </div>
        
        {/* Order header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Chi tiết đơn hàng #{order.orderNumber}</h1>
            <p className="text-gray-500">Đặt hàng ngày {formatDate(order.date)}</p>
          </div>
          <Badge 
            variant="outline"
            className={`text-sm py-1 px-3 ${getStatusColor(order.status)}`}
          >
            {getStatusText(order.status)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Order status */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Trạng thái đơn hàng</h2>
              <div className="space-y-6">
                {order.statusUpdates.map((update, index) => (
                  <div key={index} className="flex">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${index === 0 ? getStatusColor(order.status) : 'bg-gray-100'}`}>
                      {index === 0 ? getStatusIcon(order.status as OrderDetail['status']) : <div className="w-3 h-3 rounded-full bg-gray-400" />}
                    </div>
                    <div>
                      <p className="font-medium">{update.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(update.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order items */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Sản phẩm ({order.items.length})</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex border-b pb-4 last:border-0 last:pb-0">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow px-4">
                      <h3 className="font-medium">{item.name}</h3>
                      {item.options.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.options.map((option, index) => (
                            <span key={option.name}>
                              {option.name}: {option.value}
                              {index < item.options.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                      )}
                      <div className="mt-1 text-sm">
                        <span className="text-gray-500">Số lượng: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="font-medium">{formatPrice(item.price)}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                      <p className="font-medium text-eco-primary">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-8">
            {/* Order summary */}
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="text-lg font-medium mb-4">Tổng quan đơn hàng</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span>{formatPrice(order.shippingFee)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">
                  Đã bao gồm VAT (nếu có)
                </div>
              </div>
            </div>
            
            {/* Shipping & Payment */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Thông tin thanh toán</h2>
                <p className="text-gray-600">{order.paymentMethod}</p>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-3">Địa chỉ giao hàng</h2>
                <div className="space-y-1 text-gray-600">
                  <p className="font-medium">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.phone}</p>
                  <p>
                    {order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district}, {order.shippingAddress.city}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-3">
              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                <Button variant="destructive">Hủy đơn hàng</Button>
              )}
              <Button variant="outline">Liên hệ hỗ trợ</Button>
              {order.status === 'delivered' && (
                <Button>Đánh giá sản phẩm</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
