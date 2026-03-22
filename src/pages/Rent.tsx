const Rent = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          Rentals
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-2">
          Rent Properties
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mb-10">
          Find your perfect rental property across the most beautiful locations in North Macedonia.
        </p>

        <div className="section-card text-center py-12">
          <p className="text-3xl mb-4">🏡</p>
          <h2 className="text-base font-medium text-foreground mb-1.5">Coming Soon</h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
            We're curating the best rental options — from mountain cabins to lakeside retreats. Check back soon.
          </p>
          <p className="text-xs text-muted-foreground mt-4">250+ locations being mapped</p>
        </div>
      </div>
    </div>
  );
};

export default Rent;
