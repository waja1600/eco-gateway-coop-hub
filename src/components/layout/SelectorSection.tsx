
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  DollarSign, 
  Languages, 
  ChevronDown, 
  MapPin
} from 'lucide-react';

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

interface SelectorSectionProps {
  countries: Country[] | undefined;
  currencies: Currency[] | undefined;
  languages: Language[] | undefined;
  selectedCountry: Country | null;
  selectedCurrency: Currency | null;
  selectedLanguage: Language | null;
  onCountrySelect: (country: Country) => void;
  onCurrencySelect: (currency: Currency) => void;
  onLanguageChange: (language: Language) => void;
}

export function SelectorSection({
  countries,
  currencies,
  languages,
  selectedCountry,
  selectedCurrency,
  selectedLanguage,
  onCountrySelect,
  onCurrencySelect,
  onLanguageChange
}: SelectorSectionProps) {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      {/* Country Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 hover:text-slate-900">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">
              {selectedCountry?.flag_emoji} {i18n.language === 'ar' ? selectedCountry?.name_ar : selectedCountry?.name_en}
            </span>
            <span className="sm:hidden">{selectedCountry?.flag_emoji}</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 max-h-60 overflow-y-auto bg-white">
          {countries?.map((country) => (
            <DropdownMenuItem
              key={country.code}
              onClick={() => onCountrySelect(country)}
              className="cursor-pointer"
            >
              {country.flag_emoji} {i18n.language === 'ar' ? country.name_ar : country.name_en}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Currency Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 hover:text-slate-900">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{selectedCurrency?.code}</span>
            <span className="sm:hidden">{selectedCurrency?.symbol}</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-white">
          {currencies?.map((currency) => (
            <DropdownMenuItem
              key={currency.code}
              onClick={() => onCurrencySelect(currency)}
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
          <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 hover:text-slate-900">
            <Languages className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{selectedLanguage?.name_native}</span>
            <span className="sm:hidden">{selectedLanguage?.code.toUpperCase()}</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44 bg-white">
          {languages?.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => onLanguageChange(language)}
              className="cursor-pointer"
            >
              {language.name_native}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
