import { useState, useEffect, ReactNode } from "react";
import { I18nContext, Language, getTranslation } from "@/lib/i18n";

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

const I18nProvider = ({ children, defaultLanguage = "en" }: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("parq-language");
    return (saved as Language) || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem("parq-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => getTranslation(key, language);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
