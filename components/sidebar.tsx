"use client"

import Link from "next/link"
import { Home, BookOpen, Landmark, Shield, Gamepad, Cog, Waypoints, Sigma, ArrowLeftRight, NotebookPen } from "lucide-react"

export default function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: string
  setActivePage: (page: string) => void
}) {
  return (
    <aside className="w-52 shrink-0 border-r border-gray-200 h-screen sticky top-0 hidden md:flex md:flex-col overflow-y-auto">
      <div className="flex-1 p-5">
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

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Projects</div>

        <nav className="space-y-1">
          <Link
            href="https://www.producthunt.com/products/sec-filing-analyzer"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <Landmark size={16} />
              <span>SEC Filing Analyzer</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://www.npmjs.com/package/jwt-authx"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>jwt-authx</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://nishant891.github.io/web-assembly-games/"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <Gamepad size={16} />
              <span>wasm-games</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://medium.com/@nishant19072003/how-i-created-an-order-matching-engine-33e0669be77a"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <Cog size={20} />
              <span>Order Matching Engine</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://github.com/Nishant891/sec-intel"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <Waypoints size={16} />
              <span>zbot</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>

        <div className="mt-6 mb-3 text-xs uppercase text-gray-500 font-medium">Mini Projects</div>

        <nav className="space-y-1">
          <Link
            href="https://github.com/Nishant891/benford-analysis"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <Sigma size={16} />
              <span>Benford's Analysis</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://github.com/Nishant891/arbitrage"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <ArrowLeftRight size={16} />
              <span>Arbitrage</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>
      </div>

      {/* tech presence — pinned to the bottom of the sidebar */}
      <div className="flex items-center justify-center gap-6 px-5 pt-6 pb-8">
        <Link
          href="https://leetcode.com/Nishant892/"
          aria-label="Leetcode"
          title="Leetcode"
          className="text-gray-500 hover:opacity-70"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/leetcode.png" alt="Leetcode" className="w-5 h-5" />
        </Link>

        <Link
          href="https://github.com/Nishant891"
          aria-label="Github"
          title="Github"
          className="text-gray-500 hover:opacity-70"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github.png" alt="Github" className="w-5 h-5" />
        </Link>

        <Link
          href="https://medium.com/@nishant19072003"
          aria-label="Medium"
          title="Medium"
          className="text-gray-500 hover:text-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NotebookPen size={20} />
        </Link>
      </div>
    </aside>
  )
}
