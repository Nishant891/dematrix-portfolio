import { NextResponse } from "next/server";
import { getBlogContent, getBlogMetadata } from "@/app/function"; // Import your function
import { serialize } from "v8";

export async function GET(request: NextResponse) {
  try {
    const {searchParams} = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
        return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 });
    }
    const { data, content } = await getBlogContent(slug);

    // Return the full structure, not just content
    return NextResponse.json({ data, content });
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }
}