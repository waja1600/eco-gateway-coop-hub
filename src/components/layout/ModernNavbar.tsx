
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building, 
  Briefcase, 
  Scale, 
  FileText, 
  Vote,
  Bell,
  Settings,
  Globe,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";

const gateways = [
  { name: 'الشراء التعاوني', path: '/gateways/group-buying', icon: Users, description: 'مجموعات الشراء والتفاوض' },
  { name: 'التسويق التعاوني', path: '/gateways/cooperative-marketing', icon: Building, description: 'الحملات والمشاريع المشتركة' },
  { name: 'تأسيس الشركات', path: '/gateways/company-incorporation', icon: Building, description: 'إنشاء الكيانات القانونية' },
  { name: 'الموردين والمستقلين', path: '/gateways/suppliers-freelancers', icon: Briefcase, description: 'منصة الخدمات المتخصصة' },
  { name: 'توثيق العقود', path: '/gateways/contract-verification', icon: FileText, description: 'إدارة المستندات والعقود' },
  { name: 'التحكيم التجاري', path: '/arbitration', icon: Scale, description: 'نظام ORDA للنزاعات' }
];

const services = [
  { name: 'لوحة التحكم', path: '/gpo-dashboard', icon: Settings },
  { name: 'مساحة العمل', path: '/workspace', icon: Users },
  { name: 'نظام التصويت', path: '/voting', icon: Vote },
  { name: 'إدارة العقود', path: '/contracts', icon: FileText },
  { name: 'إدارة المستندات', path: '/documents', icon: FileText },
  { name: 'الإشعارات', path: '/notifications', icon: Bell },
  { name: 'النظام', path: '/system', icon: Settings }
];

export function ModernNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 hidden md:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span className="hidden font-bold sm:inline-block text-blue-900">
              Co-op Gateway
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                البوابات الرئيسية
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                  {gateways.map((gateway) => {
                    const IconComponent = gateway.icon;
                    return (
                      <ListItem
                        key={gateway.name}
                        title={gateway.name}
                        href={gateway.path}
                        className="hover:bg-blue-50"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{gateway.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{gateway.description}</p>
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                الخدمات
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                      <ListItem
                        key={service.name}
                        title={service.name}
                        href={service.path}
                        className="hover:bg-green-50"
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-green-600" />
                          <span>{service.name}</span>
                        </div>
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                href="/role-selection"
              >
                اختيار الدور
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:flex bg-blue-50 text-blue-700">
              GPO Platform
            </Badge>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/notifications')}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
            >
              تسجيل الدخول
            </Button>

            <Button
              size="sm"
              onClick={() => navigate('/register')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              إنشاء حساب
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b shadow-lg md:hidden">
            <div className="container py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">البوابات الرئيسية</h3>
                  <div className="space-y-2">
                    {gateways.map((gateway) => {
                      const IconComponent = gateway.icon;
                      return (
                        <a
                          key={gateway.name}
                          href={gateway.path}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{gateway.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">الخدمات</h3>
                  <div className="space-y-2">
                    {services.slice(0, 4).map((service) => {
                      const IconComponent = service.icon;
                      return (
                        <a
                          key={service.name}
                          href={service.path}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <IconComponent className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{service.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
