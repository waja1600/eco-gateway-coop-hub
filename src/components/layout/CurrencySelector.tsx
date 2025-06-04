
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign, ChevronDown } from 'lucide-react';

interface Currency {
  code: string;
  name_en: string;
  name_ar: string;
  symbol: string;
}

interface CurrencySelectorProps {
  currencies: Currency[] | undefined;
  selectedCurrency: Currency | null;
  onCurrencySelect: (currency: Currency) => void;
}

export function CurrencySelector({ currencies, selectedCurrency, onCurrencySelect }: CurrencySelectorProps) {
  return (
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
            onClick={() => onCurrencySelect(currency)}
            className="cursor-pointer"
          >
            {currency.symbol} {currency.code}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
