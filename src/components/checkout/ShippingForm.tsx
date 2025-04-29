
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ShippingFormProps {
  onSubmit: (data: any) => void;
}

// Sample data for Vietnam provinces/cities, districts, and wards
const cities = [
  { id: '1', name: 'Hà Nội' },
  { id: '2', name: 'Hồ Chí Minh' },
  { id: '3', name: 'Đà Nẵng' },
];

const districts = {
  '1': [
    { id: '1-1', name: 'Ba Đình' },
    { id: '1-2', name: 'Hoàn Kiếm' },
    { id: '1-3', name: 'Hai Bà Trưng' },
  ],
  '2': [
    { id: '2-1', name: 'Quận 1' },
    { id: '2-2', name: 'Quận 2' },
    { id: '2-3', name: 'Quận 3' },
  ],
  '3': [
    { id: '3-1', name: 'Hải Châu' },
    { id: '3-2', name: 'Thanh Khê' },
    { id: '3-3', name: 'Liên Chiểu' },
  ],
};

const wards = {
  '1-1': [{ id: '1-1-1', name: 'Phường Phúc Xá' }, { id: '1-1-2', name: 'Phường Trúc Bạch' }],
  '1-2': [{ id: '1-2-1', name: 'Phường Hàng Trống' }, { id: '1-2-2', name: 'Phường Hàng Bạc' }],
  '1-3': [{ id: '1-3-1', name: 'Phường Bạch Đằng' }, { id: '1-3-2', name: 'Phường Phạm Đình Hổ' }],
  '2-1': [{ id: '2-1-1', name: 'Phường Bến Nghé' }, { id: '2-1-2', name: 'Phường Bến Thành' }],
  '2-2': [{ id: '2-2-1', name: 'Phường Thảo Điền' }, { id: '2-2-2', name: 'Phường An Phú' }],
  '2-3': [{ id: '2-3-1', name: 'Phường 1' }, { id: '2-3-2', name: 'Phường 2' }],
  '3-1': [{ id: '3-1-1', name: 'Phường Hải Châu 1' }, { id: '3-1-2', name: 'Phường Hải Châu 2' }],
  '3-2': [{ id: '3-2-1', name: 'Phường Thanh Khê Đông' }, { id: '3-2-2', name: 'Phường Thanh Khê Tây' }],
  '3-3': [{ id: '3-3-1', name: 'Phường Hòa Minh' }, { id: '3-3-2', name: 'Phường Hòa Khánh Bắc' }],
};

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit }) => {
  const formSchema = z.object({
    fullName: z.string().min(2, { message: 'Vui lòng nhập họ tên' }),
    phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    address: z.string().min(5, { message: 'Vui lòng nhập địa chỉ chi tiết' }),
    city: z.string({ required_error: 'Vui lòng chọn tỉnh/thành phố' }),
    district: z.string({ required_error: 'Vui lòng chọn quận/huyện' }),
    ward: z.string({ required_error: 'Vui lòng chọn phường/xã' }),
    saveInfo: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      saveInfo: true,
    },
  });

  const selectedCity = form.watch('city');
  const selectedDistrict = form.watch('district');

  // Reset district and ward when city changes
  React.useEffect(() => {
    if (selectedCity) {
      form.setValue('district', '');
      form.setValue('ward', '');
    }
  }, [selectedCity, form]);

  // Reset ward when district changes
  React.useEffect(() => {
    if (selectedDistrict) {
      form.setValue('ward', '');
    }
  }, [selectedDistrict, form]);

  function handleSubmit(data: z.infer<typeof formSchema>) {
    // Get display values for the dropdowns
    const cityName = cities.find(city => city.id === data.city)?.name || '';
    const districtName = districts[data.city]?.find(district => district.id === data.district)?.name || '';
    const wardName = wards[data.district]?.find(ward => ward.id === data.ward)?.name || '';

    onSubmit({
      ...data,
      city: cityName,
      district: districtName,
      ward: wardName,
    });
  }

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-medium mb-6">Thông tin giao hàng</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập họ và tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ chi tiết</FormLabel>
                <FormControl>
                  <Input placeholder="Số nhà, đường, khu vực..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tỉnh/Thành phố</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quận/Huyện</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={!selectedCity}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCity && 
                        districts[selectedCity]?.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phường/Xã</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={!selectedDistrict}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedDistrict && 
                        wards[selectedDistrict]?.map((ward) => (
                          <SelectItem key={ward.id} value={ward.id}>
                            {ward.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="saveInfo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Lưu thông tin cho lần mua hàng tiếp theo</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-eco-primary hover:bg-eco-dark"
          >
            Tiếp tục đến phương thức thanh toán
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ShippingForm;
