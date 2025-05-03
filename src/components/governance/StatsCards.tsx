
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vote, Users, TrendingUp } from "lucide-react";

export interface StatsCardsProps {
  activeProposals: number;
  participatingMembers: number;
  implementedProposals: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  activeProposals,
  participatingMembers,
  implementedProposals
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">المقترحات النشطة</CardTitle>
          <Vote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProposals}</div>
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
          <div className="text-2xl font-bold">{participatingMembers}</div>
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
          <div className="text-2xl font-bold">{implementedProposals}</div>
          <p className="text-xs text-muted-foreground">
            +18 منذ بداية العام
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
