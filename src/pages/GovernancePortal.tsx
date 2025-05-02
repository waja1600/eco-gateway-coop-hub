
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { HandCoins, Vote, Users, TrendingUp } from "lucide-react";

const activeProposals = [
  {
    id: 1,
    title: "إضافة مجموعة شراء للمحاصيل العضوية",
    description: "التصويت على إضافة مجموعة شراء جديدة للمحاصيل العضوية من المزارعين المحليين",
    votesFor: 24,
    votesAgainst: 5,
    abstain: 3,
    quorum: 30,
    deadline: "2025-05-30",
    category: "مجموعات الشراء",
    creator: "مزارع محلي"
  },
  {
    id: 2,
    title: "تمويل مشروع الطاقة الشمسية المجتمعي",
    description: "التصويت على تخصيص 25% من صندوق التمويل لمشروع الطاقة الشمسية المجتمعي",
    votesFor: 35,
    votesAgainst: 12,
    abstain: 5,
    quorum: 40,
    deadline: "2025-06-10",
    category: "التمويل",
    creator: "مجموعة الطاقة المستدامة"
  },
  {
    id: 3,
    title: "تعديل شروط الشراء الجماعي",
    description: "التصويت على تعديل الحد الأدنى للمشاركة في مجموعات الشراء من $5,000 إلى $3,000",
    votesFor: 42,
    votesAgainst: 18,
    abstain: 7,
    quorum: 50,
    deadline: "2025-05-15",
    category: "الحوكمة",
    creator: "لجنة القواعد التنظيمية"
  },
  {
    id: 4,
    title: "إنشاء صندوق تمويل للمشاريع الناشئة",
    description: "التصويت على إنشاء صندوق خاص لدعم المشاريع التعاونية الناشئة بقيمة $100,000",
    votesFor: 28,
    votesAgainst: 14,
    abstain: 8,
    quorum: 40,
    deadline: "2025-06-20",
    category: "التمويل",
    creator: "مجموعة تطوير المشاريع"
  }
];

const pastProposals = [
  {
    id: 101,
    title: "توسيع شبكة المزارعين المحليين",
    description: "مقترح لتوسيع شبكة المزارعين المحليين لتشمل مناطق إضافية",
    result: "تمت الموافقة",
    votesFor: 53,
    votesAgainst: 12,
    abstain: 5,
    category: "مجموعات الشراء",
    date: "2025-04-01"
  },
  {
    id: 102,
    title: "إضافة فئة جديدة للتمويل الجماعي",
    description: "إضافة فئة جديدة للتمويل الجماعي تركز على المشاريع البيئية",
    result: "تمت الموافقة",
    votesFor: 48,
    votesAgainst: 15,
    abstain: 7,
    category: "التمويل",
    date: "2025-03-15"
  },
  {
    id: 103,
    title: "تغيير نموذج توزيع الأرباح",
    description: "مقترح لتعديل نموذج توزيع الأرباح للمشاريع التعاونية",
    result: "تم الرفض",
    votesFor: 22,
    votesAgainst: 45,
    abstain: 3,
    category: "الحوكمة",
    date: "2025-04-10"
  }
];

