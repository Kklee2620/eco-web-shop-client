
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CategoryMenu from '@/components/ui/CategoryMenu';
import ProductList from '@/components/product/ProductList';
import { Button } from '@/components/ui/button';
import { ProductSummary } from '@/types';
import { ArrowRight, Leaf, Package, ThumbsUp, TrendingUp } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductSummary[]>([]);
  const [newArrivals, setNewArrivals] = useState<ProductSummary[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Mock API calls to fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for featured products
        setFeaturedProducts([
          {
            id: "1",
            name: "Eco-friendly Water Bottle",
            slug: "eco-friendly-water-bottle",
            imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
            price: 250000,
            averageRating: 4.5,
            reviewCount: 28,
            stockStatus: 'in_stock'
          },
          {
            id: "2",
            name: "Bamboo Toothbrush",
            slug: "bamboo-toothbrush",
            imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
            price: 35000,
            originalPrice: 45000,
            averageRating: 4.2,
            reviewCount: 16,
            stockStatus: 'in_stock'
          },
          {
            id: "3",
            name: "Reusable Produce Bags",
            slug: "reusable-produce-bags",
            imageUrl: "https://images.unsplash.com/photo-1610419307387-7def17ced924",
            price: 120000,
            averageRating: 4.8,
            reviewCount: 42,
            stockStatus: 'in_stock'
          },
          {
            id: "4",
            name: "Organic Cotton Tote Bag",
            slug: "organic-cotton-tote-bag",
            imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3",
            price: 180000,
            averageRating: 4.0,
            reviewCount: 12,
            stockStatus: 'low_stock'
          }
        ]);
        
        // Mock data for new arrivals
        setNewArrivals([
          {
            id: "5",
            name: "Beeswax Food Wrap",
            slug: "beeswax-food-wrap",
            imageUrl: "https://images.unsplash.com/photo-1621844061203-3f31a2a7d6c6",
            price: 150000,
            averageRating: 4.3,
            reviewCount: 8,
            stockStatus: 'in_stock'
          },
          {
            id: "6",
            name: "Plant-based Dish Soap",
            slug: "plant-based-dish-soap",
            imageUrl: "https://images.unsplash.com/photo-1592073302599-351cb4e34a8e",
            price: 85000,
            originalPrice: 95000,
            averageRating: 4.6,
            reviewCount: 14,
            stockStatus: 'in_stock'
          },
          {
            id: "7",
            name: "Biodegradable Phone Case",
            slug: "biodegradable-phone-case",
            imageUrl: "https://images.unsplash.com/photo-1603313011360-0620b7ce0dcd",
            price: 320000,
            averageRating: 3.9,
            reviewCount: 5,
            stockStatus: 'in_stock'
          },
          {
            id: "8",
            name: "Handmade Soap Bar",
            slug: "handmade-soap-bar",
            imageUrl: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec",
            price: 60000,
            averageRating: 4.7,
            reviewCount: 23,
            stockStatus: 'out_of_stock'
          }
        ]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // In a real app, we'd want to handle this error properly
      } finally {
        setIsLoadingProducts(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container-custom py-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          <div className="md:col-span-1 lg:col-span-1">
            <CategoryMenu className="h-full" />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <div className="bg-eco-light rounded-lg overflow-hidden relative h-full min-h-[300px] flex items-center">
              <div className="p-6 md:p-10 max-w-xl">
                <span className="inline-block px-4 py-1 bg-eco-primary text-white rounded-full text-sm font-medium mb-4">
                  Sustainable Living
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Eco-friendly products for a better planet
                </h1>
                <p className="text-gray-600 mb-6">
                  Discover our collection of sustainable products that help reduce waste and environmental impact.
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="bg-eco-primary hover:bg-eco-dark"
                    asChild
                  >
                    <Link to="/products">Shop Now</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-eco-primary text-eco-primary hover:bg-eco-light"
                    asChild
                  >
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" 
                alt="Eco-friendly products" 
                className="absolute right-0 top-0 h-full object-cover object-right opacity-20 md:opacity-80 md:w-1/2" 
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <Leaf className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Eco-Friendly</h3>
            <p className="text-gray-600 text-sm">All products are made from sustainable materials</p>
          </div>
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <Package className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Plastic-Free</h3>
            <p className="text-gray-600 text-sm">Packaging made from recyclable materials</p>
          </div>
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <ThumbsUp className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Quality</h3>
            <p className="text-gray-600 text-sm">Durable products designed to last longer</p>
          </div>
          <div className="bg-white border rounded-lg p-6 text-center">
            <div className="w-12 h-12 mx-auto bg-eco-light rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="text-eco-primary w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">Ethical</h3>
            <p className="text-gray-600 text-sm">Ethically sourced and fair trade certified</p>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-eco-primary hover:underline flex items-center"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <ProductList 
            products={featuredProducts} 
            isLoading={isLoadingProducts} 
            columns={4}
          />
        </div>

        {/* Banner */}
        <div className="mb-12 relative rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-eco-primary to-eco-secondary text-white p-8 md:p-12 relative z-10">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="mb-6">
                Every purchase you make contributes to a more sustainable future. 
                Together we can reduce waste and protect our environment.
              </p>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-eco-primary"
                asChild
              >
                <Link to="/about">Learn About Our Impact</Link>
              </Button>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
            alt="Nature" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20" 
          />
        </div>

        {/* New Arrivals */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link 
              to="/products?sort=newest" 
              className="text-eco-primary hover:underline flex items-center"
            >
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <ProductList 
            products={newArrivals} 
            isLoading={isLoadingProducts} 
            columns={4}
          />
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/category/kitchen" className="group relative rounded-lg overflow-hidden h-40">
              <img 
                src="https://images.unsplash.com/photo-1563908153332-e6202be146c2" 
                alt="Kitchen" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-lg">Kitchen</h3>
                </div>
              </div>
            </Link>
            <Link to="/category/bathroom" className="group relative rounded-lg overflow-hidden h-40">
              <img 
                src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd" 
                alt="Bathroom" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-lg">Bathroom</h3>
                </div>
              </div>
            </Link>
            <Link to="/category/living-room" className="group relative rounded-lg overflow-hidden h-40">
              <img 
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0" 
                alt="Living Room" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-lg">Living Room</h3>
                </div>
              </div>
            </Link>
            <Link to="/category/office" className="group relative rounded-lg overflow-hidden h-40">
              <img 
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36" 
                alt="Office" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-lg">Office</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
