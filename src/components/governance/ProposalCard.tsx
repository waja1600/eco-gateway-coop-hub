
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export interface ProposalCardProps {
  proposal: {
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
  };
  isActive?: boolean;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, isActive = true }) => {
  const navigate = useNavigate();
  
  const handleViewProposal = () => {
    navigate(`/governance/proposals/${proposal.id}`);
  };
  
  if (isActive) {
    return (
      <Card className="overflow-hidden">
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
          <Button 
            className="bg-green-500 hover:bg-green-600"
            onClick={handleViewProposal}
          >
            عرض التفاصيل
          </Button>
          <Button variant="outline">
            <Link to={`/governance/proposals/${proposal.id}`}>
              صوّت الآن
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  } else {
    // Card for past proposals
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{proposal.title}</CardTitle>
            {proposal.result && (
              <Badge className={proposal.result === "تمت الموافقة" ? 
                "bg-green-100 text-green-800 border-green-200" : 
                "bg-red-100 text-red-800 border-red-200"}>
                {proposal.result}
              </Badge>
            )}
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
              {proposal.date && <p className="text-muted-foreground text-sm">تاريخ الانتهاء: {proposal.date}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewProposal}
          >
            عرض التفاصيل
          </Button>
        </CardFooter>
      </Card>
    );
  }
};
