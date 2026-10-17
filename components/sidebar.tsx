"use client";

import Link from "next/link";
import { BookOpen, Home } from "lucide-react";
import ProjectLinks from "@/components/project-links";

export default function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: (page: string) => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white md:block">
      <div className="p-5">
        <nav className="space-y-1" aria-label="main navigation">
          {([
            { name: "home", icon: Home },
            { name: "writing", icon: BookOpen },
          ] as const).map(({ name, icon: Icon }) => (
            <Link
              key={name}
              href="#"
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-base ${activePage === name ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={(event) => {
                event.preventDefault();
                setActivePage(name);
              }}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>

        <ProjectLinks />
      </div>
    </aside>
  );
}
