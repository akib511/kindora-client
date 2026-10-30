"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { upcomingEvents as events } from "@/data/events";

const categories = [
  "All",
  "Environment",
  "Education",
  "Healthcare",
  "Donation",
  "Food Support",
];

export default function UpcomingEventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="bg-green-800 px-4 py-20 text-center text-white dark:bg-green-900">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-green-200">
          Make a Difference
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Upcoming Events
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-green-100 md:text-base">
          Discover meaningful events around you and become a part
          of positive change in your community.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">

        {/* Header + Search */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Explore Events
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Find an event and join the movement.
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-green-600 dark:focus:border-green-400"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredEvents.length} events
          </p>
        </div>

        {/* Event grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-green-700 shadow-sm dark:bg-neutral-900 dark:text-green-400">
                    {event.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">
                    {event.title}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarDays
                        size={17}
                        className="shrink-0 text-green-700 dark:text-green-400"
                      />
                      {event.date}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin
                        size={17}
                        className="shrink-0 text-green-700 dark:text-green-400"
                      />
                      {event.location}
                    </p>
                  </div>

                  <Link
                    href={`/event-details/${event.id}`}
                    className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm font-semibold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                  >
                    View Details
                    <ArrowRight size={18} />
                    <span className="absolute inset-0" aria-hidden="true" />
                  </Link>
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