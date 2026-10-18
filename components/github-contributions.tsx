"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Day = { date: string; level: number; count: number };
type Calendar = { total: number; days: Day[] };
type Project = { name: string; href: string; logo?: string };

const contributedProjects: Record<number, Project[]> = {
  2026: [
    { name: "kestra", href: "https://github.com/kestra-io/kestra/pull/18756", logo: "/kestra.svg" },
    { name: "backstage", href: "https://github.com/backstage/backstage/pull/35695", logo: "/backstage.svg" },
  ],
  2025: [
    { name: "kestra", href: "https://github.com/kestra-io/kestra/pull/13491", logo: "/kestra.svg" },
    { name: "grafana k6", href: "https://github.com/grafana/k6/pull/4984", logo: "/contributors/grafana.jpg" },
    { name: "kubernetes", href: "https://github.com/kubernetes/website/pull/51663", logo: "/contributors/kubernetes.png" },
    { name: "twenty", href: "https://github.com/twentyhq/twenty/pull/14003", logo: "/contributors/twenty.png" },
    { name: "remix ide", href: "https://github.com/remix-project-org/remix-ide/pull/3231", logo: "/contributors/remix.png" },
  ],
  2024: [
    { name: "aiomentor", href: "https://github.com/Karmanya20/AIOMentor/pull/15", logo: "/contributors/aiomentor.jpg" },
  ],
  2023: [
    { name: "oppia", href: "https://github.com/oppia/oppia", logo: "/contributors/oppia.png" },
  ],
};

const shades = ["#e5e7eb", "#bfdbfe", "#60a5fa", "#2563eb", "#1d4ed8"];

export default function GithubContributions() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, index) => currentYear - index);
  const [year, setYear] = useState(currentYear);
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [error, setError] = useState(false);
  const graphScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    setCalendar(null);
    setError(false);
    fetch(`/api/contributions?year=${year}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("contributions unavailable");
        return response.json() as Promise<Calendar>;
      })
      .then(setCalendar)
      .catch((reason) => {
        if (reason.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [year]);

  const { cells, monthLabels } = useMemo(() => {
    if (!calendar) return { cells: [] as (Day | null)[], monthLabels: [] as { name: string; left: number }[] };
    const sorted = [...calendar.days].sort((a, b) => a.date.localeCompare(b.date));
    const leading = new Date(`${sorted[0].date}T00:00:00Z`).getUTCDay();
    const cells: (Day | null)[] = [...Array(leading).fill(null), ...sorted];
    const monthLabels: { name: string; left: number }[] = [];

    sorted.forEach((day, index) => {
      if (day.date.endsWith("-01")) {
        const date = new Date(`${day.date}T00:00:00Z`);
        monthLabels.push({
          name: date.toLocaleString("en", { month: "short", timeZone: "UTC" }).toLowerCase(),
          left: Math.floor((index + leading) / 7) * 13,
        });
      }
    });
    return { cells, monthLabels };
  }, [calendar]);

  useEffect(() => {
    const graph = graphScrollRef.current;
    if (!calendar || !graph) return;

    const sortedDays = [...calendar.days].sort((a, b) => a.date.localeCompare(b.date));
    let latestActiveIndex = -1;
    sortedDays.forEach((day, index) => {
      if (day.count > 0) latestActiveIndex = index;
    });
    if (latestActiveIndex < 0) return;

    const leading = new Date(`${sortedDays[0].date}T00:00:00Z`).getUTCDay();
    const latestDate = new Date(`${sortedDays[latestActiveIndex].date}T00:00:00Z`);
    const previousMonth = new Date(Date.UTC(latestDate.getUTCFullYear(), latestDate.getUTCMonth() - 1, 1));
    const startDate = previousMonth.toISOString().slice(0, 10);
    const startIndex = sortedDays.findIndex((day) => day.date >= startDate);
    const week = Math.floor((Math.max(0, startIndex) + leading) / 7);
    graph.scrollLeft = week * 13;
  }, [calendar]);

  return (
    <section className="!mt-12 space-y-4" aria-labelledby="contributions-heading">
      <h2 id="contributions-heading" className="text-base text-gray-500">contributions</h2>
      <div className="grid min-w-0 grid-cols-[8rem_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-[7.5rem_minmax(0,1fr)_3.5rem] lg:gap-3">
        <aside className="min-w-0">
          {contributedProjects[year]?.length ? (
            <ul className="space-y-2.5">
              {contributedProjects[year].map((project) => (
                <li key={project.name}>
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-sm text-base text-black hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900"
                  >
                    {project.logo ? (
                      <img src={project.logo} alt="" className="h-5 w-5 shrink-0 rounded-sm object-contain" />
                    ) : (
                      <Github size={20} aria-hidden="true" />
                    )}
                    <span className="truncate">{project.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">no public external projects found for {year}.</p>
          )}
        </aside>

        <div className="min-w-0">
          {calendar ? (
            <div ref={graphScrollRef} className="overflow-x-auto pb-2" aria-label={`${year} contribution graph`}>
              <div className="w-max">
                <div className="relative h-6 text-base text-gray-600" aria-hidden="true">
                  {monthLabels.map((month) => (
                    <span key={`${month.name}-${month.left}`} className="absolute" style={{ left: month.left }}>
                      {month.name}
                    </span>
                  ))}
                </div>
                <div
                  className="grid w-max"
                  style={{ gridAutoFlow: "column", gridTemplateRows: "repeat(7, 16px)", gridAutoColumns: "12px", gap: "1px" }}
                >
                  {cells.map((day, index) =>
                    day ? (
                      <span
                        key={day.date}
                        className="rounded-[2px]"
                        style={{ backgroundColor: shades[day.level] }}
                        title={`${day.count} contributions on ${day.date}`}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      />
                    ) : (
                      <span key={`empty-${index}`} aria-hidden="true" />
                    ),
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="flex h-[150px] items-center text-sm text-gray-500">
              {error ? "contributions are temporarily unavailable" : "loading contributions..."}
            </p>
          )}
        </div>

        <nav className="col-span-2 flex flex-wrap gap-1 lg:col-span-1 lg:flex-col" aria-label="contribution year">
          {years.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setYear(item)}
              aria-pressed={year === item}
              className={`rounded-md px-1.5 py-0.5 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900 ${year === item ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
