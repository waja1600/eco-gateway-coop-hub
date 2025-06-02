
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Menu, X, Users, Briefcase, DollarSign, Building, Megaphone, ShoppingCart, Vote, FileText, Bell, Globe } from 'lucide-react';

export function ModernNavbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: 'Gateways Hub',
      icon: Globe,
      path: '/gateways',
      description: 'Explore all cooperative gateways'
    },
    {
      title: 'Group Buying',
      icon: ShoppingCart,
      path: '/gateways/group-buying',
      description: 'Join group purchases for better prices'
    },
    {
      title: 'Marketing Co-op',
      icon: Megaphone,
      path: '/gateways/cooperative-marketing',
      description: 'Collaborative marketing campaigns'
    },
    {
      title: 'Incorporation',
      icon: Building,
      path: '/gateways/company-incorporation',
      description: 'Company formation services'
    },
    {
      title: 'Suppliers & Freelancers',
      icon: Briefcase,
      path: '/gateways/suppliers-freelancers',
      description: 'Find professionals and suppliers'
    },
    {
      title: 'Voting',
      icon: Vote,
      path: '/voting',
      description: 'Participate in governance'
    },
    {
      title: 'Contracts',
      icon: FileText,
      path: '/contracts',
      description: 'Manage your contracts'
    },
    {
      title: 'Notifications',
      icon: Bell,
      path: '/notifications',
      description: 'Stay updated'
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GPO</span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-gray-900">
                GPO Smart Platform
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => navigate(item.path)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Button>
              );
            })}
            
            {/* More Dropdown for remaining items */}
            <div className="relative group">
              <Button
                variant="ghost"
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Menu className="h-4 w-4" />
                <span className="text-sm font-medium">More</span>
              </Button>
              
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationItems.slice(4).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-blue-600"
            >
              Log in
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Sign up
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-3 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
