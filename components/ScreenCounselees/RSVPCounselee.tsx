"use client";
import { useMyContext } from "@/context/Store";
import Image from "next/image";
import React from "react";

import { FiClock } from "react-icons/fi";

const sessions = [
  {
    id: 1,
    scheduledSessionName: "Session 1",
    sessionName: "Introduction to Counseling",
    description: "An introductory session to the field of counseling.",
    createdBy: "John Doe",
    durationInMinutes: 60,
    totalAttendance: 30,
  },
  {
    id: 2,
    scheduledSessionName: "Session 2",
    sessionName: "Cognitive Behavioral Therapy (CBT)",
    description: "Exploring the principles and techniques of CBT.",
    createdBy: "Jane Smith",
    durationInMinutes: 90,
    totalAttendance: 30,
  },
  {
    id: 3,
    scheduledSessionName: "Session 3",
    sessionName: "Group Therapy",
    description: "Understanding the dynamics and benefits of group therapy.",
    createdBy: "Alice Johnson",
    durationInMinutes: 120,
    totalAttendance: 30,
  },
  {
    id: 4,
    scheduledSessionName: "Session 4",
    sessionName: "Art Therapy",
    description:
      "Using artistic methods to explore emotions and improve well-being.",
    createdBy: "Michael Brown",
    durationInMinutes: 75,
    totalAttendance: 30,
  },
  {
    id: 5,
    scheduledSessionName: "Session 5",
    sessionName: "Family Counseling",
    description:
      "Addressing family issues and improving communication within families.",
    createdBy: "Sarah Adams",
    durationInMinutes: 90,
    totalAttendance: 30,
  },
  {
    id: 6,
    scheduledSessionName: "Session 6",
    sessionName: "Mindfulness Meditation",
    description:
      "Practicing mindfulness techniques for stress reduction and relaxation.",
    createdBy: "David Wilson",
    durationInMinutes: 60,
    totalAttendance: 30,
  },
];

function RSVPCounselee() {
  const { state } = useMyContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden">
      <h1 className="font-semibold text-red-500 text-xl mb-10">RSVP</h1>

      <div className={`flex items-center justify-center lg:gap-5  w-screen`}>
        <div className="lg:block hidden">
          <Image
            src={require("../assets/sessionsSchedule.png")}
            height={400}
            className="h-[400px]"
            alt="addcounsellee"
          />
        </div>
        <div
          className={`rounded-3xl flex flex-col items-center md:p-5 p-3 ${
            state.theme.theme === "light" ? "bg-white" : "bg-stone-800"
          }`}
        >
          <div className="lg:w-[500px] w-[90vw]">
            <p className="font-semibold">YOUR PHONE NUMBER</p>
            <input
              type="text"
              className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full ${
                state.theme.theme === "light"
                  ? "border-gray-300"
                  : "border-stone-700 bg-stone-900"
              }`}
              placeholder="7878909023"
            />
            <button
              className={`flex items-center w-full justify-center font-semibold border my-5 rounded-xl py-2 ${
                state.theme.theme === "light"
                  ? "border-blue-800 bg-blue-500 text-white"
                  : "border-stone-700 bg-blue-900"
              }`}
            >
              SEARCH NUMBER
            </button>
          </div>
          <div className="lg:w-[500px] w-[90vw]">
            <div className="mb-5">
              <div className="flex items-center gap-3 text-xl font-bold">
                <FiClock />
                <h1 className="">CONFIRM RSVP</h1>
              </div>
              <p className="text-gray-400">
                click yes if you want to confirm your presense for this session
              </p>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <p className="font-semibold"> * UPCOMMING SESSION</p>
              <RSVPComponent session={sessions[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RSVPCounselee;

function RSVPComponent({ session }: any) {
  const { state } = useMyContext();
  return (
    <div
      className={`flex flex-col items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full ${
        state.theme.theme === "light"
          ? "border-gray-300"
          : "border-stone-700 bg-stone-900"
      }`}
    >
      <p className="font-semibold text-lg">{session.sessionName}</p>
      <div className="flex items-center gap-5 text-lg">
        <button
          className={`border ${
            state.theme.theme === "light"
              ? "bg-green-200 border-green-300"
              : "bg-green-800 border-green-600"
          } px-4 py-1 rounded-lg`}
        >
          YES
        </button>
        <button
          className={`border ${
            state.theme.theme === "light"
              ? "bg-red-200 border-red-300"
              : "bg-red-800 border-red-600"
          } px-4 py-1 rounded-lg`}
        >
          NO
        </button>
      </div>
    </div>
  );
}
