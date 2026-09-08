"use client"

import Link from "next/link"
import { Home, BookOpen, Landmark, Shield, Gamepad, Cog, Waypoints, Sigma, ArrowLeftRight, GitBranch } from "lucide-react"

export default function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: string
  setActivePage: (page: string) => void
}) {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 h-screen sticky top-0 hidden md:block overflow-y-auto">
      <div className="p-5">
        <nav className="space-y-1">
          <Link
            href="#"
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-base ${activePage === "home" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
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
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-base ${activePage === "writing" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
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

        <div className="mt-6 mb-3 text-base lowercase text-gray-500 font-medium">Projects</div>

        <nav className="space-y-1">
          <Link
            href="https://www.producthunt.com/products/sec-filing-analyzer"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
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
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
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
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
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
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
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
            href="https://www.youtube.com/watch?v=DN_3XsL6ay0"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
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

        <div className="mt-6 mb-3 text-base lowercase text-gray-500 font-medium">Mini Projects</div>

        <nav className="space-y-1">
          <Link
            href="https://github.com/Nishant891/benford-analysis"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
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
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <ArrowLeftRight size={16} />
              <span>Arbitrage</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>

          <Link
            href="https://github.com/Nishant891/my-own-git"
            className="flex items-center justify-between px-2 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-2">
              <GitBranch size={16} />
              <span>my own git</span>
            </div>
            <span className="text-gray-400 text-xs">↗</span>
          </Link>
        </nav>
      </div>

    </aside>
  )
}
