// import Sidebar from "./Sidebar";
// import { Outlet } from "react-router-dom";

// export default function Layout() {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <Outlet />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import useTheme from "../hooks/useTheme";
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, toggleTheme] = useTheme();
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-1 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-64
    transform ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out
    md:translate-x-0 md:static md:flex-shrink-0
  `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            My Dashboard
          </h2>
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 flex flex-col justify-between h-[calc(100dvh-65px)]">
          <ul className="space-y-2 flex-1 overflow-y-auto">
            <li>
              <NavLink
                to="/todo/dashboard"
                onClick={() => setSidebarOpen(false)}
                end
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 rounded bg-blue-600 text-white"
                    : "block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todo/create"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 rounded bg-blue-600 text-white"
                    : "block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-white"
                }
              >
                Create Task
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todo/tasks"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 rounded bg-blue-600 text-white"
                    : "block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-white"
                }
              >
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todo/profile"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 rounded bg-blue-600 text-white"
                    : "block px-4 py-2 rounded hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-white"
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <div className="flex items-center justify-between px-4 py-2 rounded dark:bg-gray-700">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Theme
                </span>
                <label className="relative inline-block w-12 h-6 cursor-pointer rounded-full bg-gradient-to-r from-gray-200 to-gray-800 bg-[length:200%_100%] bg-left transition-all duration-400 peer-checked:bg-right">
                  <input
                    type="checkbox"
                    className="peer absolute opacity-0 w-0 h-0"
                    checked={isDark}
                    onChange={toggleTheme}
                  />
                  {/* The knob */}
                  <span className="absolute top-1 left-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-800 bg-[length:200%_100%] bg-right peer-checked:left-[calc(100%-1rem-0.375rem)] peer-checked:bg-left transition-all duration-400" />
                </label>
              </div>
            </li>

            {/* Add more links here */}
          </ul>

          {/* Logout button pinned at bottom */}
          <div className="pt-4 border-t dark:border-gray-700">
            <NavLink
              to="/login"
              onClick={() => setSidebarOpen(false)}
              className="flex bg-gray-200 items-center justify-between px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
            >
              <span>Logout</span>
              <LuLogOut />
            </NavLink>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-auto">
        {/* Top bar for mobile */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 p-4 md:hidden dark:bg-gray-900 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <div />
        </header>

        {/* Outlet for nested routes */}
        <main className="overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
