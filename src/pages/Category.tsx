
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductList from '@/components/product/ProductList';
import CategoryMenu from '@/components/ui/CategoryMenu';
import { ProductSummary } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock category API function - will be replaced with real API call
const mockCategoryProducts = async (slug: string): Promise<{
  name: string;
  products: ProductSummary[];
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get category name based on slug
  let categoryName = '';
  switch (slug) {
    case 'kitchen':
      categoryName = 'Kitchen';
      break;
    case 'bathroom':
      categoryName = 'Bathroom';
      break;
    case 'living-room':
      categoryName = 'Living Room';
      break;
    case 'bedroom':
      categoryName = 'Bedroom';
      break;
    case 'office':
      categoryName = 'Office';
      break;
    default:
      categoryName = 'Products';
  }
  
  // Example products data
  const products: ProductSummary[] = [
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
    },
    {
      id: "5",
      name: "Reusable Silicone Food Bags",
      slug: "reusable-silicone-food-bags",
      imageUrl: "https://images.unsplash.com/photo-1584473457493-56c4cfb4ea36",
      price: 85000,
      stockStatus: "in_stock",
      averageRating: 4.6,
      reviewCount: 15
    },
    {
      id: "6",
      name: "Beeswax Food Wrap",
      slug: "beeswax-food-wrap",
      imageUrl: "https://images.unsplash.com/photo-1601661298673-53555dfe0257",
      price: 65000,
      stockStatus: "in_stock",
      averageRating: 4.3,
      reviewCount: 7
    }
  ];
  
  return {
    name: categoryName,
    products: products
  };
};

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Rating', value: 'rating' }
];

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [categoryData, setCategoryData] = useState<{ name: string; products: ProductSummary[] }>({
    name: '',
    products: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setIsLoading(true);
      try {
        if (slug) {
          const data = await mockCategoryProducts(slug);
          setCategoryData(data);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryProducts();
  }, [slug]);
  
  // Sort products based on selected option
  const sortedProducts = [...categoryData.products].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return (b.averageRating || 0) - (a.averageRating || 0);
      default:
        return 0;
    }
  });
  
  const currentSortOption = sortOptions.find(option => option.value === sortBy)?.label || 'Sort';
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <CategoryMenu className="sticky top-20" />
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-semibold">{categoryData.name}</h1>
              
              {/* Sort dropdown */}
              <div className="mt-3 sm:mt-0">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center px-4 py-2 border rounded-md bg-white">
                    <span>Sort by: {currentSortOption}</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem 
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className="flex justify-between"
                      >
                        {option.label}
                        {sortBy === option.value && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <ProductList
              products={sortedProducts}
              isLoading={isLoading}
              columns={3}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
