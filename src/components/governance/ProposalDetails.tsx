
import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, User, Calendar, MessageSquare, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar } from "@/components/ui/avatar";

export interface UserVote {
  userId: string;
  userName: string;
  userAvatar?: string;
  vote: 'مع' | 'ضد' | 'امتناع';
  timestamp: string;
  comment?: string;
}

export interface ProposalDetailsProps {
  proposal: {
    id: number;
    title: string;
    description: string;
    detailedDescription?: string;
    category: string;
    status: 'نشط' | 'تمت الموافقة' | 'تم الرفض' | 'مغلق';
    creator: string;
    createdAt: string;
    deadline: string;
    votesFor: number;
    votesAgainst: number;
    abstain: number;
    quorum: number;
    documents?: { title: string; url: string }[];
    updates?: { date: string; content: string }[];
    votes?: UserVote[];
  };
  onBack: () => void;
  onVote?: (vote: 'مع' | 'ضد' | 'امتناع', comment?: string) => void;
}

export const ProposalDetails = ({ proposal, onBack, onVote }: ProposalDetailsProps) => {
  const [comment, setComment] = React.useState("");
  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.abstain;
  const percentageFor = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const percentageAgainst = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;
  const percentageAbstain = totalVotes > 0 ? (proposal.abstain / totalVotes) * 100 : 0;
  const quorumPercentage = (totalVotes / proposal.quorum) * 100;
  
  const handleVote = (vote: 'مع' | 'ضد' | 'امتناع') => {
    if (onVote) {
      onVote(vote, comment);
      setComment("");
    }
  };
  
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft size={18} />
          <span>العودة للمقترحات</span>
        </Button>
        
        <Badge className={getStatusClass(proposal.status)}>
          {proposal.status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{proposal.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User size={16} />
            <span>المنشئ: {proposal.creator}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>تم الإنشاء: {proposal.createdAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>الموعد النهائي: {proposal.deadline}</span>
          </div>
          <div>
            <Badge variant="outline">{proposal.category}</Badge>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">إحصائيات التصويت</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">النصاب المطلوب</span>
                <span className="text-muted-foreground">{totalVotes} من أصل {proposal.quorum}</span>
              </div>
              <Progress value={quorumPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-700">{proposal.votesFor}</div>
                <div className="text-green-700 font-medium">مع</div>
                <Progress value={percentageFor} className="h-1 mt-2 bg-green-100" />
                <div className="text-sm text-green-600 mt-1">{percentageFor.toFixed(1)}%</div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-700">{proposal.votesAgainst}</div>
                <div className="text-red-700 font-medium">ضد</div>
                <Progress value={percentageAgainst} className="h-1 mt-2 bg-red-100" />
                <div className="text-sm text-red-600 mt-1">{percentageAgainst.toFixed(1)}%</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-700">{proposal.abstain}</div>
                <div className="text-gray-700 font-medium">امتناع</div>
                <Progress value={percentageAbstain} className="h-1 mt-2 bg-gray-200" />
                <div className="text-sm text-gray-600 mt-1">{percentageAbstain.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="description">التفاصيل</TabsTrigger>
          <TabsTrigger value="votes">الأصوات</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
          <TabsTrigger value="updates">التحديثات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="space-y-4 py-4">
          <div className="prose max-w-none">
            <p className="mb-4 text-muted-foreground">{proposal.description}</p>
            {proposal.detailedDescription && (
              <div className="mt-6 space-y-4 border-t pt-6">
                <h3 className="text-lg font-medium">التفاصيل الكاملة</h3>
                <p>{proposal.detailedDescription}</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="votes" className="py-4">
          {proposal.votes && proposal.votes.length > 0 ? (
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
                {proposal.votes.map((vote, index) => (
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
          {proposal.documents && proposal.documents.length > 0 ? (
            <div className="space-y-2">
              {proposal.documents.map((doc, index) => (
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
          {proposal.updates && proposal.updates.length > 0 ? (
            <div className="space-y-4">
              {proposal.updates.map((update, index) => (
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
      
      {proposal.status === 'نشط' && (
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
              onClick={() => handleVote('مع')}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              مع
            </Button>
            <Button 
              className="flex-1" 
              variant="outline" 
              onClick={() => handleVote('امتناع')}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              امتناع
            </Button>
            <Button 
              className="flex-1 bg-red-500 hover:bg-red-600" 
              onClick={() => handleVote('ضد')}
            >
              <XCircle className="mr-2 h-4 w-4" />
              ضد
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
