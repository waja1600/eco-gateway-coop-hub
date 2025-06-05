
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupCard } from './GroupCard';
import { CreateGroupModal } from './CreateGroupModal';
import { Plus, Search, Filter, Users, Briefcase, DollarSign } from 'lucide-react';

const mockGroups = [
  {
    id: 1,
    name: 'مجموعة موردي التكنولوجيا',
    description: 'شراء جماعي لمعدات التكنولوجيا وتراخيص البرمجيات للشركات الصغيرة.',
    type: 'group' as const,
    memberCount: 15,
    category: 'التكنولوجيا',
    location: 'نيويورك، الولايات المتحدة',
    status: 'active' as const,
    lastActivity: 'منذ ساعتين',
    requestType: 'purchase' as const,
    votingStatus: 'open' as const,
    activeVotes: 2,
  },
  {
    id: 2,
    name: 'مشروع الطاقة الخضراء',
    description: 'تمويل جماعي لحلول الطاقة المتجددة للمجتمعات الريفية.',
    type: 'group' as const,
    memberCount: 8,
    category: 'الطاقة',
    location: 'برلين، ألمانيا',
    status: 'pending' as const,
    lastActivity: 'منذ يوم واحد',
    requestType: 'marketing' as const,
    votingStatus: 'pending' as const,
    activeVotes: 1,
  },
  {
    id: 3,
    name: 'مطور ويب مستقل',
    description: 'مطور ويب مستقل يبحث عن فرص العمل الحر والتعاون.',
    type: 'solo' as const,
    memberCount: 1,
    category: 'التكنولوجيا',
    location: 'عن بُعد',
    status: 'active' as const,
    lastActivity: 'منذ 30 دقيقة',
    requestType: 'service' as const,
    votingStatus: 'closed' as const,
    activeVotes: 0,
  },
];

export function ModernHomepage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState(mockGroups);

  const handleCreateGroup = (groupData: any) => {
    const newGroup = {
      id: groups.length + 1,
      ...groupData,
      memberCount: groupData.type === 'solo' ? 1 : 3,
      status: 'active' as const,
      lastActivity: 'الآن',
      votingStatus: 'pending' as const,
      activeVotes: 0,
    };
    setGroups([newGroup, ...groups]);
  };

  const handleViewGroup = (groupId: number) => {
    console.log('عرض المجموعة:', groupId);
    // التنقل إلى صفحة تفاصيل المجموعة
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupsByType = {
    all: filteredGroups,
    purchase: filteredGroups.filter(g => g.requestType === 'purchase'),
    funding: filteredGroups.filter(g => g.requestType === 'marketing'),
    freelancer: filteredGroups.filter(g => g.type === 'solo'),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              المجموعات التعاونية النشطة
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              انضم إلى مجموعات موجودة أو أنشئ مجموعتك الخاصة للشراء الجماعي، تمويل المشاريع، والتعاون في العمل الحر.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                إنشاء مجموعة جديدة
              </Button>
              
              <div className="flex gap-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{groups.filter(g => g.type === 'group').length} مجموعة</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{groups.filter(g => g.type === 'solo').length} فردي</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في المجموعات بالاسم، الوصف، أو الفئة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            تصفية
          </Button>
        </div>

        {/* Group Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all" className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              جميع المجموعات
            </TabsTrigger>
            <TabsTrigger value="purchase" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              الشراء
            </TabsTrigger>
            <TabsTrigger value="funding" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              التمويل
            </TabsTrigger>
            <TabsTrigger value="freelancer" className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              المستقلين
            </TabsTrigger>
          </TabsList>

          {Object.entries(groupsByType).map(([tabKey, tabGroups]) => (
            <TabsContent key={tabKey} value={tabKey}>
              {tabGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tabGroups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onViewGroup={handleViewGroup}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">لا توجد مجموعات تطابق معاييرك.</p>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    variant="outline"
                  >
                    إنشاء أول مجموعة
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}
