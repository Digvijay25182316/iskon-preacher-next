"use client";
import { useMyContext } from "@/context/Store";
import React from "react";

function CounselerHomeScreen() {
  const { state, dispatch } = useMyContext();
  return (
    <div
      className={
        state.theme.theme === "light"
          ? "bg-white text-gray-800 min-h-screen"
          : "bg-stone-950 text-white min-h-screen"
      }
    >
      CounselerHomeScreen
    </div>
  );
}

export default CounselerHomeScreen;
