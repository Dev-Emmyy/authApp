import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../utils/api";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await createUser(email, password);
  return NextResponse.json({ message: "User created", user }, { status: 201 });
}