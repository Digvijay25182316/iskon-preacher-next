"use client";
import React, { useCallback, useEffect, useState } from "react";

import { GoCheckCircleFill } from "react-icons/go";
import { HiXMark } from "react-icons/hi2";
import { TbCircleXFilled } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import { useMyContext } from "@/context/Store";

function ToastComponent() {
  const { state, dispatch } = useMyContext();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (state.toast.toast.isVisible) {
      setIsVisible(true);
    }
  }, [state.toast.toast.isVisible]);

  useEffect(() => {
    if (state.toast.toast.isVisible) {
      setTimeout(() => {
        dispatch({ type: "HIDE_toast" });
        setIsVisible(false);
      }, 4000);
    }
  }, [state.toast.toast.isVisible, dispatch]);

  if (isVisible) {
    return (
      <div className="fixed z-[10000] top-5 right-5">
        <div
          className={`shadow-xl backdrop-blur-3xl text-lg rounded-3xl ${
            state.theme.theme === "light"
              ? "text-black border border-stone-300"
              : "text-white border border-gray-800"
          }`}
        >
          {state.toast.toast.type === "LOADING" ? (
            <div className="flex items-center gap-2 px-3 py-4 bg-blue-700 bg-opacity-30 rounded-3xl">
              <FaCircle />
              {state.toast.toast.message}
            </div>
          ) : state.toast.toast.type === "SUCCESS" ? (
            <div className="flex items-center gap-2 px-3 py-4 bg-green-600 bg-opacity-30 rounded-3xl">
              <div className="flex items-center gap-2">
                <GoCheckCircleFill className="text-3xl text-green-600" />
                {state.toast.toast.message}
              </div>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 px-3 py-4 bg-red-600 bg-opacity-30 rounded-3xl`}
            >
              <TbCircleXFilled className="text-3xl text-red-600" />
              {state.toast.toast.message}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ToastComponent;
