"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { FiFile } from "react-icons/fi"
import remarkHtml from "remark-html"
import remarkParse from "remark-parse"
import { unified } from "unified"

// Sample articles for demo purposes since the API might not be available
const sampleArticles = [
  { 
    slug: "building-design-system", 
    type: "web-development",
    description: "Learn how to build a comprehensive design system from scratch for consistent UI development."
  },
  { 
    slug: "react-server-components", 
    type: "web-development",
    description: "Explore the future of React with server components and their performance benefits."
  },
  { 
    slug: "nextjs-performance", 
    type: "web-development",
    description: "Techniques and strategies to optimize performance in your Next.js applications."
  },
  { 
    slug: "accessible-web-apps", 
    type: "user-experience",
    description: "Best practices for building fully accessible web applications for all users."
  },
  { 
    slug: "product-design", 
    type: "user-experience",
    description: "An overview of effective product design principles and methodologies."
  },
]

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
  description?: string
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
  const [articles, setArticles] = useState<BlogItem[]>([])
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
          setArticles(blogs.flat())
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

  const formatSlug = (slug: string) => {
    return slug
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (loading) return <div className="p-5 text-sm text-gray-500">Loading articles :)</div>
  if (error) return <div className="p-5 text-sm text-red-500">Failed to load articles</div>

  return (
    <aside className="w-64 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto bg-white">
      <div className="p-5">
        <h2 className="text-sm font-medium mb-4">All Articles</h2>

        <div className="space-y-3">
          {articles.map((blog: BlogItem) => (
            <div key={blog.slug} className="group">
              <Link
                href="#"
                className={`flex items-center text-sm px-2 py-1.5 rounded-md ${
                  activeArticle === blog.slug 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-700 hover:bg-gray-50"
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
              
              
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}