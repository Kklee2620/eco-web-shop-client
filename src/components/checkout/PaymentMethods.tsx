
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CreditCard, BanknoteIcon, Banknote } from 'lucide-react';

interface PaymentMethodsProps {
  onSelectPayment: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onSelectPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    toast.info('Đang xử lý thanh toán...');
    
    setTimeout(() => {
      onSelectPayment(selectedMethod);
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-medium mb-6">Phương thức thanh toán</h2>
      
      <RadioGroup
        value={selectedMethod}
        onValueChange={setSelectedMethod}
        className="space-y-4"
      >
        <div className={`flex items-start space-x-3 border p-4 rounded-md cursor-pointer transition-all ${selectedMethod === 'credit-card' ? 'border-eco-primary bg-eco-light/20' : 'border-gray-200 hover:border-eco-primary/50'}`}>
          <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="credit-card" className="font-medium text-base cursor-pointer flex-1">Thẻ tín dụng/ghi nợ</Label>
              <div className="flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
              </div>
            </div>
            {selectedMethod === 'credit-card' && (
              <div className="mt-4 space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="card-number">Số thẻ</Label>
                  <input 
                    id="card-number"
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="card-expiry">Ngày hết hạn</Label>
                    <input 
                      id="card-expiry"
                      type="text" 
                      placeholder="MM/YY" 
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="card-cvc">Mã bảo mật (CVC)</Label>
                    <input 
                      id="card-cvc"
                      type="text" 
                      placeholder="123" 
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className={`flex items-start space-x-3 border p-4 rounded-md cursor-pointer transition-all ${selectedMethod === 'bank-transfer' ? 'border-eco-primary bg-eco-light/20' : 'border-gray-200 hover:border-eco-primary/50'}`}>
          <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="bank-transfer" className="font-medium text-base cursor-pointer flex items-center">
                <Banknote className="mr-2 h-5 w-5 text-eco-primary" /> Chuyển khoản ngân hàng
              </Label>
            </div>
            {selectedMethod === 'bank-transfer' && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md text-sm">
                <p className="font-medium mb-2">Thông tin chuyển khoản:</p>
                <p>Ngân hàng: <span className="font-medium">Vietcombank</span></p>
                <p>Số tài khoản: <span className="font-medium">1234567890</span></p>
                <p>Chủ tài khoản: <span className="font-medium">CÔNG TY TNHH ECO SHOP</span></p>
                <p className="mt-2">Nội dung chuyển khoản: <span className="font-medium">Thanh toán đơn hàng + Số điện thoại</span></p>
                <p className="mt-2 text-orange-600">Lưu ý: Đơn hàng của bạn sẽ được xác nhận sau khi chúng tôi nhận được thanh toán.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className={`flex items-start space-x-3 border p-4 rounded-md cursor-pointer transition-all ${selectedMethod === 'cash' ? 'border-eco-primary bg-eco-light/20' : 'border-gray-200 hover:border-eco-primary/50'}`}>
          <RadioGroupItem value="cash" id="cash" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-center">
              <Label htmlFor="cash" className="font-medium text-base cursor-pointer flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-eco-primary" /> Thanh toán khi nhận hàng (COD)
              </Label>
            </div>
            {selectedMethod === 'cash' && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng.</p>
              </div>
            )}
          </div>
        </div>
      </RadioGroup>
      
      <div className="mt-6">
        <Button 
          onClick={handlePaymentSubmit} 
          disabled={isProcessing}
          className="w-full md:w-auto bg-eco-primary hover:bg-eco-dark"
        >
          {isProcessing ? 'Đang xử lý...' : 'Hoàn tất đơn hàng'}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
