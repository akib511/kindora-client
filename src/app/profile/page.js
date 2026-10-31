"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  CalendarDays,
  Users,
  Pencil,
  ArrowLeft,
  MapPin,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Shahariar Hossen Akib",
    email: "akib@example.com",
    photoURL: "",
    location: "Dhaka, Bangladesh",
  });

  const [showModal, setShowModal] = useState(false);

  const [editForm, setEditForm] = useState({
    name: user.name,
    photoURL: user.photoURL,
    location: user.location,
  });

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

    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({
      ...user,
      ...editForm,
    });

    setShowModal(false);
  };

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-green-700 dark:hover:text-green-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-green-700 dark:text-green-400">
            YOUR ACCOUNT
          </p>

          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm">

          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-green-800 to-green-500" />

          <div className="px-6 pb-10 md:px-10">

            {/* Profile Image + Edit */}
            <div className="-mt-14 mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="h-28 w-28 rounded-2xl border-4 border-card object-cover shadow-md"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-card bg-green-100 text-green-700 shadow-md dark:bg-green-500/15 dark:text-green-400">
                  <User size={55} />
                </div>
              )}

              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-700 px-5 py-2.5 font-medium text-green-700 transition-colors hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-500/10"
              >
                <Pencil size={17} />
                Edit Profile
              </button>
            </div>

            {/* User Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {user.name}
              </h2>

              <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                {user.location}
              </p>
            </div>

            {/* Statistics */}
            <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div className="flex items-center gap-4 rounded-2xl bg-green-50 p-6 dark:bg-green-500/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  <CalendarDays size={25} />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Created Events
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    03
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-blue-50 p-6 dark:bg-blue-500/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400">
                  <Users size={25} />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Joined Events
                  </p>
                  <h3 className="text-2xl font-bold text-foreground">
                    05
                  </h3>
                </div>
              </div>

            </div>

            {/* Account Info */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-foreground">
                Account Information
              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-4 rounded-xl border border-border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    <User size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    <Mail size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                    <p className="text-sm font-medium text-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {user.location}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-xl">

            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                Edit Profile
              </h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-muted-foreground transition hover:text-red-500 dark:hover:text-red-400"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 dark:focus:border-green-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Photo URL
                </label>

                <input
                  type="url"
                  name="photoURL"
                  value={editForm.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 dark:focus:border-green-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 dark:focus:border-green-400"
                />
              </div>

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl border border-border py-3 font-medium text-muted-foreground transition hover:bg-accent"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-green-700 py-3 font-medium text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Save Changes
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}