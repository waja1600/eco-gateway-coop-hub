
import React from 'react';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandCoins, Vote, Users } from "lucide-react";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardOverview />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HandCoins className="mr-2 h-5 w-5" />
              مجموعات الشراء
            </CardTitle>
            <CardDescription>
              إدارة وانضمام إلى عقود الشراء الجماعي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              هناك 12 عقد شراء نشط يمكنك الانضمام إليها
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-coop-green hover:bg-coop-green-dark">
              <Link to="/portals/supplier">عرض العقود</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              منصة التمويل
            </CardTitle>
            <CardDescription>
              دعم واستثمار في المشاريع التعاونية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              8 مشاريع تمويل جديدة تنتظر دعمك
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-coop-blue hover:bg-coop-blue/90">
              <Link to="/portals/funder">استكشاف المشاريع</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Vote className="mr-2 h-5 w-5" />
              الحوكمة التعاونية
            </CardTitle>
            <CardDescription>
              المشاركة في صنع القرار الجماعي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              4 مقترحات تنتظر تصويتك اليوم
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/governance">التصويت الآن</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
