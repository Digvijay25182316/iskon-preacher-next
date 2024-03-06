"use client";
import { MyContextProvider, useMyContext } from "@/context/Store";
import React, { useEffect } from "react";

function StateComponent({
  children,
  paddingTop,
}: {
  children: React.ReactNode;
  paddingTop: string;
}) {
  return (
    <MyContextProvider>
      <ChildState paddingTop={paddingTop}>{children}</ChildState>
    </MyContextProvider>
  );
}

export default StateComponent;

function ChildState({
  children,
  paddingTop,
}: {
  children: React.ReactNode;
  paddingTop: string;
}) {
  const { state, dispatch } = useMyContext();

  useEffect(() => {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "DARK"
        : "LIGHT";

    const storedTheme = localStorage.getItem("THEME");
    const initialTheme = storedTheme || prefersDarkMode;

    localStorage.setItem("THEME", initialTheme);
    dispatch({ type: initialTheme });
  }, [dispatch]);
  return (
    <div
      className={` ${paddingTop} ${
        state.theme.theme === "light"
          ? "bg-white text-gray-800"
          : "bg-stone-950 text-white"
      }`}
    >
      {children}
    </div>
  );
}
