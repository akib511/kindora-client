import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Helping Our Community",
    category: "Community Support",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=900",
    className: "md:col-span-2 md:row-span-2",
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
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
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

            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Every small action creates a beautiful story. Explore the
              moments that bring our community together.
            </p>
          </div>

          <div className="group flex cursor-pointer items-center gap-2 font-semibold text-green-700 dark:text-green-400">
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
        <div className="grid auto-rows-[230px] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[250px]">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition duration-300 group-hover:opacity-100" />

              {/* Image Content */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <div className="translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-green-300">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-bold leading-snug text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-gray-900 backdrop-blur transition duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}