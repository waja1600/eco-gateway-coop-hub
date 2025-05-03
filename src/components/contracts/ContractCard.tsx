
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
    <Card className="w-[350px] flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge 
            variant="outline" 
            className={`${badgeColor.bg} ${badgeColor.text} ${badgeColor.border}`}
          >
            {status}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {children}
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${buttonColor} ${buttonHoverColor}`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
