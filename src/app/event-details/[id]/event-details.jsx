"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Users,
  Clock,
  Heart,
  Share2,
} from "lucide-react";

export default function EventDetails({ id, event: initialEvent }) {
  const router = useRouter();

  const [event, setEvent] = useState(initialEvent ?? null);
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialEvent) {
      return;
    }

    const getEventDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/events/${id}`
        );

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.log("Failed to load event:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [id, initialEvent]);

  const handleJoin = () => {
    // Authentication will be added later.
    const isLoggedIn = false;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    setIsJoined(true);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-lg font-medium text-muted-foreground">
          Loading event details...
        </p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Event Not Found
          </h2>

          <p className="mt-3 text-muted-foreground">
            The event you are looking for does not exist.
          </p>

          <Link
            href="/upcoming-events"
            className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <Link
          href="/upcoming-events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[420px]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <div>
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                {event.category}
              </span>

              <h1 className="mt-5 text-3xl font-bold text-foreground md:text-4xl">
                {event.title}
              </h1>

              <p className="mt-5 leading-8 text-muted-foreground">
                {event.description}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground">
              <h2 className="mb-5 text-xl font-bold text-foreground">
                About This Event
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-green-700 dark:text-green-400" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Event Date
                    </p>

                    <p className="text-sm font-semibold text-foreground">
                      {event.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="text-green-700 dark:text-green-400" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Event Time
                    </p>

                    <p className="text-sm font-semibold text-foreground">
                      {event.time || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-green-700 dark:text-green-400" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Location
                    </p>

                    <p className="text-sm font-semibold text-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="text-green-700 dark:text-green-400" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Participants
                    </p>

                    <p className="text-sm font-semibold text-foreground">
                      {event.participants || 0} People
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
              <h2 className="text-xl font-bold text-foreground">
                Join This Event
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Be part of something meaningful. Join this event and
                help create positive change.
              </p>

              <div className="mt-6 rounded-xl border border-green-600/15 bg-green-50 p-4 dark:border-green-400/15 dark:bg-green-500/10">
                <p className="text-sm text-muted-foreground">
                  Organized by
                </p>

                <p className="mt-1 font-semibold text-green-800 dark:text-green-300">
                  {event.organizer || "Kindora Community"}
                </p>
              </div>

              <button
                onClick={handleJoin}
                disabled={isJoined}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-700/60 dark:bg-green-600 dark:hover:bg-green-700 dark:disabled:bg-green-600/50"
              >
                <Heart size={18} />
                {isJoined ? "Already Joined" : "Join This Event"}
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                <Share2 size={18} />
                Share Event
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}