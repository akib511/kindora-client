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

        const response = await fetch("http://localhost:5000/recent-events", {
          cache: "no-store",  // ✅ cache bypass
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        // ✅ Today in Dhaka (YYYY-MM-DD)
        const today = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Dhaka",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date());

        // ✅ Filter + sort
        const upcomingEvents = data
          .filter((event) => {
            if (!event.date) return false;

            // date string (YYYY-MM-DD) extract koro
            const eventDate = String(event.date).slice(0, 10);
            return eventDate >= today;
          })
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 6);

        setEvents(upcomingEvents);
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
        {loading ? (
          <p className="py-12 text-center text-muted-foreground">
            Loading upcoming events...
          </p>
        ) : events.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No upcoming events available right now.
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
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
                    href={`/event-details/${event._id}`}
                    className="flex items-center justify-between border-t border-border pt-5 font-semibold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                  >
                    View Details
                    <ArrowUpRight size={20} />
                    <span className="absolute inset-0" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}