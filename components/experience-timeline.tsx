type Role = {
  company: string;
  role: string;
  period: string;
  logo: string;
  points: string[];
};

const work: Role[] = [
  {
    company: "Cohesity",
    role: "System Reliability Engineer",
    period: "Jan 2026 - Present",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQFXZ2Hda_puGA/company-logo_200_200/B56ZXZqwVUHEAQ-/0/1743113619242/cohesity_logo?e=1790208000&v=beta&t=oyTdg0EY5OI5u2tJtVDe3xKlgrk2wD9s6-UgZm0mxqY",
    points: ["Working on distributed data-protection infrastructure."],
  },
  {
    company: "Stealth Startup",
    role: "Fullstack & Platform Engineer",
    period: "Jul 2025 - Dec 2025",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGUKsfjHB8RNQ/company-logo_200_200/company-logo_200_200/0/1735368022724/stealth_startup_51_logo?e=1790208000&v=beta&t=ekdYg74zQG9DU7z_P2c0DOuJ-rouYZBkdhRMdVekBuU",
    points: [
      "Set up and maintained the AWS infrastructure.",
      "Worked across the stack on deckit.ai, a tool for building anything in HTML.",
    ],
  },
  {
    company: "Nutanix",
    role: "System Reliability Engineer",
    period: "Jan 2025 - Jun 2025",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQGxu4702VlEFQ/company-logo_200_200/company-logo_200_200/0/1680526828152/nutanix_logo?e=1790208000&v=beta&t=oJkrXIYzQnx-bwKWXXvAwJcFQEqKhDdntEIl1Mqkne4",
    points: [
      "Built internal tools and worked on hyperconverged infrastructure.",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <div className="space-y-8">
      {work.map((job) => (
        // The logo sits in its own column, so the company name, the role line
        // and the bullets all share one left edge.
        <article key={job.company} className="flex items-start gap-3 sm:gap-4">
          <img
            src={job.logo}
            alt={job.company}
            loading="lazy"
            className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 object-contain"
          />

          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">
              {job.company}
            </h3>
            <p className="text-base text-gray-600">
              {job.role} · {job.period}
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-6 text-gray-600 marker:text-gray-400">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
