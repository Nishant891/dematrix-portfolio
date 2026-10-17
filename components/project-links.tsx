"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  Cog,
  Gamepad,
  GitBranch,
  Globe2,
  Landmark,
  Shield,
  Sigma,
  Waypoints,
} from "lucide-react";
import { useState } from "react";
import { SiGithub, SiMedium, SiNpm, SiProducthunt, SiYoutube } from "react-icons/si";

const projects = [
  {
    name: "jwt-authx",
    href: "https://www.npmjs.com/package/jwt-authx",
    icon: Shield,
  },
  {
    name: "wasm-games",
    href: "https://nishant891.github.io/web-assembly-games/",
    icon: Gamepad,
  },
  {
    name: "sec filing analyzer",
    href: "https://www.producthunt.com/products/sec-filing-analyzer",
    icon: Landmark,
  },
  {
    name: "order matching engine",
    href: "https://medium.com/@nishant19072003/how-i-created-an-order-matching-engine-33e0669be77a",
    icon: Cog,
  },
  {
    name: "zbot",
    href: "https://www.youtube.com/watch?v=DN_3XsL6ay0",
    icon: Waypoints,
  },
];

const miniProjects = [
  {
    name: "benford's analysis",
    href: "https://github.com/Nishant891/benford-analysis",
    icon: Sigma,
  },
  {
    name: "arbitrage",
    href: "https://github.com/Nishant891/arbitrage",
    icon: ArrowLeftRight,
  },
  {
    name: "my own git",
    href: "https://github.com/Nishant891/my-own-git",
    icon: GitBranch,
  },
];

function DestinationIcon({ href }: { href: string }) {
  const host = new URL(href).hostname;
  if (host === "github.com" || host.endsWith(".github.io")) return <SiGithub size={15} aria-hidden="true" />;
  if (host === "www.npmjs.com") return <SiNpm size={15} aria-hidden="true" />;
  if (host === "www.youtube.com") return <SiYoutube size={15} aria-hidden="true" />;
  if (host === "www.producthunt.com") return <SiProducthunt size={15} aria-hidden="true" />;
  if (host === "medium.com") return <SiMedium size={15} aria-hidden="true" />;
  return <Globe2 size={15} aria-hidden="true" />;
}

function destinationName(href: string) {
  const host = new URL(href).hostname.replace(/^www\./, "");
  if (host === "github.com") return "github";
  if (host.endsWith(".github.io")) return "github pages";
  if (host === "npmjs.com") return "npm";
  if (host === "youtube.com") return "youtube";
  if (host === "producthunt.com") return "producthunt";
  if (host === "medium.com") return "medium";
  return host;
}

export default function ProjectLinks({ onNavigate }: { onNavigate?: () => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const renderLinks = (items: typeof projects) =>
    items.map((project) => {
      const Icon = project.icon;
      return (
        <Link
          key={project.href}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-base text-gray-700 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
          onMouseEnter={() => setPreview(project.href)}
          onMouseLeave={() => setPreview(null)}
          onFocus={() => setPreview(project.href)}
          onBlur={() => setPreview(null)}
          onClick={onNavigate}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Icon size={16} className="shrink-0" aria-hidden="true" />
            <span className="truncate">{project.name}</span>
          </span>
          <span className="shrink-0 text-xs text-gray-400" aria-hidden="true">↗</span>
        </Link>
      );
    });

  return (
    <>
      <div className="mt-6 mb-3 text-base font-medium text-gray-500">projects</div>
      <nav className="space-y-1" aria-label="projects">{renderLinks(projects)}</nav>

      <div className="mt-6 mb-3 text-base font-medium text-gray-500">mini projects</div>
      <nav className="space-y-1" aria-label="mini projects">{renderLinks(miniProjects)}</nav>

      {preview && (
        <div
          role="status"
          className="pointer-events-none fixed bottom-7 left-16 z-[60] flex items-center gap-2 rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-xs text-gray-700 shadow-sm"
        >
          <DestinationIcon href={preview} />
          <span className="font-medium">{destinationName(preview)}</span>
        </div>
      )}
    </>
  );
}
