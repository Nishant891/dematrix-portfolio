"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy } from "lucide-react";
import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/mobile-sidebar";
import WritingSidebar from "@/components/writing-sidebar";
import ArticleContent from "@/components/article-content";
import MobileSecondSidebar from "@/components/mobile-second-sidebar";
import ExperienceTimeline from "@/components/experience-timeline";
import GithubContributions from "@/components/github-contributions";

export default function Home() {
  const [activePage, setActivePage] = useState("home");
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<
    "main" | "secondary" | "content"
  >("main");
  const [articleContent, setArticleContent] = useState<string>(
    `<div class="text-gray-500 italic text-center mt-10">
       No content available. Start writing your article...
     </div>`
  );

  // Reset secondary content when primary navigation changes
  const handleSetActivePage = (page: string) => {
    setActivePage(page);
    if (page !== "writing") setActiveArticle(null);

    // For mobile: when selecting Writing, go to secondary view
    if (page === "writing") {
      setMobileView("secondary");
    } else {
      setMobileView("main");
    }
  };

  // Handle article selection
  const handleSetActiveArticle = (slug: string) => {
    setActiveArticle(slug);
    setMobileView("content"); // For mobile: when selecting an article, go to content view
  };

  // Handle back button in mobile view
  const handleMobileBack = () => {
    if (mobileView === "content") {
      setMobileView("secondary");
      // Don't reset the active article here so we can return to it if needed
    } else if (mobileView === "secondary") {
      setMobileView("main");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("nishantsharma.hello@gmail.com");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };

  return (
    <div className="flex min-h-dvh min-w-0 overflow-x-clip bg-gray-50 lowercase">
      {/* Desktop Sidebar */}
      <Sidebar activePage={activePage} setActivePage={handleSetActivePage} />

      {/* Mobile Sidebar */}
      <MobileSidebar
        activePage={activePage}
        setActivePage={handleSetActivePage}
      />

      {/* Desktop Second Sidebar for Writing */}
      {activePage === "writing" && (
        <div className="hidden md:block">
          <WritingSidebar
            activeArticle={activeArticle}
            setActiveArticle={handleSetActiveArticle}
            setArticleContent={setArticleContent}
          />
        </div>
      )}

      {/* Mobile Second Sidebar */}
      <MobileSecondSidebar
        activePage={activePage}
        activeArticle={activeArticle}
        setActiveArticle={handleSetActiveArticle}
        setArticleContent={setArticleContent}
        isVisible={mobileView === "secondary"}
        onBack={handleMobileBack}
      />

      {/* Main Content */}
      <main
        className={`min-w-0 flex-1 p-6 pt-20 md:p-8 md:pt-8 ${
          // For desktop: position content correctly based on active sidebars
          activePage === "writing" ? "md:ml-[36px]" : ""
        }`}
      >
        {/* Mobile Back Button for Content View */}
        {mobileView === "content" && (
          <button
            onClick={handleMobileBack}
            className="md:hidden flex items-center text-sm mb-4 text-gray-600"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to articles
          </button>
        )}

        {/* Home content */}
        {(activePage === "home" ||
          (activePage === "home" && mobileView === "main")) && (
          <div className="mx-auto max-w-4xl space-y-10">
            <section className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src="/nishant-profile.jpg"
                    alt="nishant sharma"
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <h1 className="text-2xl font-semibold sm:text-3xl">hi there, i am nishant</h1>
                </div>
                <span className="availability-badge ml-auto inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-md">
                  <span className="availability-dot block h-2 w-2 shrink-0 rounded-full bg-black" aria-hidden="true" />
                  open to work
                </span>
              </div>

              <ul className="ml-8 list-disc space-y-2 pl-5 text-lg text-gray-700 marker:text-gray-400">
                <li>
                  i build and maintain large-scale systems and the tools that
                  keep them healthy.
                </li>
                <li>
                  find my work on{" "}
                  <Link
                    href="https://github.com/Nishant891"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    github
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://www.producthunt.com/@dematrix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    producthunt
                  </Link>
                </li>
                <li>
                  i learn and write at{" "}
                  <Link
                    href="https://leetcode.com/u/nishant892/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    leetcode
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://medium.com/@nishant19072003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    medium
                  </Link>
                </li>
              </ul>
              <nav className="!mt-4 ml-[38px] flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-gray-500" aria-label="contact links">
                <Link
                  href="https://www.linkedin.com/in/nishant-sharma-771653245/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900"
                >
                  linkedin
                </Link>
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="text-gray-400">·</span>
                  <Link
                    href="https://x.com/Nishant48945102"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900"
                  >
                    x
                  </Link>
                </span>
                <span className="inline-flex min-w-0 max-w-full items-center gap-2">
                  <span aria-hidden="true" className="text-gray-400">·</span>
                  <span className="inline-flex min-w-0 items-center gap-1">
                    <Link
                      href="mailto:nishantsharma.hello@gmail.com"
                      className="min-w-0 break-all hover:text-gray-900 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900"
                    >
                      nishantsharma.hello@gmail.com
                    </Link>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={emailCopied ? "email copied" : "copy email address"}
                      title={emailCopied ? "copied" : "copy email address"}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-200 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900"
                    >
                      {emailCopied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    </button>
                    <span className="sr-only" role="status">{emailCopied ? "email copied to clipboard" : ""}</span>
                  </span>
                </span>
              </nav>
            </section>

            <section className="space-y-5">
              <h2 className="text-base text-gray-500">work</h2>
              <ExperienceTimeline />
            </section>

            <GithubContributions />
          </div>
        )}

        {/* Writing content - desktop empty state */}
        {activePage === "writing" &&
          !activeArticle &&
          mobileView !== "content" && (
            <div className="max-w-2xl mx-auto  md:block">
              <h1 className="text-2xl font-semibold mb-6">Writing</h1>
              <p className="text-gray-700 text-sm mb-4">
                Select an article from the sidebar to read it.
              </p>
            </div>
          )}

        {/* Article content */}
        {((activePage === "writing" && activeArticle) ||
          (activePage === "writing" &&
            mobileView === "content" &&
            activeArticle)) && (
          <div className="normal-case">
            {articleContent ? (
              <ArticleContent articleContent={articleContent} />
            ) : (
              <div className="text-gray-500 text-center p-4">
                📄 The article is currently empty. Start writing to see the
                content here.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
