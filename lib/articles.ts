import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { z } from "zod";

const frontmatterSchema = z.object({
  title: z.string().trim().optional(),
  date: z.union([z.string(), z.date()]).optional(),
});

export type ArticleSummary = {
  slug: string;
  title: string;
  category: string;
  readingMinutes: number;
  publishedAt: string | null;
};

type Article = ArticleSummary & { markdown: string };
type ArticleFile = { slug: string; category: string; filePath: string };

function getArticleFiles(): ArticleFile[] {
  const root = path.join(process.cwd(), "content");
  const files = fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((directory) =>
      fs.readdirSync(path.join(root, directory.name), { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => ({
          slug: entry.name.slice(0, -3).toLowerCase()
            .replace(/['’]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
          category: directory.name,
          filePath: path.join(root, directory.name, entry.name),
        }))
    );
  const slugs = new Set<string>();
  for (const file of files) {
    if (slugs.has(file.slug)) throw new Error("Duplicate article slug: " + file.slug);
    slugs.add(file.slug);
  }
  return files;
}

function readArticle(file: ArticleFile): Article {
  const { data, content } = matter(fs.readFileSync(file.filePath, "utf8"));
  const metadata = frontmatterSchema.parse(data);
  const heading = content.match(/^#\s+(.+?)\s*#*\s*$/m)?.[1];
  const title = metadata.title || heading || file.slug.replace(/_/g, " ");
  const date = metadata.date ? new Date(metadata.date) : null;
  return {
    slug: file.slug,
    category: file.category,
    title,
    publishedAt: date && !Number.isNaN(date.getTime()) ? date.toISOString() : null,
    readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220)),
    markdown: content,
  };
}

export function getArticles(): ArticleSummary[] {
  return getArticleFiles().map((file) => {
    const { markdown, ...summary } = readArticle(file);
    return summary;
  });
}

export function getArticle(slug: string): Article | undefined {
  const file = getArticleFiles().find((entry) => entry.slug === slug);
  return file ? readArticle(file) : undefined;
}

export function renderArticle(markdown: string): string {
  const processor = unified().use(remarkParse).use(remarkHtml, { sanitize: false });
  const tree = processor.parse(markdown);
  const first = tree.children[0];
  if (first?.type === "heading" && first.depth === 1) tree.children.shift();
  return processor.stringify(tree);
}
