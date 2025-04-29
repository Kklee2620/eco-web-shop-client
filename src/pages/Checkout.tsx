
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import OrderSuccess from '@/components/checkout/OrderSuccess';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [shippingData, setShippingData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-medium mb-6">Giỏ hàng của bạn trống</h1>
          <p className="mb-8">Vui lòng thêm sản phẩm vào giỏ hàng để thanh toán</p>
          <Button asChild>
            <Link to="/products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleShippingSubmit = (data: any) => {
    setShippingData(data);
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (method: string) => {
    setPaymentMethod(method);
    // In a real app, you'd process the payment here
    // For demo purposes, we'll just simulate a successful order
    setTimeout(() => {
      clearCart();
      setCurrentStep('success');
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleBackToShipping = () => {
    setCurrentStep('shipping');
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="container-custom py-8 md:py-12">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-4"
            onClick={() => navigate(-1)} 
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
          <h1 className="text-2xl md:text-3xl font-semibold">Thanh toán</h1>
        </div>

        {/* Checkout steps display */}
        <div className="flex items-center mb-8">
          <div className={`flex items-center ${currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'success' ? 'text-eco-primary font-medium' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-eco-primary text-white flex items-center justify-center mr-2">1</div>
            <span>Thông tin giao hàng</span>
          </div>
          <div className="h-1 w-8 mx-2 bg-gray-300"></div>
          <div className={`flex items-center ${currentStep === 'payment' || currentStep === 'success' ? 'text-eco-primary font-medium' : ''}`}>
            <div className={`w-8 h-8 rounded-full ${currentStep === 'payment' || currentStep === 'success' ? 'bg-eco-primary text-white' : 'bg-gray-200'} flex items-center justify-center mr-2`}>2</div>
            <span>Phương thức thanh toán</span>
          </div>
          <div className="h-1 w-8 mx-2 bg-gray-300"></div>
          <div className={`flex items-center ${currentStep === 'success' ? 'text-eco-primary font-medium' : ''}`}>
            <div className={`w-8 h-8 rounded-full ${currentStep === 'success' ? 'bg-eco-primary text-white' : 'bg-gray-200'} flex items-center justify-center mr-2`}>3</div>
            <span>Hoàn tất</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {currentStep === 'shipping' && (
              <ShippingForm onSubmit={handleShippingSubmit} />
            )}
            {currentStep === 'payment' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-medium mb-4">Thông tin giao hàng</h2>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Họ tên:</span> {shippingData?.fullName}</p>
                    <p><span className="font-medium">Điện thoại:</span> {shippingData?.phone}</p>
                    <p><span className="font-medium">Email:</span> {shippingData?.email}</p>
                    <p><span className="font-medium">Địa chỉ:</span> {shippingData?.address}</p>
                    <p><span className="font-medium">Tỉnh/Thành phố:</span> {shippingData?.city}</p>
                    <p><span className="font-medium">Quận/Huyện:</span> {shippingData?.district}</p>
                    <p><span className="font-medium">Phường/Xã:</span> {shippingData?.ward}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={handleBackToShipping}
                  >
                    Chỉnh sửa
                  </Button>
                </div>
                
                <PaymentMethods onSelectPayment={handlePaymentSubmit} />
              </div>
            )}
            {currentStep === 'success' && (
              <OrderSuccess paymentMethod={paymentMethod || ''} />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
