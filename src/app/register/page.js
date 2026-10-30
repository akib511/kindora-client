"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      return alert("Password must be at least 6 characters.");
    }

    if (!/[A-Z]/.test(formData.password)) {
      return alert("Password must contain an uppercase letter.");
    }

    if (!/[a-z]/.test(formData.password)) {
      return alert("Password must contain a lowercase letter.");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    console.log("Register form data:", formData);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">

        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-green-700 dark:hover:text-green-400"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-lg">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <UserPlus size={28} />
            </div>

            <h1 className="text-3xl font-bold text-foreground">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Join Kindora and make a difference together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Photo URL
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-green-700 dark:hover:text-green-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Minimum 6 characters, including uppercase and lowercase letters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-green-600 focus:ring-2 focus:ring-green-600/15 dark:focus:border-green-400 dark:focus:ring-green-400/15"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-green-700 dark:hover:text-green-400"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-700 py-3 font-semibold text-white transition-colors hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-4 text-sm text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full rounded-xl border border-border py-3 font-medium text-foreground transition-colors hover:bg-accent"
          >
            <span className="mr-2 font-bold">G</span>
            Continue with Google
          </button>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-green-700 hover:underline dark:text-green-400"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}