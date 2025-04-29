
import React from 'react';
import { Link } from 'react-router-dom';
import { ProductSummary } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: ProductSummary;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
    if (product.stockStatus !== 'out_of_stock') {
      addToCart({
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1,
        options: [],
        stock: 10, // This would come from the product data
      });
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="group relative flex flex-col h-full">
      <Link to={`/product/${product.slug}`} className="flex flex-col h-full">
        <div className="relative overflow-hidden rounded-md bg-gray-100 aspect-square">
          {/* Product image */}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" 
          />
          
          {/* Sale badge */}
          {product.originalPrice && product.price < product.originalPrice && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              Sale
            </Badge>
          )}
          
          {/* Stock status badge */}
          {product.stockStatus === 'out_of_stock' && (
            <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                Out of Stock
              </Badge>
            </div>
          )}
          {product.stockStatus === 'low_stock' && (
            <Badge className="absolute bottom-2 right-2 bg-amber-500">
              Low Stock
            </Badge>
          )}
          
          {/* Quick add button */}
          {product.stockStatus !== 'out_of_stock' && (
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/90 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <Button 
                onClick={handleAddToCart} 
                variant="secondary" 
                className="w-full bg-eco-secondary text-white hover:bg-eco-primary"
              >
                Quick Add
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex-grow flex flex-col mt-3 p-1">
          {/* Product name */}
          <h3 className="font-medium text-sm sm:text-base line-clamp-2">{product.name}</h3>
          
          {/* Reviews if available */}
          {(product.averageRating !== undefined && product.reviewCount !== undefined) && (
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.round(product.averageRating || 0)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="mt-auto pt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-medium">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.price < product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
