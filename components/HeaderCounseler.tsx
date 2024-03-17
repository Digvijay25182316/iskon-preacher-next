"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { usePathname } from "next/navigation";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineQrCodeScanner,
} from "react-icons/md";
import Link from "next/link";
import { useMyContext } from "@/context/Store";

function Header() {
  const { state, dispatch } = useMyContext();
  const pathname = usePathname();
  const [isSelectionOpen, setSelectionOpen] = useState(false);

  const Storetheme = (theme: string) => {
    localStorage.setItem("THEME", theme);
    console.log(theme);
  };

  return (
    <header
      className={
        pathname.startsWith(`/sadhana`) ||
        pathname.startsWith("/register") ||
        pathname.startsWith("/activity") ||
        pathname.startsWith(`/attendance`) ||
        pathname.startsWith(`/rsvp`)
          ? "hidden"
          : "block fixed top-0 left-0 right-0"
      }
    >
      <div
        className={`px-5 flex items-center justify-between border-b ${
          state.theme.theme === "light"
            ? "bg-white text-gray-700 border-gray-200"
            : "bg-stone-950 text-white border-stone-700"
        }`}
      >
        <div className="flex items-center justify-center py-3 lg:hidden">
          <MenuIconAndDropDown
            isSelectionOpen={isSelectionOpen}
            toggleSelection={(value: boolean) => setSelectionOpen(value)}
          />
        </div>
        <nav className="text-lg lg:block hidden">
          <ul className="flex items-center gap-5">
            <Link href={"/counseler/analytics"}>
              <li
                className={`px-4 py-5 text-lg transition-colors duration-500 
                ${
                  pathname === "/counseler/analytics"
                    ? "border-b border-b-purple-700 text-purple-700"
                    : ""
                }
                `}
              >
                Analytics
              </li>
            </Link>
            <Link href={"/counseler/counselees"}>
              <li
                className={`px-4 py-5 text-lg transition-colors duration-500 
                ${
                  pathname === "/counseler/counselees"
                    ? "border-b border-b-purple-700 text-purple-700"
                    : ""
                }
                `}
              >
                Counselees
              </li>
            </Link>
            <Link href={"/counseler/sessions"}>
              <li
                className={`px-4 py-5 text-lg transition-colors duration-500 
                ${
                  pathname === "/counseler/sessions"
                    ? "border-b border-b-purple-700 text-purple-700"
                    : ""
                }
                `}
              >
                Sessions
              </li>
            </Link>
            <Link href={"/counseler/activities"}>
              <li
                className={`px-4 py-5 text-lg transition-colors duration-500 
                ${
                  pathname === "/counseler/activities"
                    ? "border-b border-b-purple-700 text-purple-700"
                    : ""
                }
                `}
              >
                Activities
              </li>
            </Link>
            <Link href={"/counseler/attendance"}>
              <li
                className={`px-4 py-5 text-lg transition-colors duration-500 
                ${
                  pathname === "/counseler/attendance"
                    ? "border-b border-b-purple-700 text-purple-700"
                    : ""
                }
                `}
              >
                Attendance
              </li>
            </Link>
            <Link href={"/counseler/sadhana"}>
              <li
                className={`px-4 py-5 text-lg transition-colors duration-500 
                ${
                  pathname === "/counseler/sadhana" ||
                  pathname === "/counseler/configure"
                    ? "border-b border-b-purple-700 text-purple-700"
                    : ""
                }
                `}
              >
                Sadhana
              </li>
            </Link>
            <Link href={"/counseler/scanner"}>
              <li
                className={`px-4 py-5 text-lg transition-colors duration-500 flex items-center gap-3 
                ${
                  pathname === "/counseler/scanner"
                    ? "border-b border-b-purple-700 text-purple-700"
                    : ""
                }
                `}
              >
                <MdOutlineQrCodeScanner className="text-xl" />
                Sanner
              </li>
            </Link>
          </ul>
        </nav>
        <div className="flex items-center gap-5">
          {state?.theme?.theme === "light" ? (
            <button
              onClick={() => {
                dispatch({ type: "DARK" });
                Storetheme("DARK");
              }}
              className="p-2 border bg-white rounded-xl"
            >
              <IoMdMoon size={24} />
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({ type: "LIGHT" });
                Storetheme("LIGHT");
              }}
              className="p-2 border bg-stone-800 rounded-xl border-stone-700 text-yellow-300"
            >
              <FiSun size={24} />
            </button>
          )}
          <Link href={"/"}>
            <button
              className={`px-5 py-1.5 text-lg rounded-xl border-2 shadow ${
                state.theme.theme === "light"
                  ? "border-gray-600"
                  : "border-stone-600"
              }`}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

