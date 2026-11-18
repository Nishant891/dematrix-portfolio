import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { VideoPreview } from "@/components/video-preview";
import { getArticles } from "@/lib/articles";
import { connections, profile, projects, selectedArticleSlugs } from "@/lib/portfolio";

export default function Home() {
  const articlesBySlug = new Map(getArticles().map((article) => [article.slug, article]));
  const articles = selectedArticleSlugs.map((slug) => {
    const article = articlesBySlug.get(slug);
    if (!article) throw new Error("Selected article not found: " + slug);
    return article;
  });

  return (
    <div className="home-shell" id="top">
      <a className="skip-link" href="#writings">Skip to writings</a>
      <div className="home-column">
        <main className="home-main" id="main-content">
          <header className="home-intro">
            <Image className="home-photo" src={profile.photo} alt={profile.name} width={80} height={80} priority />
            <div className="home-intro-copy">
              <h1 className="home-name">{profile.name}</h1>
              <p className="home-role">
                <span>{profile.role}</span>{" · "}<span className="home-location">{profile.location}</span>
              </p>
            </div>
          </header>

          <section aria-labelledby="about-heading">
            <h2 className="section-title" id="about-heading">About</h2>
            <p className="home-body">I build reliable systems, solve problems, and write about what I learn along the way.</p>
            <p className="home-body">
              My work spans Linux, networking, cloud infrastructure, AI applications, and software development.
            </p>
            <p className="home-body">
              Currently keeping systems reliable at{" "}
              <a href="https://www.cohesity.com" target="_blank" rel="noopener noreferrer">Cohesity</a>. Previously at{" "}
              <a href="https://www.nutanix.com" target="_blank" rel="noopener noreferrer">Nutanix</a> and{" "}
              <a href="https://deckit.ai" target="_blank" rel="noopener noreferrer">Deckit.ai</a>.
            </p>
          </section>

          <section id="writings" aria-labelledby="writings-heading">
            <h2 className="section-title" id="writings-heading">Writings</h2>
            <ul className="writing-list">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link className="writing-row" href={"/writing/" + encodeURIComponent(article.slug)}>
                    <span className="writing-title">{article.title}</span>
                    <span className="writing-meta">{article.readingMinutes} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
            <a className="section-more" href="https://medium.com/@nishant19072003" target="_blank" rel="noopener noreferrer">
              Read more on Medium <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </section>

          <section id="projects" aria-labelledby="projects-heading">
            <h2 className="section-title" id="projects-heading">Projects</h2>
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.href}>
                  <a className="project-row" href={project.href} target="_blank" rel="noopener noreferrer">
                    <span className="project-name">{project.name}</span>
                    <span className="project-description">{project.description}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a className="section-more" href="https://github.com/Nishant891" target="_blank" rel="noopener noreferrer">
              View more on GitHub <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </section>

          <section aria-labelledby="building-heading">
            <h2 className="section-title" id="building-heading">Currently building</h2>
            <a className="building-card" href="https://github.com/Nishant891/hyprglass" target="_blank" rel="noopener noreferrer" aria-label="View Hyperglass on GitHub">
              <span className="building-icon" aria-hidden="true">
                <Github size={28} aria-hidden="true" />
              </span>
              <h3>Hyperglass</h3>
              <span className="building-status">In progress</span>
            </a>
            <VideoPreview
              videoId="9mchvfJQieU"
              title="Arch btw :) — Hyprglass, My Hyprland Rice"
              thumbnail="https://i.ytimg.com/vi/9mchvfJQieU/hqdefault.jpg"
            />
          </section>

          <section id="connect" aria-labelledby="connect-heading">
            <h2 className="section-title" id="connect-heading">Connect</h2>
            <ul className="connect-list">
              {connections.map((connection) => (
                <li key={connection.name}><a href={connection.href} target="_blank" rel="noopener noreferrer">{connection.name}</a></li>
              ))}
            </ul>
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
