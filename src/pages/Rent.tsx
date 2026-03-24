import { useLanguage } from '@/i18n/LanguageContext';

const Rent = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          {t.rent.subtitle}
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-2">
          {t.rent.title}
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mb-10">
          {t.rent.description}
        </p>

        <div className="section-card text-center py-12">
          <p className="text-3xl mb-4">🏡</p>
          <h2 className="text-base font-medium text-foreground mb-1.5">{t.rent.comingSoon}</h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
            {t.rent.comingSoonDesc}
          </p>
          <p className="text-xs text-muted-foreground mt-4">{t.rent.locationsMapped}</p>
        </div>
      </div>
    </div>
  );
};

export default Rent;
