
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductList from '@/components/product/ProductList';
import { ProductSummary } from '@/types';

// Mock search API function - will be replaced with real API call
const mockSearchProducts = async (query: string): Promise<ProductSummary[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Example products data for search results
  const allProducts: ProductSummary[] = [
    {
      id: "1",
      name: "Eco-friendly Water Bottle",
      slug: "eco-friendly-water-bottle",
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      price: 150000,
      originalPrice: 200000,
      stockStatus: "in_stock",
      averageRating: 4.5,
      reviewCount: 12
    },
    {
      id: "2",
      name: "Bamboo Toothbrush",
      slug: "bamboo-toothbrush",
      imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
      price: 35000,
      stockStatus: "in_stock",
      averageRating: 4.8,
      reviewCount: 8
    },
    {
      id: "3",
      name: "Organic Cotton Tote Bag",
      slug: "organic-cotton-tote-bag",
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820",
      price: 120000,
      stockStatus: "in_stock",
      averageRating: 4.2,
      reviewCount: 5
    },
    {
      id: "4",
      name: "Recycled Paper Notebook",
      slug: "recycled-paper-notebook",
      imageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57",
      price: 45000,
      stockStatus: "low_stock",
      averageRating: 4.0,
      reviewCount: 3
    }
  ];
  
  if (!query) return [];
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const results = await mockSearchProducts(query);
        setProducts(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [query]);
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-semibold mb-6">
          Search results for: <span className="text-eco-primary">"{query}"</span>
        </h1>
        
        <ProductList
          products={products}
          isLoading={isLoading}
          columns={4}
          className="mt-6"
        />
      </div>
    </Layout>
  );
};

export default Search;
