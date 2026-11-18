import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { getArticle, getArticles, renderArticle } from "@/lib/articles";
import { profile } from "@/lib/portfolio";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return { title: article ? article.title + " | " + profile.name : "Article not found" };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const html = renderArticle(article.markdown);

  return (
    <div className="article-shell">
      <a className="skip-link" href="#article-body">Skip to article</a>
      <Link className="article-back" href="/#writings">
        <ArrowLeft size={14} aria-hidden="true" />
        <span>Back to writings</span>
      </Link>
      <main id="main-content">
        <article>
          <header className="article-header">
            <h1>{article.title}</h1>
            <p className="article-meta">
              {article.publishedAt && (
                <><time dateTime={article.publishedAt}>
                  {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(article.publishedAt))}
                </time>{" · "}</>
              )}
              {article.readingMinutes} min read
            </p>
          </header>
          <div className="article-body" id="article-body" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>
      <Link className="article-return" href="/#writings"><ArrowLeft size={14} aria-hidden="true" />All writings</Link>
      <SiteFooter />
    </div>
  );
}
