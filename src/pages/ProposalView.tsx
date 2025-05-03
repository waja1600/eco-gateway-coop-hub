
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProposalDetails, UserVote } from '@/components/governance/ProposalDetails';
import { useToast } from "@/components/ui/use-toast";

// نموذج بيانات للعرض
const mockProposal = {
  id: 1,
  title: "إضافة مجموعة شراء للمحاصيل العضوية",
  description: "التصويت على إضافة مجموعة شراء جديدة للمحاصيل العضوية من المزارعين المحليين",
  detailedDescription: "تهدف هذه المبادرة إلى دعم المزارعين المحليين الذين ينتجون محاصيل عضوية من خلال إنشاء مجموعة شراء جماعي تتيح للأعضاء شراء المنتجات العضوية بأسعار تفضيلية. سيؤدي هذا إلى تعزيز الاقتصاد المحلي، وتقليل البصمة الكربونية للغذاء، وتوفير منتجات صحية للمجتمع.\n\nسيتم تحديد قائمة المنتجات العضوية المتاحة للشراء الجماعي، وسيتم التعاقد مع المزارعين المحليين الذين يلتزمون بمعايير الزراعة العضوية المعتمدة. سيتم تنظيم عملية الشراء على أساس موسمي لضمان الحصول على أفضل المنتجات الطازجة.",
  category: "مجموعات الشراء",
  status: "نشط" as "نشط" | "تمت الموافقة" | "تم الرفض" | "مغلق",
  creator: "مزارع محلي",
  createdAt: "2025-04-15",
  deadline: "2025-05-30",
  votesFor: 24,
  votesAgainst: 5,
  abstain: 3,
  quorum: 30,
  documents: [
    { title: "تفاصيل المزارعين المشاركين", url: "#" },
    { title: "قائمة المنتجات المقترحة", url: "#" },
    { title: "دراسة الجدوى الاقتصادية", url: "#" }
  ],
  updates: [
    { date: "2025-04-20", content: "تم إضافة 5 مزارعين جدد للمبادرة" },
    { date: "2025-04-25", content: "تم تحديث قائمة المنتجات المتاحة للموسم القادم" }
  ],
  votes: [
    { userId: "user1", userName: "أحمد محمد", vote: "مع" as const, timestamp: "2025-04-16 10:30", comment: "أؤيد المبادرة لدعم المزارعين المحليين" },
    { userId: "user2", userName: "سارة علي", vote: "مع" as const, timestamp: "2025-04-17 14:22", comment: "المنتجات العضوية مهمة للصحة" },
    { userId: "user3", userName: "محمد أحمد", vote: "ضد" as const, timestamp: "2025-04-18 09:15", comment: "أرى أن الأسعار مرتفعة جداً" },
    { userId: "user4", userName: "فاطمة حسن", vote: "مع" as const, timestamp: "2025-04-19 16:05", comment: undefined },
    { userId: "user5", userName: "علي محمود", vote: "امتناع" as const, timestamp: "2025-04-20 11:30", comment: "أحتاج مزيداً من المعلومات" }
  ] as UserVote[]
};

const ProposalView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // في الواقع، ستقوم بجلب البيانات بناءً على المعرف
  // هنا نستخدم بيانات تجريبية
  const [proposal, setProposal] = useState(mockProposal);
  
  const handleBack = () => {
    navigate('/governance');
  };
  
  const handleVote = (vote: 'مع' | 'ضد' | 'امتناع', comment?: string) => {
    // في التطبيق الفعلي، سترسل الصوت إلى الخادم
    // هنا نحاكي إضافة الصوت لعرض الواجهة
    
    const newVote: UserVote = {
      userId: "current-user",
      userName: "المستخدم الحالي",
      vote: vote,
      timestamp: new Date().toLocaleString('ar-EG'),
      comment
    };
    
    const updatedVotes = [...proposal.votes, newVote];
    
    let updatedProposal = { ...proposal };
    
    // تحديث عدد الأصوات
    if (vote === 'مع') {
      updatedProposal.votesFor += 1;
    } else if (vote === 'ضد') {
      updatedProposal.votesAgainst += 1;
    } else {
      updatedProposal.abstain += 1;
    }
    
    updatedProposal.votes = updatedVotes;
    
    setProposal(updatedProposal);
    
    toast({
      title: "تم إرسال التصويت",
      description: `لقد صوّت "${vote}" على هذا المقترح`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container px-4 md:px-6 py-8">
          <ProposalDetails 
            proposal={proposal}
            onBack={handleBack}
            onVote={handleVote}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProposalView;
