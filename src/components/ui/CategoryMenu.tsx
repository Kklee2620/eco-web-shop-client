
import React, { useState, useEffect } from 'react';
import { CategoryNode } from '@/types';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryMenuProps {
  className?: string;
}

// Mock API function - will be replaced with real API call
const mockFetchCategories = async (): Promise<CategoryNode[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Example data
  return [
    {
      id: "1",
      name: "Kitchen",
      slug: "kitchen",
      imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
      children: [
        {
          id: "1-1",
          name: "Utensils",
          slug: "kitchen-utensils",
          children: [],
          imageUrl: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c"
        },
        {
          id: "1-2",
          name: "Storage",
          slug: "kitchen-storage",
          children: [],
          imageUrl: "https://images.unsplash.com/photo-1584473457493-56c4cfb4ea36"
        }
      ]
    },
    {
      id: "2",
      name: "Bathroom",
      slug: "bathroom",
      imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
      children: [
        {
          id: "2-1",
          name: "Oral Care",
          slug: "oral-care",
          children: [],
          imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04"
        },
        {
          id: "2-2",
          name: "Body Care",
          slug: "body-care",
          children: [],
          imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70e758"
        }
      ]
    },
    {
      id: "3",
      name: "Living Room",
      slug: "living-room",
      imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
      children: []
    },
    {
      id: "4",
      name: "Bedroom",
      slug: "bedroom",
      imageUrl: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
      children: []
    },
    {
      id: "5",
      name: "Office",
      slug: "office",
      imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
      children: []
    }
  ];
};

const CategoryMenu: React.FC<CategoryMenuProps> = ({ className }) => {
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const data = await mockFetchCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleMouseEnter = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className={cn("bg-white border rounded-md shadow", className)}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-3 border-b animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  // Render error message
  if (error) {
    return (
      <div className={cn("bg-white border rounded-md shadow p-4", className)}>
        <p className="text-red-500">{error}</p>
        <button 
          className="mt-2 text-eco-primary hover:underline"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div 
      className={cn("bg-white border rounded-md shadow", className)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-3 border-b bg-eco-light">
        <h2 className="font-medium">Shop by Category</h2>
      </div>
      <ul>
        {categories.map(category => (
          <li key={category.id} className="border-b last:border-0">
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(category.id)}
            >
              <Link
                to={`/category/${category.slug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <span>{category.name}</span>
                {category.children.length > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </Link>
              
              {/* Mega menu for subcategories */}
              {category.children.length > 0 && activeCategory === category.id && (
                <div className="absolute top-0 left-full ml-0 w-64 md:w-96 bg-white border rounded-md shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{category.name}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {category.children.map(subCategory => (
                        <Link
                          key={subCategory.id}
                          to={`/category/${subCategory.slug}`}
                          className="p-2 hover:bg-gray-50 rounded-md flex items-center"
                        >
                          {subCategory.imageUrl && (
                            <img 
                              src={subCategory.imageUrl} 
                              alt={subCategory.name}
                              className="w-8 h-8 rounded object-cover mr-2" 
                            />
                          )}
                          <span className="text-sm">{subCategory.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Link 
                        to={`/category/${category.slug}`}
                        className="text-eco-primary hover:underline text-sm"
                      >
                        View all {category.name}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
