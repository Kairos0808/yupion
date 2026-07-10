import { NextResponse } from "next/server";

// NOTE: Vercel serverless runtime has a read-only filesystem, so we cannot
// write briefs at request time. Publishing is done by pushing the JSON file
// into /data/briefs/ and committing to the repo (Vercel re-deploys via
// push-to-deploy). This endpoint documents that contract.
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error:
        "Vercel filesystem is read-only. Publish by committing the brief JSON to data/briefs/<date>.json and pushing to the repo.",
    },
    { status: 501 }
  );
}
