"use client"

// Sample stack data
const stackItems = [
  { id: 1, title: "C++", src: "https://skillicons.dev/icons?i=cpp" },
  { id: 2, title: "Arch Linux", src: "https://skillicons.dev/icons?i=arch" },
  { id: 3, title: "WebAssembly", src: "https://skillicons.dev/icons?i=wasm" },
  { id: 4, title: "GCP", src: "https://skillicons.dev/icons?i=gcp" },
  { id: 5, title: "Docker", src: "https://skillicons.dev/icons?i=docker" },
  { id: 6, title: "TypeScript", src: "https://skillicons.dev/icons?i=typescript" },
  { id: 7, title: "Next.js", src: "https://skillicons.dev/icons?i=nextjs" },
  { id: 8, title: "Express", src: "https://skillicons.dev/icons?i=express" },
  { id: 9, title: "Appwrite", src: "https://skillicons.dev/icons?i=appwrite" },
  { id: 10, title: "MongoDB", src: "https://skillicons.dev/icons?i=mongodb" },
  { id: 11, title: "PostgreSQL", src: "https://skillicons.dev/icons?i=postgres" },
  { id: 12, title: "Git", src: "https://skillicons.dev/icons?i=git" },
  { id: 13, title: "Postman", src: "https://skillicons.dev/icons?i=postman" },
  { id: 14, title: "Python", src: "https://skillicons.dev/icons?i=python" },
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
