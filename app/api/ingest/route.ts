import { NextRequest, NextResponse } from "next/server";
import { saveBrief } from "@/lib/storage";
import type { Brief } from "@/lib/types";

// Accept pushes from the Hermes morning-brief cron.
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Brief;
    if (!body?.date || !body?.title) {
      return NextResponse.json(
        { ok: false, error: "missing date or title" },
        { status: 400 }
      );
    }
    await saveBrief(body);
    return NextResponse.json({ ok: true, date: body.date });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: String(e) },
      { status: 500 }
    );
  }
}
