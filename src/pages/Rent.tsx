const Rent = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Rent Properties
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Coming soon - Find your perfect rental property in Macedonia
          </p>
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Stay Tuned
            </h2>
            <p className="text-muted-foreground">
              We're working on bringing you the best rental options in Macedonia. 
              Check back soon for exciting opportunities!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;