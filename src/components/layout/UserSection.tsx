
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell,
  User,
  Settings,
  ChevronDown
} from 'lucide-react';

export function UserSection() {
  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      <Button variant="ghost" size="sm" className="relative hidden sm:flex">
        <Bell className="h-4 w-4" />
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-4 w-4 text-xs p-0 flex items-center justify-center"
        >
          3
        </Badge>
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">أحمد محمد</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white">
          <DropdownMenuItem className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>الملف الشخصي</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>الإعدادات</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center space-x-2 text-red-600">
            <span>تسجيل الخروج</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
