
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, DollarSign, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' }
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
];

export function UnifiedHeaderBar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatGregorianDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatHijriDate = (date: Date) => {
    try {
      return date.toLocaleDateString('ar-SA-u-ca-islamic', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'التاريخ الهجري';
    }
  };

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.code;
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between py-3 gap-4">
          {/* Brand Section */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-800" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Co-op Gateway</h1>
                <p className="text-xs text-blue-100">{t('header.international_business')}</p>
              </div>
            </div>
            
            {/* Quality Badges */}
            <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                Harvard Business
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                WTO Certified
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                ISO Standards
              </Badge>
            </div>
          </div>

          {/* Time & Date Section */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse text-center sm:text-left">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="w-4 h-4 text-blue-200" />
              <div className="text-sm">
                <div className="font-medium">{formatTime(currentTime)}</div>
                <div className="text-xs text-blue-200">{t('header.current_time')}</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-blue-300/30"></div>

            <div className="text-sm">
              <div className="font-medium">{formatGregorianDate(currentTime)}</div>
              <div className="text-xs text-blue-200">{t('header.gregorian_date')}</div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-blue-300/30"></div>

            <div className="text-sm">
              <div className="font-medium">{formatHijriDate(currentTime)}</div>
              <div className="text-xs text-blue-200">{t('header.hijri_date')}</div>
            </div>
          </div>

          {/* Selectors Section */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Country Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 px-3">
                  <span className="mr-2">{selectedCountry.flag}</span>
                  <span className="hidden sm:inline text-xs">{selectedCountry.code}</span>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {countries.map((country) => (
                  <DropdownMenuItem 
                    key={country.code}
                    onClick={() => setSelectedCountry(country)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{country.flag}</span>
                    <span className="text-sm">{country.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 px-3">
                  <DollarSign className="mr-1 h-3 w-3" />
                  <span className="text-xs">{selectedCurrency.code}</span>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {currencies.map((currency) => (
                  <DropdownMenuItem 
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency)}
                    className="cursor-pointer"
                  >
                    <span className="mr-2">{currency.symbol}</span>
                    <span className="text-sm">{currency.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 px-3">
                  <Globe className="mr-1 h-3 w-3" />
                  <span className="text-xs">{selectedLanguage.nativeName}</span>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className="cursor-pointer"
                  >
                    <span className="text-sm">{lang.nativeName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Section */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/login')}
                className="text-white hover:bg-white/20 h-8 px-3 text-xs"
              >
                {t('common.login')}
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate('/register')}
                className="bg-white text-blue-800 hover:bg-blue-50 h-8 px-3 text-xs font-medium"
              >
                {t('common.register')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
