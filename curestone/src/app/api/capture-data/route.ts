import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (GOOGLE_SHEET_WEBHOOK_URL) {
      const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to forward data to sheet webhook.");
      }
    } else {
      console.warn("No GOOGLE_SHEET_WEBHOOK_URL defined. Data not sent to sheets:", data);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Capture Data Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
