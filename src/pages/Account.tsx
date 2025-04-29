
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useUser } from '@/context/UserContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { User, Package, CreditCard, Map, LogOut } from 'lucide-react';

const Account: React.FC = () => {
  const { user, logout } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Redirect to login if not authenticated
  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-semibold mb-6">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 border">
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name || 'User'} 
                      className="rounded-full object-cover" 
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.userId}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                orientation="vertical"
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto bg-white border-r-0">
                  <TabsTrigger 
                    value="profile" 
                    className="justify-start px-4 border-b data-[state=active]:border-l-2 data-[state=active]:border-l-eco-primary rounded-none"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="orders" 
                    className="justify-start px-4 border-b data-[state=active]:border-l-2 data-[state=active]:border-l-eco-primary rounded-none"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </TabsTrigger>
                  <TabsTrigger 
                    value="addresses" 
                    className="justify-start px-4 border-b data-[state=active]:border-l-2 data-[state=active]:border-l-eco-primary rounded-none"
                  >
                    <Map className="w-4 h-4 mr-2" />
                    Addresses
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payment" 
                    className="justify-start px-4 border-b data-[state=active]:border-l-2 data-[state=active]:border-l-eco-primary rounded-none"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start px-4 py-6 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-none"
                onClick={() => logout()}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="profile" className="mt-0">
                  <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="full-name">
                          Full Name
                        </label>
                        <Input id="full-name" defaultValue={user.name || ''} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                          Email
                        </label>
                        <Input id="email" type="email" defaultValue="user@example.com" disabled />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">
                          Phone
                        </label>
                        <Input id="phone" defaultValue="+84 123 456 789" />
                      </div>
                    </div>
                    <Button type="button">Save Changes</Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="orders" className="mt-0">
                  <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                  <div className="text-center py-10">
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                    <Button variant="outline" className="mt-4">
                      Browse Products
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="addresses" className="mt-0">
                  <h2 className="text-xl font-semibold mb-4">Your Addresses</h2>
                  <div className="text-center py-10">
                    <p className="text-gray-500">You don't have any saved addresses.</p>
                    <Button variant="outline" className="mt-4">
                      Add Address
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="payment" className="mt-0">
                  <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                  <div className="text-center py-10">
                    <p className="text-gray-500">You don't have any payment methods saved.</p>
                    <Button variant="outline" className="mt-4">
                      Add Payment Method
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
