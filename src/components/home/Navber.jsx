"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  User,
  CalendarPlus,
  CalendarCheck,
  ClipboardList,
  LogOut,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  
];

// ✅ Reusable avatar component — error fallback handles
function UserAvatar({ user, size = "sm" }) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses =
    size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? 18 : 20;

  // image URL thakle ar error na hole image render
  if (user?.image && !imgError) {
    return (
      <Image
        src={user.image}
        alt={user.name || "User"}
        width={size === "sm" ? 32 : 40}
        height={size === "sm" ? 32 : 40}
        unoptimized
        onError={() => setImgError(true)}
        className={`${sizeClasses} rounded-full object-cover`}
      />
    );
  }

  // fallback — icon
  return (
    <div
      className={`flex ${sizeClasses} items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400`}
    >
      <User size={iconSize} />
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;




  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed.");
        return;
      }

      toast.success("Logged out successfully!");

      setProfileOpen(false);
      setOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const profileLinks = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "Create Event", href: "/create-event", icon: CalendarPlus },
    { name: "Manage Events", href: "/manage-event", icon: ClipboardList },
    { name: "Joined Events", href: "/joined-events", icon: CalendarCheck },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#166534] text-white transition-transform duration-300 group-hover:scale-105 dark:bg-green-600">
            <Heart size={18} strokeWidth={2.5} />
          </div>

          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Kindora
            <span className="text-[#166534] dark:text-green-400">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[15px] font-semibold text-foreground/80 transition-colors hover:text-[#166534] dark:text-foreground/90 dark:hover:text-green-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          <ThemeToggle />
    
          {/* Desktop Auth */}
          <div className="relative hidden md:block">
            {!isPending && !user && (
              <Button
                nativeButton={false}
                render={<Link href="/login" />}
                className="rounded-md bg-[#166534] px-6 font-semibold text-white hover:bg-[#14532d] dark:bg-green-600 dark:hover:bg-green-700"
              >
                Login
              </Button>
            )}

            {!isPending && user && (
              <>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full border border-border px-2 py-1.5 transition hover:bg-muted"
                >
                  {/* ✅ Fixed Avatar */}
                  <UserAvatar user={user} size="sm" />

                  <span className="max-w-28 truncate text-sm font-semibold text-foreground">
                    {user.name}
                  </span>

                  <Settings size={15} className="text-muted-foreground" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-14 z-50 w-60 rounded-xl border border-border bg-card p-2 text-card-foreground shadow-xl">

                    <div className="border-b border-border px-3 py-3">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2">
                      {profileLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-green-700 dark:hover:text-green-400"
                          >
                            <Icon size={17} />
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="border-t border-border pt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-500/10"
                      >
                        <LogOut size={17} />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle menu"
                  />
                }
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px]">
                <SheetTitle className="sr-only">
                  Navigation Menu
                </SheetTitle>

                <div className="mt-10 flex flex-col gap-2">

                  {!isPending && user && (
                    <div className="mb-3 flex items-center gap-3 border-b border-border px-3 pb-4">
                      {/* ✅ Fixed Avatar */}
                      <UserAvatar user={user} size="md" />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  )}

                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-4 py-3 text-base font-semibold text-foreground/80 transition hover:bg-muted hover:text-[#166534] dark:text-foreground/90 dark:hover:text-green-400"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {!isPending && user && (
                    <>
                      <div className="my-2 border-t border-border" />

                      {profileLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-foreground/80 transition hover:bg-muted hover:text-green-700 dark:hover:text-green-400"
                          >
                            <Icon size={18} />
                            {link.name}
                          </Link>
                        );
                      })}

                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="mt-2 flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-500/10"
                      >
                        <LogOut size={18} />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </>
                  )}

                  {!isPending && !user && (
                    <Button
                      nativeButton={false}
                      render={
                        <Link
                          href="/login"
                          onClick={() => setOpen(false)}
                        />
                      }
                      className="mt-4 rounded-md bg-[#166534] font-semibold text-white hover:bg-[#14532d] dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}