
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, MessageSquare, Settings, Activity, TestTube, Eye, FileCheck } from 'lucide-react';

interface MCPMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'error';
}

interface MCPTest {
  id: string;
  name: string;
  type: 'skill' | 'knowledge' | 'practical';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  score?: number;
  questions: number;
  duration: string;
}

interface MCPMonitoring {
  id: string;
  targetType: 'supplier' | 'freelancer' | 'group';
  targetName: string;
  status: 'active' | 'alert' | 'warning';
  lastCheck: string;
  issues: string[];
}

interface MCPAgentProps {
  agentId: string;
  agentName: string;
  groupId?: string;
}

export function MCPAgent({ agentId, agentName, groupId }: MCPAgentProps) {
  const [messages, setMessages] = useState<MCPMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tests] = useState<MCPTest[]>([
    {
      id: '1',
      name: 'اختبار مهارات البرمجة',
      type: 'skill',
      status: 'completed',
      score: 85,
      questions: 20,
      duration: '45 دقيقة'
    },
    {
      id: '2',
      name: 'اختبار المعرفة التقنية',
      type: 'knowledge',
      status: 'in_progress',
      questions: 15,
      duration: '30 دقيقة'
    }
  ]);

  const [monitoring] = useState<MCPMonitoring[]>([
    {
      id: '1',
      targetType: 'supplier',
      targetName: 'شركة التقنية المتقدمة',
      status: 'active',
      lastCheck: 'منذ 5 دقائق',
      issues: []
    },
    {
      id: '2',
      targetType: 'freelancer',
      targetName: 'محمد أحمد - مطور',
      status: 'warning',
      lastCheck: 'منذ ساعة',
      issues: ['تأخير في التسليم', 'عدم الرد على الرسائل']
    }
  ]);

  useEffect(() => {
    setIsConnected(true);
    
    const welcomeMessage: MCPMessage = {
      id: '1',
      type: 'agent',
      content: `مرحباً! أنا ${agentName}، وكيل MCP الذكي. يمكنني مساعدتك في:
      
🧪 إجراء اختبارات المهارات للمستقلين
👁️ مراقبة أداء الموردين والمستقلين  
📊 تحليل العروض وتقديم التوصيات
⚖️ تقييم العقود والمخاطر
🔍 فحص الوثائق والشهادات

كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date(),
      status: 'delivered'
    };
    setMessages([welcomeMessage]);
  }, [agentName]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: MCPMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        'تم تحليل طلبك. سأقوم بإجراء التقييم المطلوب.',
        'جاري فحص الوثائق المرفقة... سيتم إرسال التقرير خلال دقائق.',
        'تم إنشاء اختبار مخصص بناءً على المتطلبات المحددة.',
        'تحليل العرض يشير إلى مطابقة 87% للمعايير المطلوبة.',
        'تحذير: تم اكتشاف تأخير محتمل في الجدول الزمني.'
      ];

      const agentResponse: MCPMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        status: 'delivered'
      };

      setMessages(prev => [...prev.slice(0, -1), { ...userMessage, status: 'delivered' }, agentResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-700';
      case 'in_progress': return 'bg-blue-50 text-blue-700';
      case 'failed': return 'bg-red-50 text-red-700';
      case 'active': return 'bg-green-50 text-green-700';
      case 'warning': return 'bg-yellow-50 text-yellow-700';
      case 'alert': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-lg">{agentName}</CardTitle>
                <CardDescription>وكيل MCP ذكي - {agentId}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isConnected ? "default" : "secondary"} className="gap-1">
                <Activity className="h-3 w-3" />
                {isConnected ? 'متصل' : 'غير متصل'}
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                المحادثة
              </TabsTrigger>
              <TabsTrigger value="tests" className="flex items-center gap-1">
                <TestTube className="h-4 w-4" />
                الاختبارات
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                المراقبة
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-1">
                <FileCheck className="h-4 w-4" />
                التحليل
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="mt-4">
              <div className="space-y-4">
                <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-3 bg-gray-50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg whitespace-pre-line ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border shadow-sm'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('ar-SA', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border shadow-sm px-3 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="اكتب رسالتك هنا..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!inputMessage.trim() || isLoading}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tests" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">اختبارات المهارات</h3>
                  <Button>إنشاء اختبار جديد</Button>
                </div>
                <div className="grid gap-4">
                  {tests.map(test => (
                    <Card key={test.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{test.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {test.questions} سؤال • {test.duration}
                            </p>
                            {test.score && (
                              <p className="text-sm font-medium text-green-600 mt-1">
                                النتيجة: {test.score}%
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getStatusColor(test.status)}>
                              {test.status === 'completed' ? 'مكتمل' :
                               test.status === 'in_progress' ? 'جاري' :
                               test.status === 'failed' ? 'فاشل' : 'في الانتظار'}
                            </Badge>
                            <Button size="sm" variant="outline">
                              عرض
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">مراقبة الأداء</h3>
                  <Button>إضافة هدف جديد</Button>
                </div>
                <div className="grid gap-4">
                  {monitoring.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{item.targetName}</h4>
                              <Badge variant="outline" className="text-xs">
                                {item.targetType === 'supplier' ? 'مورد' : 'مستقل'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              آخر فحص: {item.lastCheck}
                            </p>
                            {item.issues.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-red-600">المشاكل المكتشفة:</p>
                                <ul className="text-sm text-red-600 list-disc list-inside">
                                  {item.issues.map((issue, index) => (
                                    <li key={index}>{issue}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getStatusColor(item.status)}>
                              {item.status === 'active' ? 'نشط' :
                               item.status === 'warning' ? 'تحذير' : 'تنبيه'}
                            </Badge>
                            <Button size="sm" variant="outline">
                              تفاصيل
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">تحليل العروض</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>عروض تم تحليلها</span>
                        <span className="font-bold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>معدل الموافقة</span>
                        <span className="font-bold text-green-600">73%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>توصيات مقبولة</span>
                        <span className="font-bold text-blue-600">89%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">إحصائيات الاختبارات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>اختبارات مكتملة</span>
                        <span className="font-bold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span>معدل النجاح</span>
                        <span className="font-bold text-green-600">82%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>متوسط النتائج</span>
                        <span className="font-bold">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
