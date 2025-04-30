
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Import our new components
import AccountSidebar from '@/components/account/AccountSidebar';
import OrdersTab from '@/components/account/OrdersTab';
import AddressesTab from '@/components/account/AddressesTab';
import WishlistTab from '@/components/account/WishlistTab';
import ProfileTab from '@/components/account/ProfileTab';

// Import types
import { Order, Address, WishlistItem } from '@/types/account';

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

const Account: React.FC = () => {
  const { user, isLoading, logout } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeTab, setActiveTab] = useState('orders');
  
  useEffect(() => {
    // Simulate fetching user data
    if (user && user.isLoggedIn) {
      // In a real app, you'd fetch this data from an API
      setOrders(mockOrders);
      setAddresses(mockAddresses);
      setWishlist(mockWishlist);
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <AccountSidebar 
            user={user!} 
            activeTab={activeTab}
            onLogout={handleLogout}
          />
          
          {/* Main content */}
          <div className="flex-1">
            <TabsContent value="orders">
              <OrdersTab orders={orders} />
            </TabsContent>
            
            <TabsContent value="addresses">
              <AddressesTab 
                addresses={addresses} 
                onSetDefaultAddress={handleSetDefaultAddress} 
              />
            </TabsContent>
            
            <TabsContent value="wishlist">
              <WishlistTab 
                wishlist={wishlist} 
                onRemoveItem={handleRemoveWishlistItem} 
              />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileTab user={user!} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Account;
