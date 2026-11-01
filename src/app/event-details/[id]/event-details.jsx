"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Users,
  Clock,
  Heart,
  Share2,
  CheckCircle2,
  Pencil,
  Trash2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function EventDetails({ id, event: initialEvent }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [event, setEvent] = useState(initialEvent ?? null);
  const [isJoined, setIsJoined] = useState(false);
  const [checkingJoined, setCheckingJoined] = useState(true);
  const [joining, setJoining] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(!initialEvent);
  const [error, setError] = useState(false);

  // Real user email from session
  const userEmail = session?.user?.email;

  // Owner check
  const isOwner = !!userEmail && event?.creatorEmail === userEmail;

  // Load event if not passed
  useEffect(() => {
    if (initialEvent) return;

    const getEventDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`http://localhost:5000/events/${id}`);

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

  // Check if already joined
  useEffect(() => {
    if (!userEmail || !event?._id) {
      setCheckingJoined(false);
      return;
    }

    const checkJoined = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/joined-events/${encodeURIComponent(
            userEmail,
          )}`,
        );

        if (res.ok) {
          const joined = await res.json();
          const already = Array.isArray(joined)
            ? joined.some((item) => String(item.eventId) === String(event._id))
            : false;
          setIsJoined(already);
        }
      } catch (err) {
        console.error("Failed to check joined status:", err);
      } finally {
        setCheckingJoined(false);
      }
    };

    checkJoined();
  }, [userEmail, event?._id]);

  const handleJoin = async () => {
    if (!userEmail) {
      toast.error("Please login to join this event!");
      router.push("/login");
      return;
    }

    if (!event?._id || isJoined || joining) return;

    try {
      setJoining(true);

      const response = await fetch("http://localhost:5000/join-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event._id,
          userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setIsJoined(true);
          toast.info("You already joined this event.");
          return;
        }
        toast.error(data.message || "Failed to join this event.");
        return;
      }

      setIsJoined(true);
      toast.success("Successfully joined the event!");

      setEvent((prev) =>
        prev ? { ...prev, participants: (prev.participants || 0) + 1 } : prev,
      );
    } catch (error) {
      console.error("Join Event Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  // Delete event (owner only)
  const handleDelete = async () => {
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

    if (!result.isConfirmed) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `http://localhost:5000/events/${event._id}?userEmail=${encodeURIComponent(
          userEmail,
        )}`,
        { method: "DELETE" },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event");
      }

      toast.success("Event deleted successfully!");
      router.push("/manage-event");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete event");
    } finally {
      setDeleting(false);
    }
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
                  <CalendarDays className="shrink-0 text-green-700 dark:text-green-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Event Date</p>
                    <p className="text-sm font-semibold text-foreground">
                      {event.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="shrink-0 text-green-700 dark:text-green-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Event Time</p>
                    <p className="text-sm font-semibold text-foreground">
                      {event.time || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="shrink-0 text-green-700 dark:text-green-400" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-semibold text-foreground">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="shrink-0 text-green-700 dark:text-green-400" />
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
                Be part of something meaningful. Join this event and help create
                positive change.
              </p>

              <div className="mt-6 rounded-xl border border-green-600/15 bg-green-50 p-4 dark:border-green-400/15 dark:bg-green-500/10">
                <p className="text-sm text-muted-foreground">Organized by</p>
                <p className="mt-1 font-semibold text-green-800 dark:text-green-300">
                  {event.organizer || event.creatorName || "Kindora Community"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleJoin}
                disabled={isJoined || joining || checkingJoined}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-700/60 dark:bg-green-600 dark:hover:bg-green-700 dark:disabled:bg-green-600/50"
              >
                {checkingJoined ? (
                  "Checking..."
                ) : isJoined ? (
                  <>
                    <CheckCircle2 size={18} />
                    Already Joined
                  </>
                ) : joining ? (
                  "Joining..."
                ) : (
                  <>
                    <Heart size={18} />
                    Join This Event
                  </>
                )}
              </button>

              {/* Edit / Delete: shudhu owner er jonno */}
              {isOwner && (
                <div className="mt-3 flex gap-3">
                  <Link
                    href={`/edit-event/${event._id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-50 py-3 text-sm font-semibold text-green-800 transition-colors hover:bg-green-100 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                  >
                    <Trash2 size={16} />
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    toast.success("Event link copied!");
                  } catch {
                    toast.error("Failed to copy link.");
                  }
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
