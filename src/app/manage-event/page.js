"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Pencil, Trash2, Plus } from "lucide-react";

const initialEvents = [
  {
    id: 1,
    title: "Community Park Cleanup",
    category: "Environment",
    date: "2026-11-15",
    location: "Central Park, Dhaka",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  },
  {
    id: 2,
    title: "Food Distribution Drive",
    category: "Community Support",
    date: "2026-11-20",
    location: "Mirpur, Dhaka",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
  },
  {
    id: 3,
    title: "Tree Plantation Program",
    category: "Environment",
    date: "2026-11-25",
    location: "Dhanmondi, Dhaka",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
  },
];

export default function ManageEventsPage() {
  const [events, setEvents] = useState(initialEvents);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-green-700 dark:text-green-400">
              YOUR ACTIVITY
            </p>

            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Manage Events
            </h1>

            <p className="mt-2 text-muted-foreground">
              View and manage the events you have created.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-medium text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            <Plus size={19} />
            Create New Event
          </Link>
        </div>

        {/* Event Count */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-5 text-card-foreground">
          <p className="text-sm text-muted-foreground">Total Created Events</p>
          <h2 className="mt-1 text-3xl font-bold text-green-700 dark:text-green-400">
            {events.length}
          </h2>
        </div>

        {/* Events */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-52">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-800 dark:bg-green-500/15 dark:text-green-300">
                    {event.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="mb-4 text-xl font-bold text-foreground">
                    {event.title}
                  </h2>

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarDays
                        size={17}
                        className="shrink-0 text-green-700 dark:text-green-400"
                      />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin
                        size={17}
                        className="shrink-0 text-green-700 dark:text-green-400"
                      />
                      {event.location}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3 border-t border-border pt-5">
                    <Link
                      href={`/edit-event/${event.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 py-2.5 text-sm font-semibold text-green-800 transition-colors hover:bg-green-100 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center text-card-foreground">
            <CalendarDays
              size={45}
              className="mx-auto mb-4 text-muted-foreground"
            />

            <h2 className="text-xl font-bold text-foreground">
              No Events Found
            </h2>

            <p className="mb-6 mt-2 text-muted-foreground">
              You haven not created any events yet.
            </p>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
            >
              <Plus size={18} />
              Create Your First Event
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}