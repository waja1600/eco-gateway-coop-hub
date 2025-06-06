
import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  Settings,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';

interface WorkspaceLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBreadcrumb?: boolean;
  className?: string;
}

export function WorkspaceLayout({ 
  children, 
  title, 
  subtitle, 
  showBreadcrumb = true,
  className = "" 
}: WorkspaceLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${className}`}>
      {/* Header Box */}
      <Card className="rounded-none border-b-2 border-blue-200 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  {title || 'Nexus AI Workspace'}
                </h1>
                <p className="text-gray-600 text-sm">
                  {subtitle || 'منصة ذكية متكاملة للتعاون والإنتاجية'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <Zap className="h-3 w-3 mr-1" />
                نشط
              </Badge>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {showBreadcrumb && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <span>الرئيسية</span>
              <span>/</span>
              <span className="text-blue-600 font-medium">{title || 'المساحة الذكية'}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Box */}
      <div className="p-6">
        <Card className="min-h-[calc(100vh-200px)] shadow-xl border-2 border-blue-100 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {children}
          </CardContent>
        </Card>
      </div>

      {/* Footer Box */}
      <Card className="rounded-none border-t-2 border-blue-200 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>محمي بالكامل</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>متصل عالمياً</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span>تعاوني</span>
              </div>
            </div>
            <div className="text-xs">
              © 2024 Nexus AI Workspace - جميع الحقوق محفوظة
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
