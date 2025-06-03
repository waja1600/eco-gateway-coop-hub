
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface VotingStatsProps {
  votesFor: number;
  votesAgainst: number;
  abstain: number;
  quorum: number;
}

export const VotingStats: React.FC<VotingStatsProps> = ({
  votesFor,
  votesAgainst,
  abstain,
  quorum
}) => {
  const totalVotes = votesFor + votesAgainst + abstain;
  const percentageFor = totalVotes > 0 ? (votesFor / totalVotes) * 100 : 0;
  const percentageAgainst = totalVotes > 0 ? (votesAgainst / totalVotes) * 100 : 0;
  const percentageAbstain = totalVotes > 0 ? (abstain / totalVotes) * 100 : 0;
  const quorumPercentage = (totalVotes / quorum) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">إحصائيات التصويت</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">النصاب المطلوب</span>
              <span className="text-muted-foreground">{totalVotes} من أصل {quorum}</span>
            </div>
            <Progress value={quorumPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-700">{votesFor}</div>
              <div className="text-green-700 font-medium">مع</div>
              <Progress value={percentageFor} className="h-1 mt-2 bg-green-100" />
              <div className="text-sm text-green-600 mt-1">{percentageFor.toFixed(1)}%</div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-700">{votesAgainst}</div>
              <div className="text-red-700 font-medium">ضد</div>
              <Progress value={percentageAgainst} className="h-1 mt-2 bg-red-100" />
              <div className="text-sm text-red-600 mt-1">{percentageAgainst.toFixed(1)}%</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-700">{abstain}</div>
              <div className="text-gray-700 font-medium">امتناع</div>
              <Progress value={percentageAbstain} className="h-1 mt-2 bg-gray-200" />
              <div className="text-sm text-gray-600 mt-1">{percentageAbstain.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
