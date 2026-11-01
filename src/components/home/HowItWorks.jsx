import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-muted/30 px-4 py-20 sm:px-6 sm:py-28 md:py-32 dark:bg-muted/10">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-border sm:w-16"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground italic sm:text-sm">
              Our Process, Explained
            </span>
            <span className="h-px w-10 bg-border sm:w-16"></span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Here's how it works
          </h2>
        </div>

        {/* ================= MOBILE VIEW (Vertical Timeline) ================= */}
        <div className="relative block sm:hidden">
          {/* Vertical Dashed Line */}
          <div className="absolute left-[24px] top-6 bottom-6 w-px border-l-2 border-dashed border-green-700/30 dark:border-green-500/30" />

          <div className="space-y-10">
            
            {/* Step 1 */}
            <div className="relative flex items-start gap-5">
              {/* Circle Number */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-muted/30 bg-[#166534] text-lg font-bold text-white shadow-sm dark:border-muted/10 dark:bg-green-600">
                1
              </div>
              {/* Content Card */}
              <div className="mt-1 flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="mb-1.5 text-lg font-bold text-foreground">
                  Explore Events
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Browse through meaningful social events and find causes that matter to you.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-5">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-muted/30 bg-[#166534] text-lg font-bold text-white shadow-sm dark:border-muted/10 dark:bg-green-600">
                2
              </div>
              <div className="mt-1 flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="mb-1.5 text-lg font-bold text-foreground">
                  Join or Create
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Register for an event or start your own initiative for a good cause.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-5">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-muted/30 bg-[#166534] text-lg font-bold text-white shadow-sm dark:border-muted/10 dark:bg-green-600">
                3
              </div>
              <div className="mt-1 flex-1 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="mb-1.5 text-lg font-bold text-foreground">
                  Make an Impact
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Contribute your time to create positive change and build a stronger society.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================= DESKTOP VIEW (Tilted Cards + Arrows) ================= */}
        <div className="relative hidden grid-cols-3 gap-6 sm:grid lg:gap-10">
          
          {/* SVG Connecting Arrows */}
          <div className="pointer-events-none absolute inset-0 z-0 block">
            {/* Arrow 1 to 2 */}
            <svg className="absolute left-[22%] top-[10%] h-24 w-[25%] text-[#166534] dark:text-green-500" viewBox="0 0 100 50" fill="none">
              <path d="M0,50 Q30,0 80,20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <circle cx="0" cy="50" r="2.5" fill="currentColor" />
              <circle cx="80" cy="20" r="2.5" fill="currentColor" />
            </svg>
            {/* Arrow 2 to 3 (Curly) */}
            <svg className="absolute left-[55%] top-[45%] h-24 w-[25%] text-[#166534] dark:text-green-500" viewBox="0 0 100 50" fill="none">
              <path d="M0,20 C30,40 50,10 80,30" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="0" cy="20" r="2.5" fill="currentColor" />
              <circle cx="80" cy="30" r="2.5" fill="currentColor" />
            </svg>
          </div>

          {/* Card 1 */}
          <div className="relative z-10 flex h-[300px] flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-black/5 transition-transform duration-300 hover:-translate-y-2 sm:-rotate-6">
            <div className="text-6xl font-bold tracking-tighter text-foreground">
              1
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Explore Events
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Browse through meaningful social events and find causes that matter to you in your community.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative z-20 flex h-[300px] flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-black/5 transition-transform duration-300 hover:-translate-y-2 sm:rotate-2">
            <div className="text-6xl font-bold tracking-tighter text-foreground">
              2
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Join or Create
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Register for an event or start your own initiative to bring people together for a good cause.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative z-10 flex h-[300px] flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-black/5 transition-transform duration-300 hover:-translate-y-2 sm:-rotate-3">
            <div className="text-6xl font-bold tracking-tighter text-foreground">
              3
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Make an Impact
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Contribute your time and skills to create positive change and help build a stronger society.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}