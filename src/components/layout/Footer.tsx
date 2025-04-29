
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [isSubscribeSuccess, setIsSubscribeSuccess] = useState<boolean | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setSubscribeMessage('Please enter a valid email address');
      setIsSubscribeSuccess(false);
      return;
    }

    setIsSubscribing(true);
    setSubscribeMessage('');
    setIsSubscribeSuccess(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      setSubscribeMessage('Thank you for subscribing to our newsletter!');
      setIsSubscribeSuccess(true);
      setNewsletterEmail('');
    } catch (error) {
      setSubscribeMessage('Failed to subscribe. Please try again.');
      setIsSubscribeSuccess(false);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-white border-t">
      {/* Newsletter section */}
      <div className="bg-eco-light py-12">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to get special offers, free giveaways, and eco-friendly tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="h-11 bg-eco-primary hover:bg-eco-dark"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {subscribeMessage && (
              <p className={`mt-2 text-sm ${isSubscribeSuccess ? 'text-green-600' : 'text-red-500'}`}>
                {subscribeMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About EcoShop</h3>
            <p className="text-gray-600 mb-4">
              We provide eco-friendly products to help you reduce waste and live a more sustainable lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-eco-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-eco-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-eco-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-eco-primary" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-eco-primary">All Products</Link>
              </li>
              <li>
                <Link to="/category/kitchen" className="text-gray-600 hover:text-eco-primary">Kitchen</Link>
              </li>
              <li>
                <Link to="/category/bathroom" className="text-gray-600 hover:text-eco-primary">Bathroom</Link>
              </li>
              <li>
                <Link to="/category/living-room" className="text-gray-600 hover:text-eco-primary">Living Room</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-eco-primary">Blog</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-eco-primary">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-eco-primary">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-eco-primary">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-eco-primary">Shipping & Delivery</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-eco-primary">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-eco-primary">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-eco-primary">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-eco-primary mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Eco Street, Dist 1<br />
                  Ho Chi Minh City, Vietnam
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-eco-primary mr-2" />
                <a href="tel:+84123456789" className="text-gray-600 hover:text-eco-primary">
                  (84) 123-456-789
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-eco-primary mr-2" />
                <a href="mailto:info@ecoshop.com" className="text-gray-600 hover:text-eco-primary">
                  info@ecoshop.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EcoShop. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968299.png" alt="Visa" className="h-8" />
              <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-8" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
