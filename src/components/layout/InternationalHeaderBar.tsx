
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Clock, Calendar, DollarSign, Languages, ChevronDown, Moon } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const HijriDate = require('hijri-date');

interface Country {
  code: string;
  name_en: string;
  name_ar: string;
  flag_emoji: string;
  currency_code: string;
  timezone: string;
}

interface Currency {
  code: string;
  name_en: string;
  name_ar: string;
  symbol: string;
}

interface Language {
  code: string;
  name_en: string;
  name_native: string;
  direction: string;
}

export function InternationalHeaderBar() {
  const { t, i18n } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState<any>(null);

  // Fetch countries data
  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .eq('active', true);
      if (error) throw error;
      return data as Country[];
    }
  });

  // Fetch currencies data
  const { data: currencies } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('currencies')
        .select('*');
      if (error) throw error;
      return data as Currency[];
    }
  });

  // Fetch languages data
  const { data: languages } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('languages')
        .select('*')
        .eq('active', true);
      if (error) throw error;
      return data as Language[];
    }
  });

  // Set default selections when data is loaded
  useEffect(() => {
    if (countries && !selectedCountry) {
      const defaultCountry = countries.find(c => c.code === 'SA') || countries[0];
      setSelectedCountry(defaultCountry);
    }
    if (currencies && !selectedCurrency) {
      const defaultCurrency = currencies.find(c => c.code === 'SAR') || currencies[0];
      setSelectedCurrency(defaultCurrency);
    }
    if (languages && !selectedLanguage) {
      const defaultLanguage = languages.find(l => l.code === i18n.language) || languages[0];
      setSelectedLanguage(defaultLanguage);
    }
  }, [countries, currencies, languages, selectedCountry, selectedCurrency, selectedLanguage, i18n.language]);

  // Update time and hijri date
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      try {
        const hijri = new HijriDate(now);
        setHijriDate(hijri);
      } catch (error) {
        console.error('Error creating Hijri date:', error);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time according to selected country timezone
  const formatTime = (date: Date) => {
    if (!selectedCountry) return date.toLocaleTimeString();
    
    try {
      return date.toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
        timeZone: selectedCountry.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      return date.toLocaleTimeString();
    }
  };

  // Format gregorian date
  const formatGregorianDate = (date: Date) => {
    try {
      return date.toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
        timeZone: selectedCountry?.timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return date.toLocaleDateString();
    }
  };

  // Format hijri date
  const formatHijriDate = () => {
    if (!hijriDate) return '';
    
    try {
      if (i18n.language === 'ar') {
        return `${hijriDate.getDate()} ${hijriDate.getMonthName('ar')} ${hijriDate.getFullYear()}هـ`;
      } else {
        return `${hijriDate.getDate()} ${hijriDate.getMonthName('en')} ${hijriDate.getFullYear()}H`;
      }
    } catch (error) {
      return '';
    }
  };

  const changeLanguage = (language: Language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        {/* Country Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Globe className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">
                {selectedCountry?.flag_emoji} {i18n.language === 'ar' ? selectedCountry?.name_ar : selectedCountry?.name_en}
              </span>
              <span className="sm:hidden">{selectedCountry?.flag_emoji}</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 max-h-60 overflow-y-auto">
            {countries?.map((country) => (
              <DropdownMenuItem
                key={country.code}
                onClick={() => setSelectedCountry(country)}
                className="cursor-pointer"
              >
                {country.flag_emoji} {i18n.language === 'ar' ? country.name_ar : country.name_en}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Gregorian Date */}
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline text-xs">{t('header.gregorian_date')}: {formatGregorianDate(currentTime)}</span>
          <span className="sm:hidden text-xs">{formatGregorianDate(currentTime)}</span>
        </div>

        {/* Hijri Date */}
        {hijriDate && (
          <div className="flex items-center text-gray-600">
            <Moon className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline text-xs">{t('header.hijri_date')}: {formatHijriDate()}</span>
            <span className="sm:hidden text-xs">{formatHijriDate()}</span>
          </div>
        )}

        {/* Clock */}
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-xs">{formatTime(currentTime)}</span>
        </div>

        {/* Currency Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">{selectedCurrency?.code}</span>
              <span className="sm:hidden">{selectedCurrency?.symbol}</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {currencies?.map((currency) => (
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
              <span className="hidden sm:inline">{selectedLanguage?.name_native}</span>
              <span className="sm:hidden">{selectedLanguage?.code.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {languages?.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => changeLanguage(language)}
                className="cursor-pointer"
              >
                {language.name_native}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
