import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { Language, languageNames } from "@/lib/i18n";

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
  variant?: "default" | "ghost" | "outline";
  showLabel?: boolean;
}

const LanguageSelector = ({ 
  value, 
  onChange, 
  variant = "ghost",
  showLabel = true 
}: LanguageSelectorProps) => {
  const languages: Language[] = ["en", "hi", "kn", "ta", "te", "mr"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={showLabel ? "default" : "icon"} className="gap-2">
          <Globe className="h-4 w-4" />
          {showLabel && <span>{languageNames[value]}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-border">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => onChange(lang)}
            className={`cursor-pointer ${value === lang ? "bg-primary/10 text-primary" : ""}`}
          >
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
