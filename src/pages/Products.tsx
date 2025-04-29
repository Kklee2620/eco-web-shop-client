
import React from 'react';
import Layout from '@/components/layout/Layout';

const Products: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <p className="text-gray-600 mb-8">
          Browse our complete collection of eco-friendly and sustainable products.
        </p>
        
        {/* Product listing would go here. For now, displaying a placeholder message */}
        <div className="bg-gray-100 p-12 rounded-lg text-center">
          <p className="text-gray-500">Product listing coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
