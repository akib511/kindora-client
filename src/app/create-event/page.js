
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  ImagePlus,
  Send,
  Type,
  Tag,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Environment",
  "Education",
  "Healthcare",
  "Food Support",
  "Donation",
  "Community Service",
  "Other",
];

const labelClass = "mb-2 block text-sm font-semibold text-foreground";

const inputClass =
  "w-full min-w-0 rounded-xl border border-border bg-background py-3 pl-11 pr-3 sm:pr-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15";

const iconClass =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground";

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    location: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }

    try {
      setLoading(true);

      const eventData = {
        ...formData,
        creatorEmail: session.user.email,
        creatorName: session.user.name,
      };

      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("Event created successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        image: "",
        location: "",
        date: "",
      });

      router.push("/upcoming-events");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-green-700 sm:text-sm sm:tracking-[3px] dark:text-green-400">
            Make a Difference
          </p>

          <h1 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Create an Event
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:leading-7">
            Bring people together for a meaningful cause. Create an event and
            inspire your community to make a positive change.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:rounded-3xl sm:p-6 md:p-10">

          {/* Form Header */}
          <div className="mb-5 border-b border-border pb-4 sm:mb-6">
            <h2 className="text-base font-bold text-foreground sm:text-lg">
              Event Details
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
              Fill in the information below to publish your event.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

            {/* Title */}
            <div>
              <label htmlFor="title" className={labelClass}>
                Title <span className="text-green-700 dark:text-green-400">*</span>
              </label>

              <div className="relative">
                <Type size={18} className={iconClass} />

                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your event title"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Category & Date */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">

              <div className="min-w-0">
                <label htmlFor="category" className={labelClass}>
                  Event Type{" "}
                  <span className="text-green-700 dark:text-green-400">*</span>
                </label>

                <div className="relative">
                  <Tag size={18} className={iconClass} />

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select a category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="min-w-0">
                <label htmlFor="date" className={labelClass}>
                  Event Date{" "}
                  <span className="text-green-700 dark:text-green-400">*</span>
                </label>

                <div className="relative">
                  <CalendarDays size={18} className={iconClass} />

                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onFocus={(e) => {
                      e.currentTarget.min = new Date().toLocaleDateString(
                        "en-CA"
                      );
                    }}
                    onChange={handleChange}
                    required
                    className={`${inputClass} dark:[color-scheme:dark]`}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className={labelClass}>
                Location{" "}
                <span className="text-green-700 dark:text-green-400">*</span>
              </label>

              <div className="relative">
                <MapPin size={18} className={iconClass} />

                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter event location"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className={labelClass}>
                Thumbnail Image URL{" "}
                <span className="text-green-700 dark:text-green-400">*</span>
              </label>

              <div className="relative">
                <ImagePlus size={18} className={iconClass} />

                <input
                  id="image"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Description{" "}
                <span className="text-green-700 dark:text-green-400">*</span>
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="pointer-events-none absolute left-4 top-4 text-muted-foreground"
                />

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-border bg-background py-3 pl-11 pr-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 sm:pr-4 dark:focus:border-green-400 dark:focus:ring-green-400/15"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4 sm:text-base dark:bg-green-600 dark:hover:bg-green-700"
            >
              <Send size={18} />

              {loading ? "Creating Event..." : "Create Event"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

