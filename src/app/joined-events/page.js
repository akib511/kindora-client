"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  CalendarCheck,
  Sparkles,
  LogOut,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Leave related state
  const [confirmItem, setConfirmItem] = useState(null); // je item leave korbe
  const [leavingId, setLeavingId] = useState(null);
  const [leaveError, setLeaveError] = useState("");

  const userEmail = session?.user?.email;

  // Backend theke joined events fetch
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

  // Leave event
  const handleLeave = async () => {
    if (!confirmItem) return;

    const joinedId = confirmItem._id;

    try {
      setLeavingId(joinedId);
      setLeaveError("");

      const res = await fetch(
        `http://localhost:5000/leave-event/${joinedId}?userEmail=${encodeURIComponent(
          userEmail
        )}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to leave event");
      }

      // UI theke sathe sathe remove
      setEvents((prev) => prev.filter((item) => item._id !== joinedId));
      setConfirmItem(null);
    } catch (err) {
      console.error("Failed to leave event:", err);
      setLeaveError(err.message || "Something went wrong");
    } finally {
      setLeavingId(null);
    }
  };

  // Loading state
  if (isPending || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
          <p className="text-xs font-medium text-muted-foreground">
            Loading events...
          </p>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!userEmail) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
          <CalendarCheck size={28} />
        </div>
        <h2 className="text-lg font-bold text-foreground">Please Login</h2>
        <p className="text-center text-xs text-muted-foreground">
          You need to login to view your joined events.
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
    <main className="min-h-screen bg-background px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-700 sm:text-xs dark:text-green-400">
              <Sparkles size={12} />
              Your Participation
            </p>
            <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl">
              Joined Events
            </h1>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
              Keep track of the events you are participating in.
            </p>
          </div>

          {/* Compact Event Count Badge */}
          <div className="inline-flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-card-foreground shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <CalendarCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Total Joined
              </p>
              <h2 className="text-lg font-extrabold leading-none text-foreground">
                {events.length}
              </h2>
            </div>
          </div>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
            Failed to load your joined events. Please try again.
          </p>
        )}

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {events.map((item) => {
              const event = item.event;
              if (!event) return null;

              const isLeaving = leavingId === item._id;

              return (
                <div
                  key={item._id || event._id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
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

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h2 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-foreground transition group-hover:text-green-700 dark:group-hover:text-green-400 sm:text-lg">
                      {event.title}
                    </h2>

                    <div className="mb-4 space-y-1.5 text-xs text-muted-foreground sm:text-sm">
                      <p className="flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-green-700 dark:text-green-400 sm:h-4 sm:w-4"
                        />
                        {event.date
                          ? new Date(event.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Date not set"}
                      </p>

                      <p className="flex items-start gap-1.5">
                        <MapPin
                          size={14}
                          className="mt-0.5 shrink-0 text-green-700 dark:text-green-400 sm:h-4 sm:w-4"
                        />
                        <span className="line-clamp-1">{event.location}</span>
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto flex gap-2 border-t border-border pt-3 sm:pt-4">
                      <Link
                        href={`/event-details/${item.eventId || event._id}`}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-green-700 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 sm:text-sm"
                      >
                        View Details
                        <ArrowRight size={14} className="sm:h-4 sm:w-4" />
                      </Link>

                      <button
                        type="button"
                        disabled={isLeaving}
                        onClick={() => {
                          setLeaveError("");
                          setConfirmItem(item);
                        }}
                        className="relative z-10 flex items-center justify-center gap-1.5 rounded-lg border border-red-300 px-3 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-500/10 sm:text-sm"
                      >
                        {isLeaving ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <LogOut size={14} />
                        )}
                        Leave
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-xl border border-border bg-card px-6 py-16 text-center text-card-foreground">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <CalendarCheck size={32} />
            </div>

            <h2 className="text-lg font-bold text-foreground">
              No Joined Events Yet
            </h2>
            <p className="mx-auto mb-6 mt-2 max-w-sm text-xs text-muted-foreground sm:text-sm">
              You haven&apos;t joined any events yet. Explore upcoming events and
              become part of something meaningful.
            </p>

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Explore Events
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      {/* Leave Confirmation Modal */}
      {confirmItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => !leavingId && setConfirmItem(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <LogOut size={22} />
            </div>

            <h3 className="text-center text-lg font-bold text-foreground">
              Leave this event?
            </h3>
            <p className="mt-2 text-center text-xs text-muted-foreground sm:text-sm">
              You will be removed from{" "}
              <span className="font-semibold text-foreground">
                {confirmItem.event?.title}
              </span>
              . You can join again later if you change your mind.
            </p>

            {leaveError && (
              <p className="mt-3 text-center text-xs text-red-600 dark:text-red-400">
                {leaveError}
              </p>
            )}

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                disabled={!!leavingId}
                onClick={() => setConfirmItem(null)}
                className="flex-1 rounded-lg border border-border py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!!leavingId}
                onClick={handleLeave}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {leavingId ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Leaving...
                  </>
                ) : (
                  "Yes, Leave"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}