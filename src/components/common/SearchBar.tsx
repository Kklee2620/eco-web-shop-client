
import React, { useState, useRef, useEffect } from "react";
import { SearchSuggestion } from "@/types";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  className?: string;
}

// Mock API function - will be replaced with real API call
const mockSearchSuggestions = async (query: string): Promise<SearchSuggestion[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query) return [];
  
  // Example suggestions with proper type annotations
  return [
    {
      type: "product" as const,
      id: "1",
      name: "Eco-friendly Water Bottle",
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      url: "/product/eco-friendly-water-bottle"
    },
    {
      type: "product" as const,
      id: "2",
      name: "Bamboo Toothbrush",
      imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
      url: "/product/bamboo-toothbrush"
    },
    {
      type: "category" as const,
      id: "3",
      name: "Kitchen",
      url: "/category/kitchen"
    },
    {
      type: "query" as const,
      name: "eco-friendly products",
      url: "/search?q=eco-friendly%20products"
    }
  ].filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search function
  const fetchSuggestions = debounce(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const results = await mockSearchSuggestions(query);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsFocused(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (url: string) => {
    navigate(url);
    setIsFocused(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          className="pl-10 pr-10 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-eco-primary"
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" 
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </form>

      {/* Suggestions dropdown */}
      {isFocused && searchQuery && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg max-h-96 overflow-y-auto border border-gray-200">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li 
                  key={`${suggestion.type}-${suggestion.id || index}`}
                  className="border-b border-gray-100 last:border-0"
                >
                  <button
                    onClick={() => handleSuggestionClick(suggestion.url)}
                    className="w-full text-left p-3 flex items-center hover:bg-gray-50"
                  >
                    {suggestion.type === 'product' && suggestion.imageUrl && (
                      <img 
                        src={suggestion.imageUrl} 
                        alt={suggestion.name}
                        className="w-10 h-10 rounded object-cover mr-3" 
                      />
                    )}
                    <div>
                      <span className="block text-sm font-medium">{suggestion.name}</span>
                      <span className="text-xs text-gray-500 capitalize">{suggestion.type}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
