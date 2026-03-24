import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { translations, type Language, type TranslationKeys } from './translations';

interface LanguageContextType {
  language: Language;
  t: TranslationKeys;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('lang') as Language) || 'en'
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'mk' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
