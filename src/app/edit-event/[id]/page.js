"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

const initialEvents = [
  {
    id: "1",
    title: "Community Park Cleanup",
    description:
      "Join us to clean our local community park and make it a better place for everyone.",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    location: "Central Park, Dhaka",
    date: "2026-11-15",
  },
  {
    id: "2",
    title: "Food Distribution Drive",
    description:
      "Help distribute food among people who need support in our community.",
    category: "Community Support",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
    location: "Mirpur, Dhaka",
    date: "2026-11-20",
  },
  {
    id: "3",
    title: "Tree Plantation Program",
    description:
      "Let's make our environment greener by planting trees together.",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
    location: "Dhanmondi, Dhaka",
    date: "2026-11-25",
  },
];

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();

  const event = initialEvents.find((item) => item.id === params.id);

  const [formData, setFormData] = useState(
    event || {
      title: "",
      description: "",
      category: "",
      image: "",
      location: "",
      date: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // localStorage theke current list nao (na thakle initialEvents)
    const stored = JSON.parse(
      localStorage.getItem("kindora_events") || "null"
    );
    const baseList = stored || initialEvents;

    // Ei event ta update koro
    const updated = baseList.map((item) =>
      item.id === params.id ? { ...item, ...formData } : item
    );

    // localStorage e save
    localStorage.setItem("kindora_events", JSON.stringify(updated));

    // Manage page e redirect
    router.push("/manage-events");
  };

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Event Not Found
          </h1>

          <p className="mb-6 mt-3 text-muted-foreground">
            The event you are looking for does not exist.
          </p>

          <Link
            href="/manage-events"
            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            <ArrowLeft size={18} />
            Back to Manage Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Back Button */}
        <Link
          href="/manage-events"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-green-700 dark:hover:text-green-400"
        >
          <ArrowLeft size={17} />
          Back to Manage Events
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
            Event Management
          </p>

          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Edit Event
          </h1>

          <p className="mt-2 text-muted-foreground">
            Update your event information and keep everything accurate.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Event Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Event Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              >
                <option value="">Select a category</option>
                <option value="Environment">Environment</option>
                <option value="Community Support">Community Support</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Animal Welfare">Animal Welfare</option>
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Thumbnail Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Event Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Event Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toLocaleDateString("en-CA")}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:[color-scheme:dark] dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">

              <Link
                href="/manage-events"
                className="flex-1 rounded-xl border border-border py-3 text-center font-semibold text-muted-foreground transition-colors hover:bg-accent"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 py-3 font-semibold text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
              >
                <Save size={18} />
                Save Changes
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}