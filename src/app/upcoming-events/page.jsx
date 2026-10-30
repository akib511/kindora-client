"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, CalendarDays, ArrowRight } from "lucide-react";

const events = [
  {
    id: "1",
    title: "Community Tree Plantation",
    category: "Environment",
    location: "Dhaka, Bangladesh",
    date: "November 15, 2026",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
  {
    id: "2",
    title: "Food Distribution Program",
    category: "Food Support",
    location: "Satkhira, Bangladesh",
    date: "November 18, 2026",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433",
  },
  {
    id: "3",
    title: "Free Education for Children",
    category: "Education",
    location: "Khulna, Bangladesh",
    date: "November 20, 2026",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
  },
  {
    id: "4",
    title: "Winter Clothes Donation",
    category: "Donation",
    location: "Dhaka, Bangladesh",
    date: "November 25, 2026",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
  },
  {
    id: "5",
    title: "Neighborhood Cleaning Day",
    category: "Environment",
    location: "Chittagong, Bangladesh",
    date: "November 28, 2026",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15",
  },
  {
    id: "6",
    title: "Blood Donation Campaign",
    category: "Healthcare",
    location: "Rajshahi, Bangladesh",
    date: "December 02, 2026",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4",
  },
];

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
    <main className="min-h-screen bg-[#FAFAF7]">
      <section className="bg-[#166534] px-4 py-20 text-center text-white">
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
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#17211B]">
              Explore Events
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Find an event and join the movement.
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-green-600"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                category === item
                  ? "bg-[#166534] text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-green-600 hover:text-green-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredEvents.length} events
          </p>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
                    {event.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#17211B]">
                    {event.title}
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-green-700" />
                      {event.date}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={17} className="text-green-700" />
                      {event.location}
                    </p>
                  </div>

                  <Link
                    href={`/event-details/${event.id}`}
                    className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-semibold text-green-700 transition hover:text-green-900"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white py-20 text-center">
            <h3 className="text-xl font-semibold text-gray-700">
              No events found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try searching with another keyword or category.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}