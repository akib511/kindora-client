"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, CalendarDays, ArrowRight } from "lucide-react";


const categories = [
  "All",
  "Environment",
  "Education",
  "Healthcare",
  "Donation",
  "Food Support",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get Events from Backend
 
useEffect(() => {
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);

      if (!res.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);

 

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-green-800 px-4 py-20 text-center text-white dark:bg-green-900">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-green-200">
          Make a Difference
        </p>

        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Upcoming Events
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-green-100 md:text-base">
          Discover meaningful events around you and become a part of positive
          change in your community.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Header + Search */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:mb-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Explore Events
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Find an event and join the movement.
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-green-600 dark:focus:border-green-400"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="mb-8 flex flex-wrap gap-2.5 md:mb-10 md:gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm ${
                category === item
                  ? "bg-green-800 text-white dark:bg-green-600"
                  : "border border-border bg-card text-muted-foreground hover:border-green-600 hover:text-green-700 dark:hover:border-green-400 dark:hover:text-green-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            Showing {filteredEvents.length} events
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 text-center text-muted-foreground">
            Loading events...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border bg-card py-20 text-center">
            <h3 className="text-xl font-semibold text-red-600">
              Failed to load events
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          /* Event grid - Mobile e 1 col, tab e 2, desktop e 3 */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image - Compact Height */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-52">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 shadow-sm backdrop-blur-sm dark:bg-neutral-900/95 dark:text-green-400 sm:left-4 sm:top-4 sm:text-xs">
                    {event.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-foreground sm:text-lg">
                    {event.title}
                  </h3>

                  <div className="mb-4 space-y-2 text-xs text-muted-foreground sm:text-sm">
                    <p className="flex items-center gap-1.5">
                      <CalendarDays
                        size={14}
                        className="shrink-0 text-green-700 dark:text-green-400 sm:h-4 sm:w-4"
                      />
                      {event.date}
                    </p>

                    <p className="flex items-start gap-1.5">
                      <MapPin
                        size={14}
                        className="mt-0.5 shrink-0 text-green-700 dark:text-green-400 sm:h-4 sm:w-4"
                      />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>
                  </div>

                  {/* View Details - Niche align thakbe */}
                  <div className="mt-auto border-t border-border pt-3 sm:pt-4">
                    <Link
                      href={`/event-details/${event._id}`}
                      className="flex items-center justify-between text-xs font-semibold text-green-700 transition hover:text-green-900 sm:text-sm dark:text-green-400 dark:hover:text-green-300"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                      <span className="absolute inset-0" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card py-20 text-center">
            <h3 className="text-xl font-semibold text-foreground">
              No events found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try searching with another keyword or category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
