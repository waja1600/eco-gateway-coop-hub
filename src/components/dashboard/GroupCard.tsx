
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Clock, MapPin, ArrowRight } from 'lucide-react';

interface GroupCardProps {
  group: {
    id: number;
    name: string;
    description: string;
    type: 'solo' | 'group';
    memberCount: number;
    category: string;
    location: string;
    status: 'active' | 'pending' | 'completed';
    lastActivity: string;
    image?: string;
  };
  onViewGroup: (groupId: number) => void;
}

export function GroupCard({ group, onViewGroup }: GroupCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                {group.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {group.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {group.category}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(group.status)}`}>
                  {group.status}
                </Badge>
              </div>
            </div>
          </div>
          <Badge variant={group.type === 'solo' ? 'secondary' : 'default'} className="text-xs">
            {group.type === 'solo' ? 'Solo' : 'Group'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600 line-clamp-2">
          {group.description}
        </CardDescription>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{group.memberCount} member{group.memberCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{group.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{group.lastActivity}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Join Discussion
            </Button>
          </div>
          <Button 
            size="sm" 
            onClick={() => onViewGroup(group.id)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            View Group
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
