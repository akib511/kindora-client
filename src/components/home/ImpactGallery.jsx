
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Helping Our Community",
    category: "Community Support",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=900",
    className: "col-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "A Greener Tomorrow",
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=900",
    className: "",
  },
  {
    id: 3,
    title: "Sharing Food & Love",
    category: "Food Donation",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=900",
    className: "",
  },
  {
    id: 4,
    title: "Education For Everyone",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900",
    className: "",
  },
  {
    id: 5,
    title: "Together We Care",
    category: "Volunteering",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=900",
    className: "",
  },
  {
    id: 6,
    title: "Healing Hands",
    category: "Healthcare",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=900",
    className: "",
  },
  {
    id: 7,
    title: "Clean Water for All",
    category: "Clean Water",
    image:
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?q=80&w=900",
    className: "",
  },
  {
    id: 8,
    title: "Building Dreams",
    category: "Youth Empowerment",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=900",
    className: "",
  },
];

export default function ImpactGallery() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400 sm:px-5 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />
              OUR IMPACT
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Moments That
              <span className="relative ml-2 inline-block text-green-700 dark:text-green-400">
                Matter
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-green-600/30 dark:bg-green-400/30" />
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base">
              Every small action creates a beautiful story. Explore the
              moments that bring our community together.
            </p>
          </div>

          <div className="group flex cursor-pointer items-center gap-2 self-start font-semibold text-green-700 dark:text-green-400 md:self-auto">
            Stories of Kindness
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-green-700/20 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white dark:border-green-400/20 dark:group-hover:bg-green-400 dark:group-hover:text-neutral-900">
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 auto-rows-[175px] gap-3 sm:auto-rows-[220px] sm:gap-5 md:grid-cols-3 md:auto-rows-[250px]">

          {galleryImages.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition duration-300 group-hover:opacity-100" />

              {/* Image Content */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:gap-3 sm:p-5 md:p-6">
                <div className="min-w-0 translate-y-1 transition-transform duration-300 group-hover:translate-y-0">

                  <span className="mb-1 inline-block text-[9px] font-semibold uppercase tracking-wider text-green-300 sm:mb-2 sm:text-xs">
                    {item.category}
                  </span>

                  <h3 className="text-sm font-bold leading-snug text-white sm:text-xl md:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/90 text-gray-900 backdrop-blur transition duration-300 group-hover:bg-green-600 group-hover:text-white sm:h-10 sm:w-10">
                  <ArrowUpRight size={16} className="sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

