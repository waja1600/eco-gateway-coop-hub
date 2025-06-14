
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Clock, MapPin, ArrowRight, Vote, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    requestType?: 'purchase' | 'marketing' | 'incorporation' | 'service';
    votingStatus?: 'open' | 'closed' | 'pending';
    activeVotes?: number;
  };
  onViewGroup?: (groupId: number) => void;
}

export function GroupCard({ group, onViewGroup }: GroupCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRequestTypeColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'bg-blue-50 text-blue-700';
      case 'marketing': return 'bg-purple-50 text-purple-700';
      case 'incorporation': return 'bg-green-50 text-green-700';
      case 'service': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getActionButtonText = () => {
    if (group.type === 'solo') return 'تقديم عرض';
    
    switch (group.requestType) {
      case 'purchase': return 'انضمام للشراء';
      case 'marketing': return 'انضمام للحملة';
      case 'incorporation': return 'انضمام للتأسيس';
      case 'service': return 'تقديم خدمة';
      default: return 'انضمام للمجموعة';
    }
  };

  const handleCardClick = () => {
    console.log('Card clicked, navigating to group details:', group.id);
    if (onViewGroup) {
      onViewGroup(group.id);
    }
    navigate(`/groups/${group.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Action button clicked for group:', group.id, 'Type:', group.type, 'Request type:', group.requestType);
    
    // Handle different actions based on group type and request type
    if (group.type === 'solo' || group.requestType === 'service') {
      // Navigate to offer submission
      navigate(`/groups/${group.id}/submit-offer`);
    } else {
      // Navigate to join group
      navigate(`/groups/${group.id}/join`);
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Details button clicked for group:', group.id);
    navigate(`/groups/${group.id}`);
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                {group.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-right">
                {group.name}
              </CardTitle>
              <div className="flex items-center space-x-2 space-x-reverse mt-1">
                <Badge variant="outline" className="text-xs">
                  {group.category}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(group.status)}`}>
                  {group.status === 'active' ? 'نشط' : group.status === 'pending' ? 'معلق' : 'مكتمل'}
                </Badge>
                {group.requestType && (
                  <Badge variant="outline" className={`text-xs ${getRequestTypeColor(group.requestType)}`}>
                    {group.requestType === 'purchase' ? 'شراء' : 
                     group.requestType === 'marketing' ? 'تسويق' : 
                     group.requestType === 'incorporation' ? 'تأسيس' : 'خدمة'}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Badge variant={group.type === 'solo' ? 'secondary' : 'default'} className="text-xs">
            {group.type === 'solo' ? 'فردي' : 'مجموعة'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-gray-600 line-clamp-2 text-right">
          {group.description}
        </CardDescription>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Users className="h-4 w-4" />
              <span>{group.memberCount} عضو</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <MapPin className="h-4 w-4" />
              <span>{group.location}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 space-x-reverse">
            <Clock className="h-4 w-4" />
            <span>{group.lastActivity}</span>
          </div>
        </div>

        {/* Voting Status */}
        {group.votingStatus && (
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Vote className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">
                حالة التصويت: {group.votingStatus === 'open' ? 'مفتوح' : 
                             group.votingStatus === 'closed' ? 'مغلق' : 'معلق'}
              </span>
            </div>
            {group.activeVotes && (
              <Badge variant="outline" className="text-xs">
                {group.activeVotes} تصويت نشط
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 space-x-2 space-x-reverse">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDetailsClick}
            className="flex items-center gap-1"
          >
            التفاصيل
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={handleActionClick}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          >
            {getActionButtonText()}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
