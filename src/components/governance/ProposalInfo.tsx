
import React from 'react';
import { User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProposalInfoProps {
  title: string;
  creator: string;
  createdAt: string;
  deadline: string;
  category: string;
}

export const ProposalInfo: React.FC<ProposalInfoProps> = ({
  title,
  creator,
  createdAt,
  deadline,
  category
}) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <User size={16} />
          <span>المنشئ: {creator}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>تم الإنشاء: {createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>الموعد النهائي: {deadline}</span>
        </div>
        <div>
          <Badge variant="outline">{category}</Badge>
        </div>
      </div>
    </div>
  );
};
