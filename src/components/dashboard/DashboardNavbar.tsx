
import React from 'react';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '../LanguageSelector';
import { useNavigate } from 'react-router-dom';

export function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, perform logout logic here
    navigate('/');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button variant="ghost" size="icon" className="relative">
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600"></span>
            <span>🔔</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
