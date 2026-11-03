"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  CalendarDays,
  Users,
  Pencil,
  ArrowLeft,
  MapPin,
  X,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const getToken = async () => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Failed to get JWT token");
  }

  return data.token;
};

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [user, setUser] = useState({
    name: "",
    email: "",
    photoURL: "",
    location: "Dhaka, Bangladesh",
  });

  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    photoURL: "",
    location: "",
  });

  const [createdEvents, setCreatedEvents] = useState(0);
  const [joinedEvents, setJoinedEvents] = useState(0);

  useEffect(() => {
    if (!session?.user) return;

    const currentUser = session.user;

    const loadStatistics = async () => {
      setUser((previousUser) => ({
        ...previousUser,
        name: currentUser.name || "",
        email: currentUser.email || "",
        photoURL: currentUser.image || "",
      }));

      setEditForm({
        name: currentUser.name || "",
        photoURL: currentUser.image || "",
        location: "Dhaka, Bangladesh",
      });

      try {
        const token = await getToken();

        const [eventsResponse, joinedResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-events`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (eventsResponse.ok) {
          const events = await eventsResponse.json();
          const myEvents = events.filter(
            (event) => event.creatorEmail === currentUser.email
          );
          setCreatedEvents(myEvents.length);
        }

        if (joinedResponse.ok) {
          const joinedData = await joinedResponse.json();
          setJoinedEvents(joinedData.length);
        }
      } catch (error) {
        console.error("Failed to load profile statistics:", error);
      }
    };

    loadStatistics();
  }, [session]);

  const handleEdit = () => {
    setEditForm({
      name: user.name,
      photoURL: user.photoURL,
      location: user.location,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: editForm.name,
        image: editForm.photoURL || null,
      });

      if (result.error) {
        toast.error(result.error.message || "Failed to update profile.");
        return;
      }

      setUser({
        ...user,
        name: editForm.name,
        photoURL: editForm.photoURL,
        location: editForm.location,
      });

      setShowModal(false);
      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
          <p className="text-xs font-medium text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
          <User size={28} />
        </div>
        <h2 className="text-lg font-bold text-foreground">Please Login</h2>
        <p className="text-center text-xs text-muted-foreground">
          You need to login to view your profile.
        </p>
        <Link
          href="/login"
          className="mt-2 rounded-lg bg-green-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-green-700 dark:hover:text-green-400"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mb-6">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
            Your Account
          </p>
          <h1 className="text-xl font-extrabold text-foreground md:text-2xl">
            Profile Dashboard
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Manage your personal information and view your activity.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid gap-4 md:grid-cols-12 md:gap-6">
          
          {/* Left Column: Profile Info Card */}
          <div className="md:col-span-4">
            <div className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
              {/* Cover */}
              <div className="relative h-24 bg-gradient-to-r from-green-800 to-green-500" />
              
              <div className="relative flex flex-col items-center px-5 pb-6 pt-0 text-center">
                {/* Avatar */}
                <div className="-mt-10 mb-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-20 w-20 rounded-xl border-4 border-card object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border-4 border-card bg-green-100 text-green-700 shadow-sm dark:bg-green-500/15 dark:text-green-400">
                      <User size={32} />
                    </div>
                  )}
                </div>

                {/* Name & Location */}
                <h2 className="text-base font-bold text-foreground">{user.name}</h2>
                <p className="mt-0.5 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={12} />
                  {user.location}
                </p>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
                >
                  <Pencil size={14} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Account Info */}
          <div className="space-y-4 md:col-span-8 md:space-y-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Created Events Stat */}
              <div className="flex flex-col rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  <CalendarDays size={16} />
                </div>
                <h3 className="text-xl font-extrabold text-foreground">
                  {String(createdEvents).padStart(2, "0")}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                  Created Events
                </p>
              </div>

              {/* Joined Events Stat */}
              <div className="flex flex-col rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                  <Users size={16} />
                </div>
                <h3 className="text-xl font-extrabold text-foreground">
                  {String(joinedEvents).padStart(2, "0")}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                  Joined Events
                </p>
              </div>
            </div>

            {/* Account Information */}
            <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
              <h3 className="mb-4 flex items-center gap-1.5 text-sm font-bold text-foreground">
                <ShieldCheck size={16} className="text-green-700 dark:text-green-400" />
                Account Information
              </h3>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <User size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-muted-foreground">Full Name</p>
                    <p className="truncate text-xs font-semibold text-foreground">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Mail size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-muted-foreground">Email Address</p>
                    <p className="truncate text-xs font-semibold text-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/50 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <MapPin size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium text-muted-foreground">Location</p>
                    <p className="truncate text-xs font-semibold text-foreground">{user.location}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-xl">
            <div className="h-1 w-full bg-gradient-to-r from-green-600 to-green-400" />
            
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-foreground">Edit Profile</h2>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">Update your details.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-md p-1 text-muted-foreground transition hover:bg-accent hover:text-red-500"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:border-green-600 dark:focus:border-green-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Photo URL</label>
                  <input
                    type="url"
                    name="photoURL"
                    value={editForm.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:border-green-600 dark:focus:border-green-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none transition focus:border-green-600 dark:focus:border-green-400"
                  />
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    disabled={isSaving}
                    className="flex-1 rounded-lg border border-border py-2 text-xs font-semibold text-muted-foreground transition hover:bg-accent disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 rounded-lg bg-green-700 py-2 text-xs font-semibold text-white transition hover:bg-green-800 disabled:opacity-60 dark:bg-green-600"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}