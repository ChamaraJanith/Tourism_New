// src/components/landing/board-of-directors.tsx

import Image from "next/image";
import { advisoryBoard } from "@/data/advisory-board";

export default function BoardOfDirectors() {
  return (
    <section id="board-of-directors" className="bg-[#111416] py-16 relative overflow-hidden">
      {/* Soft glowing background circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-2xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Leadership
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Advisory Network & Board of Directors
          </h2>
          <p className="mt-4 text-base text-white/70">
            Our leadership team brings together expertise in hospitality,
            tourism, healthcare, legal advisory, operations, and technology.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {advisoryBoard.map((member, index) => {
            const isLastAlone =
              index === advisoryBoard.length - 1 &&
              advisoryBoard.length % 3 === 1;

            return (
            <article
              key={member.name}
              className={`flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/30${isLastAlone ? " xl:col-start-2" : ""}`}
            >
              <div className="relative h-72 w-full bg-white/5">
                <Image
                  src={member.image || "/images/board/placeholder.jpg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
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
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  View LinkedIn
                  <span className="ml-1">↗</span>
                </a>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}