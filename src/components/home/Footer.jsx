import Link from "next/link";

import { Heart, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "Create Event", href: "/create-event" },
  { name: "About Us", href: "/about" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
];

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default function Footer() {
  return (
    <footer className="bg-[#14221A] px-6 pt-16 text-gray-300">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                <Heart size={23} />
              </div>

              <span className="text-2xl font-bold text-white">
                Kindora<span className="text-green-500">.</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Together We Care, Together We Change. Join our community and make
              a meaningful difference in the world.
            </p>

            <div className="mt-6 flex gap-3">
              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="Social media"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-green-600 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Quick Links</h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm transition hover:text-green-400"
                  >
                    <ArrowUpRight size={15} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Support</h3>

            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm transition hover:text-green-400"
                  >
                    <ArrowUpRight size={15} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Get in Touch</h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={19} className="shrink-0 text-green-400" />
                <p>Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={19} className="text-green-400" />
                <p>hello@kindora.com</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={19} className="text-green-400" />
                <p>Contact us through our website</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-center text-sm text-gray-400 sm:flex-row">
          <p>
            © <CopyrightYear /> Kindora. All rights reserved.
          </p>

          <p>
            Made with <Heart size={14} className="mx-1 inline text-green-500" />{" "}
            for a better world.
          </p>
        </div>
      </div>
    </footer>
  );
}