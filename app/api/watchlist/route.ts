import { NextRequest, NextResponse } from "next/server";
import { getWatchlist, addWatch } from "@/lib/watchlist";

export async function GET() {
  return NextResponse.json(await getWatchlist());
}

// Add a ticker to the watchlist. Protected by WATCHLIST_KEY env var.
export async function POST(request: NextRequest) {
  const key = request.headers.get("x-watchlist-key") || "";
  if (key !== process.env.WATCHLIST_KEY) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const { symbol, name } = (await request.json()) as {
      symbol?: string;
      name?: string;
    };
    if (!symbol) {
      return NextResponse.json(
        { ok: false, error: "missing symbol" },
        { status: 400 }
      );
    }
    const list = await addWatch(symbol, name);
    return NextResponse.json({ ok: true, list });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
