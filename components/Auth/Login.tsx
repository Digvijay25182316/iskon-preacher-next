"use client";
import React, { useEffect, useState } from "react";
import PasswordToggle from "./PasswordContainer";
import Link from "next/link";
import { authenticate } from "@/app/action";
import { useFormState } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

function Login() {
  const [isEmail, setIsEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    router.push("/cct/sevacct?query=");
  }, [router]);
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={authenticate} className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-5">
        <label htmlFor="EMAIL" className="font-semibold text-xl">
          Email address
        </label>
        <input
          type="email"
          className="px-4 py-3.5 border border-gray-300 rounded-2xl text-lg bg-gray-200 transition-all duration-300 focus:ring-4 focus:ring-blue-100 outline-none focus:border-blue-500"
          name="email"
          id="EMAIL"
          placeholder="johndoe@example.com"
          autoComplete="current-email"
          onChange={(e) => setIsEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-5">
        <PasswordToggle />
      </div>
      <Link href={"/counseler/analytics"}>
        <button
          className={`w-full text-center transition-all duration-500 ${
            isEmail !== "" ? "bg-black" : "bg-gray-100"
          } py-3 rounded-2xl text-white `}
          disabled={isEmail === ""}
          type="submit"
        >
          SUBMIT
        </button>
      </Link>
    </form>
  );
}

export default Login;
