import { NextResponse } from "next/server";
import { getArticle } from "@/lib/articles";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 });
  const article = getArticle(slug);
  if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
  const { markdown, ...data } = article;
  return NextResponse.json({ data, content: markdown });
}
