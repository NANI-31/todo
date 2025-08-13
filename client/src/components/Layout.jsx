import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import useTheme from "../hooks/useTheme";
import { UserData } from "../hooks/useUser";
export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, toggleTheme] = useTheme();
  const { user } = UserData();

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  const location = useLocation();

  const pathTitles = {
    "/todo/dashboard": "Home",
    "/todo/create": "Create Task",
    "/todo/profile": "Profile",
  };

  const pageTitle = pathTitles[location.pathname] || "Dashboard";

  return (
    <div className="flex h-screen bg-[#e0e0e0] dark:bg-[#010208]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-1 bg-white dark:bg-[#010208] border-r border-gray-200 dark:border-gray-700 w-64
                  transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out
                  md:translate-x-0 md:static md:flex-shrink-0
                `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-full flex items-center gap-5">
            <div className="md:w-16 md:h-16 w-[50px] h-[50px] rounded-full dark:shadow dark:shadow-gray-400 overflow-hidden">
              <img
                src={user?.avatarUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h6 className="text-2xl dark:text-white">{user?.name}</h6>
          </div>
          {/* <h2 className="text-xl font-bold text-gray-900 dark:text-white"> */}
          {/* My Dashboard */}
          {/* </h2> */}
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="p-4 flex flex-col justify-between h-[calc(100dvh-110px)] ">
          <ul className="space-y-2 flex-1 ">
            <li>
              <NavLink
                to="/todo/dashboard"
                onClick={() => setSidebarOpen(false)}
                end
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2 rounded sidebar-btn-active"
                    : "block px-4 py-2 rounded sidebar-btn"
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
                    ? "block px-4 py-2 rounded sidebar-btn-active"
                    : "block px-4 py-2 rounded sidebar-btn"
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
                    ? "block px-4 py-2 rounded sidebar-btn-active"
                    : "block px-4 py-2 rounded sidebar-btn"
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
                    ? "block px-4 py-2 rounded sidebar-btn-active"
                    : "block px-4 py-2 rounded sidebar-btn"
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <div className="flex items-center justify-between px-4 py-2 rounded">
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Theme
                </span>
                <label className="relative inline-block w-12 h-6 cursor-pointer rounded-full bg-gradient-to-r from-[var(--magenta)] to-[var(--violet)] bg-[length:200%_100%] bg-left transition-all duration-400 peer-checked:bg-right">
                  <input
                    type="checkbox"
                    className="peer absolute opacity-0 w-0 h-0"
                    checked={isDark}
                    onChange={toggleTheme}
                  />
                  {/* The knob */}
                  <span className="absolute top-1 left-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-white to-gray-100 bg-[length:200%_100%] bg-right peer-checked:left-[calc(100%-1rem-0.375rem)] peer-checked:bg-left transition-all duration-400" />
                </label>
              </div>
            </li>

            {/* Add more links here */}
          </ul>

          {/* Logout button pinned at bottom */}
          <div className="pt-4 border-t dark:border-gray-700">
            <NavLink
              to="/logout"
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
            {pageTitle}
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
