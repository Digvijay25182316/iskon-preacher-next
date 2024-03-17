"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordToggle() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <label htmlFor="PASSWORD" className="font-semibold text-xl">
          Password
        </label>
        <p className="text-gray-400">Forget Password ?</p>
      </div>
      <div
        className={`flex items-center px-1 py-2.5 border rounded-2xl text-lg bg-gray-200 transition-all duration-300 ${
          focused ? "ring-4 ring-blue-100 border-blue-500" : "border-gray-300 "
        }`}
      >
        <input
          type={passwordVisible ? "text" : "password"}
          className="text-lg flex-1 bg-gray-200 outline-none pl-4"
          id="PASSWORD"
          name="password"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="password"
          autoComplete="current-password"
        />
        <span
          className="border border-gray-300 rounded-xl cursor-pointer text-sm px-3 py-2.5"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    </>
  );
}

export default PasswordToggle;
