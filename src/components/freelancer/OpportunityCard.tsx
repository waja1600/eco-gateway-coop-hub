
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  client: string;
  rate: string;
  duration: string;
  location: string;
  skills: string[];
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Card key={opportunity.id} className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base sm:text-lg">{opportunity.title}</CardTitle>
          <Badge className={
            opportunity.location === 'Remote' ? 'bg-green-100 text-green-800 border-green-200 shrink-0' :
            opportunity.location === 'Hybrid' ? 'bg-blue-100 text-blue-800 border-blue-200 shrink-0' :
            'bg-amber-100 text-amber-800 border-amber-200 shrink-0'
          }>
            {opportunity.location}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 text-xs sm:text-sm">{opportunity.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-1">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-y-2 text-xs sm:text-sm">
            <div>
              <p className="text-muted-foreground">Rate</p>
              <p className="font-medium">{opportunity.rate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{opportunity.duration}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Client</p>
              <p className="font-medium">{opportunity.client}</p>
            </div>
          </div>
          
          <div>
            <p className="text-muted-foreground text-xs sm:text-sm mb-1">Skills</p>
            <div className="flex flex-wrap gap-1">
              {opportunity.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-muted text-xs py-0 px-1.5">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex gap-2">
          <Button className="flex-1 bg-coop-brown hover:bg-coop-brown/90 text-sm">Apply Now</Button>
          <Button variant="outline" className="px-3">
            ❤️
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
