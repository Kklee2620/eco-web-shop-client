
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import SearchBar from '@/components/common/SearchBar';
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { cartItemCount, openCart } = useCart();
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Mock navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={cn("sticky top-0 bg-white border-b z-40", className)}>
      {/* Top bar */}
      <div className="bg-eco-primary text-white py-2">
        <div className="container-custom text-center text-sm">
          Free shipping on orders over 500,000₫
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-eco-primary flex items-center">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-6 h-6 mr-2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            EcoShop
          </Link>

          {/* Desktop navigation - hidden on mobile */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.href}
                className="text-gray-600 hover:text-eco-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - hidden on mobile */}
            <div className="hidden md:block w-full max-w-xs">
              <SearchBar />
            </div>

            {/* Favorites */}
            <Link 
              to="/favorites"
              className="p-2 text-gray-600 hover:text-eco-primary relative hidden sm:block"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="p-2 text-gray-600 hover:text-eco-primary relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-eco-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* User menu */}
            {user?.isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm font-medium text-gray-700 hover:text-eco-primary focus:outline-none">
                    <div className="w-8 h-8 rounded-full bg-eco-primary text-white flex items-center justify-center mr-1">
                      {user.avatarUrl ? (
                        <img 
                          src={user.avatarUrl} 
                          alt={user.name || 'User'} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <span className="hidden md:block">{user.name}</span>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:block">
                <Button 
                  asChild
                  variant="outline" 
                  className="border-eco-primary text-eco-primary hover:bg-eco-light"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Search bar for mobile - always visible */}
        <div className="mt-4 md:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Mobile navigation menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out overflow-auto ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-eco-primary">EcoShop</Link>
            <button 
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block py-2 text-gray-600 hover:text-eco-primary"
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t">
                <Link
                  to="/favorites"
                  className="flex items-center py-2 text-gray-600 hover:text-eco-primary"
                  onClick={toggleMobileMenu}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Favorites
                </Link>
              </li>
              {!user?.isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center py-2 text-gray-600 hover:text-eco-primary"
                      onClick={toggleMobileMenu}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="flex items-center py-2 text-gray-600 hover:text-eco-primary"
                      onClick={toggleMobileMenu}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {user?.isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/account"
                      className="flex items-center py-2 text-gray-600 hover:text-eco-primary"
                      onClick={toggleMobileMenu}
                    >
                      <User className="w-5 h-5 mr-2" />
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="flex items-center py-2 text-gray-600 hover:text-eco-primary"
                      onClick={toggleMobileMenu}
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                      className="flex items-center py-2 text-gray-600 hover:text-eco-primary w-full text-left"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
