import { Mail, Phone, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          About
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-2">
          Macedonia Explorer
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mb-10">
          Your gateway to discovering the beauty, history, and hidden gems of North Macedonia through an interactive map experience.
        </p>

        <div className="space-y-6">
          <div className="section-card">
            <h2 className="text-base font-medium text-foreground mb-2">Our Mission</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are dedicated to showcasing the incredible destinations, monuments,
              and natural wonders that make North Macedonia a unique and captivating
              place to explore. Our interactive map helps visitors discover hidden gems
              and plan their perfect Macedonian adventure.
            </p>
          </div>

          <div className="section-card">
            <h2 className="text-base font-medium text-foreground mb-2">What We Offer</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              From ancient monuments and vibrant cities to pristine camping spots
              and breathtaking natural landscapes, we provide comprehensive information
              about Macedonia's most remarkable locations. Each pin on our map tells
              a story waiting to be discovered.
            </p>
          </div>

          <div className="section-card">
            <h2 className="text-base font-medium text-foreground mb-3">Get in Touch</h2>
            <div className="space-y-2.5">
              <a href="mailto:info@macedoniaexplorer.com" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" /> info@macedoniaexplorer.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" /> +389 2 XXX XXX
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" /> Skopje, North Macedonia
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
