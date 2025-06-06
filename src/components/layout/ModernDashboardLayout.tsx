
import React, { ReactNode, useState } from 'react';
import { WorkspaceLayout } from './WorkspaceLayout';
import { BoxedContainer } from './BoxedContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Home,
  Briefcase,
  Vote,
  Shield,
  Activity,
  TrendingUp
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string;
  href?: string;
  isActive?: boolean;
}

interface ModernDashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  sidebarItems?: SidebarItem[];
  currentPath?: string;
}

export function ModernDashboardLayout({
  children,
  title,
  subtitle,
  sidebarItems,
  currentPath = '/'
}: ModernDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const defaultSidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: <LayoutDashboard className="h-5 w-5" />, href: '/dashboard', isActive: currentPath === '/dashboard' },
    { id: 'contracts', label: 'العقود', icon: <FileText className="h-5 w-5" />, badge: '5', href: '/contracts' },
    { id: 'groups', label: 'المجموعات', icon: <Users className="h-5 w-5" />, href: '/groups' },
    { id: 'voting', label: 'التصويت', icon: <Vote className="h-5 w-5" />, badge: '2', href: '/voting' },
    { id: 'governance', label: 'الحوكمة', icon: <Shield className="h-5 w-5" />, href: '/governance' },
    { id: 'workspace', label: 'المساحة الذكية', icon: <Briefcase className="h-5 w-5" />, href: '/workspace' },
    { id: 'settings', label: 'الإعدادات', icon: <Settings className="h-5 w-5" />, href: '/settings' }
  ];

  const items = sidebarItems || defaultSidebarItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <BoxedContainer 
            variant="glass" 
            className="h-full rounded-none border-r-2 border-blue-200"
          >
            <div className="flex items-center justify-between p-4 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-gray-800">المنصة الذكية</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                    item.isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'hover:bg-blue-50 text-gray-700 hover:text-blue-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge 
                      variant={item.isActive ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </a>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="p-4 border-t border-blue-200 mt-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">النشاط اليوم</span>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="font-medium">+12%</span>
                  </div>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Activity className="h-3 w-3" />
                  <span>75% من الأهداف اليومية</span>
                </div>
              </div>
            </div>
          </BoxedContainer>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:mr-64">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <BoxedContainer 
              variant="glass" 
              className="rounded-none border-b-2 border-blue-200"
            >
              <div className="flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="font-bold text-gray-800">{title || 'المنصة الذكية'}</h1>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </BoxedContainer>
          </div>

          {/* Content Area */}
          <WorkspaceLayout title={title} subtitle={subtitle}>
            {children}
          </WorkspaceLayout>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
