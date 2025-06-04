import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

export function ModernNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'البوابات', href: '/gateways', icon: Building },
    { name: 'مساحة العمل', href: '/workspace', icon: Users },
    { name: 'الحوكمة', href: '/governance', icon: Vote },
    { name: 'التصويت', href: '/voting', icon: Users },
    { name: 'العقود', href: '/contracts', icon: FileText },
    { name: 'الإشعارات', href: '/notifications', icon: Bell },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <span className="font-bold text-xl text-gray-900">
              GPO Smart Platform
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="font-medium"
                onClick={() => navigate(item.href)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="py-4 px-6 border-b">
                    <span className="font-bold text-lg text-gray-900">
                      GPO Smart Platform
                    </span>
                  </div>
                  <div className="flex-grow overflow-y-auto">
                    <div className="flex flex-col divide-y">
                      {navItems.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className="w-full justify-start py-2 px-6 font-medium"
                          onClick={() => {
                            navigate(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          {item.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="py-4 px-6 border-t">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      الإعدادات
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      الدعم
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      تسجيل الخروج
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Profile Section */}
          <div className="hidden md:flex items-center ml-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="ml-2 font-medium text-gray-700">
              أحمد حسن
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
