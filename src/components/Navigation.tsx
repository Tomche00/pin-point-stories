import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Map' },
    { href: '/rent', label: 'Rent' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <MapPin className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-semibold text-sm text-foreground tracking-tight">
              Macedonia Explorer
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
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
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
