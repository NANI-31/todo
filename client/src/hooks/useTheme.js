import { useState, useEffect } from "react";

// Custom hook to handle dark mode logic
const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage for the saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      console.log("dark");
      // Add dark mode
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      // Remove dark mode
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return [isDark, toggleTheme];
};

export default useTheme;
