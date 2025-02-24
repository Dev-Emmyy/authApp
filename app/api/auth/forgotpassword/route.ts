import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }
  // Mock response (no real email logic)
  return NextResponse.json(
    { message: "Reset link sent (mock)" },
    { status: 200 }
  );
}