import { createHash, encryptSessionToken } from "@/lib/CryptoHelpFunctions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json(
    { message: "successfully logged in" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest, res: NextResponse) {}
