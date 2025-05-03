
import React from 'react';

// بيانات المقترحات النشطة
export const activeProposals = [
  {
    id: 1,
    title: "إضافة مجموعة شراء للمحاصيل العضوية",
    description: "التصويت على إضافة مجموعة شراء جديدة للمحاصيل العضوية من المزارعين المحليين",
    votesFor: 24,
    votesAgainst: 5,
    abstain: 3,
    quorum: 30,
    deadline: "2025-05-30",
    category: "مجموعات الشراء",
    creator: "مزارع محلي"
  },
  {
    id: 2,
    title: "تمويل مشروع الطاقة الشمسية المجتمعي",
    description: "التصويت على تخصيص 25% من صندوق التمويل لمشروع الطاقة الشمسية المجتمعي",
    votesFor: 35,
    votesAgainst: 12,
    abstain: 5,
    quorum: 40,
    deadline: "2025-06-10",
    category: "التمويل",
    creator: "مجموعة الطاقة المستدامة"
  },
  {
    id: 3,
    title: "تعديل شروط الشراء الجماعي",
    description: "التصويت على تعديل الحد الأدنى للمشاركة في مجموعات الشراء من $5,000 إلى $3,000",
    votesFor: 42,
    votesAgainst: 18,
    abstain: 7,
    quorum: 50,
    deadline: "2025-05-15",
    category: "الحوكمة",
    creator: "لجنة القواعد التنظيمية"
  },
  {
    id: 4,
    title: "إنشاء صندوق تمويل للمشاريع الناشئة",
    description: "التصويت على إنشاء صندوق خاص لدعم المشاريع التعاونية الناشئة بقيمة $100,000",
    votesFor: 28,
    votesAgainst: 14,
    abstain: 8,
    quorum: 40,
    deadline: "2025-06-20",
    category: "التمويل",
    creator: "مجموعة تطوير المشاريع"
  }
];

// بيانات المقترحات السابقة
export const pastProposals = [
  {
    id: 101,
    title: "توسيع شبكة المزارعين المحليين",
    description: "مقترح لتوسيع شبكة المزارعين المحليين لتشمل مناطق إضافية",
    result: "تمت الموافقة",
    votesFor: 53,
    votesAgainst: 12,
    abstain: 5,
    category: "مجموعات الشراء",
    date: "2025-04-01",
    quorum: 50,          // Added required property
    deadline: "2025-03-30", // Added required property
    creator: "مجموعة المزارعين" // Added required property
  },
  {
    id: 102,
    title: "إضافة فئة جديدة للتمويل الجماعي",
    description: "إضافة فئة جديدة للتمويل الجماعي تركز على المشاريع البيئية",
    result: "تمت الموافقة",
    votesFor: 48,
    votesAgainst: 15,
    abstain: 7,
    category: "التمويل",
    date: "2025-03-15",
    quorum: 45,          // Added required property
    deadline: "2025-03-10", // Added required property
    creator: "لجنة التمويل" // Added required property
  },
  {
    id: 103,
    title: "تغيير نموذج توزيع الأرباح",
    description: "مقترح لتعديل نموذج توزيع الأرباح للمشاريع التعاونية",
    result: "تم الرفض",
    votesFor: 22,
    votesAgainst: 45,
    abstain: 3,
    category: "الحوكمة",
    date: "2025-04-10",
    quorum: 60,          // Added required property
    deadline: "2025-04-05", // Added required property
    creator: "لجنة المالية" // Added required property
  }
];
