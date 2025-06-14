
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ModernMainLayout } from '@/layouts/ModernMainLayout';
import { MCPIntegration } from '@/components/services/MCPIntegration';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, Calendar, MapPin, Building, DollarSign, TrendingUp, 
  MessageSquare, Vote, FileText, Settings, Share2, ArrowLeft,
  Clock, CheckCircle, AlertTriangle, Package, Briefcase,
  Brain, Shield, Leaf, Star, Activity, Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GroupDetails() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock comprehensive group data
  const groupData = {
    id: groupId,
    name: 'مجموعة الشراء التعاوني للتكنولوجيا',
    description: 'شراء جماعي لمعدات التكنولوجيا وتراخيص البرمجيات للشركات الصغيرة والمتوسطة مع التركيز على الحلول المستدامة',
    type: 'group_buying',
    category: 'التكنولوجيا',
    status: 'active',
    isESG: true,
    createdAt: '2024-01-15',
    targetBudget: 150000,
    currentBudget: 98500,
    memberCount: 15,
    maxMembers: 25,
    location: 'الرياض، السعودية',
    jurisdiction: 'السعودية',
    legalFramework: 'شراكة تجارية',
    
    members: [
      { id: '1', name: 'أحمد محمد', role: 'admin', joinedAt: '2024-01-15', contribution: 15000 },
      { id: '2', name: 'فاطمة علي', role: 'member', joinedAt: '2024-01-16', contribution: 12000 },
      { id: '3', name: 'محمد سالم', role: 'member', joinedAt: '2024-01-17', contribution: 18000 },
      { id: '4', name: 'سارة أحمد', role: 'member', joinedAt: '2024-01-18', contribution: 10000 }
    ],

    objectives: [
      'شراء معدات حاسوبية بخصم 30%',
      'الحصول على تراخيص برمجيات بأسعار مؤسسية',
      'توفير دعم فني مشترك',
      'تطبيق معايير الاستدامة البيئية'
    ],

    recentActivity: [
      { type: 'proposal', title: 'عرض جديد من مورد أجهزة', time: 'منذ ساعتين' },
      { type: 'vote', title: 'تصويت على مقترح التمويل', time: 'منذ 4 ساعات' },
      { type: 'discussion', title: 'نقاش حول المواصفات التقنية', time: 'منذ يوم' },
      { type: 'member', title: 'انضمام عضو جديد', time: 'منذ يومين' }
    ],

    votingHistory: [
      { id: '1', title: 'قبول عرض المورد الأول', status: 'approved', votes: '12/15' },
      { id: '2', title: 'تعديل الميزانية المطلوبة', status: 'pending', votes: '8/15' },
      { id: '3', title: 'اختيار مدير المشروع', status: 'approved', votes: '14/15' }
    ],

    contracts: [
      { id: '1', title: 'عقد توريد أجهزة Dell', status: 'active', value: 45000 },
      { id: '2', title: 'ترخيص Microsoft Office', status: 'pending', value: 15000 },
      { id: '3', title: 'خدمات الدعم التقني', status: 'negotiating', value: 8000 }
    ],

    financials: {
      totalCommitted: 98500,
      totalSpent: 45000,
      pendingPayments: 23000,
      availableBalance: 30500
    }
  };

  const handleJoinGroup = () => {
    console.log('Joining group:', groupId);
    navigate(`/groups/${groupId}/join`);
  };

  const handleStartVote = () => {
    toast({
      title: "تم إنشاء التصويت",
      description: "تم إنشاء تصويت جديد بنجاح",
    });
  };

  const handleShareGroup = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط المجموعة للمشاركة",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'negotiating': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'proposal': return <Package className="h-4 w-4" />;
      case 'vote': return <Vote className="h-4 w-4" />;
      case 'discussion': return <MessageSquare className="h-4 w-4" />;
      case 'member': return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <ModernMainLayout>
      <div className="container px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-start gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/workspace')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                العودة
              </Button>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{groupData.name}</h1>
                  {groupData.isESG && (
                    <Badge className="bg-green-100 text-green-800">
                      <Leaf className="h-3 w-3 mr-1" />
                      ESG
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 max-w-3xl">{groupData.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline">{groupData.category}</Badge>
                  <Badge className={getStatusColor(groupData.status)}>
                    {groupData.status === 'active' ? 'نشط' : groupData.status}
                  </Badge>
                  <Badge variant="outline">{groupData.legalFramework}</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShareGroup}>
                <Share2 className="h-4 w-4 mr-2" />
                مشاركة
              </Button>
              <Button onClick={handleJoinGroup}>
                <Users className="h-4 w-4 mr-2" />
                انضمام للمجموعة
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي الميزانية</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${groupData.targetBudget.toLocaleString()}
                    </p>
                    <Progress 
                      value={(groupData.currentBudget / groupData.targetBudget) * 100} 
                      className="mt-2" 
                    />
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الأعضاء</p>
                    <p className="text-2xl font-bold text-green-600">
                      {groupData.memberCount}/{groupData.maxMembers}
                    </p>
                    <Progress 
                      value={(groupData.memberCount / groupData.maxMembers) * 100} 
                      className="mt-2" 
                    />
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">العقود النشطة</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {groupData.contracts.filter(c => c.status === 'active').length}
                    </p>
                    <p className="text-sm text-gray-500">من أصل {groupData.contracts.length}</p>
                  </div>
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الرصيد المتاح</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ${groupData.financials.availableBalance.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">غير مُستخدم</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="members">الأعضاء</TabsTrigger>
              <TabsTrigger value="contracts">العقود</TabsTrigger>
              <TabsTrigger value="voting">التصويت</TabsTrigger>
              <TabsTrigger value="financials">المالية</TabsTrigger>
              <TabsTrigger value="mcp">تحليل MCP</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Group Objectives */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        أهداف المجموعة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {groupData.objectives.map((objective, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <span className="text-right">{objective}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        النشاط الأخير
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {groupData.recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                            <div className="p-2 bg-blue-50 rounded-full">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 text-right">
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Group Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>معلومات المجموعة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>تأسست في {groupData.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{groupData.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span>{groupData.jurisdiction}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <span>{groupData.legalFramework}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>إجراءات سريعة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        فتح نقاش
                      </Button>
                      <Button className="w-full" variant="outline" onClick={handleStartVote}>
                        <Vote className="h-4 w-4 mr-2" />
                        إجراء تصويت
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Package className="h-4 w-4 mr-2" />
                        طلب عروض
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        إعدادات المجموعة
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupData.members.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <Badge variant={member.role === 'admin' ? 'default' : 'outline'}>
                            {member.role === 'admin' ? 'مدير' : 'عضو'}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>تاريخ الانضمام:</span>
                          <span>{member.joinedAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>المساهمة:</span>
                          <span>${member.contribution.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contracts" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupData.contracts.map((contract) => (
                  <Card key={contract.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{contract.title}</CardTitle>
                        <Badge className={getStatusColor(contract.status)}>
                          {contract.status === 'active' ? 'نشط' : 
                           contract.status === 'pending' ? 'معلق' : 'تفاوض'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">
                            ${contract.value.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">قيمة العقد</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">عرض التفاصيل</Button>
                          <Button size="sm" variant="outline">تحميل</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="voting" className="space-y-6">
              <div className="space-y-4">
                {groupData.votingHistory.map((vote) => (
                  <Card key={vote.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-semibold text-right">{vote.title}</h4>
                          <p className="text-sm text-gray-600 text-right">الأصوات: {vote.votes}</p>
                        </div>
                        <Badge className={getStatusColor(vote.status)}>
                          {vote.status === 'approved' ? 'مقبول' : 'معلق'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financials" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      ${groupData.financials.totalCommitted.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">إجمالي المساهمات</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      ${groupData.financials.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">المبالغ المنفقة</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">
                      ${groupData.financials.pendingPayments.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">مدفوعات معلقة</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      ${groupData.financials.availableBalance.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">الرصيد المتاح</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mcp" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MCPIntegration groupId={groupId || ''} context="group" />
                <MCPIntegration groupId={groupId || ''} context="investment" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ModernMainLayout>
  );
}
