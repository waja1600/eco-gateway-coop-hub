
import React, { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// واجهة خصائص البطاقة العامة
interface ContractCardProps {
  title: string;
  description: string;
  status: string;
  badgeColor: {
    bg: string;
    text: string;
    border: string;
  };
  buttonColor: string;
  buttonHoverColor: string;
  buttonText: string;
  children: ReactNode;
}

export const ContractCard: React.FC<ContractCardProps> = ({
  title,
  description,
  status,
  badgeColor,
  buttonColor,
  buttonHoverColor,
  buttonText,
  children
}) => {
  return (
    <Card className="w-[350px] flex flex-col transition-all duration-300 hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.2)] border-2 border-slate-200/80 overflow-hidden transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-slate-100 to-white pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">{title}</CardTitle>
          <Badge 
            variant="outline" 
            className={`${badgeColor.bg} ${badgeColor.text} ${badgeColor.border} backdrop-blur-sm shadow-sm`}
          >
            {status}
          </Badge>
        </div>
        <CardDescription className="mt-2 text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow bg-white pt-4">
        {children}
      </CardContent>
      <CardFooter className="pt-2 pb-4 bg-gradient-to-b from-white to-slate-100">
        <Button 
          className={`w-full ${buttonColor} ${buttonHoverColor} transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
