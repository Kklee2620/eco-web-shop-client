
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

const CheckoutSummary: React.FC = () => {
  const { cart } = useCart();
  
  if (!cart) return null;
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  
  const calculateShipping = () => {
    // In a real app, this would calculate shipping based on address, weight, etc.
    return cart.subtotal > 1000000 ? 0 : 30000;
  };
  
  const shippingFee = calculateShipping();
  const total = cart.subtotal + shippingFee;
  
  return (
    <div className="bg-white p-6 rounded-lg border sticky top-4">
      <h2 className="text-xl font-medium mb-4">Đơn hàng của bạn</h2>
      
      <div className="space-y-4 mb-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 flex-shrink-0">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="rounded object-cover w-full h-full"
              />
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-eco-primary rounded-full flex items-center justify-center text-white text-xs">
                {item.quantity}
              </div>
            </div>
            <div className="flex-grow">
              <p className="font-medium text-sm line-clamp-2">{item.name}</p>
              {item.options.length > 0 && (
                <p className="text-xs text-gray-500">
                  {item.options.map((option, index) => (
                    <span key={option.name}>
                      {option.name}: {option.value}
                      {index < item.options.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-medium">{formatPrice(item.lineTotal)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Tổng cộng</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Đã bao gồm VAT (nếu có)
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
