
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Truck, Package, Clock, AlertCircle } from 'lucide-react';

const Shipping: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">Shipping & Delivery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <Truck className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On all orders over 1,000,000₫</p>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <Package className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Eco Packaging</h3>
            <p className="text-gray-600 text-sm">Plastic-free, recyclable materials</p>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <Clock className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">3-5 business days nationwide</p>
          </div>
          
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Order Tracking</h3>
            <p className="text-gray-600 text-sm">Track your package at every step</p>
          </div>
        </div>
        
        <div className="space-y-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                We ship all orders from our warehouse in Ho Chi Minh City, Vietnam. Most orders are processed within 1-2 business days after payment confirmation.
              </p>
              
              <h3 className="font-medium text-lg mb-3">Delivery Times</h3>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><span className="font-medium">Ho Chi Minh City:</span> 1-2 business days</li>
                <li><span className="font-medium">Major Cities:</span> 2-3 business days</li>
                <li><span className="font-medium">Other Regions:</span> 3-5 business days</li>
                <li><span className="font-medium">International:</span> 7-14 business days (varies by location)</li>
              </ul>
              
              <p className="text-sm text-gray-600">
                Note: Delivery times are estimates and may vary due to weather conditions, holidays, or other unforeseen circumstances.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Costs</h2>
            <div className="bg-white border rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Order Value</th>
                      <th className="text-left py-3 px-4">Domestic Shipping</th>
                      <th className="text-left py-3 px-4">International Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Under 500,000₫</td>
                      <td className="py-3 px-4">30,000₫</td>
                      <td className="py-3 px-4">Contact for quote</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">500,000₫ - 1,000,000₫</td>
                      <td className="py-3 px-4">15,000₫</td>
                      <td className="py-3 px-4">Contact for quote</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Over 1,000,000₫</td>
                      <td className="py-3 px-4 font-medium text-green-600">FREE</td>
                      <td className="py-3 px-4">Reduced rates (contact us)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                Once your order ships, you will receive a confirmation email with a tracking number and link. You can use this to track your package's journey in real-time.
              </p>
              <p className="mb-4">
                If you have any questions about your shipment, please contact our customer service team with your order number.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">International Shipping</h2>
            <div className="bg-white border rounded-lg p-6">
              <p className="mb-4">
                We ship to most countries worldwide. International shipping costs and delivery times vary by location. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer.
              </p>
              <p>
                For specific international shipping quotes or questions about customs procedures for your country, please contact our customer service team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
