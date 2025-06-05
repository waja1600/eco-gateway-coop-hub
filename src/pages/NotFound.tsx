
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModernMainLayout } from "@/layouts/ModernMainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Users } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const quickLinks = [
    { name: 'الصفحة الرئيسية', path: '/', icon: Home },
    { name: 'البوابات', path: '/gateways', icon: Search },
    { name: 'المجموعات', path: '/', icon: Users },
    { name: 'لوحة التحكم', path: '/gpo-dashboard', icon: Home }
  ];

  return (
    <ModernMainLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              الصفحة غير موجودة
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              عذراً، لا يمكن العثور على الصفحة التي تبحث عنها. قد تكون قد تم نقلها أو حذفها.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>روابط سريعة</CardTitle>
              <CardDescription>
                يمكنك الانتقال إلى إحدى هذه الصفحات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Button
                      key={link.path}
                      variant="outline"
                      onClick={() => navigate(link.path)}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="text-sm">{link.name}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للخلف
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              الصفحة الرئيسية
            </Button>
          </div>

          {/* Current Path Info */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>المسار المطلوب:</strong> {location.pathname}
            </p>
          </div>
        </div>
      </div>
    </ModernMainLayout>
  );
};

export default NotFound;
