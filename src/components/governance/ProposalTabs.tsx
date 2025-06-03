
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, User, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface UserVote {
  userId: string;
  userName: string;
  userAvatar?: string;
  vote: 'مع' | 'ضد' | 'امتناع';
  timestamp: string;
  comment?: string;
}

interface ProposalTabsProps {
  description: string;
  detailedDescription?: string;
  votes?: UserVote[];
  documents?: { title: string; url: string }[];
  updates?: { date: string; content: string }[];
}

export const ProposalTabs: React.FC<ProposalTabsProps> = ({
  description,
  detailedDescription,
  votes,
  documents,
  updates
}) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="description">التفاصيل</TabsTrigger>
        <TabsTrigger value="votes">الأصوات</TabsTrigger>
        <TabsTrigger value="documents">الوثائق</TabsTrigger>
        <TabsTrigger value="updates">التحديثات</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="space-y-4 py-4">
        <div className="prose max-w-none">
          <p className="mb-4 text-muted-foreground">{description}</p>
          {detailedDescription && (
            <div className="mt-6 space-y-4 border-t pt-6">
              <h3 className="text-lg font-medium">التفاصيل الكاملة</h3>
              <p>{detailedDescription}</p>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="votes" className="py-4">
        {votes && votes.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المستخدم</TableHead>
                <TableHead>التصويت</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>تعليق</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {votes.map((vote, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            {vote.userAvatar ? (
                              <img src={vote.userAvatar} alt={vote.userName} />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                <User size={16} />
                              </div>
                            )}
                          </Avatar>
                          <span>{vote.userName}</span>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{vote.userName}</h4>
                            <div className="text-sm">
                              <p className="text-muted-foreground">ID: {vote.userId}</p>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {vote.vote === 'مع' && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {vote.vote === 'ضد' && <XCircle className="h-4 w-4 text-red-500" />}
                      {vote.vote === 'امتناع' && <AlertCircle className="h-4 w-4 text-gray-500" />}
                      <span>{vote.vote}</span>
                    </div>
                  </TableCell>
                  <TableCell>{vote.timestamp}</TableCell>
                  <TableCell>{vote.comment || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد أصوات بعد
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="documents" className="py-4">
        {documents && documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map((doc, index) => (
              <Card key={index}>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md">{doc.title}</CardTitle>
                    <Button variant="outline" asChild>
                      <a href={doc.url} target="_blank" rel="noreferrer">عرض</a>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد وثائق مرفقة
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="updates" className="py-4">
        {updates && updates.length > 0 ? (
          <div className="space-y-4">
            {updates.map((update, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center gap-2">
                    <Calendar size={16} />
                    {update.date}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{update.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد تحديثات بعد
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
