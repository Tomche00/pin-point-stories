import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/rent', label: 'Rent' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-primary via-primary/90 to-accent-foreground/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm text-white shadow-sm transition-transform group-hover:scale-110 group-hover:bg-white/30">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Macedonia Explorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "text-white bg-white/25 shadow-inner"
                    : "text-white/75 hover:text-white hover:bg-white/15"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
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