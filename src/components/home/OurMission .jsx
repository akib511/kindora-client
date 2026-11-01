import { Eye, Target, Flag } from "lucide-react";
import Image from "next/image";

const missions = [
  {
    icon: Eye,
    title: "Vision",
    description:
      "To create a world where kindness is a daily habit, and every community thrives through collective support.",
  },
  {
    icon: Flag,
    title: "Mission",
    description:
      "Empowering individuals to take action, organize meaningful events, and make a tangible difference in society.",
  },
  {
    icon: Target,
    title: "Goal",
    description:
      "To connect thousands of volunteers with impactful causes, fostering a global network of changemakers.",
  },
];

export default function OurMission() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 lg:gap-16">
        
        {/* Left Side: Text Content */}
        <div>
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Our Mission
          </h2>

          <div className="space-y-6">
            {missions.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex items-start gap-4">
                  {/* Circular Icon with Border */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-green-200 bg-green-50 text-green-600 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="mb-1 text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Circular Image with Arc Border (Compact Size) */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[240px] items-center justify-center sm:max-w-[280px] lg:max-w-[320px]">
          
          {/* Decorative Arc Lines (Background) */}
          <div className="absolute inset-0 rounded-full border-[4px] border-muted dark:border-muted/30" />
          
          <div className="absolute inset-0 rounded-full border-[4px] border-transparent border-t-green-600 border-r-green-600 dark:border-t-green-500 dark:border-r-green-500" 
               style={{ transform: "rotate(45deg)" }} />
               
          <div className="absolute inset-0 rounded-full border-[4px] border-transparent border-b-green-600 border-l-green-600 dark:border-b-green-500 dark:border-l-green-500" 
               style={{ transform: "rotate(45deg)" }} />

          {/* Image Container */}
          <div className="relative h-[82%] w-[82%] overflow-hidden rounded-full border-4 border-background shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop"
              alt="Our Mission - Volunteers helping"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          
        </div>

      </div>
    </section>
  );
}