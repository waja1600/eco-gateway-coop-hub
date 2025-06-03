
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Clock } from "lucide-react";

interface Proposal {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  abstain: number;
  quorum: number;
  deadline: string;
  category: string;
  creator: string;
  result?: string;
  date?: string;
}

interface ProposalCardProps {
  proposal: Proposal;
  isPast?: boolean;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, isPast = false }) => {
  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.abstain;
  const quorumProgress = (totalVotes / proposal.quorum) * 100;
  
  const getStatusBadge = () => {
    if (isPast) {
      return proposal.result ? (
        <Badge variant={proposal.result === 'تمت الموافقة' ? 'default' : 'destructive'}>
          {proposal.result}
        </Badge>
      ) : (
        <Badge variant="secondary">منتهي</Badge>
      );
    }
    return <Badge variant="outline">نشط</Badge>;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{proposal.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {proposal.description}
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>المنشئ: {proposal.creator}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{isPast ? (proposal.date || proposal.deadline) : `ينتهي: ${proposal.deadline}`}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {proposal.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isPast && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>نسبة المشاركة</span>
                <span>{Math.round(quorumProgress)}%</span>
              </div>
              <Progress value={quorumProgress} className="h-2" />
              <div className="text-xs text-gray-500 text-center">
                {totalVotes} من {proposal.quorum} صوت مطلوب
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-700">{proposal.votesFor}</div>
                <div className="text-green-600">مع</div>
              </div>
              <div className="p-2 bg-red-50 rounded">
                <div className="font-semibold text-red-700">{proposal.votesAgainst}</div>
                <div className="text-red-600">ضد</div>
              </div>
              <div className="p-2 bg-gray-50 rounded">
                <div className="font-semibold text-gray-700">{proposal.abstain}</div>
                <div className="text-gray-600">امتناع</div>
              </div>
            </div>
          </>
        )}
        
        {isPast && proposal.result && (
          <div className="text-center p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600 mb-1">النتيجة النهائية</div>
            <div className="font-semibold">{proposal.result}</div>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full"
          disabled={isPast}
        >
          {isPast ? 'عرض التفاصيل' : 'التصويت والمشاركة'}
        </Button>
      </CardContent>
    </Card>
  );
};
