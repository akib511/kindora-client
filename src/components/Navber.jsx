"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white transition-transform duration-300 group-hover:scale-105">
            <Heart size={18} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Kindora<span className="text-red-600">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-red-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden md:block">
            <Button
              nativeButton={false}
              render={<Link href="/login" />}
              className="rounded-md bg-red-600 px-6 font-semibold text-white hover:bg-red-700"
            >
              Login
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Toggle menu" />
                }
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="mt-10 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-4 py-3 text-base font-medium text-foreground/80 transition hover:bg-muted hover:text-red-600"
                    >
                      {link.name}
                    </Link>
                  ))}

                  <Button
                    nativeButton={false}
                    render={
                      <Link href="/login" onClick={() => setOpen(false)} />
                    }
                    className="mt-4 rounded-md bg-red-600 font-semibold text-white hover:bg-red-700"
                  >
                    Login
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </nav>
    </header>
  );
}