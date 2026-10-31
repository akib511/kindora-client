
"use client";

import { ArrowRight, Mail, Heart } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#17251D] px-4 py-12 sm:rounded-3xl sm:px-12 sm:py-16 lg:px-20">

        {/* Decorative Elements */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green-500/10 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-green-500/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">

          {/* Icon */}
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">
            <Heart size={24} className="sm:h-[27px] sm:w-[27px]" />
          </div>

          {/* Badge */}
          <span className="text-xs font-bold uppercase tracking-[2px] text-green-400 sm:text-sm sm:tracking-[3px]">
            Stay Connected
          </span>

          {/* Heading */}
          <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">
            Be the First to Know About
            <span className="mt-1 block text-green-400">
              Every Good Deed.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:mt-5 sm:text-base">
            Get updates about upcoming events, inspiring community stories,
            and new opportunities to make a difference.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-7 flex max-w-xl flex-col gap-2 rounded-xl bg-white p-2 sm:mt-10 sm:flex-row sm:gap-3 sm:rounded-2xl dark:bg-neutral-900"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
              <Mail
                size={20}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />

              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="min-w-0 w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 sm:w-auto sm:rounded-xl sm:px-7 sm:text-base dark:bg-green-600 dark:hover:bg-green-700"
            >
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Bottom Text */}
          <p className="mt-4 text-[11px] leading-5 text-gray-400 sm:mt-5 sm:text-xs">
            No spam. Just kindness, inspiration, and meaningful updates.
          </p>

        </div>
      </div>
    </section>
  );
}

