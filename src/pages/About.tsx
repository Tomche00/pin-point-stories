import { MapPin, Mail, Phone, Globe, Heart, Mountain, Camera } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-background to-secondary">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
            <Mountain className="w-3.5 h-3.5" />
            About Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">Macedonia Explorer</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Your gateway to discovering the beauty, history, and hidden gems of North Macedonia through an interactive map experience.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="section-card group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-card-foreground mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are dedicated to showcasing the incredible destinations, monuments, 
              and natural wonders that make North Macedonia a unique and captivating 
              place to explore. Our interactive map helps visitors discover hidden gems 
              and plan their perfect Macedonian adventure.
            </p>
          </div>

          <div className="section-card group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
              <Camera className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-card-foreground mb-3">What We Offer</h2>
            <p className="text-muted-foreground leading-relaxed">
              From ancient monuments and vibrant cities to pristine camping spots 
              and breathtaking natural landscapes, we provide comprehensive information 
              about Macedonia's most remarkable locations. Each pin on our map tells 
              a story waiting to be discovered.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="section-card text-center max-w-lg mx-auto">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-card-foreground mb-2">Get in Touch</h2>
          <p className="text-muted-foreground text-sm mb-6">Have questions or suggestions? We'd love to hear from you.</p>
          <div className="space-y-3">
            <a href="mailto:info@macedoniaexplorer.com" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" /> info@macedoniaexplorer.com
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" /> +389 2 XXX XXX
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" /> Skopje, North Macedonia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
