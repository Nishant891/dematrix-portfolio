"use client"

import Link from "next/link"
import { Home, BookOpen, Layers, Tent, Paintbrush, Shield, Zap, Twitter, Youtube, Github, Bean, Pickaxe, Bot, Castle, SquareTerminal, Globe, UserSearch, MailSearch, Gamepad, Megaphone, Cog, TrendingUp, NotebookPen } from "lucide-react"

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
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${activePage === "home" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
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
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${activePage === "writing" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
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
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${activePage === "stack" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
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
          {/* <Link
            href="#"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <Bot size={16} />
              <span>Upstox MCP Bot</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link> */}
          <Link
            href="https://mekka-00.vercel.app/"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <Gamepad size={16} />
              <span>Wasm Games</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://gitlab.com/nishant19072003-group/livescript"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <SquareTerminal size={16} />
              <span>Code Editor</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://gitlab.com/nishant19072003-group/order-matching-engine"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <Cog size={16} />
              <span>Order Matching Engine</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Mini Projects</div>

        <nav className="space-y-1">
          <Link
            href="https://gitlab.com/nishant19072003-group/socialmediamarketingbot"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={20} />
              <span>Social Media Marketing Bot</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://gitlab.com/nishant19072003-group/emailclassifier"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <MailSearch size={16} />
              <span>Email Classifier</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://freelancefinder.vercel.app/"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <UserSearch size={16} />
              <span>Freelance Finder</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Tech Presence</div>

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
            href="https://gitlab.com/nishant19072003-group"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <img src="https://skillicons.dev/icons?i=git" alt="Github" className="w-6 h-6" />
              <span>Gitlab</span>
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

          <Link
            href="https://medium.com/@nishant19072003"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
          >
            <div className="flex items-center gap-2">
              <NotebookPen size={16} />
              <span>Medium</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}

