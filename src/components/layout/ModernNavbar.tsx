
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Menu, X, Users, Briefcase, DollarSign, Building, Megaphone, ShoppingCart, Vote, FileText, Bell, Globe, Scale, FileCheck } from 'lucide-react';

export function ModernNavbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: 'Gateways Hub',
      titleAr: 'مركز البوابات',
      icon: Globe,
      path: '/gateways',
      description: 'Explore all cooperative gateways',
      descriptionAr: 'استكشف جميع البوابات التعاونية'
    },
    {
      title: 'Group Buying',
      titleAr: 'الشراء الجماعي',
      icon: ShoppingCart,
      path: '/gateways/group-buying',
      description: 'Join group purchases for better prices',
      descriptionAr: 'انضم للمشتريات الجماعية لأسعار أفضل'
    },
    {
      title: 'Marketing Co-op',
      titleAr: 'التسويق التعاوني',
      icon: Megaphone,
      path: '/gateways/cooperative-marketing',
      description: 'Collaborative marketing campaigns',
      descriptionAr: 'حملات تسويقية تعاونية'
    },
    {
      title: 'Incorporation',
      titleAr: 'تأسيس الشركات',
      icon: Building,
      path: '/gateways/company-incorporation',
      description: 'Company formation services',
      descriptionAr: 'خدمات تأسيس الشركات'
    },
    {
      title: 'Suppliers & Freelancers',
      titleAr: 'الموردون والمستقلون',
      icon: Briefcase,
      path: '/gateways/suppliers-freelancers',
      description: 'Find professionals and suppliers',
      descriptionAr: 'اعثر على المحترفين والموردين'
    },
    {
      title: 'Commercial Arbitration',
      titleAr: 'التحكيم التجاري',
      icon: Scale,
      path: '/gateways/commercial-arbitration',
      description: 'Resolve business disputes',
      descriptionAr: 'حل النزاعات التجارية'
    },
    {
      title: 'Contract Verification',
      titleAr: 'توثيق العقود',
      icon: FileCheck,
      path: '/gateways/contract-verification',
      description: 'Verify and document contracts',
      descriptionAr: 'توثيق وإدارة العقود'
    },
    {
      title: 'Voting',
      titleAr: 'التصويت',
      icon: Vote,
      path: '/voting',
      description: 'Participate in governance',
      descriptionAr: 'شارك في الحوكمة'
    },
    {
      title: 'Contracts',
      titleAr: 'العقود',
      icon: FileText,
      path: '/contracts',
      description: 'Manage your contracts',
      descriptionAr: 'إدارة عقودك'
    },
    {
      title: 'Notifications',
      titleAr: 'الإشعارات',
      icon: Bell,
      path: '/notifications',
      description: 'Stay updated',
      descriptionAr: 'ابق على اطلاع'
    }
  ];

  const [currentLang, setCurrentLang] = useState('en');

  const isArabic = currentLang === 'ar';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50" dir={isArabic ? 'rtl' : 'ltr'}>
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
                {isArabic ? 'منصة GPO الذكية' : 'GPO Smart Platform'}
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
                  <span className="text-sm font-medium">
                    {isArabic ? item.titleAr : item.title}
                  </span>
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
                <span className="text-sm font-medium">
                  {isArabic ? 'المزيد' : 'More'}
                </span>
              </Button>
              
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
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
                          <div className="font-medium">
                            {isArabic ? item.titleAr : item.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {isArabic ? item.descriptionAr : item.description}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Auth Buttons & Language */}
          <div className="flex items-center space-x-3">
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">EN</option>
              <option value="ar">العربية</option>
            </select>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-blue-600"
            >
              {isArabic ? 'تسجيل الدخول' : 'Log in'}
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {isArabic ? 'إنشاء حساب' : 'Sign up'}
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
                    <div className="font-medium">
                      {isArabic ? item.titleAr : item.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {isArabic ? item.descriptionAr : item.description}
                    </div>
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
