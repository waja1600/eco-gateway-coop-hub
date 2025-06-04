
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { BrandSection } from './BrandSection';
import { UserSection } from './UserSection';
import { TimeDisplaySection } from './TimeDisplaySection';
import { SelectorSection } from './SelectorSection';

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

export function UnifiedHeaderBar() {
  const { i18n } = useTranslation();
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
      const defaultCurrency = currencies.find(c => c.code === 'USD') || currencies[0];
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

  const changeLanguage = (language: Language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    document.documentElement.dir = language.direction;
    document.documentElement.lang = language.code;
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200 shadow-sm" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Main Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <BrandSection />
            <UserSection />
          </div>
        </div>
      </div>

      {/* Secondary Header Bar */}
      <div className="bg-slate-50 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <TimeDisplaySection 
              currentTime={currentTime}
              hijriDate={hijriDate}
              selectedCountry={selectedCountry}
            />

            <SelectorSection 
              countries={countries}
              currencies={currencies}
              languages={languages}
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              selectedLanguage={selectedLanguage}
              onCountrySelect={setSelectedCountry}
              onCurrencySelect={setSelectedCurrency}
              onLanguageChange={changeLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
