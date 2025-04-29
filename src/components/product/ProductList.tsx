
import React from 'react';
import { ProductSummary } from '@/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  title?: string;
  products: ProductSummary[];
  isLoading?: boolean;
  columns?: number;
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  title, 
  products, 
  isLoading = false, 
  columns = 4,
  className = "" 
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
  };
  
  const gridClass = gridCols[columns as keyof typeof gridCols] || gridCols[4];
  
  // Loading skeleton
  if (isLoading) {
    return (
      <div className={className}>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className={`grid ${gridClass} gap-4`}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col h-full animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-md"></div>
              <div className="mt-3 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <div className={className}>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className="py-8 text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={className}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className={`grid ${gridClass} gap-4 sm:gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
