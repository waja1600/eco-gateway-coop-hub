
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, Users, FileText, Settings, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notification {
  id: string;
  type: 'vote' | 'contract' | 'group' | 'system' | 'message';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    url: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'vote',
    title: 'New Voting Proposal',
    description: 'A new proposal "Organic Rice Group Purchase" is now open for voting',
    timestamp: '2025-06-02 10:30',
    read: false,
    priority: 'high',
    action: {
      label: 'Vote Now',
      url: '/governance/proposals/1'
    }
  },
  {
    id: '2',
    type: 'contract',
    title: 'Contract Requires Signature',
    description: 'Marketing Campaign Partnership contract is ready for your signature',
    timestamp: '2025-06-02 09:15',
    read: false,
    priority: 'high',
    action: {
      label: 'Review Contract',
      url: '/contracts/2'
    }
  },
  {
    id: '3',
    type: 'group',
    title: 'Group Purchase Target Reached',
    description: 'Solar Panel Group Buy has reached its minimum target of 50 participants',
    timestamp: '2025-06-01 16:45',
    read: true,
    priority: 'medium',
    action: {
      label: 'View Details',
      url: '/groups/solar-panels'
    }
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message from Ahmed Hassan',
    description: 'Regarding the organic rice delivery schedule',
    timestamp: '2025-06-01 14:20',
    read: true,
    priority: 'low',
    action: {
      label: 'Read Message',
      url: '/messages/4'
    }
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vote': return <Users className="h-5 w-5 text-blue-600" />;
      case 'contract': return <FileText className="h-5 w-5 text-purple-600" />;
      case 'group': return <Users className="h-5 w-5 text-green-600" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-orange-600" />;
      case 'system': return <Settings className="h-5 w-5 text-gray-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.read;
      case 'high': return notif.priority === 'high';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </h2>
          <p className="text-gray-600">Stay updated with your cooperative activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" onClick={() => setFilter('unread')}>
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="high" onClick={() => setFilter('high')}>
            High Priority
          </TabsTrigger>
          <TabsTrigger value="settings">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">No notifications to show</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map(notification => (
              <Card 
                key={notification.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {notification.description}
                        </CardDescription>
                        <p className="text-sm text-gray-500 mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(notification.priority)}
                      >
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    {notification.action && (
                      <Button size="sm">
                        {notification.action.label}
                      </Button>
                    )}
                    {!notification.read && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {/* Same content but filtered */}
          {filteredNotifications.map(notification => (
            <Card key={notification.id} className="border-l-4 border-l-blue-500 bg-blue-50/30">
              {/* Same notification content */}
              <CardHeader>
                <CardTitle>{notification.title}</CardTitle>
                <CardDescription>{notification.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          {/* Same content but filtered for high priority */}
          {filteredNotifications.map(notification => (
            <Card key={notification.id} className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle>{notification.title}</CardTitle>
                <CardDescription>{notification.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Methods</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Email notifications
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Push notifications (Ntfy.io)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Zulip chat notifications
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Voting proposals
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Contract updates
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Group activities
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Messages
                    </label>
                  </div>
                </div>
              </div>
              <Button className="w-full md:w-auto">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
