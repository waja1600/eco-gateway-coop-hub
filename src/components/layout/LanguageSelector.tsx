
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name_en: string;
  name_native: string;
  direction: string;
}

interface LanguageSelectorProps {
  languages: Language[] | undefined;
  selectedLanguage: Language | null;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ languages, selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
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
            onClick={() => onLanguageChange(language)}
            className="cursor-pointer"
          >
            {language.name_native}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
