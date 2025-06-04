
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  
  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-2">
                <span className="text-xl font-bold text-slate-900">
                  Global Business Cooperative
                </span>
                <p className="text-xs text-slate-500 hidden sm:block">International Trade Standards</p>
              </div>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/about" className="transition-colors hover:text-blue-600 text-slate-600">
              About
            </a>
            <a href="/faq" className="transition-colors hover:text-blue-600 text-slate-600">
              FAQ
            </a>
            <a href="/contact" className="transition-colors hover:text-blue-600 text-slate-600">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
              onClick={() => navigate('/login')}
            >
              Log in
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate('/register')}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
