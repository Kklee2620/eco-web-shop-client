
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderSuccessProps {
  paymentMethod: string;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ paymentMethod }) => {
  // Generate random order number
  const orderNumber = `ECO${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Get payment method description
  const getPaymentMethodText = () => {
    switch(paymentMethod) {
      case 'credit-card':
        return 'Thẻ tín dụng/ghi nợ';
      case 'bank-transfer':
        return 'Chuyển khoản ngân hàng';
      case 'cash':
        return 'Thanh toán khi nhận hàng (COD)';
      default:
        return '';
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Đặt hàng thành công!</h2>
      <p className="text-gray-600 mb-6">Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn.</p>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Mã đơn hàng</p>
          <p className="font-bold text-lg">{orderNumber}</p>
        </div>
        
        <div className="text-left space-y-2 text-sm">
          <p><span className="font-medium">Phương thức thanh toán:</span> {getPaymentMethodText()}</p>
          {paymentMethod === 'bank-transfer' && (
            <div className="text-orange-600 text-sm mt-2">
              <p>
                Vui lòng hoàn tất chuyển khoản theo thông tin đã cung cấp để đơn hàng của bạn được xử lý.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-eco-light p-4 rounded-md mb-6 flex items-center">
        <Package className="h-6 w-6 text-eco-primary mr-3" />
        <div className="text-left">
          <p className="font-medium">Đơn hàng của bạn đang được xử lý</p>
          <p className="text-sm">Bạn sẽ nhận được email xác nhận đơn hàng trong thời gian sớm nhất.</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button asChild>
          <Link to="/">Quay về trang chủ</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/products">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
