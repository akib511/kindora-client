import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, ArrowUpRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Community Clean-Up Day",
    category: "Environment",
    date: "November 15, 2026",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800",
  },
  {
    id: 2,
    title: "Food Distribution Program",
    category: "Food Support",
    date: "November 18, 2026",
    location: "Khulna, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800",
  },
  {
    id: 3,
    title: "Free Education Campaign",
    category: "Education",
    date: "November 20, 2026",
    location: "Satkhira, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
  },
  {
    id: 4,
    title: "Tree Plantation Drive",
    category: "Environment",
    date: "November 23, 2026",
    location: "Chittagong, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800",
  },
  {
    id: 5,
    title: "Winter Clothes Donation",
    category: "Donation",
    date: "November 25, 2026",
    location: "Rajshahi, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800",
  },
  {
    id: 6,
    title: "Community Health Awareness",
    category: "Healthcare",
    date: "November 28, 2026",
    location: "Dhaka, Bangladesh",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-block rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
              MAKE A DIFFERENCE
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Recent Upcoming{" "}
              <span className="text-green-700 dark:text-green-400">
                Events
              </span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Discover meaningful opportunities and join hands with your
              community to create positive change.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
          >
            Explore All Events
            <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Event Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-green-700 shadow-sm dark:bg-neutral-900 dark:text-green-400">
                  {event.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays
                    size={16}
                    className="text-green-700 dark:text-green-400"
                  />
                  {event.date}
                </div>

                <h3 className="mb-4 text-xl font-bold text-foreground transition group-hover:text-green-700 dark:group-hover:text-green-400">
                  {event.title}
                </h3>

                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin
                    size={17}
                    className="text-green-700 dark:text-green-400"
                  />
                  {event.location}
                </div>

                <Link
                  href={`/event-details/${event.id}`}
                  className="flex items-center justify-between border-t border-border pt-5 font-semibold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                >
                  View Details
                  <ArrowUpRight size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}