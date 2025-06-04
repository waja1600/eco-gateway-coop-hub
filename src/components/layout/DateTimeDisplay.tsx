
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

interface DateTimeDisplayProps {
  currentTime: Date;
  hijriDate: any;
  selectedCountry: Country | null;
}

export function DateTimeDisplay({ currentTime, hijriDate, selectedCountry }: DateTimeDisplayProps) {
  const { t, i18n } = useTranslation();

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

  return (
    <>
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
    </>
  );
}
