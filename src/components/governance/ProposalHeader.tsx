
import React from 'react';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProposalHeaderProps {
  status: 'نشط' | 'تمت الموافقة' | 'تم الرفض' | 'مغلق';
  onBack: () => void;
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'نشط':
      return "bg-blue-100 text-blue-800 border-blue-200";
    case 'تمت الموافقة':
      return "bg-green-100 text-green-800 border-green-200";
    case 'تم الرفض':
      return "bg-red-100 text-red-800 border-red-200";
    case 'مغلق':
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const ProposalHeader: React.FC<ProposalHeaderProps> = ({ status, onBack }) => {
  return (
    <div className="flex justify-between items-center">
      <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
        <ArrowLeft size={18} />
        <span>العودة للمقترحات</span>
      </Button>
      
      <Badge className={getStatusClass(status)}>
        {status}
      </Badge>
    </div>
  );
};
