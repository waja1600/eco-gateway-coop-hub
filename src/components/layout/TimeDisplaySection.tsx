
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Moon } from 'lucide-react';

interface Country {
  code: string;
  name_en: string;
  name_ar: string;
  flag_emoji: string;
  currency_code: string;
  timezone: string;
}

interface TimeDisplaySectionProps {
  currentTime: Date;
  hijriDate: any;
  selectedCountry: Country | null;
}

export function TimeDisplaySection({ currentTime, hijriDate, selectedCountry }: TimeDisplaySectionProps) {
  const { i18n } = useTranslation();

  // Format time according to selected country timezone
  const formatTime = (date: Date) => {
    if (!selectedCountry) return date.toLocaleTimeString();
    
    try {
      return date.toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
        timeZone: selectedCountry.timezone,
        hour: '2-digit',
        minute: '2-digit'
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
        month: 'short',
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
        return `${hijriDate.getDate()} ${hijriDate.getMonthName('ar')}`;
      } else {
        return `${hijriDate.getDate()} ${hijriDate.getMonthName('en')}`;
      }
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      {/* Current Time */}
      <div className="flex items-center space-x-1 rtl:space-x-reverse text-slate-600">
        <Clock className="h-4 w-4" />
        <span className="font-medium">{formatTime(currentTime)}</span>
      </div>

      {/* Gregorian Date */}
      <div className="hidden sm:flex items-center space-x-1 rtl:space-x-reverse text-slate-600">
        <Calendar className="h-4 w-4" />
        <span>{formatGregorianDate(currentTime)}</span>
      </div>

      {/* Hijri Date */}
      {hijriDate && (
        <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse text-slate-600">
          <Moon className="h-4 w-4" />
          <span>{formatHijriDate()}</span>
        </div>
      )}
    </div>
  );
}
