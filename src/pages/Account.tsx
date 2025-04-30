import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Package, User, MapPin, Heart, LogOut, Settings, Edit, ChevronRight } from 'lucide-react';

// Định nghĩa các kiểu dữ liệu
interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

interface Address {
  id: string;
  isDefault: boolean;
  fullName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

interface WishlistItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  inStock: boolean;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ECO123456',
    date: '2025-04-22',
    status: 'delivered',
    total: 450000,
    items: 3
  },
  {
    id: '2',
    orderNumber: 'ECO123457',
    date: '2025-04-10',
    status: 'shipped',
    total: 320000,
    items: 2
  },
  {
    id: '3',
    orderNumber: 'ECO123458',
    date: '2025-03-28',
    status: 'processing',
    total: 150000,
    items: 1
  },
  {
    id: '4',
    orderNumber: 'ECO123459',
    date: '2025-03-15',
    status: 'cancelled',
    total: 270000,
    items: 2
  }
];

const mockAddresses: Address[] = [
  {
    id: '1',
    isDefault: true,
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường Lê Lợi',
    ward: 'Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh'
  },
  {
    id: '2',
    isDefault: false,
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '456 Đường Nguyễn Huệ',
    ward: 'Phường Bến Nghé',
    district: 'Quận 1',
    city: 'TP. Hồ Chí Minh'
  }
];

const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Bình nước thép không gỉ',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    price: 150000,
    inStock: true
  },
  {
    id: '2',
    name: 'Bộ dao kéo tre',
    imageUrl: 'https://images.unsplash.com/photo-1584473457504-55407e83fcc7',
    price: 75000,
    inStock: true
  },
  {
    id: '3',
    name: 'Bàn chải đánh răng tre',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04',
    price: 35000,
    inStock: false
  }
];

// Format helpers
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: Order['status']): string => {
  switch (status) {
    case 'pending': return 'Chờ xác nhận';
    case 'processing': return 'Đang xử lý';
    case 'shipped': return 'Đang giao';
    case 'delivered': return 'Đã giao';
    case 'cancelled': return 'Đã hủy';
    default: return status;
  }
};

const Account: React.FC = () => {
  const { user, isLoading, logout } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeTab, setActiveTab] = useState('orders'); // State to track active tab
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  useEffect(() => {
    // Simulate fetching user data
    if (user && user.isLoggedIn) {
      // In a real app, you'd fetch this data from an API
      setOrders(mockOrders);
      setAddresses(mockAddresses);
      setWishlist(mockWishlist);
      
      if (user.name) {
        setProfileForm(prev => ({
          ...prev,
          name: user.name || '',
          email: user.email || '',
        }));
      }
    }
  }, [user]);
  
  // Redirect to login if not authenticated
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-12 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-eco-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }
  
  if (!isLoading && (!user || !user.isLoggedIn)) {
    return <Navigate to="/login" replace />;
  }
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send an API request to update the user profile
    toast.success('Thông tin cá nhân đã được cập nhật');
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send an API request to update the password
    toast.success('Mật khẩu đã được cập nhật');
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      // User will be redirected automatically due to the useEffect
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.');
    }
  };
  
  const handleRemoveWishlistItem = (itemId: string) => {
    setWishlist(wishlist.filter(item => item.id !== itemId));
    toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
  };
  
  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === addressId
    })));
    toast.success('Đã cập nhật địa chỉ mặc định');
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-lg border mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user?.name || 'Người dùng'}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" className="w-full flex items-center justify-center gap-2">
                <LogOut className="h-4 w-4" /> Đăng xuất
              </Button>
            </div>
            
            <div className="bg-white rounded-lg border overflow-hidden">
              <TabsList className="grid grid-cols-1 w-full">
                <TabsTrigger value="orders" className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary">
                  <Package className="h-4 w-4 mr-2" /> Đơn hàng
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary">
                  <MapPin className="h-4 w-4 mr-2" /> Địa chỉ
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary">
                  <Heart className="h-4 w-4 mr-2" /> Yêu thích
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary">
                  <User className="h-4 w-4 mr-2" /> Tài khoản
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Orders tab */}
            <TabsContent value="orders">
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
            </TabsContent>
            
            {/* Addresses tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Địa chỉ của tôi</CardTitle>
                  <CardDescription>Quản lý địa chỉ giao hàng của bạn.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div 
                        key={address.id}
                        className={`border rounded-lg p-4 ${address.isDefault ? 'border-eco-primary bg-eco-light/20' : 'hover:border-gray-300'}`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{address.fullName}</p>
                              {address.isDefault && (
                                <Badge variant="outline" className="bg-eco-light text-eco-primary border-eco-primary">
                                  Mặc định
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm">{address.phone}</p>
                            <p className="text-sm text-gray-600 mt-2">{address.address}, {address.ward}, {address.district}, {address.city}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {!address.isDefault && (
                          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                            <Button
                              variant="link"
                              className="text-eco-primary p-0 h-auto"
                              onClick={() => handleSetDefaultAddress(address.id)}
                            >
                              Đặt làm địa chỉ mặc định
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    Thêm địa chỉ mới
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Wishlist tab */}
            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm yêu thích</CardTitle>
                  <CardDescription>Các sản phẩm bạn đã đánh dấu yêu thích.</CardDescription>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 ? (
                    <div className="space-y-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="flex border rounded-lg overflow-hidden">
                          <div className="w-24 h-24">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4 flex flex-col">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-eco-primary font-medium mt-1">{formatPrice(item.price)}</p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-red-500"
                                onClick={() => handleRemoveWishlistItem(item.id)}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                              </Button>
                            </div>
                            <div className="mt-auto pt-2 flex items-center">
                              <Badge variant={item.inStock ? 'outline' : 'secondary'} className="text-xs">
                                {item.inStock ? 'Còn hàng' : 'Hết hàng'}
                              </Badge>
                              <Button 
                                variant="outline"
                                size="sm" 
                                disabled={!item.inStock}
                                className="ml-auto"
                              >
                                Thêm vào giỏ
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-medium text-lg mb-1">Chưa có sản phẩm yêu thích</h3>
                      <p className="text-gray-500 mb-4">Bạn chưa đánh dấu sản phẩm yêu thích nào</p>
                      <Button>Khám phá sản phẩm</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Profile tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin tài khoản</CardTitle>
                  <CardDescription>Quản lý thông tin cá nhân và mật khẩu của bạn.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info">
                    <TabsList className="mb-4">
                      <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
                      <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="info">
                      <form onSubmit={handleProfileSubmit}>
                        <div className="space-y-4">
                          <div className="flex gap-4 items-center mb-6">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
                              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Button type="button" variant="outline" size="sm">
                                Thay đổi
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Họ và tên</Label>
                              <Input
                                id="name"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                                disabled
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Số điện thoại</Label>
                              <Input
                                id="phone"
                                value={profileForm.phone}
                                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-6">
                          <Button type="submit">Cập nhật</Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="password">
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Mật khẩu mới</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                        <div className="flex justify-end mt-6">
                          <Button type="submit">Cập nhật mật khẩu</Button>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Account;
