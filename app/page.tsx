"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Twitter, Github, Youtube, ArrowLeft, Linkedin } from "lucide-react"
import Sidebar from "@/components/sidebar"
import MobileSidebar from "@/components/mobile-sidebar"
import WritingSidebar from "@/components/writing-sidebar"
import StackSidebar from "@/components/stack-sidebar"
import ArticleContent from "@/components/article-content"
import MobileSecondSidebar from "@/components/mobile-second-sidebar"
import Terminal from "@/components/terminal"
import { MailIcon } from "lucide-react"

export default function Home() {
  const [activePage, setActivePage] = useState("home")
  const [activeArticle, setActiveArticle] = useState<string | null>(null)
  const [activeStack, setActiveStack] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState<"main" | "secondary" | "content">("main")
  const [articleContent, setArticleContent] = useState<string>(
    `<div class="text-gray-500 italic text-center mt-10">
       No content available. Start writing your article...
     </div>`
  );

  // Reset secondary content when primary navigation changes
  const handleSetActivePage = (page: string) => {
    setActivePage(page)
    if (page !== "writing") setActiveArticle(null)
    if (page !== "stack") setActiveStack(null)

    // For mobile: when selecting Writing or Stack, go to secondary view
    if (page === "writing" || page === "stack") {
      setMobileView("secondary")
    } else {
      setMobileView("main")
    }
  }

  // Handle article selection
  const handleSetActiveArticle = (slug: string) => {
    setActiveArticle(slug)
    setMobileView("content") // For mobile: when selecting an article, go to content view
  }

  // Handle stack selection
  const handleSetActiveStack = (slug: string) => {
    setActiveStack(slug)
    setMobileView("content") // For mobile: when selecting a stack item, go to content view
  }

  // Handle back button in mobile view
  const handleMobileBack = () => {
    if (mobileView === "content") {
      setMobileView("secondary")
      // Don't reset the active article/stack here so we can return to it if needed
    } else if (mobileView === "secondary") {
      setMobileView("main")
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <Sidebar activePage={activePage} setActivePage={handleSetActivePage} />

      {/* Mobile Sidebar */}
      <MobileSidebar activePage={activePage} setActivePage={handleSetActivePage} />

      {/* Desktop Second Sidebar for Writing */}
      {activePage === "writing" && (
        <div className="hidden md:block">
          <WritingSidebar activeArticle={activeArticle} setActiveArticle={handleSetActiveArticle} setArticleContent={setArticleContent} />
        </div>
      )}

      {/* Desktop Second Sidebar for Stack */}
      {activePage === "stack" && (
        <div className="hidden md:block">
          <StackSidebar activeStack={activeStack} setActiveStack={handleSetActiveStack} />
        </div>
      )}

      {/* Mobile Second Sidebar */}
      <MobileSecondSidebar
        activePage={activePage}
        activeArticle={activeArticle}
        activeStack={activeStack}
        setActiveArticle={handleSetActiveArticle}
        setActiveStack={handleSetActiveStack}
        setArticleContent={setArticleContent}
        isVisible={mobileView === "secondary"}
        onBack={handleMobileBack}
      />

      {/* Main Content */}
      <main
        className={`flex-1 p-6 md:p-8 ${
          // For desktop: position content correctly based on active sidebars
          activePage === "writing" || activePage === "stack"
            ? "md:ml-[36px]" // Width of both sidebars combined (52px + 64px)
            : "md:ml-20px" // Width of main sidebar only
          }`}
      >
        {/* Mobile Back Button for Content View */}
        {mobileView === "content" && (
          <button onClick={handleMobileBack} className="md:hidden flex items-center text-sm mb-4 text-gray-600">
            <ArrowLeft size={16} className="mr-1" />
            Back to {activePage === "writing" ? "articles" : "stack"}
          </button>
        )}

        {/* Home content */}
        {(activePage === "home" || (activePage === "home" && mobileView === "main")) && (
          <div className="max-w-2xl mx-auto space-y-8">
            <section className="space-y-4">
              <h1 className="text-2xl font-semibold">
                Hey, I'm Nishant. I'm a {" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  software engineer
                </Link>
                {" "}
                and a{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  writer
                </Link>
                .
              </h1>

              <p className="text-gray-700">
                I am an engineer. I build {<Link href="#" className="text-red-600 hover:underline">
                  products
                </Link>}, solve {<Link href="#" className="text-green-600 hover:underline">
                  problems
                </Link>} and think <Link href="#" className="text-blue-600 hover:underline">
                  creative
                </Link>.
              </p>
            </section>
            <section className="text-sm space-y-4">
              <Terminal />
            </section>

            <section className="space-y-4">
              <div className="text-gray-500 text-sm">Work</div>

              <div className="grid gap-2">
                <div className="flex flex-wrap items-center justify-between py-2 gap-2">
                  <Link
                    href="https://www.linkedin.com/company/nutanix/posts/?feedView=all"
                    className="flex items-center gap-2 hover:text-blue-600"
                  >
                    <img src="/nutanix.png" alt="Nutanix" className="w-6 h-6" />
                    <span>Nutanix</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/posts/nishant-sharma-771653245_cryptoformars-activity-7277700315490000896-aHYD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADzJRYUBSjOtk00cJH1rfFOc_T83M736tuI"
                    className="text-gray-500 text-sm hover:text-blue-600 flex flex-wrap items-center gap-1"
                  >
                    <span>System Reliability Engineer, Intern</span>
                    <span className="text-gray-400">(Jan 2025 - June 2025)</span>
                  </Link>
                </div>


                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold mb-2">Internship Experience:</h3>
                  <p className="text-sm text-gray-600">
                    Interned at Nutanix, gaining hands-on experience with cloud infrastructure, virtualization, and networking. Managed VMs and clusters on <span className="font-semibold">ESXi</span> and Nutanix, migrated legacy <span className="font-semibold">JavaScript</span> pages to <span className="font-semibold">React</span>, enhanced API communication, and wrote <span className="font-semibold">Docker</span> scripts for containerized deployments.
                  </p>

                  <h3 className="text-sm font-semibold mt-3 mb-2">Key Contributions:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Engineered a Linux From Scratch (<span className="font-semibold">LFS</span>) system with custom kernel modules, bootloaders, and system initialization, gaining deep expertise in OS internals and low-level system configurations.</li>
                    <li>Achieved <span className="font-semibold">CCNA</span> certification with hands-on implementation of network topologies, VLAN segmentation, OSPF routing protocols, and SDN architectures.</li>
                    <li>Architected and deployed 50+ KVM-based virtual machines across Nutanix AHV clusters, implementing high-availability configurations with 99.9% uptime and automated failover logic</li>
                    <li>Refactored 15+ legacy JavaScript components into modern React architecture, reducing technical debt by 30% and implementing component-based design patterns</li>
                    <li>Explored virtualization technologies such as VMware <span className="font-semibold">ESXi</span>, deploying and managing virtual machines efficiently.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="text-gray-500 text-sm">Online</div>

              <div className="grid gap-2">

                <div className="flex items-center justify-between py-2">
                  <Link href="mailto:nishant19072003@gmail.com" className="flex items-center gap-2 hover:text-blue-600">
                    <MailIcon size={22} />
                    <span>Mail</span>
                  </Link>
                  <Link href="mailto:nishant19072003@gmail.com" className="text-gray-500 text-sm hover:text-blue-600">
                    Send Email
                  </Link>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Link href="https://www.linkedin.com/in/nishant-sharma-771653245/" className="flex items-center gap-2 hover:text-blue-600">
                    <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                    <span>LinkedIn</span>
                  </Link>
                  <Link href="https://www.linkedin.com/in/nishant-sharma-771653245/" className="text-gray-500 text-sm hover:text-blue-600">
                    Connect
                  </Link>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Link href="https://x.com/Nishant48945102" className="flex items-center gap-2 hover:text-blue-600">
                    <img src="/x.png" alt="X.com" className="w-6 h-6" />
                    <span>X.com</span>
                  </Link>
                  <Link href="https://x.com/Nishant48945102" className="text-gray-500 text-sm hover:text-blue-600">
                    Follow
                  </Link>
                </div>
              </div>
            </section>
            
          </div>
        )}

        {/* Writing content - desktop empty state */}
        {activePage === "writing" && !activeArticle && mobileView !== "content" && (
          <div className="max-w-2xl mx-auto  md:block">
            <h1 className="text-2xl font-semibold mb-6">Writing</h1>
            <p className="text-gray-700 text-sm mb-4">Select an article from the sidebar to read it.</p>
          </div>
        )}

        {/* Article content */}
        {((activePage === "writing" && activeArticle) ||
          (activePage === "writing" && mobileView === "content" && activeArticle)) && (
            <div>
              {articleContent ? (
                <ArticleContent articleContent={articleContent} />
              ) : (
                <div className="text-gray-500 text-center p-4">
                  📄 The article is currently empty. Start writing to see the content here.
                </div>
              )}
            </div>
          )}

        {/* Stack content - desktop empty state */}
        {activePage === "stack" && !activeStack && mobileView !== "content" && (
          <div className="max-w-2xl mx-auto space-y-8">
            <section className="space-y-4">
              <h1 className="text-2xl font-semibold">Tech Stack & Journey</h1>

              <p className="text-gray-700 text-sm">
                My programming journey began <span className="font-semibold">six years ago</span> during high school, where I first experimented with <span className="font-semibold">Python</span>, building small projects to understand the core concepts of programming. Eager to broaden my skills, I explored <span className="font-semibold">SQL</span>, diving into database design and management, which laid a strong foundation for backend operations.
              </p>

              <h2 className="text-sm font-semibold mt-4">🌐 Web Development Mastery:</h2>
              <p className="text-gray-700 text-sm">
                In college, I transitioned to <span className="font-semibold">JavaScript</span> and immersed myself in modern web development. I mastered <span className="font-semibold">React, Next.js, Express, and TailwindCSS</span>, building scalable web applications. My projects focused on <span className="font-semibold">performance optimization</span>, <span className="font-semibold">accessibility</span>, and <span className="font-semibold">responsive design</span>, consistently exceeding client expectations in freelance projects.
              </p>

              <h2 className="text-sm font-semibold mt-4">🏆 Competitive Programming & Hackathons:</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Participated in numerous hackathons, winning several for innovative solutions and optimized code.</li>
                <li>Solved <span className="font-semibold">300+ problems</span> on LeetCode, mastering <span className="font-semibold">Data Structures and Algorithms</span>.</li>
                <li>Acquired deep algorithmic thinking through C++, with expertise in <span className="font-semibold">Trees</span>, <span className="font-semibold">Backtracking</span> and <span className="font-semibold">Graph Theory</span>.</li>
                <li>Developed the <span className="font-semibold">Game of Life</span> in C++, optimized it with <span className="font-semibold">WebAssembly</span>, and hosted it online for interactive play.</li>
              </ul>

              <h2 className="text-sm font-semibold mt-4">☁️ Cloud Computing & DevOps Exposure:</h2>
              <p className="text-gray-700 text-sm">
                During my internship at <span className="font-semibold">Nutanix</span>, I gained hands-on experience with <span className="font-semibold">Cloud Infrastructure</span> and <span className="font-semibold">Virtualization Technologies</span>. I managed <span className="font-semibold">VMs and clusters</span> on <span className="font-semibold">Nutanix and ESXi Datacenters</span>, ensuring <span className="font-semibold">high availability, load balancing</span>, and <span className="font-semibold">fault tolerance</span>. My contributions included:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Engineered a Linux From Scratch (<span className="font-semibold">LFS</span>) system with custom kernel modules, bootloaders, and system initialization, gaining deep expertise in OS internals and low-level system configurations.</li>
                <li>Achieved <span className="font-semibold">CCNA</span> certification with hands-on implementation of network topologies, VLAN segmentation, OSPF routing protocols, and SDN architectures.</li>
                <li>Architected and deployed 50+ KVM-based virtual machines across Nutanix AHV clusters, implementing high-availability configurations with 99.9% uptime and automated failover logic</li>
                <li>Refactored 15+ legacy JavaScript components into modern React architecture, reducing technical debt by 30% and implementing component-based design patterns</li>
                <li>Explored virtualization technologies such as VMware <span className="font-semibold">ESXi</span>, deploying and managing virtual machines efficiently.</li>
              </ul>

              <h2 className="text-sm font-semibold mt-4">🐧 Linux Enthusiast:</h2>
              <p className="text-gray-700 text-sm">
                My love for Linux is unmatched. I am an <span className="font-semibold">Arch Linux</span> user, embracing its simplicity, control, and customizability. From configuring system-level operations to writing shell scripts for automation, Linux remains my go-to environment for development and experimentation. Oh, and yes... <span className="italic">I am an Arch user, by the way.</span> 😎
              </p>

              <h2 className="text-sm font-semibold mt-4">🛠️ Technical Proficiencies:</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li><span className="font-semibold">Languages:</span> TypeScript, Python, C++, SQL</li>
                <li><span className="font-semibold">Frontend:</span> React, Next.js, TailwindCSS</li>
                <li><span className="font-semibold">Backend:</span> Node.js, Express, REST APIs</li>
                <li><span className="font-semibold">DevOps & Cloud:</span> Docker, Git, Nutanix AHV and AOS, VMware ESXi, Linux (Arch)</li>
                <li><span className="font-semibold">Tools & Platforms:</span> WebAssembly, LeetCode, GitHub, VSCode, Postman</li>
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

