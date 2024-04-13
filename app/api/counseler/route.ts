import dbConnect from "@/config/DB";
import CounselorForMonrning from "@/config/model/CounselorForMonrning";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { prabhujiName, prabhujiPhone, matajiName, matajiPhone, location } =
    await req.json();
  try {
    await dbConnect();
    await CounselorForMonrning.create({
      PrabhujiName: prabhujiName,
      MatajiName: matajiName,
      PrabhujiPhone: prabhujiPhone,
      MatajiPhone: matajiPhone,
      location: location,
      givenAttendance: true,
    });
    return NextResponse.json(
      { message: "Successfully submitted the data " },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
