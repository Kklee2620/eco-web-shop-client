
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Sample FAQ data
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I place an order?',
      answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the steps to enter your shipping and payment information to complete your purchase.',
      category: 'orders',
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment gateway.',
      category: 'payments',
    },
    {
      id: '3',
      question: 'How long does shipping take?',
      answer: 'Shipping times vary depending on your location. Domestic orders typically arrive within 3-5 business days, while international orders may take 7-14 business days. You can track your order using the tracking number provided in your shipping confirmation email.',
      category: 'shipping',
    },
    {
      id: '4',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping fees and delivery times vary by location. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the customer.',
      category: 'shipping',
    },
    {
      id: '5',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most products. Items must be unused, in their original packaging, and in resalable condition. To initiate a return, please contact our customer service team with your order number and reason for return.',
      category: 'returns',
    },
    {
      id: '6',
      question: 'Are your products truly eco-friendly?',
      answer: 'Yes, all our products are carefully selected or designed to be environmentally friendly. We use sustainable materials, minimize packaging waste, and ensure ethical production practices. Each product listing includes information about its eco-friendly features and materials.',
      category: 'products',
    },
    {
      id: '7',
      question: 'How do I care for my eco-friendly products?',
      answer: 'Care instructions vary by product. Generally, we recommend gentle cleaning methods and avoiding harsh chemicals. Specific care instructions are included with each product and can also be found on the product description page on our website.',
      category: 'products',
    },
    {
      id: '8',
      question: 'Do you offer wholesale options?',
      answer: 'Yes, we offer wholesale options for businesses interested in our products. Please contact our sales team at wholesale@ecoshop.com with information about your business and which products you're interested in.',
      category: 'business',
    },
  ];
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'orders', name: 'Orders' },
    { id: 'payments', name: 'Payments' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'products', name: 'Products' },
    { id: 'business', name: 'Business' },
  ];
  
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
            <div className="flex-grow">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="h-11"
              />
            </div>
            <Button type="submit" variant="outline" size="icon" className="h-11 w-11">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg border sticky top-4">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition ${
                      activeCategory === category.id 
                        ? 'bg-eco-light text-eco-primary font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border rounded-lg overflow-hidden bg-white">
                    <AccordionTrigger className="px-4 py-4 hover:bg-gray-50">
                      <span className="text-left font-medium">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0">
                      <p className="text-gray-600">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="bg-white border rounded-lg p-8 text-center">
                <p className="text-lg mb-2">No matching questions found</p>
                <p className="text-gray-600">Try adjusting your search term or category filter</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-12 bg-eco-light rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer to your question, please contact us.
          </p>
          <Button 
            asChild
            className="bg-eco-primary hover:bg-eco-primary/90"
          >
            <a href="/contact">Contact Support</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
