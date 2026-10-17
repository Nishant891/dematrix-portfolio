"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Role = {
  company: string;
  role: string;
  period: string;
  logo?: string;
  points: string[];
};

const work: Role[] = [
  {
    company: "Cohesity",
    role: "System Reliability Engineer",
    period: "Jan 2026 - Present",
    logo: "/cohesity.png",
    points: ["Working on distributed data-protection infrastructure."],
  },
  {
    company: "deckit.ai",
    role: "Fullstack & Platform Engineer",
    period: "Jul 2025 - Dec 2025",
    logo: "/deckit-ai.jpg",
    points: [
      "Set up and maintained the AWS infrastructure.",
      "Worked across the stack on a product for building anything in HTML.",
    ],
  },
  {
    company: "Nutanix",
    role: "System Reliability Engineer",
    period: "Jan 2025 - Jun 2025",
    logo: "/nutanix-mark.svg",
    points: [
      "Built internal tools and worked on hyperconverged infrastructure.",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="space-y-8">
      {work.map((job) => (
        <ExperienceItem key={job.company} job={job} />
      ))}
    </div>
  );
}
function ExperienceItem({ job }: { job: Role }) {
  const [open, setOpen] = useState(false);
  const panelId = `work-${job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <article className="flex items-start gap-3 sm:gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
        {job.logo ? <img src={job.logo} alt="" loading="lazy" className="h-full w-full object-contain" /> : null}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
            <p className="text-base text-gray-600">{job.role} · {job.period}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? "hide" : "show"} work at ${job.company}`}
            className="-mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900"
          >
            <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div
          id={panelId}
          aria-hidden={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-6 text-gray-600 marker:text-gray-400">
              {job.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
