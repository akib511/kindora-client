"use client";

import { ArrowRight, Mail, Heart } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#17251D] px-6 py-16 sm:px-12 lg:px-20">
        {/* Decorative Elements */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white">
            <Heart size={27} />
          </div>

          <span className="text-sm font-bold uppercase tracking-[3px] text-green-400">
            Stay Connected
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Be the First to Know About
            <span className="block text-green-400">
              Every Good Deed.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-300">
            Get updates about upcoming events, inspiring community stories,
            and new opportunities to make a difference.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-10 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row dark:bg-neutral-900"
          >
            <div className="flex flex-1 items-center gap-3 px-4">
              <Mail
                size={20}
                className="shrink-0 text-gray-400 dark:text-gray-500"
              />

              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Subscribe
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-5 text-xs text-gray-400">
            No spam. Just kindness, inspiration, and meaningful updates.
          </p>
        </div>
      </div>
    </section>
  );
}