import React from "react";

export default function Select({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  className = "", // custom class for <select>
  labelClassName = "", // optional custom class for <label>
  containerClassName = "", // optional class for the outer wrapper
}) {
  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-gray-700 dark:text-white mb-2 font-medium ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
