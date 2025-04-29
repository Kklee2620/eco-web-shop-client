
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Returns: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">Returns & Exchanges</h1>
        
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Our Return Policy</h2>
          <p className="mb-4">
            We want you to be completely satisfied with your purchase. If you're not happy with your order for any reason, we accept returns within 30 days of delivery.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-center">30-Day Returns</h3>
                <p className="text-gray-600 text-center text-sm">
                  Return any item within 30 days of receiving your order for a full refund or exchange.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-center">Money-Back Guarantee</h3>
                <p className="text-gray-600 text-center text-sm">
                  We'll refund your purchase price and standard shipping costs for eligible returns.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 text-center">Easy Process</h3>
                <p className="text-gray-600 text-center text-sm">
                  Simple online return process with a prepaid return shipping label for domestic returns.
                </p>
              </CardContent>
            </Card>
          </div>
          <p>
            To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. Certain products may be exempt from our return policy for hygiene reasons.
          </p>
        </div>
        
        <div className="space-y-8 mb-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">How to Return an Item</h2>
            <div className="bg-white border rounded-lg p-6">
              <ol className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-eco-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Contact Us</h3>
                    <p className="text-gray-600">
                      Email our customer service team at returns@ecoshop.com or call us at (84) 123-456-789. Please include your order number and reason for return.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-eco-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Receive Return Authorization</h3>
                    <p className="text-gray-600">
                      Once your return is approved, we'll send you a return authorization number and a prepaid shipping label (for domestic returns only).
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-eco-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Package Your Return</h3>
                    <p className="text-gray-600">
                      Pack the item securely in its original packaging if possible. Include the return authorization number with your package.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-eco-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Ship Your Return</h3>
                    <p className="text-gray-600">
                      Attach the prepaid shipping label to your package and drop it off at a post office or courier location as instructed.
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-eco-primary text-white rounded-full flex items-center justify-center font-semibold mr-4">
                    5
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Receive Your Refund or Exchange</h3>
                    <p className="text-gray-600">
                      Once we receive and inspect your return, we'll process your refund or send your exchange item. Refunds typically take 5-10 business days to appear in your account.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="bg-white border rounded-lg">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <span className="text-left font-medium">How long do I have to return an item?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-gray-600">
                      You have 30 days from the date of delivery to initiate a return. After this period, we cannot accept returns.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <span className="text-left font-medium">Do I have to pay for return shipping?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-gray-600">
                      For domestic returns, we provide a prepaid shipping label at no cost to you. For international returns, the customer is responsible for return shipping costs.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <span className="text-left font-medium">How long will it take to process my refund?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-gray-600">
                      Once we receive your return, it typically takes 1-3 business days to inspect it and process your refund. After that, it may take 5-10 business days for the refund to appear in your account, depending on your payment method and financial institution.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <span className="text-left font-medium">Can I exchange an item instead of returning it?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-gray-600">
                      Yes, we offer exchanges for items of equal or lesser value. If you exchange for an item of greater value, you'll need to pay the difference. Please specify that you want an exchange when you contact our customer service team.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <span className="text-left font-medium">What items cannot be returned?</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <p className="text-gray-600">
                      For hygiene reasons, certain items cannot be returned once opened or used, including personal care products, food items, and intimate products. Sale items marked as "final sale" cannot be returned.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        
        <div className="bg-eco-light rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-3">Need Help with a Return?</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            If you have any questions about our return policy or need assistance with a return, our customer service team is here to help.
          </p>
          <Button 
            asChild
            className="bg-eco-primary hover:bg-eco-primary/90"
          >
            <a href="/contact">Contact Support <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
