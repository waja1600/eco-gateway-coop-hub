
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Users, Clock, Pin, Star } from 'lucide-react';

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'message' | 'proposal' | 'vote' | 'announcement';
  pinned?: boolean;
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface DiscussionPanelProps {
  groupId: string;
  userRole: 'founder' | 'member' | 'observer';
}

export function DiscussionPanel({ groupId, userRole }: DiscussionPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      author: 'أحمد حسن',
      content: 'مرحباً بالجميع في مجموعة الشراء التعاوني. دعونا نبدأ بمناقشة المتطلبات الأساسية.',
      timestamp: '2024-01-20 10:30',
      type: 'announcement',
      pinned: true
    },
    {
      id: '2',
      author: 'سارة أحمد',
      content: 'أقترح أن نركز على شراء أجهزة الكمبيوتر والبرمجيات. ما رأيكم؟',
      timestamp: '2024-01-20 11:15',
      type: 'proposal',
      reactions: [{ emoji: '👍', count: 3, users: ['أحمد', 'محمد', 'فاطمة'] }]
    },
    {
      id: '3',
      author: 'محمد علي',
      content: 'فكرة ممتازة! لدي خبرة في التفاوض مع موردي التكنولوجيا.',
      timestamp: '2024-01-20 12:00',
      type: 'message'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: 'المستخدم الحالي',
        content: newMessage,
        timestamp: new Date().toLocaleString('ar-SA'),
        type: 'message'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const getMessageTypeStyle = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'border-l-4 border-blue-500 bg-blue-50';
      case 'proposal':
        return 'border-l-4 border-green-500 bg-green-50';
      case 'vote':
        return 'border-l-4 border-purple-500 bg-purple-50';
      default:
        return 'border-l-4 border-gray-200 bg-white';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Pin className="h-4 w-4 text-blue-600" />;
      case 'proposal':
        return <Star className="h-4 w-4 text-green-600" />;
      case 'vote':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>نقاشات المجموعة</CardTitle>
              <CardDescription>
                التواصل والتفاعل بين أعضاء المجموعة
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {messages.length} رسالة
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Messages List */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`p-4 rounded-lg ${getMessageTypeStyle(message.type)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getMessageTypeIcon(message.type)}
                  <span className="font-medium text-gray-900">{message.author}</span>
                  {message.pinned && (
                    <Badge variant="outline" className="text-xs">
                      مثبت
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {message.timestamp}
                </div>
              </div>
              
              <p className="text-gray-800 mb-2">{message.content}</p>
              
              {message.reactions && (
                <div className="flex gap-2">
                  {message.reactions.map((reaction, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-white rounded-full border text-xs hover:bg-gray-50"
                      title={reaction.users.join(', ')}
                    >
                      <span>{reaction.emoji}</span>
                      <span>{reaction.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        {userRole !== 'observer' && (
          <div className="space-y-3">
            <Textarea
              placeholder="اكتب رسالتك هنا..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  إرفاق ملف
                </Button>
                <Button variant="outline" size="sm">
                  اقتراح تصويت
                </Button>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4 mr-2" />
                إرسال
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="font-medium text-gray-900 mb-3">إجراءات سريعة</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              دعوة عضو جديد
            </Button>
            <Button variant="outline" size="sm">
              إنشاء استطلاع
            </Button>
            <Button variant="outline" size="sm">
              تحديد موعد اجتماع
            </Button>
            <Button variant="outline" size="sm">
              طلب تصويت
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
