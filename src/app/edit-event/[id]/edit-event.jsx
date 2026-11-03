"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const getToken = async () => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Failed to get JWT token");
  }

  return data.token;
};

const categories = [
  "Environment",
  "Education",
  "Healthcare",
  "Food Support",
  "Donation",
  "Community Service",
  "Other",
];

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15";

const labelClass = "mb-2 block text-sm font-semibold text-foreground";

export default function EditEvent({ id }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    location: "",
    date: "",
  });

  const [ownerEmail, setOwnerEmail] = useState("");
  const [originalDate, setOriginalDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  // Get Event Details
  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();

        setOwnerEmail(data.creatorEmail || "");
        setOriginalDate(data.date || "");

        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          image: data.image || "",
          location: data.location || "",
          date: data.date || "",
        });
      } catch (error) {
        console.log("Failed to get event:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update Event (secured)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const token = await getToken();

      const payload = { ...formData };
      if (payload.date === originalDate) {
        delete payload.date;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload), // আগে ছিল formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update event");
      }

      toast.success("Event updated successfully!");

      router.push("/manage-event");
    } catch (error) {
      console.log("Update error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading || isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading event details...</p>
      </main>
    );
  }

  // Event Not Found
  if (error) {
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
            href="/manage-event"
            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            <ArrowLeft size={18} />
            Back to Manage Events
          </Link>
        </div>
      </main>
    );
  }

  // Not logged in
  if (!userEmail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Please Login</h1>

          <p className="mb-6 mt-3 text-muted-foreground">
            You need to login to edit an event.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  // Not the owner
  if (ownerEmail !== userEmail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Not Allowed</h1>

          <p className="mb-6 mt-3 text-muted-foreground">
            You can only edit events that you created.
          </p>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          >
            <ArrowLeft size={18} />
            Back to Events
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
          href="/manage-event"
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
              <label className={labelClass}>Event Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Event Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                rows={5}
                required
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>Event Category</label>
              <select
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

            {/* Image URL */}
            <div>
              <label className={labelClass}>Thumbnail Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className={inputClass}
              />
            </div>

            {/* Location */}
            <div>
              <label className={labelClass}>Event Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter event location"
                required
                className={inputClass}
              />
            </div>

            {/* Date */}
            <div>
              <label className={labelClass}>Event Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={
                  originalDate &&
                  originalDate < new Date().toLocaleDateString("en-CA")
                    ? originalDate
                    : new Date().toLocaleDateString("en-CA")
                }
                required
                className={`${inputClass} dark:[color-scheme:dark]`}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Link
                href="/manage-event"
                className="flex-1 rounded-xl border border-border py-3 text-center font-semibold text-muted-foreground transition-colors hover:bg-accent"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 py-3 font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-green-600 dark:hover:bg-green-700"
              >
                <Save size={18} />
                {saving ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
