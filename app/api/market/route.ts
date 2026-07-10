import { NextResponse } from "next/server";
import { getMarketSnapshot } from "@/lib/market";

// Revalidate at most every 5 minutes to avoid rate limits.
export const revalidate = 300;

export async function GET() {
  const snapshot = await getMarketSnapshot();
  return NextResponse.json(snapshot);
}
