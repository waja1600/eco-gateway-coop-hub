
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Clock, Calendar, DollarSign, Languages, ChevronDown } from 'lucide-react';

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
];

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
];

export function HeaderBar() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        {/* Country Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Globe className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{selectedCountry.flag} {selectedCountry.name}</span>
              <span className="sm:hidden">{selectedCountry.flag}</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 max-h-60 overflow-y-auto">
            {countries.map((country) => (
              <DropdownMenuItem
                key={country.code}
                onClick={() => setSelectedCountry(country)}
                className="cursor-pointer"
              >
                {country.flag} {country.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clock */}
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">{currentTime.toLocaleTimeString()}</span>
          <span className="sm:hidden">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Date */}
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">{currentTime.toLocaleDateString()}</span>
          <span className="sm:hidden">{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
        </div>

        {/* Currency Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{selectedCurrency.code}</span>
              <span className="sm:hidden">{selectedCurrency.symbol}</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {currencies.map((currency) => (
              <DropdownMenuItem
                key={currency.code}
                onClick={() => setSelectedCurrency(currency)}
                className="cursor-pointer"
              >
                {currency.symbol} {currency.code}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Languages className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{selectedLanguage.nativeName}</span>
              <span className="sm:hidden">{selectedLanguage.code.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => setSelectedLanguage(language)}
                className="cursor-pointer"
              >
                {language.nativeName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
