import { NextResponse } from "next/server";
import { getArticles } from "@/lib/articles";

export async function GET() {
  const groups = new Map<string, ReturnType<typeof getArticles>>();
  for (const article of getArticles()) {
    const group = groups.get(article.category) ?? [];
    group.push(article);
    groups.set(article.category, group);
  }
  return NextResponse.json([...groups.values()].map((group) =>
    group.map((article) => ({ ...article, type: article.category }))
  ));
}
