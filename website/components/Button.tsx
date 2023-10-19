"use client";
import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  isPressed?: boolean;
}

function Button({ children, onClick, isPressed }: Props) {
  return (
    <button
      className={`shadow rounded px-3 py-2 text-sm border-[1px] border-gray-100 ${
        isPressed ? "bg-gray-100" : "bg-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
