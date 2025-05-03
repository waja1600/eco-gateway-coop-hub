
import React from 'react';
import { Button } from "@/components/ui/button";
import { Vote, HandCoins } from "lucide-react";

export const GovernanceHero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-muted/50 to-muted py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">بوابة الحوكمة التعاونية</h1>
          <p className="text-muted-foreground md:text-xl">
            شارك في صنع القرار الجماعي وتطوير مجموعات الشراء والتمويل التعاوني
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="bg-coop-green hover:bg-coop-green-dark flex items-center">
              <Vote className="mr-2 h-5 w-5" />
              صوّت الآن
            </Button>
            <Button variant="outline" className="flex items-center">
              <HandCoins className="mr-2 h-5 w-5" />
              إنشاء مقترح جديد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
