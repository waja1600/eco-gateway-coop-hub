
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Vote, Users, Clock, CheckCircle, XCircle, AlertTriangle,
  Brain, Shield, TrendingUp, BarChart3
} from 'lucide-react';

interface VoteOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'supplier_approval' | 'budget_change' | 'member_addition' | 'contract_modification';
  status: 'active' | 'passed' | 'rejected' | 'expired';
  deadline: string;
  totalVoters: number;
  votedCount: number;
  options: VoteOption[];
  mcpRecommendation?: string;
  quadraticVoting: boolean;
}

export function EnhancedVotingSystem() {
  const [activeTab, setActiveTab] = useState('active');

  const mockProposals: Proposal[] = [
    {
      id: '1',
      title: 'الموافقة على مورد أجهزة الكمبيوتر الجديد',
      description: 'تقييم والموافقة على شركة التقنية المتقدمة كمورد رئيسي للأجهزة',
      type: 'supplier_approval',
      status: 'active',
      deadline: '2024-01-20 23:59',
      totalVoters: 12,
      votedCount: 8,
      quadraticVoting: true,
      options: [
        { id: 'approve', text: 'موافق', votes: 6, percentage: 75 },
        { id: 'reject', text: 'رفض', votes: 1, percentage: 12.5 },
        { id: 'abstain', text: 'امتناع', votes: 1, percentage: 12.5 }
      ],
      mcpRecommendation: 'موصى بالموافقة - نقاط الثقة 92%'
    },
    {
      id: '2',
      title: 'تعديل ميزانية المشروع',
      description: 'زيادة الميزانية المخصصة لشراء المعدات بنسبة 15%',
      type: 'budget_change',
      status: 'active',
      deadline: '2024-01-22 18:00',
      totalVoters: 12,
      votedCount: 5,
      quadraticVoting: false,
      options: [
        { id: 'approve', text: 'موافق', votes: 4, percentage: 80 },
        { id: 'reject', text: 'رفض', votes: 1, percentage: 20 }
      ]
    },
    {
      id: '3',
      title: 'إضافة عضو جديد للمجموعة',
      description: 'قبول انضمام أحمد سالم كعضو في مجموعة الشراء',
      type: 'member_addition',
      status: 'passed',
      deadline: '2024-01-18 20:00',
      totalVoters: 12,
      votedCount: 12,
      quadraticVoting: true,
      options: [
        { id: 'approve', text: 'موافق', votes: 10, percentage: 83.3 },
        { id: 'reject', text: 'رفض', votes: 2, percentage: 16.7 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'passed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'expired': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'supplier_approval': return 'موافقة مورد';
      case 'budget_change': return 'تعديل ميزانية';
      case 'member_addition': return 'إضافة عضو';
      case 'contract_modification': return 'تعديل عقد';
      default: return 'عام';
    }
  };

  const activeProposals = mockProposals.filter(p => p.status === 'active');
  const completedProposals = mockProposals.filter(p => p.status !== 'active');

  return (
    <div className="space-y-6">
      {/* Voting Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التصويت النشط</p>
                <p className="text-2xl font-bold text-blue-600">{activeProposals.length}</p>
              </div>
              <Vote className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">معدل المشاركة</p>
                <p className="text-2xl font-bold text-green-600">87%</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القرارات المتخذة</p>
                <p className="text-2xl font-bold text-purple-600">24</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نقاط MCP</p>
                <p className="text-2xl font-bold text-orange-600">94%</p>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Voting Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">التصويت النشط</TabsTrigger>
          <TabsTrigger value="completed">المكتملة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeProposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                    <CardDescription className="text-base">
                      {proposal.description}
                    </CardDescription>
                    <div className="flex gap-2 mt-3">
                      <Badge variant="outline">{getTypeLabel(proposal.type)}</Badge>
                      <Badge className={getStatusColor(proposal.status)}>
                        {getStatusIcon(proposal.status)}
                        <span className="mr-1">نشط</span>
                      </Badge>
                      {proposal.quadraticVoting && (
                        <Badge className="bg-purple-100 text-purple-800">
                          تصويت تربيعي
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>ينتهي في: {proposal.deadline}</div>
                    <div className="mt-1">
                      {proposal.votedCount}/{proposal.totalVoters} صوتوا
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* MCP Recommendation */}
                {proposal.mcpRecommendation && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">توصية MCP:</span>
                    </div>
                    <p className="text-sm text-blue-700">{proposal.mcpRecommendation}</p>
                  </div>
                )}

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>تقدم التصويت</span>
                    <span>{Math.round((proposal.votedCount / proposal.totalVoters) * 100)}%</span>
                  </div>
                  <Progress value={(proposal.votedCount / proposal.totalVoters) * 100} />
                </div>

                {/* Voting Options */}
                <div className="space-y-3">
                  {proposal.options.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Button 
                          size="sm"
                          variant={option.id === 'approve' ? 'default' : 'outline'}
                        >
                          {option.text}
                        </Button>
                        <span className="text-sm text-gray-600">
                          {option.votes} أصوات ({option.percentage}%)
                        </span>
                      </div>
                      <div className="w-24">
                        <Progress value={option.percentage} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1">
                    <Vote className="h-4 w-4 mr-2" />
                    تصويت الآن
                  </Button>
                  <Button variant="outline">عرض التفاصيل</Button>
                  <Button variant="outline">مناقشة</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedProposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{getTypeLabel(proposal.type)}</Badge>
                      <Badge className={getStatusColor(proposal.status)}>
                        {getStatusIcon(proposal.status)}
                        <span className="mr-1">
                          {proposal.status === 'passed' ? 'مقبول' : 'مرفوض'}
                        </span>
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    انتهى: {proposal.deadline}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {proposal.options.map((option) => (
                    <div key={option.id} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{option.text}</div>
                      <div className="text-2xl font-bold text-blue-600">{option.votes}</div>
                      <div className="text-sm text-gray-600">{option.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  إحصائيات التصويت
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>معدل الموافقة</span>
                    <div className="flex items-center gap-2">
                      <Progress value={78} className="w-20" />
                      <span className="font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>سرعة اتخاذ القرار</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20" />
                      <span className="font-medium">2.3 أيام</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>التوافق مع MCP</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-20" />
                      <span className="font-medium">92%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  الأداء الشهري
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <div className="text-sm text-gray-600">قرار متخذ</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-gray-600">معدل المشاركة</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">2.1</div>
                    <div className="text-sm text-gray-600">متوسط أيام القرار</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
