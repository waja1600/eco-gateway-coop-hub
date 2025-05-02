
import React from 'react';
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Cooperative Economy Gateway</h3>
            <p className="text-sm text-muted-foreground">
              Empowering collaborative economies through technology and community.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/portals/supplier" className="text-muted-foreground hover:text-foreground transition-colors">
                  Group Purchase Portal
                </a>
              </li>
              <li>
                <a href="/portals/funder" className="text-muted-foreground hover:text-foreground transition-colors">
                  Crowdfunding Portal
                </a>
              </li>
              <li>
                <a href="/portals/freelancer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Freelancer Portal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/resources/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/resources/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="/resources/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
              <li className="text-muted-foreground">
                hello@coopgateway.org
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Cooperative Economy Gateway. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
