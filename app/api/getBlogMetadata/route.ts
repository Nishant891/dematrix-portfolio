import { NextResponse } from "next/server";
import { getBlogMetadata } from "@/app/function"; // Import your function

export async function GET() {
  try {
    const metadata = await getBlogMetadata();
    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }
}
