"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function SiteFooter() {
  const { resolvedTheme, setTheme } = useTheme();
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setTime(
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date()).toLowerCase().replace(" ", "")
    );
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <footer className="site-footer">
      <p className="footer-time">{time && <time>{time} </time>}in India</p>
      <button
        className="theme-toggle"
        type="button"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(dark ? "light" : "dark")}
        disabled={!mounted}
      >
        {dark ? <Moon size={24} strokeWidth={1.7} /> : <Sun size={24} strokeWidth={1.7} />}
      </button>
    </footer>
  );
}
