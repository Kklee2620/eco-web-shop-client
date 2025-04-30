
import React from 'react';
import { Package, MapPin, Heart, User, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfileSummary } from '@/types';

interface AccountSidebarProps {
  user: UserProfileSummary;
  activeTab: string;
  onLogout: () => Promise<void>;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ user, activeTab, onLogout }) => {
  return (
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
        <Button onClick={onLogout} variant="outline" className="w-full flex items-center justify-center gap-2">
          <LogOut className="h-4 w-4" /> Đăng xuất
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border overflow-hidden">
        <TabsList className="grid grid-cols-1 w-full">
          <TabsTrigger 
            value="orders" 
            className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary"
          >
            <Package className="h-4 w-4 mr-2" /> Đơn hàng
          </TabsTrigger>
          <TabsTrigger 
            value="addresses" 
            className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary"
          >
            <MapPin className="h-4 w-4 mr-2" /> Địa chỉ
          </TabsTrigger>
          <TabsTrigger 
            value="wishlist" 
            className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary"
          >
            <Heart className="h-4 w-4 mr-2" /> Yêu thích
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="flex items-center justify-start px-5 py-3 data-[state=active]:bg-eco-light data-[state=active]:text-eco-primary"
          >
            <User className="h-4 w-4 mr-2" /> Tài khoản
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default AccountSidebar;
