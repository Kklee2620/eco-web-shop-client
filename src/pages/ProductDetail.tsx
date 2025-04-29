
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ProductDetail, Variant, ProductSummary } from '@/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductList from '@/components/product/ProductList';
import { useCart } from '@/context/CartContext';
import { Star, Minus, Plus, Check, AlertTriangle, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [relatedProducts, setRelatedProducts] = useState<ProductSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const { addToCart } = useCart();
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Mock API fetch for product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock product data based on slug
        const mockProduct: ProductDetail = {
          id: "1",
          name: "Eco-friendly Water Bottle",
          slug: "eco-friendly-water-bottle",
          sku: "ECO-WB-001",
          description: `<p>Our eco-friendly water bottle is the perfect companion for your daily hydration needs while helping reduce plastic waste. Made from sustainable materials, this bottle is both durable and environmentally friendly.</p>
          <p>Features:</p>
          <ul>
            <li>BPA-free stainless steel construction</li>
            <li>Double-wall insulation keeps drinks cold for 24 hours or hot for 12 hours</li>
            <li>Leak-proof lid design</li>
            <li>Available in various colors and sizes</li>
            <li>Easy to clean and dishwasher safe</li>
          </ul>
          <p>By choosing our eco-friendly water bottle, you're making a positive impact on the environment by reducing single-use plastic waste.</p>`,
          shortDescription: "Sustainable stainless steel water bottle that keeps your drinks at the perfect temperature.",
          images: [
            {
              id: "img1",
              url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
              thumbnailUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100",
              altText: "Eco-friendly water bottle in green"
            },
            {
              id: "img2",
              url: "https://images.unsplash.com/photo-1578096095672-c9e142fd3b11",
              thumbnailUrl: "https://images.unsplash.com/photo-1578096095672-c9e142fd3b11?w=100",
              altText: "Eco-friendly water bottle side view"
            },
            {
              id: "img3",
              url: "https://images.unsplash.com/photo-1605274280925-9dd1baacb97b",
              thumbnailUrl: "https://images.unsplash.com/photo-1605274280925-9dd1baacb97b?w=100",
              altText: "Eco-friendly water bottle with cap removed"
            }
          ],
          basePrice: 250000,
          baseOriginalPrice: 300000,
          brand: {
            id: "brand1",
            name: "EcoLife"
          },
          categories: [
            {
              id: "cat1",
              name: "Kitchen",
              slug: "kitchen"
            },
            {
              id: "cat2",
              name: "Water Bottles",
              slug: "water-bottles"
            }
          ],
          attributes: [
            {
              id: "color",
              name: "Color",
              value: "Various"
            },
            {
              id: "size",
              name: "Size",
              value: "Various"
            },
            {
              id: "material",
              name: "Material",
              value: "Stainless Steel"
            }
          ],
          variants: [
            {
              id: "var1",
              sku: "ECO-WB-001-GRN-S",
              price: 250000,
              originalPrice: 300000,
              stock: 15,
              attributes: [
                {
                  id: "color",
                  name: "Color",
                  value: "Green"
                },
                {
                  id: "size",
                  name: "Size",
                  value: "500ml"
                }
              ],
              imageId: "img1"
            },
            {
              id: "var2",
              sku: "ECO-WB-001-BLU-S",
              price: 250000,
              originalPrice: 300000,
              stock: 10,
              attributes: [
                {
                  id: "color",
                  name: "Color",
                  value: "Blue"
                },
                {
                  id: "size",
                  name: "Size",
                  value: "500ml"
                }
              ],
              imageId: "img2"
            },
            {
              id: "var3",
              sku: "ECO-WB-001-GRN-L",
              price: 300000,
              originalPrice: 350000,
              stock: 8,
              attributes: [
                {
                  id: "color",
                  name: "Color",
                  value: "Green"
                },
                {
                  id: "size",
                  name: "Size",
                  value: "750ml"
                }
              ],
              imageId: "img1"
            },
            {
              id: "var4",
              sku: "ECO-WB-001-BLU-L",
              price: 300000,
              originalPrice: 350000,
              stock: 0,
              attributes: [
                {
                  id: "color",
                  name: "Color",
                  value: "Blue"
                },
                {
                  id: "size",
                  name: "Size",
                  value: "750ml"
                }
              ],
              imageId: "img2"
            }
          ],
          averageRating: 4.5,
          reviewCount: 28,
          specifications: [
            {
              name: "Material",
              value: "18/8 Food-grade Stainless Steel"
            },
            {
              name: "Capacity",
              value: "500ml / 750ml"
            },
            {
              name: "Weight",
              value: "300g / 400g"
            },
            {
              name: "Dimensions",
              value: "7cm x 7cm x 22cm / 7cm x 7cm x 28cm"
            },
            {
              name: "Care Instructions",
              value: "Dishwasher safe, hand wash recommended"
            }
          ],
          stockStatus: 'in_stock'
        };
        
        setProduct(mockProduct);
        
        // Set the active image to the first image
        if (mockProduct.images.length > 0) {
          setActiveImage(mockProduct.images[0].url);
        }
        
        // Mock related products
        setRelatedProducts([
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
          },
          {
            id: "5",
            name: "Beeswax Food Wrap",
            slug: "beeswax-food-wrap",
            imageUrl: "https://images.unsplash.com/photo-1621844061203-3f31a2a7d6c6",
            price: 150000,
            averageRating: 4.3,
            reviewCount: 8,
            stockStatus: 'in_stock'
          }
        ]);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (slug) {
      fetchProductDetails();
    }
  }, [slug]);
  
  // Extract unique attribute values for selection
  const getAttributeOptions = (attributeName: string) => {
    if (!product) return [];
    
    const uniqueValues = new Set<string>();
    
    product.variants.forEach(variant => {
      const attribute = variant.attributes.find(attr => attr.name === attributeName);
      if (attribute) {
        uniqueValues.add(attribute.value);
      }
    });
    
    return Array.from(uniqueValues);
  };
  
  // Get available variants based on current attribute selections
  const getAvailableVariants = (attributeName: string, attributeValue: string) => {
    if (!product) return [];
    
    // Create a new selection object with the new attribute value
    const newSelections = {
      ...selectedAttributes,
      [attributeName]: attributeValue
    };
    
    // Find variants that match the current selection
    return product.variants.filter(variant => {
      // Check each selected attribute
      for (const [name, value] of Object.entries(newSelections)) {
        const attribute = variant.attributes.find(attr => attr.name === name);
        if (!attribute || attribute.value !== value) {
          return false;
        }
      }
      return true;
    });
  };
  
  // Handle attribute selection
  const handleAttributeSelect = (attributeName: string, attributeValue: string) => {
    // Update selected attributes
    const newSelections = {
      ...selectedAttributes,
      [attributeName]: attributeValue
    };
    setSelectedAttributes(newSelections);
    
    // Try to find a matching variant
    if (product) {
      const matchingVariant = product.variants.find(variant => {
        // Check if variant matches all selected attributes
        return Object.entries(newSelections).every(([name, value]) => {
          const attribute = variant.attributes.find(attr => attr.name === name);
          return attribute && attribute.value === value;
        });
      });
      
      if (matchingVariant) {
        setSelectedVariant(matchingVariant);
        
        // If variant has an associated image, set it as active
        if (matchingVariant.imageId) {
          const variantImage = product.images.find(img => img.id === matchingVariant.imageId);
          if (variantImage) {
            setActiveImage(variantImage.url);
          }
        }
        
        // Reset quantity if necessary
        if (selectedQuantity > matchingVariant.stock) {
          setSelectedQuantity(Math.max(1, matchingVariant.stock));
        }
      } else {
        setSelectedVariant(null);
      }
    }
  };
  
  // Check if an attribute option is available based on current selections
  const isAttributeOptionAvailable = (attributeName: string, attributeValue: string) => {
    if (!product) return false;
    
    // If no attributes are selected, all options are available
    if (Object.keys(selectedAttributes).length === 0) return true;
    
    // If this attribute is already selected, check other selections
    if (selectedAttributes[attributeName] === attributeValue) {
      // Create a selection object without this attribute
      const otherSelections = { ...selectedAttributes };
      delete otherSelections[attributeName];
      
      // If no other selections, this option is available
      if (Object.keys(otherSelections).length === 0) return true;
      
      // Check if any variant matches the other selections and this attribute value
      return product.variants.some(variant => {
        // Check this specific attribute value
        const thisAttribute = variant.attributes.find(attr => attr.name === attributeName);
        if (!thisAttribute || thisAttribute.value !== attributeValue) return false;
        
        // Check other selected attributes
        return Object.entries(otherSelections).every(([name, value]) => {
          const attribute = variant.attributes.find(attr => attr.name === name);
          return attribute && attribute.value === value;
        });
      });
    }
    
    // For other attributes, check if any variant matches all current selections plus this new one
    return product.variants.some(variant => {
      // Check this specific attribute value
      const thisAttribute = variant.attributes.find(attr => attr.name === attributeName);
      if (!thisAttribute || thisAttribute.value !== attributeValue) return false;
      
      // Check current selected attributes
      return Object.entries(selectedAttributes).every(([name, value]) => {
        const attribute = variant.attributes.find(attr => attr.name === name);
        return attribute && attribute.value === value;
      });
    });
  };
  
  // Handle quantity changes
  const handleQuantityChange = (newQuantity: number) => {
    if (selectedVariant) {
      // Ensure quantity is within bounds
      const boundedQuantity = Math.max(1, Math.min(newQuantity, selectedVariant.stock));
      setSelectedQuantity(boundedQuantity);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.variants.length > 0 && !selectedVariant) {
      // Show error if variant selection is required but not selected
      alert('Please select product options');
      return;
    }
    
    // Use selected variant or base product info
    const itemToAdd = {
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      imageUrl: activeImage || product.images[0].url,
      price: selectedVariant ? selectedVariant.price : product.basePrice,
      quantity: selectedQuantity,
      options: selectedVariant ? selectedVariant.attributes.map(attr => ({
        name: attr.name,
        value: attr.value
      })) : [],
      stock: selectedVariant ? selectedVariant.stock : 999, // Default high stock if no variant
    };
    
    addToCart(itemToAdd);
  };
  
  // Find unique attribute types in the product
  const getAttributeTypes = () => {
    if (!product || product.variants.length === 0) return [];
    
    const attributeNames = new Set<string>();
    
    product.variants.forEach(variant => {
      variant.attributes.forEach(attr => {
        attributeNames.add(attr.name);
      });
    });
    
    return Array.from(attributeNames);
  };
  
  // Loading skeleton
  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-8 animate-pulse">
            {/* Image skeleton */}
            <div className="md:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="flex mt-4 gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded mb-6 w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Error state
  if (error) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Product</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button asChild>
              <Link to="/products">Browse Other Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // If product is not found
  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="bg-gray-50 border rounded-lg p-6 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Calculate the current price and check if there's a sale
  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const originalPrice = selectedVariant ? selectedVariant.originalPrice : product.baseOriginalPrice;
  const isOnSale = originalPrice && currentPrice < originalPrice;
  
  // Check current stock status
  const isOutOfStock = selectedVariant ? selectedVariant.stock === 0 : product.stockStatus === 'out_of_stock';
  const isLowStock = selectedVariant ? selectedVariant.stock <= 5 && selectedVariant.stock > 0 : product.stockStatus === 'low_stock';
  const stockCount = selectedVariant ? selectedVariant.stock : product.variants.reduce((sum, v) => sum + v.stock, 0);
  
  return (
    <Layout>
      <div className="container-custom py-6">
        {/* Breadcrumb */}
        <div className="flex text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-eco-primary">Home</Link>
          <span className="mx-2">/</span>
          {product.categories[0] && (
            <>
              <Link to={`/category/${product.categories[0].slug}`} className="hover:text-eco-primary">
                {product.categories[0].name}
              </Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-gray-800">{product.name}</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            {/* Main image */}
            <div className="border rounded-lg overflow-hidden bg-white">
              <img 
                src={activeImage || product.images[0].url} 
                alt={product.name}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            
            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                {product.images.map(image => (
                  <button
                    key={image.id}
                    onClick={() => setActiveImage(image.url)}
                    className={`w-16 h-16 rounded-md border overflow-hidden flex-shrink-0 ${
                      activeImage === image.url ? 'border-eco-primary ring-1 ring-eco-primary' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image.thumbnailUrl || image.url} 
                      alt={image.altText || ''}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            {/* Back button (mobile only) */}
            <div className="md:hidden mb-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/products" className="flex items-center">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Products
                </Link>
              </Button>
            </div>
            
            {/* Product title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Brand */}
            {product.brand && (
              <div className="mb-4">
                <Link to={`/brand/${product.brand.name.toLowerCase()}`} className="text-eco-primary hover:underline">
                  {product.brand.name}
                </Link>
              </div>
            )}
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                {product.averageRating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold">
                  {formatPrice(currentPrice)}
                </span>
                {isOnSale && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    {formatPrice(originalPrice!)}
                  </span>
                )}
                {isOnSale && (
                  <Badge variant="destructive" className="ml-3">
                    {Math.round(((originalPrice! - currentPrice) / originalPrice!) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Short description */}
            {product.shortDescription && (
              <div className="text-gray-600 mb-6">
                <p>{product.shortDescription}</p>
              </div>
            )}
            
            {/* Stock status */}
            <div className="mb-6">
              {isOutOfStock ? (
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  Out of Stock
                </Badge>
              ) : isLowStock ? (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  Only {stockCount} left
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  In Stock
                </Badge>
              )}
            </div>
            
            {/* Variant selection */}
            {product.variants.length > 0 && (
              <div className="space-y-4 mb-6">
                {getAttributeTypes().map(attributeName => (
                  <div key={attributeName}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {attributeName}:
                      {selectedAttributes[attributeName] && (
                        <span className="ml-1 font-normal text-gray-500">
                          {selectedAttributes[attributeName]}
                        </span>
                      )}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {getAttributeOptions(attributeName).map(value => {
                        const isAvailable = isAttributeOptionAvailable(attributeName, value);
                        const isSelected = selectedAttributes[attributeName] === value;
                        
                        return (
                          <button
                            key={value}
                            onClick={() => isAvailable && handleAttributeSelect(attributeName, value)}
                            className={`px-3 py-1 rounded-md border text-sm ${
                              isSelected 
                                ? 'bg-eco-primary text-white border-eco-primary' 
                                : isAvailable
                                  ? 'bg-white hover:border-eco-primary hover:text-eco-primary'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={!isAvailable}
                          >
                            {value}
                            {isSelected && <Check className="w-3 h-3 inline-block ml-1" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <label className="text-sm font-medium text-gray-700 mr-3">Quantity:</label>
              <div className="flex border rounded-md">
                <button
                  onClick={() => handleQuantityChange(selectedQuantity - 1)}
                  disabled={selectedQuantity <= 1 || isOutOfStock}
                  className="px-3 py-2 border-r hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 w-12 text-center">
                  {selectedQuantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(selectedQuantity + 1)}
                  disabled={
                    isOutOfStock || 
                    (selectedVariant && selectedQuantity >= selectedVariant.stock)
                  }
                  className="px-3 py-2 border-l hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="mb-8">
              <Button 
                onClick={handleAddToCart}
                disabled={isOutOfStock || (product.variants.length > 0 && !selectedVariant)}
                className="w-full h-12 bg-eco-primary hover:bg-eco-dark"
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            </div>
            
            {/* SKU and categories */}
            <div className="text-sm text-gray-500 space-y-2">
              <div>
                <span className="font-medium text-gray-700">SKU:</span> {selectedVariant ? selectedVariant.sku : product.sku}
              </div>
              {product.categories.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Categories:</span>{" "}
                  {product.categories.map((cat, index) => (
                    <span key={cat.id}>
                      <Link to={`/category/${cat.slug}`} className="hover:underline">
                        {cat.name}
                      </Link>
                      {index < product.categories.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b">
              <TabsTrigger value="description" className="flex-1 sm:flex-none">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="flex-1 sm:flex-none">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 sm:flex-none">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-4">
              <div dangerouslySetInnerHTML={{ __html: product.description }} className="prose max-w-none" />
            </TabsContent>
            
            <TabsContent value="specifications" className="p-4">
              {product.specifications && product.specifications.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="border-b pb-2">
                      <span className="font-medium text-gray-700">{spec.name}:</span> {spec.value}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No specifications available.</p>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="p-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(product.averageRating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      Based on {product.reviewCount} reviews
                    </span>
                  </div>
                </div>
                
                <Button>Write a Review</Button>
              </div>
              
              {/* Mock reviews */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">John D.</span>
                    <span className="text-sm text-gray-500">2 weeks ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 5
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    Great bottle! Keeps my water cold all day even in hot weather. The design is sleek and it's easy to clean.
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Sarah M.</span>
                    <span className="text-sm text-gray-500">1 month ago</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    This bottle is perfect for my daily use. The insulation works well and I love the color. Only giving 4 stars because the lid can be a bit tricky to clean thoroughly.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        <div className="mt-12">
          <ProductList
            title="You May Also Like"
            products={relatedProducts}
            columns={4}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
