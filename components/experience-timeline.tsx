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
      "Worked across the stack on a tool for building anything in HTML.",
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
        // The logo sits in its own column, so the company name, the role line
        // and the bullets all share one left edge.
        <article key={job.company} className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            {job.logo ? (
              <img src={job.logo} alt="" loading="lazy" className="h-full w-full object-contain" />
            ) : null}
          </div>

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
