"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchX, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        {/* Error Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-700 dark:text-green-400">
          <SearchX size={14} />
          Error 404
        </span>

        {/* Big 404 */}
        <h1 className="mt-6 text-8xl font-extrabold tracking-tight text-foreground sm:text-9xl">
          4<span className="text-green-700 dark:text-green-400">0</span>4
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
          The page you are looking for doesn&apos;t exist, has been moved, or
          the event you are trying to reach is no longer available.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3.5 font-semibold text-white transition hover:bg-green-900 sm:w-auto dark:bg-green-600 dark:hover:bg-green-700"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold text-foreground transition hover:bg-accent sm:w-auto"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link
            href="/upcoming-events"
            className="transition hover:text-green-700 dark:hover:text-green-400"
          >
            Upcoming Events
          </Link>
          <Link
            href="/create-event"
            className="transition hover:text-green-700 dark:hover:text-green-400"
          >
            Create Event
          </Link>
          <Link
            href="/login"
            className="transition hover:text-green-700 dark:hover:text-green-400"
          >
            Login
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Together We Care, Together We Change.
        </p>
      </div>
    </main>
  );
}
