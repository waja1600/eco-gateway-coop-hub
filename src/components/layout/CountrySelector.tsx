
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from 'lucide-react';

interface Country {
  code: string;
  name_en: string;
  name_ar: string;
  flag_emoji: string;
  currency_code: string;
  timezone: string;
}

interface CountrySelectorProps {
  countries: Country[] | undefined;
  selectedCountry: Country | null;
  onCountrySelect: (country: Country) => void;
}

export function CountrySelector({ countries, selectedCountry, onCountrySelect }: CountrySelectorProps) {
  const { i18n } = useTranslation();

  return (
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
            onClick={() => onCountrySelect(country)}
            className="cursor-pointer"
          >
            {country.flag_emoji} {i18n.language === 'ar' ? country.name_ar : country.name_en}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
