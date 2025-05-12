import { Calendar } from "lucide-react"

// Sample article data
const articles = {
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
      
      <h2>Getting Started</h2>
      <p>Begin by auditing your existing UI elements. Identify patterns, inconsistencies, and opportunities for standardization. This inventory will form the foundation of your design system.</p>
      
      <p>Next, establish your design tokens - the variables that store visual design attributes like colors, typography, spacing, etc. These tokens will be the building blocks of your system.</p>
      
      <h2>Building Components</h2>
      <p>Start with the most basic, frequently used components like buttons, inputs, and cards. Document their usage guidelines, variants, and states. Ensure each component is accessible and responsive.</p>
      
      <h2>Maintenance and Evolution</h2>
      <p>A design system is never truly "finished." It should evolve alongside your products and user needs. Establish a governance process to manage changes, additions, and deprecations.</p>
    `,
  },
  "react-server-components": {
    title: "The Future of React Server Components",
    date: "April 22, 2023",
    content: `
      <p>React Server Components represent a paradigm shift in how we build React applications, enabling developers to render components on the server while maintaining React's component model and interactivity.</p>
      
      <h2>What Are Server Components?</h2>
      <p>Server Components allow developers to render React components entirely on the server. Unlike traditional server-side rendering (SSR), Server Components never hydrate on the client, reducing JavaScript bundle size and improving performance.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>Zero client-side JavaScript for server components</li>
        <li>Direct access to backend resources</li>
        <li>Automatic code splitting</li>
        <li>Improved performance for data-heavy applications</li>
        <li>Seamless integration with client components</li>
      </ul>
      
      <h2>Use Cases</h2>
      <p>Server Components excel in scenarios where components need to access backend resources directly or render large amounts of data without sending that data to the client.</p>
      
      <h2>Implementation in Next.js</h2>
      <p>Next.js has embraced Server Components in its App Router, making them the default rendering strategy. This integration provides a seamless developer experience while leveraging the performance benefits of Server Components.</p>
      
      <h2>The Future</h2>
      <p>As the React ecosystem continues to evolve around Server Components, we can expect more libraries and tools to optimize for this pattern, further improving the developer experience and application performance.</p>
    `,
  },
  "nextjs-performance": {
    title: "Optimizing Performance in Next.js Applications",
    date: "March 10, 2023",
    content: `
      <p>Performance optimization is crucial for providing a great user experience. Next.js offers several built-in features and best practices to help developers build fast, responsive applications.</p>
      
      <h2>Image Optimization</h2>
      <p>The Next.js Image component automatically optimizes images, serving them in modern formats like WebP and AVIF, resizing them to the appropriate dimensions, and lazy loading them by default.</p>
      
      <h2>Code Splitting</h2>
      <p>Next.js automatically splits your JavaScript bundles to ensure users only download the code they need for the current page. This reduces initial load times and improves performance.</p>
      
      <h2>Static Generation</h2>
      <p>Whenever possible, use static generation to pre-render pages at build time. This eliminates server rendering time and allows pages to be cached by CDNs for optimal performance.</p>
      
      <h2>Incremental Static Regeneration</h2>
      <p>For data that changes frequently, use Incremental Static Regeneration (ISR) to update static pages without rebuilding the entire site. This provides the performance benefits of static generation with the freshness of server-side rendering.</p>
      
      <h2>Font Optimization</h2>
      <p>Next.js automatically optimizes fonts, reducing layout shift and improving Core Web Vitals. Use the next/font module to easily implement font optimization in your application.</p>
      
      <h2>Monitoring and Analysis</h2>
      <p>Regularly monitor your application's performance using tools like Lighthouse, WebPageTest, and Next.js Analytics. Identify bottlenecks and areas for improvement to continuously enhance user experience.</p>
    `,
  },
  "accessible-web-apps": {
    title: "Creating Accessible Web Applications",
    date: "February 5, 2023",
    content: `
      <p>Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites and applications. Building accessible applications is not just a legal requirement in many jurisdictions but also a moral imperative.</p>
      
      <h2>Semantic HTML</h2>
      <p>Use semantic HTML elements like &lt;nav&gt;, &lt;main&gt;, &lt;section&gt;, and &lt;article&gt; to provide structure and meaning to your content. Screen readers and other assistive technologies rely on these semantics to help users navigate your application.</p>
      
      <h2>Keyboard Navigation</h2>
      <p>Ensure all interactive elements are accessible via keyboard. Users should be able to navigate your application using only the keyboard, with visible focus indicators to show which element is currently selected.</p>
      
      <h2>ARIA Attributes</h2>
      <p>When HTML semantics aren't sufficient, use ARIA (Accessible Rich Internet Applications) attributes to provide additional information to assistive technologies. However, remember that proper HTML semantics should be your first choice whenever possible.</p>
      
      <h2>Color Contrast</h2>
      <p>Maintain sufficient color contrast between text and background to ensure readability for users with low vision or color blindness. The WCAG guidelines recommend a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.</p>
      
      <h2>Testing</h2>
      <p>Regularly test your application with accessibility tools like axe, WAVE, or Lighthouse. Additionally, test with actual assistive technologies like screen readers to ensure a good user experience for all users.</p>
    `,
  },
  "product-design": {
    title: "The Art of Product Design",
    date: "January 18, 2023",
    content: `
      <p>Product design is a multidisciplinary approach that combines user experience (UX), user interface (UI), and business strategy to create products that solve real user problems while achieving business goals.</p>
      
      <h2>User-Centered Design</h2>
      <p>At the core of effective product design is a deep understanding of user needs, behaviors, and pain points. User research, personas, and journey mapping are essential tools for gaining this understanding and informing design decisions.</p>
      
      <h2>Design Thinking</h2>
      <p>The design thinking process—empathize, define, ideate, prototype, test—provides a framework for approaching complex problems and developing innovative solutions that meet user needs.</p>
      
      <h2>Visual Design Principles</h2>
      <p>Strong visual design enhances usability and creates emotional connections with users. Key principles include hierarchy, contrast, balance, alignment, and consistency. These principles guide the creation of interfaces that are both beautiful and functional.</p>
      
      <h2>Prototyping and Iteration</h2>
      <p>Prototyping allows designers to test ideas quickly and gather feedback before investing in full development. Iteration based on user feedback is crucial for refining designs and ensuring they meet user needs effectively.</p>
      
      <h2>Collaboration</h2>
      <p>Great product design emerges from collaboration between designers, developers, product managers, and other stakeholders. Cross-functional teams with diverse perspectives can identify opportunities and challenges that might be missed by individuals working in isolation.</p>
    `,
  },
}

export default function ArticleContent({ articleContent }: { articleContent: string }) {

  if (!articleContent) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Article not found</h1>
        <p>The article you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <article className="w-full p-4 mx-auto max-w-5xl">
    <div className="overflow-y-auto h-full">
      <div
        className="markdown-content lg:ml-12 lg:mr-12 p-4"
        dangerouslySetInnerHTML={{ __html: articleContent }}
      />
    </div>
  </article>
  
  )
}
