
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  DollarSign, 
  Clock, 
  MapPin, 
  Bell, 
  User, 
  Settings,
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

export function EnhancedHeaderBar() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦'
  });

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: 'USD',
    name: 'US Dollar',
    symbol: '$'
  });

  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'SA',
    name: 'السعودية',
    flag: '🇸🇦'
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const languages: Language[] = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' }
  ];

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
  ];

  const countries: Country[] = [
    { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
    { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
    { code: 'EG', name: 'مصر', flag: '🇪🇬' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'CN', name: 'China', flag: '🇨🇳' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - Platform Info */}
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-1">
            <Globe className="h-3 w-3" />
            GPO Smart Platform
          </Badge>
          <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {currentTime.toLocaleTimeString('ar-SA', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <span>{selectedLanguage.flag}</span>
                <span className="hidden sm:inline">{selectedLanguage.name}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => setSelectedLanguage(language)}
                  className="flex items-center gap-2"
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <Badge variant="secondary" className="ml-auto">✓</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Country Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span>{selectedCountry.flag}</span>
                <span className="hidden sm:inline">{selectedCountry.name}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {countries.map((country) => (
                <DropdownMenuItem
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                  className="flex items-center gap-2"
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  {selectedCountry.code === country.code && (
                    <Badge variant="secondary" className="ml-auto">✓</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">{selectedCurrency.code}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {currencies.map((currency) => (
                <DropdownMenuItem
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency)}
                  className="flex items-center gap-2"
                >
                  <span>{currency.symbol}</span>
                  <span>{currency.name}</span>
                  {selectedCurrency.code === currency.code && (
                    <Badge variant="secondary" className="ml-auto">✓</Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>الملف الشخصي</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>الإعدادات</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
