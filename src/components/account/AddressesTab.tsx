
import React from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Address } from '@/types/account';
import { toast } from 'sonner';

interface AddressesTabProps {
  addresses: Address[];
  onSetDefaultAddress: (addressId: string) => void;
}

const AddressesTab: React.FC<AddressesTabProps> = ({ addresses, onSetDefaultAddress }) => {
  return (
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
                    onClick={() => onSetDefaultAddress(address.id)}
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
  );
};

export default AddressesTab;
