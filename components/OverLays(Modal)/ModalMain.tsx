"use client";
import React, { useEffect, useRef, useState } from "react";

function ModalMain({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const menuRef: any = useRef();

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={onClose}
        ></div>
        <div
          ref={menuRef}
          className="fixed transform -translate-x-1/2 -translate-y-1/2 z-[1000]"
        >
          {children}
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default ModalMain;
