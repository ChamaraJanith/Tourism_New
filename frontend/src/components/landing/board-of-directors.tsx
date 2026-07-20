// src/components/landing/board-of-directors.tsx

import Image from "next/image";
import { boardOfDirectors, globalRepresentatives } from "@/data/advisory-board";

type Member = {
  name: string;
  title: string;
  role: string;
  description: string;
  image?: string;
  linkedin?: string;
};

function MemberCard({ member }: { member: Member }) {
  return (
    <article
      className="
        w-full overflow-hidden rounded-[26px] border border-white/10 bg-[#181c1f]
        shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition duration-300
        md:flex md:flex-col md:rounded-2xl md:bg-white/5 md:backdrop-blur-xl md:shadow-sm
        md:hover:-translate-y-1 md:hover:border-emerald-500/30 md:hover:shadow-xl
        sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] xl:w-[calc(20%-1.2rem)]
      "
    >
      {/* Mobile */}
      <div className="flex items-start gap-4 p-4 md:hidden">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-white/10 bg-white/5">
          <Image
            src={member.image || "/images/board/placeholder.jpg"}
            alt={member.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white">
                {member.name}
              </h3>

              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                {member.title}
              </p>
            </div>

            <a
              href={member.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${member.name}'s LinkedIn`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
            >
              <span className="text-sm font-semibold">in</span>
            </a>
          </div>

          <p className="mt-2 text-sm text-white/70">
            {member.role}
          </p>

          <p className="mt-2 text-sm leading-6 text-white/60">
            {member.description}
          </p>


        </div>
      </div>

      {/* Tablet/Desktop */}
      <div className="hidden md:block">
        <div className="relative h-64 w-full bg-white/5">
          <Image
            src={member.image || "/images/board/placeholder.jpg"}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            {member.title}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            {member.name}
          </h3>

          <p className="mt-3 text-sm font-medium text-white/70">
            {member.role}
          </p>

          <p className="mt-3 text-sm leading-6 text-white/60">
            {member.description}
          </p>

          <a
            href={member.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            View LinkedIn
            <span className="ml-1">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function BoardOfDirectors() {
  return (
    <section
      id="board-of-directors"
      className="relative overflow-hidden bg-[#111416] py-14 md:py-16"
    >
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Leadership Team
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Board of Directors
          </h2>

          <p className="mt-4 text-base text-white/70">
            Meet the experienced leaders guiding our vision and driving
            innovation across our portfolio of companies.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-5 md:mt-12 md:gap-6">
          {boardOfDirectors.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-20 mx-auto max-w-3xl text-center md:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Global Representatives
          </h2>

          <p className="mt-4 text-base text-white/70">
            Our international experts driving global partnerships and
            destination development.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-5 md:mt-12 md:gap-6">
          {globalRepresentatives.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}