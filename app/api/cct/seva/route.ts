import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch(
      "http://counsellor-portal-env.eba-mbtr2c2r.ap-south-1.elasticbeanstalk.com/counsellor-portal/counsellor/?page=0&size=100&sort=id"
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ content: responseData }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const header = new Headers();
  header.append("Content-Type", "application/json");
  const body = await req.json();
  try {
    const response = await fetch(
      "http://counsellor-portal-env.eba-mbtr2c2r.ap-south-1.elasticbeanstalk.com/counsellor-portal/counsellor-morning-program/record",
      { method: "POST", headers: header, body: JSON.stringify(body) }
    );
    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(
        { message: responseData.message },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || errorData.title },
        { status: response.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
