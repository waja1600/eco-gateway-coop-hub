
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: '📊' },
    { name: 'My Contracts', path: '/dashboard/contracts', icon: '📝' },
    { name: 'Profile & KYC', path: '/dashboard/profile', icon: '👤' },
    { name: 'Notifications', path: '/dashboard/notifications', icon: '🔔' },
    { name: 'Billing Center', path: '/dashboard/billing', icon: '💳' },
    { name: 'Cost Tracker', path: '/dashboard/costs', icon: '💰' },
    { name: 'Support', path: '/dashboard/support', icon: '🛟' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6 px-6 flex items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-coop-green to-coop-blue-dark bg-clip-text text-transparent">
          Co-op Gateway
        </span>
      </SidebarHeader>
      
      <SidebarContent>
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-coop-green text-white'
                    : 'text-foreground hover:bg-muted'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-coop-green flex items-center justify-center text-white">
              U
            </div>
            <span className="ml-2 text-sm font-medium">User Name</span>
          </div>
          <button className="text-muted-foreground hover:text-foreground">
            <span>⚙️</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
