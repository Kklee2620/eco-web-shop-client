
import React from 'react';
import Layout from '@/components/layout/Layout';

const BlogPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">Blog</h1>
        <p className="text-gray-600 mb-8">
          Read our latest articles about sustainability, eco-friendly living, and product tips.
        </p>
        
        {/* Blog posts would go here. For now, displaying a placeholder message */}
        <div className="bg-gray-100 p-12 rounded-lg text-center">
          <p className="text-gray-500">Blog posts coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
