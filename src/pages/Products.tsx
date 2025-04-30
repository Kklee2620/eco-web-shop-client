
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ProductList from '@/components/product/ProductList';
import CategoryMenu from '@/components/ui/CategoryMenu';
import { ProductSummary } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Mock API function - will be replaced with real API call
const mockFetchProducts = async (): Promise<{
  products: ProductSummary[];
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
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
    },
    {
      id: "7",
      name: "Biodegradable Phone Case",
      slug: "biodegradable-phone-case",
      imageUrl: "https://images.unsplash.com/photo-1606341802409-0951188e25df",
      price: 180000,
      stockStatus: "in_stock",
      averageRating: 4.1,
      reviewCount: 9
    },
    {
      id: "8",
      name: "Natural Loofah Sponge",
      slug: "natural-loofah-sponge",
      imageUrl: "https://images.unsplash.com/photo-1597265125797-28c5363f7a16",
      price: 40000,
      stockStatus: "in_stock",
      averageRating: 4.7,
      reviewCount: 11
    },
    {
      id: "9",
      name: "Recycled Glass Storage Jar",
      slug: "recycled-glass-storage-jar",
      imageUrl: "https://images.unsplash.com/photo-1597778602022-f2d97b8c1493",
      price: 95000,
      stockStatus: "in_stock",
      averageRating: 4.4,
      reviewCount: 6
    },
    {
      id: "10",
      name: "Bamboo Cutlery Set",
      slug: "bamboo-cutlery-set",
      imageUrl: "https://images.unsplash.com/photo-1584473457504-55407e83fcc7",
      price: 75000,
      stockStatus: "low_stock",
      averageRating: 4.9,
      reviewCount: 14
    },
    {
      id: "11",
      name: "Compostable Coffee Pods",
      slug: "compostable-coffee-pods",
      imageUrl: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe",
      price: 130000,
      stockStatus: "in_stock",
      averageRating: 4.2,
      reviewCount: 8
    },
    {
      id: "12",
      name: "Organic Cotton Bedding",
      slug: "organic-cotton-bedding",
      imageUrl: "https://images.unsplash.com/photo-1629949009714-fd4f9e4b33be",
      price: 450000,
      stockStatus: "in_stock",
      averageRating: 4.8,
      reviewCount: 19
    }
  ];
  
  return {
    products: products
  };
};

const sortOptions = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Giá: Thấp đến Cao', value: 'price_asc' },
  { label: 'Giá: Cao đến Thấp', value: 'price_desc' },
  { label: 'Đánh giá cao', value: 'rating' },
  { label: 'Bán chạy', value: 'popularity' }
];

const Products: React.FC = () => {
  const [productsData, setProductsData] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  
  const availabilityOptions = [
    { id: 'in_stock', name: 'Còn hàng' },
    { id: 'low_stock', name: 'Sắp hết hàng' },
    { id: 'out_of_stock', name: 'Hết hàng' }
  ];
  
  const mockCategories = [
    { id: 'bathroom', name: 'Phòng tắm' },
    { id: 'kitchen', name: 'Nhà bếp' },
    { id: 'personal_care', name: 'Chăm sóc cá nhân' },
    { id: 'home_decor', name: 'Trang trí nhà' },
    { id: 'office', name: 'Văn phòng' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await mockFetchProducts();
        setProductsData(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Apply filters and sorting
  const filteredProducts = [...productsData].filter(product => {
    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Filter by availability
    if (selectedAvailability.length > 0 && !selectedAvailability.includes(product.stockStatus)) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
  
  // Reset filters
  const handleResetFilters = () => {
    setPriceRange([0, 500000]);
    setSelectedCategories([]);
    setSelectedAvailability([]);
  };
  
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-semibold mb-2">Sản phẩm</h1>
        <p className="text-gray-500 mb-6">Khám phá các sản phẩm thân thiện với môi trường của chúng tôi</p>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - desktop view */}
          <div className="w-64 hidden md:block flex-shrink-0">
            <div className="bg-white p-5 rounded-lg border sticky top-20">
              <div className="mb-5">
                <h3 className="font-medium mb-3">Giá</h3>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 500000]}
                    max={500000}
                    step={10000}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[0])}</span>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-5">
                <h3 className="font-medium mb-3">Danh mục</h3>
                <div className="space-y-2">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category.id]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                          }
                        }}
                      />
                      <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="font-medium mb-3">Tình trạng</h3>
                <div className="space-y-2">
                  {availabilityOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`availability-${option.id}`} 
                        checked={selectedAvailability.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAvailability([...selectedAvailability, option.id]);
                          } else {
                            setSelectedAvailability(selectedAvailability.filter(id => id !== option.id));
                          }
                        }}
                      />
                      <Label htmlFor={`availability-${option.id}`}>{option.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-5"
                onClick={handleResetFilters}
              >
                Đặt lại bộ lọc
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
              {/* Mobile filter button */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Bộ lọc
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-md overflow-auto">
                    <SheetHeader className="mb-5">
                      <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
                      <SheetDescription>
                        Tùy chỉnh tìm kiếm sản phẩm của bạn
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="mb-5">
                      <h3 className="font-medium mb-3">Giá</h3>
                      <div className="px-2">
                        <Slider 
                          defaultValue={[0, 500000]}
                          max={500000}
                          step={10000}
                          value={priceRange}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="mb-4"
                        />
                        <div className="flex justify-between text-sm">
                          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[0])}</span>
                          <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="mb-5">
                      <h3 className="font-medium mb-3">Danh mục</h3>
                      <div className="space-y-2">
                        {mockCategories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${category.id}`} 
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([...selectedCategories, category.id]);
                                } else {
                                  setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                                }
                              }}
                            />
                            <Label htmlFor={`mobile-category-${category.id}`}>{category.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="mb-5">
                      <h3 className="font-medium mb-3">Tình trạng</h3>
                      <div className="space-y-2">
                        {availabilityOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-availability-${option.id}`} 
                              checked={selectedAvailability.includes(option.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedAvailability([...selectedAvailability, option.id]);
                                } else {
                                  setSelectedAvailability(selectedAvailability.filter(id => id !== option.id));
                                }
                              }}
                            />
                            <Label htmlFor={`mobile-availability-${option.id}`}>{option.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <SheetFooter className="flex-row gap-3 mt-6">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleResetFilters}
                      >
                        Đặt lại
                      </Button>
                      <SheetClose asChild>
                        <Button className="flex-1">Áp dụng</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
              
              {/* Sort dropdown */}
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <span>Sắp xếp: {currentSortOption}</span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
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
            
            {/* Products grid */}
            <ProductList
              products={sortedProducts}
              isLoading={isLoading}
              columns={3}
              className="mb-8"
            />
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Previous page</span>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </Button>
                <Button size="sm" variant="default">1</Button>
                <Button size="sm" variant="outline">2</Button>
                <Button size="sm" variant="outline">3</Button>
                <Button size="sm" variant="outline">4</Button>
                <Button size="sm" variant="outline">5</Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Next page</span>
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
