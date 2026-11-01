"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { authClient } from "@/lib/auth-client";

export default function ManageEventsPage() {
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get only my events from Backend
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    const getEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/my-events/${encodeURIComponent(userEmail)}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Failed to load events");
        }

        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Get events error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [userEmail, isPending]);

  // Delete Event
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/events/${id}?userEmail=${encodeURIComponent(
          userEmail
        )}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== id)
      );

      toast.success("Event deleted successfully!");
    } catch (error) {
      console.log("Delete error:", error);
      toast.error(error.message || "Failed to delete event");
    }
  };

  // Not logged in
  if (!isPending && !userEmail) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4">
        <h2 className="text-lg font-bold text-foreground">Please Login</h2>
        <p className="text-center text-sm text-muted-foreground">
          You need to login to manage your events.
        </p>
        <Link
          href="/login"
          className="mt-2 rounded-lg bg-green-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Go to Login
        </Link>
      </main>
    );
  }

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
          <p className="text-sm text-muted-foreground">
            Total Created Events
          </p>

          <h2 className="mt-1 text-3xl font-bold text-green-700 dark:text-green-400">
            {events.length}
          </h2>
        </div>

        {/* Loading */}
        {isPending || loading ? (
          <div className="py-20 text-center text-muted-foreground">
            Loading events...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-border bg-card py-20 text-center">
            <h3 className="text-xl font-semibold text-red-600">
              Failed to load events
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {error}
            </p>
          </div>
        ) : events.length > 0 ? (

          /* Events */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-52">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    unoptimized
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
                      href={`/edit-event/${event._id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 py-2.5 text-sm font-semibold text-green-800 transition-colors hover:bg-green-100 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(event._id)}
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

          /* Empty State */
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center text-card-foreground">
            <CalendarDays
              size={45}
              className="mx-auto mb-4 text-muted-foreground"
            />

            <h2 className="text-xl font-bold text-foreground">
              No Events Found
            </h2>

            <p className="mb-6 mt-2 text-muted-foreground">
              You haven&apos;t created any events yet.
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