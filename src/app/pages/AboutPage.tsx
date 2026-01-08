import React from 'react';
import { Users, Star, Truck, Headset } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const AboutPage: React.FC = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      role: 'Founder & CEO'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      role: 'Head Designer'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      role: 'Operations Manager'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      role: 'Customer Support Lead'
    }
  ];

  // Features data
  const features = [
    {
      icon: Star,
      title: 'Quality Products',
      description: 'We source only the finest materials and work with trusted manufacturers to ensure every piece meets our high standards.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Our efficient logistics network ensures your orders reach you quickly and safely, wherever you are.'
    },
    {
      icon: Headset,
      title: 'Customer Support',
      description: 'Our dedicated support team is always ready to assist you with any questions or concerns.'
    },
    {
      icon: Star,
      title: 'Affordable Prices',
      description: 'We believe in providing premium quality fashion at prices that are accessible to everyone.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
          alt="Fashion Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-2xl">Bringing quality fashion to everyone</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Who We Are Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-700 text-lg mb-6">
              Founded in 2020, ABC Fashion has been dedicated to bringing quality clothing to customers 
              across the country. What started as a small online store has grown into a beloved fashion 
              destination known for its stylish designs, affordable prices, and exceptional customer service.
            </p>
            <p className="text-gray-700 text-lg">
              Our mission is to make fashion accessible to everyone, regardless of budget or location. 
              We believe that everyone deserves to look and feel their best, and we're committed to 
              providing high-quality clothing that reflects the latest trends while maintaining timeless appeal.
            </p>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="bg-green-100 p-4 rounded-full mb-4">
                      <Icon className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="mx-auto mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@abc-fashion.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600">+84 123 456 789</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      123 Fashion Street, District 1<br />
                      Ho Chi Minh City, Vietnam
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Office Location</h3>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                  <span className="text-gray-500">Map Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;