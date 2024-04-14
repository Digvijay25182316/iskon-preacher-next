import dbConnect from "@/config/DB";
import CounselorForMonrning from "@/config/model/CounselorForMonrning";
import { unstable_noStore } from "next/cache";
import React from "react";

interface Counselor {
  _id: string;
  PrabhujiName: string;
  PrabhujiPhone: number;
  MatajiName: string;
  MatajiPhone: number;
  location: string;
  givenAttendance: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

async function getMorningAttendance(): Promise<Counselor[] | any> {
  unstable_noStore();
  await dbConnect();
  try {
    const Counselors = await CounselorForMonrning.find();
    return Counselors;
  } catch (error: any) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[2500]">
        {error.message}
      </div>
    );
  }
}

async function page() {
  const response = await getMorningAttendance();

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="py-10 text-4xl font-bold text-center">
        <p>CBM meeting attendance</p>
        <p className="font-normal text-lg">
          these are the peoples who have attended CBM meeting
        </p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 p-5 gap-5">
        {response.map((item: Counselor, index: number) => (
          <div
            key={index}
            className="w-full bg-gray-50 py-3 rounded-2xl text-black px-5"
          >
            <p>Pr Name : {item.PrabhujiName}</p>
            <p>Pr Phone : {item.PrabhujiPhone}</p>
            <p>Mtg Name : {item.MatajiName}</p>
            <p>Mtg Phone : {item.MatajiPhone}</p>
            {item.location === "OFFLINE" ? (
              <p className="text-green-500 px-2 py-1 bg-green-950">
                Mode Attended : {item.location}
              </p>
            ) : (
              <p className="text-red-500 px-2 py-1 bg-red-950">
                Mode Attended : {item.location}
              </p>
            )}
            <p>Date Attended : {item.createdAt.toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
