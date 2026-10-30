"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[700px] items-center overflow-hidden bg-[#171827]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#171827] via-[#171827]/95 to-[#171827]/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="mb-8 inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white">
            Together We Make a Difference
          </span>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Small Acts of Kindness,
            <span className="mt-1 block text-[#ff6b70]">
              Big Changes for the World.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
            Join a community of passionate people working together to create
            positive change. Discover local events, volunteer your time, and
            make a meaningful impact in your community.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/upcoming-events"
              className="group inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-red-700"
            >
              Explore Events
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/create-event"
              className="group inline-flex items-center gap-3 rounded-full border border-white/70 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
            >
              Start an Initiative
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}