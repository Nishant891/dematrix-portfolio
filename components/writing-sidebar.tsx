"use client"

import Link from "next/link"
import { Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { BiChevronRight, BiChevronDown } from "react-icons/bi"
import { FiFolder, FiFolderPlus, FiFile } from "react-icons/fi"
import remarkHtml from "remark-html"
import remarkParse from "remark-parse"
import { unified } from "unified"

// Sample articles for demo purposes since the API might not be available
const sampleArticles = {
  "web-development": [
    { slug: "building-design-system", type: "web-development" },
    { slug: "react-server-components", type: "web-development" },
    { slug: "nextjs-performance", type: "web-development" },
  ],
  "user-experience": [
    { slug: "accessible-web-apps", type: "user-experience" },
    { slug: "product-design", type: "user-experience" },
  ],
}

// Sample article content
const sampleArticleContent = {
  "building-design-system": {
    title: "Building a Design System from Scratch",
    date: "May 15, 2023",
    content: `
      <p>Design systems have become an essential part of modern web development. They provide a single source of truth for design elements, ensuring consistency across products and teams.</p>
      
      <h2>Why Build a Design System?</h2>
      <p>A well-implemented design system can significantly improve workflow efficiency, maintain design consistency, and speed up development time. It serves as a bridge between designers and developers, creating a shared language that both teams can understand and use.</p>
      
      <h2>Key Components</h2>
      <p>A comprehensive design system typically includes:</p>
      <ul>
        <li>Design principles and guidelines</li>
        <li>Component library</li>
        <li>Pattern library</li>
        <li>Style guide (colors, typography, spacing, etc.)</li>
        <li>Documentation</li>
      </ul>
    `,
  },
  "react-server-components": {
    title: "The Future of React Server Components",
    date: "April 22, 2023",
    content: `
      <p>React Server Components represent a paradigm shift in how we build React applications, enabling developers to render components on the server while maintaining React's component model and interactivity.</p>
      
      <h2>What Are Server Components?</h2>
      <p>Server Components allow developers to render React components entirely on the server. Unlike traditional server-side rendering (SSR), Server Components never hydrate on the client, reducing JavaScript bundle size and improving performance.</p>
    `,
  },
  // Add other article contents here
}

interface BlogItem {
  slug: string
  type: string
}

export default function WritingSidebar({
  activeArticle,
  setActiveArticle,
  setArticleContent,
}: {
  activeArticle: string | null
  setActiveArticle: (slug: string) => void
  setArticleContent?: (article: string) => void
}) {
  const [articles, setArticles] = useState<Record<string, BlogItem[]>>({})
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // First try to fetch from API
        const response = await fetch("/api/getBlogMetadata")
        if (response.ok) {
          const blogs = await response.json()
          console.log("API blogs:", blogs)
          const blogsByType = blogs.flat().reduce((acc: Record<string, BlogItem[]>, blog: BlogItem) => {
            if (!acc[blog.type]) {
              acc[blog.type] = []
            }
            acc[blog.type].push(blog)
            return acc
          }, {})
          setArticles(blogsByType)
        } else {
          // If API fails, use sample data
          console.log("Using sample data")
          setArticles(sampleArticles)
        }
      } catch (err) {
        console.error("Failed to fetch articles:", err)
        // Fall back to sample data
        setArticles(sampleArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()

    // Set all types to expanded by default
    if (Object.keys(articles).length > 0) {
      const allExpanded = Object.keys(articles).reduce(
        (acc, type) => {
          acc[type] = true
          return acc
        },
        {} as Record<string, boolean>,
      )
      setExpandedTypes(allExpanded)
    }
  }, [])

  const handleBlogClick = async (slug: string) => {
    setActiveArticle(slug) // Set the active article immediately

    if (!setArticleContent) return

    try {
      // First try the API
      const response = await fetch(`/api/getBlogContent?slug=${slug}`)
      if (response.ok) {
        const data = await response.json()
        const file = await unified().use(remarkParse).use(remarkHtml).process(data.content)

        if (file) {
          setArticleContent(String(file))
        }
      } else {
        // If API fails, use sample data
        const sampleContent = sampleArticleContent[slug as keyof typeof sampleArticleContent]
        if (sampleContent) {
          setArticleContent(JSON.stringify(sampleContent))
        } else {
          throw new Error("Article not found in sample data")
        }
      }
    } catch (err) {
      console.error("Failed to fetch article content:", err)

      // As a last resort, try to use sample data
      const sampleContent = sampleArticleContent[slug as keyof typeof sampleArticleContent]
      if (sampleContent) {
        setArticleContent(JSON.stringify(sampleContent))
      } else {
        setError(true)
        setArticleContent("Error loading article content.")
      }
    }
  }

  const toggleType = (type: string) => {
    setExpandedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const formatSlug = (slug: string) => {
    return slug
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (loading) return <div className="p-5 text-sm text-gray-500">Loading articles...</div>
  if (error) return <div className="p-5 text-sm text-red-500">Failed to load articles</div>

  return (
    <aside className="w-64 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto bg-white">
      <div className="p-5">
        <h2 className="text-sm font-medium mb-4">All Articles</h2>

        <div className="space-y-2">
          {Object.entries(articles).map(([type, typeBlogs]) => (
            <div key={type} className="mb-3">
              {/* Type folder */}
              <button
                onClick={() => toggleType(type)}
                className="flex items-center w-full text-sm text-gray-700 hover:bg-gray-50 rounded-md px-2 py-1.5 mb-1"
              >
                {expandedTypes[type] ? (
                  <FiFolderPlus className="w-4 h-4 text-gray-500 mr-2" />
                ) : (
                  <FiFolder className="w-4 h-4 text-gray-500 mr-2" />
                )}
                <span className="font-medium">{formatType(type)}</span>
                {expandedTypes[type] ? (
                  <BiChevronDown className="w-4 h-4 ml-auto" />
                ) : (
                  <BiChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>

              {/* Blogs within type */}
              {expandedTypes[type] && (
                <div className="ml-4 space-y-1">
                  {typeBlogs.map((blog: BlogItem) => (
                    <Link
                      key={blog.slug}
                      href="#"
                      className={`flex items-center text-sm px-2 py-1.5 rounded-md ${activeArticle === blog.slug ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      onClick={(e) => {
                        e.preventDefault()
                        handleBlogClick(blog.slug)
                      }}
                    >
                      <FiFile className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
                      <div className="font-medium truncate max-w-[180px]">
                        {formatSlug(blog.slug)}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
