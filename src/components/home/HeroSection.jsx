
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#171827] sm:min-h-[650px] lg:min-h-[700px]">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#171827]/90 via-[#171827]/85 to-[#171827]/95 sm:bg-gradient-to-r sm:from-[#171827] sm:via-[#171827]/90 sm:to-[#171827]/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">

        <div className="max-w-3xl">

          {/* Badge */}
          <span className="mb-6 inline-flex rounded-full bg-green-700 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white sm:mb-8 sm:px-6 sm:py-3 sm:text-sm">
            Together We Make a Difference
          </span>

          {/* Heading */}
          <h1 className="text-[2.5rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.15] lg:text-7xl">
            Small Acts of Kindness,
            <span className="mt-2 block text-green-400">
              Big Changes for the World.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-300 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
            Join a community of passionate people working together to create
            positive change. Discover local events, volunteer your time, and
            make a meaningful impact in your community.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">

            <Link
              href="/upcoming-events"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-green-700 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-800 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Events
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/create-event"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/70 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-green-500 hover:bg-green-700 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              Start an Initiative
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}

