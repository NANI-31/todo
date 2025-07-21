// src/components/Button.jsx
import React from "react";

export default function Button({
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  children,
  className = "",
  size = "md", // md | sm | lg
  ...rest
}) {
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };
  // const widthClass = fullWidth ? "w-full" : "w-fit";
  // ...
  // className={`... ${widthClass} ...`}
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`rounded-md transition-colors w-fi text-white font-medium
        ${
          disabled || loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }
        ${sizeClasses[size]} 
        ${className}
        `}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
