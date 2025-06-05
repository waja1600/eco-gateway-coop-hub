
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Bell, Settings, Users, Send, Check } from 'lucide-react';

interface TelegramIntegrationProps {
  groupId: string;
}

export function TelegramIntegration({ groupId }: TelegramIntegrationProps) {
  const [botConnected, setBotConnected] = useState(true);
  const [notifications, setNotifications] = useState({
    newMessages: true,
    voting: true,
    proposals: true,
    arbitration: false,
    payments: true
  });

  const [chatId, setChatId] = useState('@gpo_group_123');
  const [testMessage, setTestMessage] = useState('');

  const handleSendTest = () => {
    // Simulate sending test message
    setTimeout(() => {
      alert('تم إرسال رسالة تجريبية بنجاح!');
    }, 1000);
  };

  const recentNotifications = [
    { id: '1', type: 'vote', message: 'تم بدء تصويت جديد على اختيار المورد', time: '10:30 ص', sent: true },
    { id: '2', type: 'message', message: 'رسالة جديدة من أحمد حسن في النقاش', time: '09:45 ص', sent: true },
    { id: '3', type: 'payment', message: 'تم استلام دفعة جديدة 5000 ريال', time: '08:20 ص', sent: false }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>تكامل Telegram & Botpress</CardTitle>
              <CardDescription>
                إشعارات فورية ونقاشات خارجية للمجموعة
              </CardDescription>
            </div>
          </div>
          <Badge 
            variant={botConnected ? 'default' : 'secondary'}
            className={botConnected ? 'bg-green-50 text-green-700' : ''}
          >
            {botConnected ? 'متصل' : 'غير متصل'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Check className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">البوت متصل بنجاح</span>
          </div>
          <p className="text-green-800 text-sm">
            مجموعة Telegram: {chatId} • آخر نشاط: منذ 5 دقائق
          </p>
        </div>

        {/* Notification Settings */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات الإشعارات
          </h4>
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">
                    {key === 'newMessages' && 'الرسائل الجديدة'}
                    {key === 'voting' && 'التصويت والاقتراعات'}
                    {key === 'proposals' && 'المقترحات الجديدة'}
                    {key === 'arbitration' && 'إجراءات التحكيم'}
                    {key === 'payments' && 'المعاملات المالية'}
                  </span>
                  <p className="text-sm text-gray-600">
                    {key === 'newMessages' && 'إشعار فوري عند وصول رسائل جديدة'}
                    {key === 'voting' && 'تنبيه عند بدء جولات التصويت'}
                    {key === 'proposals' && 'إشعار بالمقترحات الجديدة من الأعضاء'}
                    {key === 'arbitration' && 'تحديثات إجراءات التحكيم والنزاعات'}
                    {key === 'payments' && 'تأكيدات المدفوعات والمعاملات المالية'}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, [key]: checked})
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Test Message */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Send className="h-5 w-5" />
            إرسال رسالة تجريبية
          </h4>
          <div className="flex gap-2">
            <Input
              placeholder="اكتب رسالة تجريبية..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSendTest}
              disabled={!testMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              إرسال
            </Button>
          </div>
        </div>

        {/* Recent Notifications */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            الإشعارات الأخيرة
          </h4>
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.sent ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                <Badge 
                  variant={notification.sent ? 'default' : 'secondary'}
                  className={notification.sent ? 'bg-green-50 text-green-700' : ''}
                >
                  {notification.sent ? 'مُرسل' : 'معلق'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Group Members */}
        <div>
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            أعضاء المجموعة في Telegram
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">إجمالي الأعضاء:</span>
                <div className="font-bold">12 عضو</div>
              </div>
              <div>
                <span className="text-gray-600">نشط الآن:</span>
                <div className="font-bold">8 أعضاء</div>
              </div>
              <div>
                <span className="text-gray-600">آخر نشاط:</span>
                <div className="font-bold">منذ دقيقتين</div>
              </div>
              <div>
                <span className="text-gray-600">الرسائل اليوم:</span>
                <div className="font-bold">24 رسالة</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            إعدادات البوت
          </Button>
          <Button variant="outline" size="sm">
            إضافة أعضاء
          </Button>
          <Button variant="outline" size="sm">
            سجل الرسائل
          </Button>
          <Button variant="outline" size="sm">
            إحصائيات النشاط
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
