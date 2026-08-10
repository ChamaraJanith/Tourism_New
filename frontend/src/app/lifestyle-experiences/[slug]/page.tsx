"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { experiences } from "@/data/lifestyle-experiences";
import { ChevronDown } from "@/components/ui/Icons";
import { BespokeButton } from "@/components/ui/BespokeButton";

export default function ExperiencePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const experience = experiences.find((exp) => exp.slug === slug);

  if (!experience) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#fafafa]">
        <h1 className="text-2xl font-black uppercase">Experience Not Found</h1>
        <button
          onClick={() => router.push("/lifestyle-experiences")}
          className="mt-6 text-[0.7rem] font-black uppercase tracking-widest text-[#f2c14f] border-b-2 border-[#f2c14f]"
        >
          Back to Experiences
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* ── HERO ── */}
      <section className="relative h-[100dvh] w-full overflow-hidden bg-[#0a0c0e]">
        {experience.video ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={experience.image}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={experience.video} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 text-center text-white">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/lifestyle-experiences")}
            className="absolute top-32 left-6 sm:left-12 lg:left-16 flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.4em] text-white/70 hover:text-white transition-colors"
          >
            <span className="text-[1.2rem] leading-none mb-0.5">‹</span>
            Back to List
          </motion.button>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.5em] backdrop-blur-md"
          >
            {experience.tag}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 font-display text-6xl font-bold leading-[1.05] tracking-tight sm:text-8xl lg:text-9xl"
          >
            {experience.title.split(' ').slice(0, 2).join(' ')} <br />
            <span className="text-[#3ed8ff]">{experience.title.split(' ').slice(2).join(' ')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 max-w-2xl text-sm font-medium leading-relaxed text-white/80 sm:text-base"
          >
            {experience.description}
          </motion.p>

          <div className="mt-14 flex flex-wrap justify-center gap-6">
            <BespokeButton variant="primary" className="!bg-[#00c9b7] !text-white hover:!bg-[#00e6d1] !min-w-0 !px-10">
              Book Experience
            </BespokeButton>
            <BespokeButton variant="secondary" className="!bg-white/5 !backdrop-blur-xl !min-w-0 !px-10">
              Explore Activities
            </BespokeButton>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-[0.5rem] font-bold uppercase tracking-[0.4em] text-white/60 mb-2">Scroll to Explore</span>
          <ChevronDown size={20} className="text-[#f2c14f]" />
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="mx-auto max-w-screen-xl px-6 py-24 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Details Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8 rounded-[2rem] bg-white p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-black/5">
              <h4 className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#f2c14f]">Key Details</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[0.55rem] font-bold uppercase tracking-widest text-gray-400">Duration</p>
                  <p className="mt-1 text-sm font-black text-[#1e2528]">{experience.details.duration}</p>
                </div>
                <div>
                  <p className="text-[0.55rem] font-bold uppercase tracking-widest text-gray-400">Location</p>
                  <p className="mt-1 text-sm font-black text-[#1e2528]">{experience.details.location}</p>
                </div>
                <div>
                  <p className="text-[0.55rem] font-bold uppercase tracking-widest text-gray-400">Group Size</p>
                  <p className="mt-1 text-sm font-black text-[#1e2528]">{experience.details.groupSize}</p>
                </div>
                <div>
                  <p className="text-[0.55rem] font-bold uppercase tracking-widest text-gray-400">Intensity</p>
                  <p className="mt-1 text-sm font-black text-[#1e2528]">{experience.details.level}</p>
                </div>
              </div>
              <BespokeButton variant="dark" className="w-full min-w-0">
                Book This Experience
              </BespokeButton>
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black uppercase leading-tight sm:text-4xl text-[#1e2528]">
                A Bespoke Journey into <br />
                <span className="text-[#f2c14f]">Pure Authenticity</span>
              </h2>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-gray-600">
                <p>{experience.longDescription}</p>
                <p>
                  Our elite concierges handle every detail of your visit, from private
                  transportation in luxury vehicles to ensuring the perfect lighting
                  for your photography. We prioritize your comfort and privacy at
                  every step of the journey.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="rounded-3xl bg-black/5 p-8">
                  <h5 className="text-[0.7rem] font-black uppercase tracking-widest text-[#1e2528]">Elite Amenities</h5>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    Refreshments, private seating, and exclusive access to restricted areas.
                  </p>
                </div>
                <div className="rounded-3xl bg-black/5 p-8">
                  <h5 className="text-[0.7rem] font-black uppercase tracking-widest text-[#1e2528]">Expert Guides</h5>
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                    Accompanied by local experts and professional naturalists.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



    </main>
  );
}