function MenuIconAndDropDown({
  isSelectionOpen,
  toggleSelection,
}: {
  isSelectionOpen: boolean;
  toggleSelection: (state: boolean) => void;
}) {
  const pathname = usePathname();
  const { state } = useMyContext();
  const menuRef: any = useRef();

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        toggleSelection(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection]);
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        className={`flex items-center justify-between border px-4 py-2 rounded-xl ${
          state.theme.theme === "light"
            ? "border-gray-200"
            : "border-stone-800 bg-stone-900"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        Menu
        <MdOutlineKeyboardArrowDown size={16} />
      </button>
      {isSelectionOpen && (
        <nav
          className={`origin-top-left absolute left-0 mt-2 w-[320px] md:w-[50vw] rounded-2xl shadow-lg ${
            state.theme.theme === "light"
              ? "bg-white"
              : "bg-stone-900 border border-stone-800"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-5 px-5`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <ul className="flex flex-col gap-3 " role="none">
            <Link href={"/counseler/analytics"}>
              <li
                className={`px-4 py-2 rounded-lg text-lg transition-colors duration-500 ${
                  state.theme.theme === "light"
                    ? pathname === "/counseler/analytics"
                      ? "text-purple-700 bg-purple-200 border border-purple-300"
                      : "bg-gray-50 border"
                    : pathname === "/counseler/analytics"
                    ? "bg-purple-900 text-white border border-purple-700"
                    : "bg-stone-800 border border-stone-700"
                }`}
                onClick={() => toggleSelection(false)}
              >
                Analytics
              </li>
            </Link>
            <Link href={"/counseler/counselees"}>
              <li
                className={`px-4 py-2 rounded-lg text-lg transition-colors duration-500 ${
                  state.theme.theme === "light"
                    ? pathname === "/counseler/counselees"
                      ? "text-purple-700 bg-purple-200 border border-purple-300"
                      : "bg-gray-50 border"
                    : pathname === "/counseler/counselees"
                    ? "bg-purple-900 text-white border border-purple-700"
                    : "bg-stone-800 border border-stone-700"
                }`}
                onClick={() => toggleSelection(false)}
              >
                Counselees
              </li>
            </Link>
            <Link href={"/counseler/sessions"}>
              <li
                className={`px-4 py-2 rounded-lg text-lg transition-colors duration-500 ${
                  state.theme.theme === "light"
                    ? pathname === "/counseler/sessions"
                      ? "text-purple-700 bg-purple-200 border border-purple-300"
                      : "bg-gray-50 border"
                    : pathname === "/counseler/sessions"
                    ? "bg-purple-900 text-white border border-purple-700"
                    : "bg-stone-800 border border-stone-700"
                }`}
                onClick={() => toggleSelection(false)}
              >
                Sessions
              </li>
            </Link>
            <Link href={"/counseler/activities"}>
              <li
                className={`px-4 py-2 rounded-lg text-lg transition-colors duration-500 ${
                  state.theme.theme === "light"
                    ? pathname === "/counseler/activities"
                      ? "text-purple-700 bg-purple-200 border border-purple-300"
                      : "bg-gray-50 border"
                    : pathname === "/counseler/activities"
                    ? "bg-purple-900 text-white border border-purple-700"
                    : "bg-stone-800 border border-stone-700"
                }`}
                onClick={() => toggleSelection(false)}
              >
                Activities
              </li>
            </Link>
            <Link href={"/counseler/attendance"}>
              <li
                className={`px-4 py-2 rounded-lg text-lg transition-colors duration-500 ${
                  state.theme.theme === "light"
                    ? pathname === "/counseler/attendance"
                      ? "text-purple-700 bg-purple-200 border border-purple-300"
                      : "bg-gray-50 border"
                    : pathname === "/counseler/attendance"
                    ? "bg-purple-900 text-white border border-purple-700"
                    : "bg-stone-800 border border-stone-700"
                }`}
                onClick={() => toggleSelection(false)}
              >
                Attendance
              </li>
            </Link>
            <Link href={"/counseler/sadhana"}>
              <li
                className={`px-4 py-2 rounded-lg text-lg transition-colors duration-500 ${
                  state.theme.theme === "light"
                    ? pathname === "/counseler/sadhana" ||
                      pathname === "/counseler/configure"
                      ? "text-purple-700 bg-purple-200 border border-purple-300"
                      : "bg-gray-50 border"
                    : pathname === "/counseler/attendance"
                    ? "bg-purple-900 text-white border border-purple-700"
                    : "bg-stone-800 border border-stone-700"
                }`}
                onClick={() => toggleSelection(false)}
              >
                Attendance
              </li>
            </Link>
            <Link href={"/counseler/scanner"}>
              <li
                className={`px-4 py-2 rounded-lg text-lg transition-colors duration-500 ${
                  state.theme.theme === "light"
                    ? pathname === "/counseler/scanner"
                      ? "text-purple-700 bg-purple-200 border border-purple-300"
                      : "bg-gray-50 border"
                    : pathname === "/counseler/scanner"
                    ? "bg-purple-900 text-white border border-purple-700"
                    : "bg-stone-800 border border-stone-700"
                }`}
                onClick={() => toggleSelection(false)}
              >
                Sanner
              </li>
            </Link>
          </ul>
        </nav>
      )}
    </div>
  );
}
