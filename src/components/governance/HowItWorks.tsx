
import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">كيف تعمل الحوكمة التعاونية؟</h2>
          <p className="text-muted-foreground">
            نظام حوكمة لا مركزي يتيح لجميع الأعضاء المشاركة في صنع القرار
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-right">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">إنشاء المقترحات</h3>
              <p className="text-muted-foreground text-center">
                يمكن لأي عضو إنشاء مقترح للتصويت عليه من المجتمع
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">التصويت الجماعي</h3>
              <p className="text-muted-foreground text-center">
                يصوت الأعضاء على المقترحات بدون تكلفة باستخدام نظام التصويت اللامركزي
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-coop-green/20 p-4 mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">التنفيذ الآلي</h3>
              <p className="text-muted-foreground text-center">
                يتم تنفيذ المقترحات المعتمدة تلقائياً عند اكتمال النصاب والموافقة
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
