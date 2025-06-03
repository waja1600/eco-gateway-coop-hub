
import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface VotingSectionProps {
  status: 'نشط' | 'تمت الموافقة' | 'تم الرفض' | 'مغلق';
  comment: string;
  setComment: (comment: string) => void;
  onVote: (vote: 'مع' | 'ضد' | 'امتناع') => void;
}

export const VotingSection: React.FC<VotingSectionProps> = ({
  status,
  comment,
  setComment,
  onVote
}) => {
  if (status !== 'نشط') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">التصويت</CardTitle>
        <CardDescription>اختر تصويتك وأضف تعليقاً (اختياري)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-muted-foreground mb-1">تعليق</label>
            <textarea
              id="comment"
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="أضف تعليقاً مع تصويتك (اختياري)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button 
          className="flex-1 bg-green-500 hover:bg-green-600" 
          onClick={() => onVote('مع')}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          مع
        </Button>
        <Button 
          className="flex-1" 
          variant="outline" 
          onClick={() => onVote('امتناع')}
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          امتناع
        </Button>
        <Button 
          className="flex-1 bg-red-500 hover:bg-red-600" 
          onClick={() => onVote('ضد')}
        >
          <XCircle className="mr-2 h-4 w-4" />
          ضد
        </Button>
      </CardFooter>
    </Card>
  );
};
