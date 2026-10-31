"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function JoinedEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const userEmail = session?.user?.email;

  // ✅ Backend theke joined events fetch
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(
          `http://localhost:5000/joined-events/${encodeURIComponent(
            userEmail
          )}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch joined events:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [userEmail, isPending]);

  // Loading state
  if (isPending || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading joined events...</p>
      </main>
    );
  }

  // Not logged in
  if (!userEmail) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <h2 className="text-2xl font-bold text-foreground">
          Please Login First
        </h2>
        <p className="text-center text-muted-foreground">
          You need to login to view your joined events.
        </p>
        <Link
          href="/login"
          className="rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
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
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold text-green-700 dark:text-green-400">
            YOUR PARTICIPATION
          </p>

          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Joined Events
          </h1>

          <p className="mt-2 text-muted-foreground">
            Keep track of the events you are participating in.
          </p>
        </div>

        {/* Event Count */}
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-card-foreground">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
            <CalendarCheck size={25} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Total Joined Events
            </p>
            <h2 className="text-2xl font-bold text-foreground">
              {events.length}
            </h2>
          </div>
        </div>

        {/* Events */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((item) => {
              const event = item.event; // backend response e `event` field e full data

              if (!event) return null;

              return (
                <div
                  key={item._id || event._id}
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
                        {event.date
                          ? new Date(event.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "Date not set"}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin
                          size={17}
                          className="shrink-0 text-green-700 dark:text-green-400"
                        />
                        {event.location}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-border pt-5">
                      <Link
                        href={`/event-details/${item.eventId || event._id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                      >
                        View Event Details
                        <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center text-card-foreground">
            <CalendarCheck
              size={45}
              className="mx-auto mb-4 text-muted-foreground"
            />

            <h2 className="text-xl font-bold text-foreground">
              No Joined Events Yet
            </h2>

            <p className="mb-6 mt-2 text-muted-foreground">
              You have not joined any events yet. Explore upcoming events and
              become part of something meaningful.
            </p>

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}