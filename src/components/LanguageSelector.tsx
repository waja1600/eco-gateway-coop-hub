
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LanguageOption = {
  code: string;
  name: string;
};

const languages: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' }
];

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<LanguageOption>(languages[0]);

  const handleLanguageChange = (lang: LanguageOption) => {
    setCurrentLang(lang);
    document.documentElement.dir = lang.code === 'ar' ? 'rtl' : 'ltr';
    // In a real app, you'd persist this choice and update translations
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2 font-normal">
          {currentLang.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => handleLanguageChange(lang)}
            className="cursor-pointer"
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
