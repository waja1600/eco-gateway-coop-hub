
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LanguageSelector } from '../LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, LogOut, Home } from 'lucide-react';

export function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out user');
    // In a real app, perform logout logic here
    navigate('/');
  };

  const handleGoHome = () => {
    console.log('Navigating to home');
    navigate('/');
  };

  const handleSettings = () => {
    console.log('Opening settings');
    navigate('/system');
  };

  const handleNotifications = () => {
    console.log('Opening notifications');
    navigate('/notifications');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">لوحة التحكم</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          
          <Button variant="ghost" size="icon" className="relative" onClick={handleNotifications}>
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleSettings}>
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleGoHome}>
            <Home className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </header>
  );
}
