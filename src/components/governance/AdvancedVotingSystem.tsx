
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Vote, TrendingUp, Users, Clock, Shield } from 'lucide-react';

interface VoteOption {
  id: string;
  title: string;
  description: string;
  votes: number;
  percentage: number;
  impact: 'high' | 'medium' | 'low';
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'contract' | 'budget' | 'governance' | 'partnership';
  status: 'active' | 'passed' | 'rejected' | 'pending';
  creator: string;
  createdAt: string;
  deadline: string;
  quorum: number;
  currentVotes: number;
  options: VoteOption[];
  requiresStaking: boolean;
  minimumStake: number;
  votingPower: Record<string, number>;
}

interface AdvancedVotingSystemProps {
  groupId: string;
  userRole: 'admin' | 'member' | 'observer';
}

export function AdvancedVotingSystem({ groupId, userRole }: AdvancedVotingSystemProps) {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [userStake, setUserStake] = useState<number>(0);
  const [voteComment, setVoteComment] = useState<string>('');

  const proposals: Proposal[] = [
    {
      id: 'prop_1',
      title: 'اعتماد نظام العقود الذكية الجديد',
      description: 'تطبيق نظام العقود الذكية المطور لتحسين الشفافية والأمان في المعاملات',
      type: 'contract',
      status: 'active',
      creator: 'أحمد محمد',
      createdAt: '2024-12-01',
      deadline: '2024-12-15',
      quorum: 60,
      currentVotes: 45,
      requiresStaking: true,
      minimumStake: 1000,
      votingPower: { 'user1': 1.5, 'user2': 1.2, 'user3': 1.0 },
      options: [
        {
          id: 'opt_1',
          title: 'موافق بشدة',
          description: 'تطبيق النظام فوراً مع جميع المميزات',
          votes: 28,
          percentage: 62,
          impact: 'high'
        },
        {
          id: 'opt_2',
          title: 'موافق مع تعديلات',
          description: 'التطبيق مع إجراء تعديلات على بعض البنود',
          votes: 12,
          percentage: 27,
          impact: 'medium'
        },
        {
          id: 'opt_3',
          title: 'غير موافق',
          description: 'رفض النظام والحاجة لمراجعة شاملة',
          votes: 5,
          percentage: 11,
          impact: 'low'
        }
      ]
    },
    {
      id: 'prop_2',
      title: 'ميزانية التسويق للربع القادم',
      description: 'تحديد ميزانية التسويق والإعلان للربع الأول من العام القادم',
      type: 'budget',
      status: 'active',
      creator: 'سارة أحمد',
      createdAt: '2024-11-28',
      deadline: '2024-12-10',
      quorum: 50,
      currentVotes: 38,
      requiresStaking: false,
      minimumStake: 0,
      votingPower: {},
      options: [
        {
          id: 'opt_4',
          title: '100,000 ريال',
          description: 'ميزانية كاملة للتسويق الرقمي والتقليدي',
          votes: 20,
          percentage: 53,
          impact: 'high'
        },
        {
          id: 'opt_5',
          title: '75,000 ريال',
          description: 'ميزانية متوسطة مع التركيز على التسويق الرقمي',
          votes: 15,
          percentage: 39,
          impact: 'medium'
        },
        {
          id: 'opt_6',
          title: '50,000 ريال',
          description: 'ميزانية محدودة للحملات الأساسية فقط',
          votes: 3,
          percentage: 8,
          impact: 'low'
        }
      ]
    }
  ];

  const handleVote = (proposalId: string, optionId: string) => {
    if (!userStake || userStake < proposals.find(p => p.id === proposalId)?.minimumStake!) {
      alert('يجب إيداع الحد الأدنى من الرهان للتصويت');
      return;
    }

    console.log('Voting:', { proposalId, optionId, stake: userStake, comment: voteComment });
    // In real implementation, this would interact with smart contracts
    
    // Reset form
    setVoteComment('');
    alert('تم تسجيل صوتك بنجاح على البلوك تشين');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700';
      case 'passed': return 'bg-blue-50 text-blue-700';
      case 'rejected': return 'bg-red-50 text-red-700';
      case 'pending': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contract': return <Shield className="h-4 w-4" />;
      case 'budget': return <TrendingUp className="h-4 w-4" />;
      case 'governance': return <Users className="h-4 w-4" />;
      case 'partnership': return <Check className="h-4 w-4" />;
      default: return <Vote className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">نظام التصويت المتقدم</h2>
        <p className="text-gray-600">نظام تصويت لامركزي مع آليات الرهان والحوكمة الذكية</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">المقترحات النشطة</TabsTrigger>
          <TabsTrigger value="history">السجل</TabsTrigger>
          <TabsTrigger value="create">إنشاء مقترح</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {proposals.filter(p => p.status === 'active').map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {getTypeIcon(proposal.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      <CardDescription className="mt-1">{proposal.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className={getStatusColor(proposal.status)}>
                      {proposal.status === 'active' ? 'نشط' : proposal.status}
                    </Badge>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ينتهي: {proposal.deadline}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{proposal.currentVotes}</div>
                    <div className="text-sm text-gray-600">أصوات مُسجلة</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{proposal.quorum}%</div>
                    <div className="text-sm text-blue-700">النصاب المطلوب</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {Math.round((proposal.currentVotes / proposal.quorum) * 100)}%
                    </div>
                    <div className="text-sm text-green-700">نسبة المشاركة</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">خيارات التصويت:</h4>
                  {proposal.options.map((option) => (
                    <div key={option.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium">{option.title}</h5>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{option.percentage}%</div>
                          <div className="text-sm text-gray-500">{option.votes} صوت</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${getImpactColor(option.impact)}`}>
                          تأثير {option.impact === 'high' ? 'عالي' : 
                                   option.impact === 'medium' ? 'متوسط' : 'منخفض'}
                        </span>
                        <Progress value={option.percentage} className="w-32 h-2" />
                      </div>

                      {userRole !== 'observer' && (
                        <Button
                          onClick={() => handleVote(proposal.id, option.id)}
                          size="sm"
                          className="w-full mt-2"
                          variant="outline"
                        >
                          اختيار هذا الخيار
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {proposal.requiresStaking && userRole !== 'observer' && (
                  <Card className="bg-yellow-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-800">نظام الرهان</CardTitle>
                      <CardDescription className="text-yellow-700">
                        يتطلب هذا المقترح إيداع حد أدنى {proposal.minimumStake.toLocaleString()} رمز للتصويت
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">مبلغ الرهان:</label>
                        <Input
                          type="number"
                          placeholder={`الحد الأدنى: ${proposal.minimumStake}`}
                          value={userStake}
                          onChange={(e) => setUserStake(Number(e.target.value))}
                          min={proposal.minimumStake}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">تعليق التصويت (اختياري):</label>
                        <Textarea
                          placeholder="اشرح سبب اختيارك..."
                          value={voteComment}
                          onChange={(e) => setVoteComment(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="text-sm text-yellow-700 bg-yellow-100 p-3 rounded">
                        <strong>ملاحظة:</strong> سيتم استرداد الرهان في حالة فوز الخيار المُختار. 
                        في حالة الخسارة، سيتم توزيع جزء من الرهان على الفائزين.
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>سجل التصويت</CardTitle>
              <CardDescription>جميع المقترحات السابقة ونتائجها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Vote className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">سيتم عرض سجل التصويت هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          {userRole === 'admin' ? (
            <Card>
              <CardHeader>
                <CardTitle>إنشاء مقترح جديد</CardTitle>
                <CardDescription>أنشئ مقترحاً جديداً للتصويت عليه من المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Check className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">نموذج إنشاء المقترحات قيد التطوير</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">يتطلب صلاحيات إدارية لإنشاء مقترحات جديدة</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Vote className="h-5 w-5 text-blue-600" />
                <span className="font-medium">إجمالي المقترحات</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">هذا العام</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium">معدل المشاركة</span>
              </div>
              <div className="text-2xl font-bold text-green-600">78%</div>
              <div className="text-sm text-gray-600">متوسط المشاركة</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-purple-600" />
                <span className="font-medium">المقترحات المُمررة</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">18</div>
              <div className="text-sm text-gray-600">من أصل 24</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <span className="font-medium">إجمالي الرهانات</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">156K</div>
              <div className="text-sm text-gray-600">رمز مُراهن</div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
