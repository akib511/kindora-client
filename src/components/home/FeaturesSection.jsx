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
    <section className="bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
            WHAT WE DO
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Making Kindness
            <span className="text-green-700 dark:text-green-400">
              {" "}Simple & Meaningful
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Everything you need to turn your good intentions into meaningful
            actions and build a stronger community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-7 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon */}
                <div
                  className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={27} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                {/* Bottom Arrow */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground/70">
                    0{index + 1}
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-green-700 dark:group-hover:text-green-400"
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