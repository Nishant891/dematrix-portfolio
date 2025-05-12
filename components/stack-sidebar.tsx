"use client"

// Sample stack data
const stackItems = [
    {
      id: 1,
      title: "React",
      src: "https://skillicons.dev/icons?i=react",
    },
    {
      id: 2,
      title: "Next.js",
      src: "https://skillicons.dev/icons?i=nextjs",
    },
    {
      id: 3,
      title: "Python",
      src: "https://skillicons.dev/icons?i=python",
    },
    {
      id: 4,
      title: "C++",
      src: "https://skillicons.dev/icons?i=cpp",
    },
    {
      id: 5,
      title: "Express",
      src: "https://skillicons.dev/icons?i=express",
    },
    {
      id: 6,
      title: "Arch Linux",
      src: "https://skillicons.dev/icons?i=arch",
    },
    {
      id: 7,
      title: "Docker",
      src: "https://skillicons.dev/icons?i=docker",
    },
    {
      id: 8,
      title: "Git",
      src: "https://skillicons.dev/icons?i=git",
    },
    {
      id: 9,
      title: "SQL",
      src: "https://skillicons.dev/icons?i=mysql",
    },
    {
      id: 10,
      title: "Tailwind CSS",
      src: "https://skillicons.dev/icons?i=tailwind",
    },
    {
      id: 11,
      title: "Vercel",
      src: "https://skillicons.dev/icons?i=vercel",
    },
    {
      id: 12,
      title: "Bash",
      src: "https://skillicons.dev/icons?i=bash",
    },
  ];
  

export default function StackSidebar({
  activeStack,
  setActiveStack,
}: {
  activeStack: string | null
  setActiveStack: (slug: string) => void
}) {
  return (
    <aside className="w-64 border-r border-gray-200 h-screen sticky top-0 hidden md:block overflow-y-auto">
  <div className="p-5">
    <h2 className="text-sm font-medium mb-4 text-center">Tech Stack</h2>
    <div className="space-y-3">
      {stackItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <img src={item.src} alt={item.title} className="w-8 h-8" />
          <span className="flex-1 text-sm font-medium">{item.title}</span>
        </div>
      ))}
    </div>
  </div>
</aside>

  )
}
