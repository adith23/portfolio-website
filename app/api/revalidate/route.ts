import { NextResponse } from "next/server";

import { handleRevalidation } from "@/lib/revalidate";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }

  const body = (await request.json()) as { type?: string; slug?: string };
  handleRevalidation(body);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
