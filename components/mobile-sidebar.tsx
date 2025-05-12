"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, BookOpen, Layers } from "lucide-react"

export default function MobileSidebar({
  activePage,
  setActivePage,
}: {
  activePage: string
  setActivePage: (page: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md">
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Your Name</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-1">
              <Link
                href="#"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
                  activePage === "home" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("home")
                  setIsOpen(false)
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
                  setIsOpen(false)
                }}
              >
                <BookOpen size={16} />
                <span>Writing</span>
              </Link>

              <Link
                href="#"
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm ${
                  activePage === "stack" ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setActivePage("stack")
                  setIsOpen(false)
                }}
              >
                <Layers size={16} />
                <span>Stack</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
