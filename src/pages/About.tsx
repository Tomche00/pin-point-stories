const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About Macedonia Explorer
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover the beauty and rich history of North Macedonia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              We are dedicated to showcasing the incredible destinations, monuments, 
              and natural wonders that make North Macedonia a unique and captivating 
              place to explore. Our interactive map helps visitors discover hidden gems 
              and plan their perfect Macedonian adventure.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-card-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground">
              From ancient monuments and vibrant cities to pristine camping spots 
              and breathtaking natural landscapes, we provide comprehensive information 
              about Macedonia's most remarkable locations. Each pin on our map tells 
              a story waiting to be discovered.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground mb-4">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p>📧 info@macedoniaexplorer.com</p>
            <p>📱 +389 2 XXX XXX</p>
            <p>📍 Skopje, North Macedonia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;