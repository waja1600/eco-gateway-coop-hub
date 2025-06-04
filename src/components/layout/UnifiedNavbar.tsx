
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Building,
  Users,
  Vote,
  FileText,
  Bell,
  Menu,
  Settings,
  HelpCircle,
  LogOut,
  Globe,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

export function UnifiedNavbar() {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: t('nav.home'), nameAr: 'الرئيسية', href: '/', icon: Home },
    { name: t('nav.gateways'), nameAr: 'البوابات', href: '/gateways', icon: Building },
    { name: t('nav.workspace'), nameAr: 'مساحة العمل', href: '/workspace', icon: Briefcase },
    { name: t('nav.governance'), nameAr: 'الحوكمة', href: '/governance', icon: Vote },
    { name: t('nav.voting'), nameAr: 'التصويت', href: '/voting', icon: BarChart3 },
    { name: t('nav.contracts'), nameAr: 'العقود', href: '/contracts', icon: FileText },
    { name: t('nav.notifications'), nameAr: 'الإشعارات', href: '/notifications', icon: Bell },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={isActivePath(item.href) ? "default" : "ghost"}
                size="sm"
                className={`font-medium transition-colors ${
                  isActivePath(item.href) 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">{item.nameAr}</span>
              </Button>
            ))}
          </div>

          {/* Quality Badges */}
          <div className="hidden lg:flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              <Globe className="h-3 w-3 mr-1" />
              WTO Certified
            </Badge>
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              Harvard Business Standards
            </Badge>
            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
              ISO 9001:2015
            </Badge>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0 bg-white">
                <div className="flex flex-col h-full">
                  <div className="py-6 px-6 border-b border-slate-200">
                    <div className="flex items-center">
                      <Building className="h-6 w-6 text-blue-600" />
                      <span className="ml-2 font-bold text-lg text-slate-900">
                        Global Cooperative
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow overflow-y-auto">
                    <div className="py-4">
                      {navItems.map((item) => (
                        <Button
                          key={item.href}
                          variant="ghost"
                          className={`w-full justify-start py-3 px-6 font-medium ${
                            isActivePath(item.href) 
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600" 
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                          onClick={() => {
                            navigate(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.nameAr}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="py-4 px-6 border-t border-slate-200 bg-slate-50">
                    <div className="space-y-2">
                      <Badge variant="outline" className="w-full text-xs bg-blue-50 text-blue-700 border-blue-200">
                        <Globe className="h-3 w-3 mr-1" />
                        WTO Certified
                      </Badge>
                      <Badge variant="outline" className="w-full text-xs bg-green-50 text-green-700 border-green-200">
                        Harvard Standards
                      </Badge>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
