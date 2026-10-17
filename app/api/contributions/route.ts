import { NextRequest, NextResponse } from "next/server";
import snapshots from "@/data/github-contributions.json";

type Day = { date: string; level: number; count: number };
type Calendar = { total: number; days: Day[] };

function parseCalendar(html: string): Calendar | null {
  const total = html.match(/id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions?/i);
  const days: Day[] = [];
  const pattern = /<td\b[^>]*data-date="([\d-]+)"[^>]*data-level="([0-4])"[^>]*><\/td>\s*<tool-tip[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(pattern)) {
    const count = match[3].trim().match(/^(\d+) contributions?/i);
    days.push({
      date: match[1],
      level: Number(match[2]),
      count: count ? Number(count[1]) : 0,
    });
  }

  if (!total || days.length < 365) return null;
  return { total: Number(total[1].replaceAll(",", "")), days };
}

export async function GET(request: NextRequest) {
  const year = Number(request.nextUrl.searchParams.get("year"));
  const currentYear = new Date().getUTCFullYear();
  if (!Number.isInteger(year) || year < 2022 || year > currentYear) {
    return NextResponse.json({ error: "invalid year" }, { status: 400 });
  }

  const fallback = (snapshots as Record<string, Calendar>)[String(year)];
  let calendar: Calendar | undefined = fallback;

  if (year === currentYear || !fallback) {
    try {
      const response = await fetch(
        `https://github.com/users/Nishant891/contributions?from=${year}-01-01&to=${year}-12-31`,
        { headers: { Accept: "text/html" }, next: { revalidate: 3600 } },
      );
      if (response.ok) calendar = parseCalendar(await response.text()) ?? fallback;
    } catch {
      // A checked-in snapshot keeps the graph visible during GitHub outages.
    }
  }

  if (!calendar) {
    return NextResponse.json({ error: "contributions unavailable" }, { status: 503 });
  }

  return NextResponse.json(calendar, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
