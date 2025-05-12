"use client"

import Link from "next/link"
import { Home, BookOpen, Layers, Tent, Paintbrush, Shield, Zap, Twitter, Youtube, Github, Bean, Pickaxe, Bot, Castle, SquareTerminal, Globe, UserSearch, MailSearch, Gamepad } from "lucide-react"

export default function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: string
  setActivePage: (page: string) => void
}) {
  return (
    <aside className="w-52 border-r border-gray-200 h-screen sticky top-0 hidden md:block overflow-y-auto">
      <div className="p-5">
        <h2 className="text-lg font-bold mb-6">Nishant Sharma</h2>

        <nav className="space-y-1">
          <Link
            href="#"
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
              activePage === "home" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={(e) => {
              e.preventDefault()
              setActivePage("home")
            }}
          >
            <Home size={16} />
            <span>Home</span>
          </Link>

          <Link
            href="#"
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
              activePage === "writing" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={(e) => {
              e.preventDefault()
              setActivePage("writing")
            }}
          >
            <BookOpen size={16} />
            <span>Writing</span>
          </Link>
        </nav>

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Me</div>

        <nav className="space-y-1">
          <Link
            href="#"
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
              activePage === "stack" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={(e) => {
              e.preventDefault()
              setActivePage("stack")
            }}
          >
            <Layers size={16} />
            <span>Stack</span>
          </Link>
        </nav>

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Projects</div>

        <nav className="space-y-1">
        <Link
            href="#"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <Bot size={16} />
              <span>Wingman</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
          <Link
            href="https://retrogames-three.vercel.app/"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <Gamepad size={16} />
              <span>Retro games</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="#"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <SquareTerminal size={16} />
              <span>Collaborator</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Mini Projects</div>

        <nav className="space-y-1">
          <Link
            href="https://github.com/Nishant891"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
            <Bean size={16} />
              <span>Social media seeder</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://freelancefinder.vercel.app/"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
            <UserSearch size={16} />
              <span>Freelance finder</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
          <Link
            href="https://www.loom.com/share/b275e002c2bc489a9e1b38bba34dd023?sid=20048d25-025e-4bdc-85b0-2b37514771bb"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
            <MailSearch size={16} />
              <span>Email Classifier</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Accomplishments</div>

        <nav className="space-y-1">
          <Link
            href="https://leetcode.com/Nishant892/"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
            <img src="/leetcode.png" alt="Leetcode" className="w-6 h-6" />
              <span>Leetcode</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://github.com/Nishant891"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
            <img src="/github.png" alt="Github" className="w-6 h-6" />
              <span>GitHub</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://www.linkedin.com/posts/nishant-sharma-771653245_ccna-was-issued-by-cisco-to-nishant-sharma-activity-7296562986209394688-eU_O?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzJRYUBSjOtk00cJH1rfFOc_T83M736tuI"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
            <img src="/ccna.png" alt="Leetcode" className="w-6 h-6" />
              <span>CCNA</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}

