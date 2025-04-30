
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { WishlistItem } from '@/types/account';
import { formatPrice } from '@/utils/formatters';

interface WishlistTabProps {
  wishlist: WishlistItem[];
  onRemoveItem: (itemId: string) => void;
}

const WishlistTab: React.FC<WishlistTabProps> = ({ wishlist, onRemoveItem }) => {
  return (
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
                      onClick={() => onRemoveItem(item.id)}
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
  );
};

export default WishlistTab;
