
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
    <Card className="w-[350px] flex flex-col transition-all duration-200 hover:shadow-lg border border-slate-200 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Badge 
            variant="outline" 
            className={`${badgeColor.bg} ${badgeColor.text} ${badgeColor.border} backdrop-blur-sm`}
          >
            {status}
          </Badge>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow bg-white pt-4">
        {children}
      </CardContent>
      <CardFooter className="pt-2 pb-4 bg-gradient-to-b from-white to-slate-50">
        <Button 
          className={`w-full ${buttonColor} ${buttonHoverColor} transition-all duration-200 font-medium shadow`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
