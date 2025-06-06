
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Wand2, 
  Settings, 
  Zap, 
  FileText, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  category: 'contract' | 'governance' | 'arbitration' | 'analysis';
  prompt: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

interface AITask {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: string;
  createdAt: string;
}

const taskTemplates: TaskTemplate[] = [
  {
    id: '1',
    title: 'تحليل العقد الذكي',
    description: 'تحليل شامل للعقد الذكي وتحديد المخاطر والفرص',
    category: 'contract',
    prompt: 'قم بتحليل العقد الذكي التالي وحدد المخاطر المحتملة والفرص للتحسين...',
    difficulty: 'medium',
    estimatedTime: '5-10 دقائق'
  },
  {
    id: '2',
    title: 'إنشاء اقتراح حوكمة',
    description: 'إنشاء اقتراح حوكمة جديد بناءً على المتطلبات المحددة',
    category: 'governance',
    prompt: 'أنشئ اقتراح حوكمة جديد يتضمن العناصر التالية...',
    difficulty: 'hard',
    estimatedTime: '10-15 دقيقة'
  },
  {
    id: '3',
    title: 'تقييم نزاع تحكيمي',
    description: 'تحليل قضية تحكيم وتقديم توصيات للحل',
    category: 'arbitration',
    prompt: 'قم بتحليل النزاع التحكيمي التالي وقدم توصيات للحل...',
    difficulty: 'hard',
    estimatedTime: '15-20 دقيقة'
  },
  {
    id: '4',
    title: 'تحليل أداء المجموعة',
    description: 'تحليل أداء مجموعة الشراء الجماعي وتقديم تحسينات',
    category: 'analysis',
    prompt: 'حلل أداء المجموعة التالية وقدم اقتراحات للتحسين...',
    difficulty: 'easy',
    estimatedTime: '3-5 دقائق'
  }
];

export function AIPromptBox() {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TaskTemplate | null>(null);
  const [mode, setMode] = useState<'ask' | 'manual' | 'auto'>('ask');
  const [tasks, setTasks] = useState<AITask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExecutePrompt = async (prompt: string, title: string = 'مهمة مخصصة') => {
    setIsProcessing(true);
    const newTask: AITask = {
      id: Date.now().toString(),
      title,
      status: 'running',
      progress: 0,
      createdAt: new Date().toLocaleString('ar')
    };
    
    setTasks(prev => [newTask, ...prev]);

    // Simulate AI processing
    const intervals = [20, 50, 80, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTasks(prev => prev.map(task => 
        task.id === newTask.id 
          ? { ...task, progress: intervals[i] }
          : task
      ));
    }

    // Complete the task
    setTasks(prev => prev.map(task => 
      task.id === newTask.id 
        ? { 
            ...task, 
            status: 'completed', 
            progress: 100,
            result: `تم تنفيذ المهمة بنجاح. تم تحليل البيانات وإنتاج النتائج المطلوبة.`
          }
        : task
    ));
    
    setIsProcessing(false);
    setCustomPrompt('');
    setSelectedTemplate(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'contract': return <FileText className="h-4 w-4" />;
      case 'governance': return <Users className="h-4 w-4" />;
      case 'arbitration': return <Settings className="h-4 w-4" />;
      case 'analysis': return <TrendingUp className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'running': return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Prompt Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8" />
            <div>
              <CardTitle className="text-2xl">مساعد الذكاء الاصطناعي</CardTitle>
              <CardDescription className="text-purple-100">
                تنفيذ المهام تلقائياً، يدوياً، أو عبر الاستعلام المباشر
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>اختيار وضع التشغيل</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant={mode === 'ask' ? 'default' : 'outline'}
              onClick={() => setMode('ask')}
              className="h-20 flex-col gap-2"
            >
              <Brain className="h-6 w-6" />
              <span>استعلام مباشر</span>
            </Button>
            <Button
              variant={mode === 'manual' ? 'default' : 'outline'}
              onClick={() => setMode('manual')}
              className="h-20 flex-col gap-2"
            >
              <Settings className="h-6 w-6" />
              <span>تنفيذ يدوي</span>
            </Button>
            <Button
              variant={mode === 'auto' ? 'default' : 'outline'}
              onClick={() => setMode('auto')}
              className="h-20 flex-col gap-2"
            >
              <Zap className="h-6 w-6" />
              <span>تنفيذ تلقائي</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="prompt" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prompt">الأوامر المخصصة</TabsTrigger>
          <TabsTrigger value="templates">القوالب الجاهزة</TabsTrigger>
          <TabsTrigger value="tasks">المهام النشطة</TabsTrigger>
        </TabsList>

        <TabsContent value="prompt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>أمر مخصص للذكاء الاصطناعي</CardTitle>
              <CardDescription>
                اكتب أمرك المخصص ودع الذكاء الاصطناعي ينفذه
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="مثال: حلل العقد الذكي الخاص بمجموعة الشراء الجماعي وقدم توصيات للتحسين..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleExecutePrompt(customPrompt)}
                  disabled={!customPrompt || isProcessing}
                  className="flex-1"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isProcessing ? 'جاري التنفيذ...' : 'تنفيذ الأمر'}
                </Button>
                <Button variant="outline" onClick={() => setCustomPrompt('')}>
                  مسح
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taskTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(template.category)}
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      الوقت المقدر: {template.estimatedTime}
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExecutePrompt(template.prompt, template.title);
                      }}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      تنفيذ المهمة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المهام النشطة</CardTitle>
              <CardDescription>
                تتبع حالة المهام المُنفذة بواسطة الذكاء الاصطناعي
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  لا توجد مهام نشطة حالياً
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          <span className="font-medium">{task.title}</span>
                        </div>
                        <Badge variant="outline">
                          {task.status === 'running' ? `${task.progress}%` : task.status}
                        </Badge>
                      </div>
                      {task.status === 'running' && (
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>التقدم</span>
                            <span>{task.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {task.result && (
                        <div className="mt-2 p-3 bg-green-50 rounded text-sm">
                          {task.result}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        تم الإنشاء: {task.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
