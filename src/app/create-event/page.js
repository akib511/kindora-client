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
  "w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15";

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

      // ✅ FIX: creatorEmail + creatorName add koro
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
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-green-700 dark:text-green-400">
            Make a Difference
          </p>

          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Create an Event
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Bring people together for a meaningful cause. Create an event and
            inspire your community to make a positive change.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-10">
          <div className="mb-6 border-b border-border pb-4">
            <h2 className="text-lg font-bold text-foreground">
              Event Details
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in the information below to publish your event.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
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

              <div>
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
                  className="w-full resize-none rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-green-600 dark:hover:bg-green-700"
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