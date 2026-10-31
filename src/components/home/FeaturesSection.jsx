import {
  CalendarDays,
  HeartHandshake,
  Users,
  HandHeart,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Find meaningful social events and activities happening around your community.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  },
  {
    icon: HeartHandshake,
    title: "Create Initiatives",
    description:
      "Turn your ideas into action by organizing events that make a real difference.",
    color:
      "bg-green-100 text-green-600 dark:bg-green-500/15 dark:text-green-400",
  },
  {
    icon: Users,
    title: "Join Community",
    description:
      "Connect with like-minded people and work together for a better tomorrow.",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Contribute your time and skills to create positive changes in society.",
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-background px-4 py-16 text-foreground sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-700 sm:px-5 sm:py-2 sm:text-sm dark:bg-green-500/15 dark:text-green-400">
            WHAT WE DO
          </span>

          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Making Kindness
            <span className="text-green-700 dark:text-green-400">
              {" "}Simple & Meaningful
            </span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">
            Everything you need to turn your good intentions into meaningful
            actions and build a stronger community.
          </p>
        </div>

        {/* Feature Cards - Mobile e 2 columns */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 lg:p-7 sm:hover:-translate-y-2"
              >
                <div>
                  {/* Icon - Mobile e choto */}
                  <div
                    className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl ${feature.color}`}
                  >
                    <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-1.5 text-sm font-bold leading-tight text-foreground sm:mb-3 sm:text-lg md:text-xl">
                    {feature.title}
                  </h3>

                  <p className="text-[11px] leading-relaxed text-muted-foreground sm:text-sm sm:leading-7">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Arrow */}
                <div className="mt-4 flex items-center justify-between sm:mt-6">
                  <span className="text-[10px] font-semibold text-muted-foreground/70 sm:text-xs">
                    0{index + 1}
                  </span>

                  <ArrowUpRight
                    className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-green-700 sm:h-5 sm:w-5 dark:group-hover:text-green-400"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}