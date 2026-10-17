"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/mobile-sidebar";
import WritingSidebar from "@/components/writing-sidebar";
import ArticleContent from "@/components/article-content";
import MobileSecondSidebar from "@/components/mobile-second-sidebar";
import ExperienceTimeline from "@/components/experience-timeline";
import GithubContributions from "@/components/github-contributions";
import { MailIcon } from "lucide-react";

export default function Home() {
  const [activePage, setActivePage] = useState("home");
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
          <div className="mx-auto max-w-4xl space-y-8">
            <section className="space-y-4">
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
                <span className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-[0_2px_12px_rgba(15,23,42,0.04)] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_7px_rgba(16,185,129,0.45)]" aria-hidden="true" />
                  open to work
                </span>
              </div>

              <ul className="list-disc space-y-2 pl-5 text-lg text-gray-700 marker:text-gray-400">
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
            </section>

            <section className="space-y-5">
              <h2 className="text-base text-gray-500">work</h2>
              <ExperienceTimeline />
            </section>

            {/*
              Box sizes differ on purpose so the three glyphs read the same
              size: the artwork fills a different share of each source — 83%
              for lucide's envelope, 78% of x.png, only 75% of linkedin.png.
              Equal boxes make linkedin look the smallest, so it gets the
              largest box.
            */}
            <section className="space-y-5">
              <h2 className="text-base text-gray-500">socials</h2>
              <div className="flex items-center justify-start gap-4">
                <Link
                  href="mailto:nishantsharma.hello@gmail.com"
                  aria-label="mail"
                  title="mail"
                  className="text-gray-700 hover:text-blue-600"
                >
                  <MailIcon size={23} />
                </Link>

                <Link
                  href="https://www.linkedin.com/in/nishant-sharma-771653245/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="linkedin"
                  title="linkedin"
                  className="hover:opacity-70"
                >
                  <img
                    src="/linkedin.png"
                    alt="linkedin"
                    className="w-[25px] h-[25px]"
                  />
                </Link>

                <Link
                  href="https://x.com/Nishant48945102"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="x.com"
                  title="x.com"
                  className="hover:opacity-70"
                >
                  <img src="/x.png" alt="x.com" className="w-6 h-6" />
                </Link>
              </div>
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
