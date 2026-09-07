"use client";

import { useEffect, useRef } from "react";

type Role = {
  role: string;
  company: string;
  type: string;
  period: string;
  logo: string;
  summary?: string;
  points: string[];
};

const experience: Role[] = [
  {
    role: "SRE I",
    company: "Cohesity",
    type: "Full-time",
    period: "Jan 2026 - Present · 9 mos",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQFXZ2Hda_puGA/company-logo_200_200/B56ZXZqwVUHEAQ-/0/1743113619242/cohesity_logo?e=1790208000&v=beta&t=oyTdg0EY5OI5u2tJtVDe3xKlgrk2wD9s6-UgZm0mxqY",
    summary:
      "I work on distributed data-protection infrastructure, supporting petabyte-scale clusters that back up and recover VMware, NAS, Kubernetes, Nutanix, Microsoft 365, physical servers, and databases. The work spans distributed systems, storage and cluster architecture down through networking, Linux internals, and the hardware underneath.",
    points: [
      "Triage multi-node clusters in production: backup and recovery failures across VMware and Nutanix workloads, NAS and NFS data paths, services crash looping, and database/physical sources failing to register or protect.",
      "Engage on critical-account and Cyber Events Response Team escalations, restoring recovery capability across database, hypervisor, cloud and bare-metal layers while the incident is still live.",
      "Root cause work goes wherever the failure leads: service and kernel logs, packet captures, cluster state, SELinux policy, and the hardware underneath.",
    ],
  },
  {
    role: "Fullstack & Platform Engineer",
    company: "Stealth Startup",
    type: "Internship",
    period: "Jul 2025 - Dec 2025 · 6 mos",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQGUKsfjHB8RNQ/company-logo_200_200/company-logo_200_200/0/1735368022724/stealth_startup_51_logo?e=1790208000&v=beta&t=ekdYg74zQG9DU7z_P2c0DOuJ-rouYZBkdhRMdVekBuU",
    points: [
      "Set up and maintained the AWS infrastructure, from network layout and routing through to compute, storage and DNS.",
      "Moved the event-driven parts to a serverless API on Lambda, API Gateway and DynamoDB, so idle cost stayed near zero and traffic spikes during generation were absorbed without scaling EC2.",
      "Rebuilt the CI/CD pipeline so only changed services rebuild. Pipeline time went from 14 minutes to 4.",
      "Added automated rollback on failed health checks. Recovery from a bad deploy went from about 20 minutes of manual work to under 3 with no one involved.",
      "Built real-time streaming generation, a WYSIWYG editor for html elements, and a caching layer that cut LLM API calls by 40%.",
    ],
  },
  {
    role: "System Reliability Engineer",
    company: "Nutanix",
    type: "Internship",
    period: "Jan 2025 - Jun 2025 · 6 mos",
    logo: "https://media.licdn.com/dms/image/v2/D560BAQGxu4702VlEFQ/company-logo_200_200/company-logo_200_200/0/1680526828152/nutanix_logo?e=1790208000&v=beta&t=oJkrXIYzQnx-bwKWXXvAwJcFQEqKhDdntEIl1Mqkne4",
    points: [
      "Built an internal workflow manager adopted across the org. 15 PRs merged, 10 Jira tickets closed.",
      "Containerised per-user environments with docker compose, including networking and bash deploy scripts.",
      "Built Linux from source with a custom kernel, bootloader and init.",
      "CCNA: VLAN segmentation, OSPF and SDN, applied directly to L2 isolation debugging.",
      "Supported production escalations on hyperconverged clusters covering hypervisor, storage fabric and VM-level faults.",
    ],
  },
];

export default function ExperienceTimeline() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-role]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: show everything, no scroll work.
    if (reduced) {
      items.forEach((el) => {
        el.dataset.visible = "true";
        el.style.setProperty("--fill", "1");
      });
      return;
    }

    // One rAF-throttled pass drives both the reveal and the rail fill. Doing
    // the reveal here rather than with an IntersectionObserver matters: a jump
    // (anchor link, End key, a hard fling) can carry a role from below the
    // fold to above it without ever intersecting, and an observer would leave
    // that role stuck invisible. A position check catches it either way.
    let frame = 0;
    const paint = () => {
      frame = 0;

      const viewport = window.innerHeight;

      // The read line sits at 72% of the viewport, but the last rail would
      // never reach it — the page runs out of scroll first. So as we approach
      // the bottom of the document, ease the read line down to the very
      // bottom of the viewport, letting the final rail complete.
      const maxScroll = document.documentElement.scrollHeight - viewport;
      const remaining = Math.max(0, maxScroll - window.scrollY);
      const nearBottom = 1 - Math.min(1, remaining / (viewport * 0.4));
      const readLine = viewport * (0.72 + 0.28 * nearBottom);

      items.forEach((el) => {
        // Reveal once the role has crossed into the lower part of the screen,
        // and keep it revealed (top goes negative as it scrolls away).
        if (el.getBoundingClientRect().top < viewport * 0.9) {
          el.dataset.visible = "true";
        }

        const rail = el.querySelector<HTMLElement>("[data-rail]");
        if (!rail) return;
        const box = rail.getBoundingClientRect();
        const progress = (readLine - box.top) / Math.max(box.height, 1);
        el.style.setProperty(
          "--fill",
          String(Math.min(1, Math.max(0, progress)))
        );
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {experience.map((job, i) => {
        const last = i === experience.length - 1;

        return (
          <article key={job.company} data-role className="group">
            {/* role header */}
            <header className="flex items-start gap-3 sm:gap-4">
              <img
                src={job.logo}
                alt={job.company}
                loading="lazy"
                className="j-logo h-10 w-10 sm:h-11 sm:w-11 shrink-0 object-contain"
              />
              <div className="min-w-0">
                <h3 className="j-reveal text-base font-semibold text-gray-900">
                  {job.role}
                </h3>
                <p className="j-reveal text-sm text-gray-600">
                  {job.company} · {job.type}
                </p>
                <p className="j-reveal text-xs text-gray-400">{job.period}</p>
              </div>
            </header>

            {/* journey rail + body */}
            <div
              className={`relative mt-4 ml-5 sm:ml-[22px] pl-6 sm:pl-8 ${
                last ? "pb-0" : "pb-12"
              }`}
            >
              {/* rail: faint track with a fill that grows on scroll */}
              <span
                data-rail
                className="pointer-events-none absolute left-0 top-1 bottom-0 w-px -translate-x-1/2 bg-gray-100"
                aria-hidden="true"
              >
                <span className="j-fill absolute inset-0 origin-top bg-gray-300" />
              </span>

              {/* the dot sits on the first line of the body text */}
              <span className="j-dot absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-gray-300 bg-white" />

              {job.summary && (
                <p className="j-reveal text-sm leading-5 text-gray-600">
                  {job.summary}
                </p>
              )}

              <ul
                className={`list-disc space-y-2.5 pl-4 text-sm leading-5 text-gray-600 marker:text-gray-300 ${
                  job.summary ? "mt-4" : ""
                }`}
              >
                {job.points.map((point, p) => (
                  <li
                    key={point}
                    className="j-reveal"
                    style={{ transitionDelay: `${80 + p * 70}ms` }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
