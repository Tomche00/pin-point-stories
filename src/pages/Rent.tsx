import { Home, Bell, MapPin } from 'lucide-react';

const Rent = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-background to-secondary">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
            <Home className="w-3.5 h-3.5" />
            Rentals
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">Rent Properties</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Find your perfect rental property across the most beautiful locations in North Macedonia.
          </p>
        </div>
      </div>

      {/* Coming soon card */}
      <div className="max-w-md mx-auto px-4 sm:px-6 pb-16">
        <div className="section-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 mx-auto">
            <Bell className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-card-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            We're working on bringing you the best rental options in Macedonia — 
            from mountain cabins to lakeside retreats. Check back soon!
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>250+ locations being mapped</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
