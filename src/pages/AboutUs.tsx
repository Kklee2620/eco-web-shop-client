
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Heart, Globe } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At EcoShop, we're dedicated to making sustainable living accessible to everyone. We believe that small changes in everyday products can make a big difference for our planet.
          </p>
          <p className="text-gray-600">
            We carefully source and develop products that reduce waste, minimize environmental impact, and promote a healthier lifestyle for both people and the planet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-eco-light p-3 rounded-full mb-4">
                  <Leaf className="h-8 w-8 text-eco-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sustainable Materials</h3>
                <p className="text-gray-600">
                  All our products are made from renewable, recyclable, or biodegradable materials to minimize environmental impact.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-eco-light p-3 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-eco-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ethical Production</h3>
                <p className="text-gray-600">
                  We ensure fair wages and safe working conditions throughout our supply chain, supporting communities worldwide.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-eco-light p-3 rounded-full mb-4">
                  <Globe className="h-8 w-8 text-eco-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Carbon Neutral</h3>
                <p className="text-gray-600">
                  We offset our carbon emissions by investing in environmental projects and optimizing our shipping methods.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            EcoShop was founded in 2018 by a group of environmental enthusiasts who were frustrated by the lack of truly sustainable options in everyday products. What started as a small online shop has grown into a community of like-minded individuals committed to making eco-friendly choices.
          </p>
          <p className="text-gray-600">
            Today, we offer hundreds of products across multiple categories, helping thousands of customers reduce their environmental footprint without compromising on quality or style.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
