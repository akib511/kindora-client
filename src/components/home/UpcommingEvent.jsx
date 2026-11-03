"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarDays, ArrowUpRight } from "lucide-react";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      
      try {
        setLoading(true);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-events`);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Upcoming events error:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <section className="bg-background px-4 py-16 text-foreground sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
          <div>
            <span className="mb-3 inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-700 sm:px-5 sm:py-2 sm:text-sm dark:bg-green-500/15 dark:text-green-400">
              MAKE A DIFFERENCE
            </span>

            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Recent Upcoming{" "}
              <span className="text-green-700 dark:text-green-400">
                Events
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
              Discover meaningful opportunities and join hands with your
              community to create positive change.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900 sm:text-base dark:text-green-400 dark:hover:text-green-300"
          >
            Explore All Events
            <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>

        {/* Event Cards */}
        {loading ? (
          <p className="py-12 text-center text-muted-foreground">
            Loading upcoming events...
          </p>
        ) : events.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No upcoming events available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image - Height komiye deya hoyeche */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden sm:h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 shadow-sm backdrop-blur-sm dark:bg-neutral-900/95 dark:text-green-400 sm:text-xs">
                    {event.category}
                  </span>
                </div>

                {/* Content - Padding komiye deya hoyeche */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                    <CalendarDays className="h-3.5 w-3.5 text-green-700 dark:text-green-400 sm:h-4 sm:w-4" />
                    {event.date}
                  </div>

                  <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-foreground transition group-hover:text-green-700 sm:text-lg dark:group-hover:text-green-400">
                    {event.title}
                  </h3>

                  <div className="mb-4 flex items-start gap-1.5 text-xs text-muted-foreground sm:text-sm">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-700 dark:text-green-400 sm:h-4 sm:w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  {/* Link - Niche push kora hoyeche */}
                  <div className="mt-auto border-t border-border pt-3">
                    <Link
                      href={`/event-details/${event._id}`}
                      className="flex items-center justify-between text-xs font-semibold text-green-700 transition hover:text-green-900 sm:text-sm dark:text-green-400 dark:hover:text-green-300"
                    >
                      View Details
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="absolute inset-0" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}