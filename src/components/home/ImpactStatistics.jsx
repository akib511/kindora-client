export default function ImpactStatistics() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[240px]">
          
          {/* Card 1: 1,200+ (Tall) */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/40 p-6 sm:p-8 lg:row-span-2 lg:p-8 dark:bg-muted/10">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              1,200+
            </h2>
            <div className="mt-8 lg:mt-0">
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                Families served this year
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Direct assistance reached households in need across our region.
              </p>
            </div>
          </div>

          {/* Card 2: Image 1 */}
          <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-full">
            <img
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1000&auto=format&fit=crop"
              alt="Team collaboration"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Card 3: 85 */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/40 p-6 sm:p-8 dark:bg-muted/10">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              85
            </h2>
            <div className="mt-6">
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                Small businesses supported
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Entrepreneurs build sustainable livelihoods with our guidance.
              </p>
            </div>
          </div>

          {/* Card 4: 450 */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/40 p-6 sm:p-8 dark:bg-muted/10">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              450
            </h2>
            <div className="mt-6">
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                Young people in programs
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Youth gain skills and mentorship through sustained engagement.
              </p>
            </div>
          </div>

          {/* Card 5: Image 2 */}
          <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-full">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop"
              alt="Community gathering"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
}