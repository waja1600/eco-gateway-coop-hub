
import React from 'react';
import { Button } from "@/components/ui/button";
import { LanguageSelector } from './LanguageSelector';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="mr-4 flex">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-coop-green to-coop-blue-dark bg-clip-text text-transparent">
              Co-op Gateway
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About
          </a>
          <a href="/faq" className="transition-colors hover:text-foreground/80 text-foreground/60">
            FAQ
          </a>
          <a href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Contact
          </a>
          <LanguageSelector />
        </nav>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/login')}
          >
            Log in
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="bg-coop-green hover:bg-coop-green-dark"
            onClick={() => navigate('/register')}
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
