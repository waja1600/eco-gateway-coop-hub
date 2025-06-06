
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Building, Briefcase, Scale, Crown, Shield } from 'lucide-react';

interface UserRole {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  requirements: string[];
}

const userRoles: UserRole[] = [
  {
    id: 'group_founder',
    title: 'Group Founder',
    titleAr: 'مؤسس مجموعة',
    description: 'إنشاء وإدارة مجموعات التفاوض التعاوني',
    icon: <Crown className="h-5 w-5" />,
    color: 'bg-purple-500',
    requirements: ['التحقق من الهوية', 'ضمان مالي أولي']
  },
  {
    id: 'group_member',
    title: 'Group Member',
    titleAr: 'عضو مجموعة',
    description: 'المشاركة في مجموعات التفاوض والشراء التعاوني',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-blue-500',
    requirements: ['التحقق من الهوية']
  },
  {
    id: 'supplier',
    title: 'Supplier',
    titleAr: 'مورد معتمد',
    description: 'تقديم العروض والخدمات للمجموعات',
    icon: <Building className="h-5 w-5" />,
    color: 'bg-green-500',
    requirements: ['التحقق من الشركة', 'شهادات الجودة']
  },
  {
    id: 'freelancer',
    title: 'Freelancer',
    titleAr: 'مستقل معتمد',
    description: 'تقديم الخدمات المتخصصة للمجموعات',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'bg-orange-500',
    requirements: ['اختبار المهارات', 'شهادات الخبرة']
  },
  {
    id: 'arbitrator',
    title: 'Arbitrator',
    titleAr: 'محكم معتمد',
    description: 'تقديم خدمات التحكيم والوساطة التجارية',
    icon: <Scale className="h-5 w-5" />,
    color: 'bg-red-500',
    requirements: ['شهادة محاماة', 'خبرة في التحكيم']
  },
  {
    id: 'supervisor',
    title: 'Supervisor',
    titleAr: 'مشرف النظام',
    description: 'إدارة ومراقبة عمليات المنصة',
    icon: <Shield className="h-5 w-5" />,
    color: 'bg-indigo-500',
    requirements: ['خبرة إدارية متقدمة', 'ترخيص من الإدارة']
  }
];

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Role Selection, 3: OTP
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBasicInfo = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    if (!fullName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
  };

  const handleRoleSelection = () => {
    if (!selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select your role",
        variant: "destructive",
      });
      return;
    }
    setStep(3);
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Check your email for a verification code",
      });
    }, 1500);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code sent to your email",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration Successful",
        description: "Welcome to Cooperative Economy Gateway!",
      });
      // Navigate based on selected role
      switch (selectedRole) {
        case 'group_founder':
        case 'group_member':
          navigate('/gpo-dashboard');
          break;
        case 'supplier':
          navigate('/portals/supplier');
          break;
        case 'freelancer':
          navigate('/portals/freelancer');
          break;
        case 'arbitrator':
          navigate('/arbitration');
          break;
        case 'supervisor':
          navigate('/system');
          break;
        default:
          navigate('/dashboard');
      }
    }, 1500);
  };

  const selectedRoleData = userRoles.find(role => role.id === selectedRole);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Join our cooperative platform - Step {step} of 3
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <form onSubmit={handleBasicInfo} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-coop-green hover:bg-coop-green-dark"
            >
              Continue to Role Selection
            </Button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Select Your Role</Label>
              <p className="text-sm text-gray-600 mb-4">
                Choose the role that best describes your intended use of the platform
              </p>
            </div>
            
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="اختر دورك في المنصة" />
              </SelectTrigger>
              <SelectContent>
                {userRoles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    <div className="flex items-center gap-2">
                      {role.icon}
                      <span>{role.titleAr}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedRoleData && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded ${selectedRoleData.color} text-white`}>
                      {selectedRoleData.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{selectedRoleData.titleAr}</h4>
                      <p className="text-sm text-gray-600">{selectedRoleData.description}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Requirements:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedRoleData.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleRoleSelection}
                className="flex-1 bg-coop-green hover:bg-coop-green-dark"
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && !otpSent && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-medium mb-2">Ready to Create Account</h3>
              <p className="text-sm text-gray-600 mb-4">
                Role: <Badge>{selectedRoleData?.titleAr}</Badge>
              </p>
              <p className="text-sm text-gray-600">
                We'll send a verification code to {email}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading}
                className="flex-1 bg-coop-green hover:bg-coop-green-dark"
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && otpSent && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
              />
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to {email}
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-coop-green hover:bg-coop-green-dark" 
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Complete Registration"}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {step === 3 && otpSent && (
          <div className="text-center text-sm text-muted-foreground">
            <Button 
              variant="link" 
              onClick={() => setOtpSent(false)} 
              className="p-0 h-auto"
            >
              Use a different email
            </Button>
          </div>
        )}
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button 
            variant="link" 
            onClick={() => navigate('/login')} 
            className="p-0 h-auto"
          >
            Sign in
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