const GovernancePortal = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-muted/50 to-muted py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">بوابة الحوكمة التعاونية</h1>
              <p className="text-muted-foreground md:text-xl">
                شارك في صنع القرار الجماعي وتطوير مجموعات الشراء والتمويل التعاوني
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button className="bg-coop-green hover:bg-coop-green-dark flex items-center">
                  <Vote className="mr-2 h-5 w-5" />
                  صوّت الآن
                </Button>
                <Button variant="outline" className="flex items-center">
                  <HandCoins className="mr-2 h-5 w-5" />
                  إنشاء مقترح جديد
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="py-12 container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المقترحات النشطة</CardTitle>
                <Vote className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProposals.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 منذ الشهر الماضي
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الأعضاء المشاركين</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">
                  +24% نسبة المشاركة
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المقترحات المُنفذة</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
                <p className="text-xs text-muted-foreground">
                  +18 منذ بداية العام
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <div className="flex justify-between items-center mb-8">
              <TabsList>
                <TabsTrigger value="active">المقترحات النشطة</TabsTrigger>
                <TabsTrigger value="past">المقترحات السابقة</TabsTrigger>
                <TabsTrigger value="my">مقترحاتي</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="outline">تصفية</Button>
                <Button variant="outline">ترتيب</Button>
              </div>
            </div>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeProposals.map(proposal => (
                  <Card key={proposal.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{proposal.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {proposal.category}
                        </Badge>
                      </div>
                      <CardDescription>{proposal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{proposal.votesFor} صوت مع</span>
                            <span className="text-muted-foreground">{proposal.votesFor + proposal.votesAgainst + proposal.abstain} من أصل {proposal.quorum} المطلوب</span>
                          </div>
                          <Progress value={((proposal.votesFor + proposal.votesAgainst + proposal.abstain) / proposal.quorum) * 100} />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-green-50 rounded">
                            <p className="font-medium">{proposal.votesFor}</p>
                            <p className="text-muted-foreground text-xs">مع</p>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded">
                            <p className="font-medium">{proposal.votesAgainst}</p>
                            <p className="text-muted-foreground text-xs">ضد</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="font-medium">{proposal.abstain}</p>
                            <p className="text-muted-foreground text-xs">امتناع</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">الموعد النهائي</p>
                            <p className="font-medium">{proposal.deadline}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">المنشئ</p>
                            <p className="font-medium">{proposal.creator}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-green-500 hover:bg-green-600">مع</Button>
                      <Button variant="outline">امتناع</Button>
                      <Button className="bg-red-500 hover:bg-red-600">ضد</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastProposals.map(proposal => (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{proposal.title}</CardTitle>
                        <Badge className={proposal.result === "تمت الموافقة" ? 
                          "bg-green-100 text-green-800 border-green-200" : 
                          "bg-red-100 text-red-800 border-red-200"}>
                          {proposal.result}
                        </Badge>
                      </div>
                      <CardDescription>{proposal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-green-50 rounded">
                            <p className="font-medium">{proposal.votesFor}</p>
                            <p className="text-muted-foreground text-xs">مع</p>
                          </div>
                          <div className="text-center p-2 bg-red-50 rounded">
                            <p className="font-medium">{proposal.votesAgainst}</p>
                            <p className="text-muted-foreground text-xs">ضد</p>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <p className="font-medium">{proposal.abstain}</p>
                            <p className="text-muted-foreground text-xs">امتناع</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">الفئة: {proposal.category}</p>
                          <p className="text-muted-foreground text-sm">تاريخ الانتهاء: {proposal.date}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">عرض التفاصيل</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="my">
              <div className="text-center py-12">
                <p className="text-muted-foreground">قم بتسجيل الدخول لعرض مقترحاتك</p>
                <Button className="mt-4" onClick={() => window.location.href = '/login'}>تسجيل الدخول</Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="bg-muted py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">كيف تعمل الحوكمة التعاونية؟</h2>
              <p className="text-muted-foreground">
                نظام حوكمة لا مركزي يتيح لجميع الأعضاء المشاركة في صنع القرار
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-right">
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                    <span className="text-2xl">1</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">إنشاء المقترحات</h3>
                  <p className="text-muted-foreground text-center">
                    يمكن لأي عضو إنشاء مقترح للتصويت عليه من المجتمع
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                    <span className="text-2xl">2</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">التصويت الجماعي</h3>
                  <p className="text-muted-foreground text-center">
                    يصوت الأعضاء على المقترحات بدون تكلفة باستخدام نظام التصويت اللامركزي
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                    <span className="text-2xl">3</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">التنفيذ الآلي</h3>
                  <p className="text-muted-foreground text-center">
                    يتم تنفيذ المقترحات المعتمدة تلقائياً عند اكتمال النصاب والموافقة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GovernancePortal;
