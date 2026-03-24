import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();

  const navItems = [
    { href: '/', label: t.nav.map },
    { href: '/rent', label: t.nav.rent },
    { href: '/about', label: t.nav.about },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-xl border-b border-accent/10 shadow-sm" style={{ background: 'linear-gradient(135deg, hsl(220 25% 95%), hsl(172 20% 94%))' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <MapPin className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground tracking-tight">
              {t.nav.brandName}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm transition-colors",
                  location.pathname === item.href
                    ? "text-foreground font-medium bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="ml-2 px-2.5 py-1.5 rounded-md text-xs font-semibold border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors uppercase tracking-wide"
            >
              {language === 'en' ? 'MK' : 'EN'}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {language === 'en' ? 'MK' : 'EN'}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-2 space-y-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === item.href
                    ? "text-foreground font-medium bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
