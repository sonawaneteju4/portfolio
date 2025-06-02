import React, { useState } from "react";
import { VscFile, VscFolder, VscFolderOpened } from "react-icons/vsc";
import { useTheme } from "../../context/ThemeContext";

const SidebarExplorer = () => {
  const { theme, toggleTheme } = useTheme();
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    projects: true,
  });
  const [showDropdown, setShowDropdown] = useState(false);

  // Close dropdown on theme change
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    if (toggleTheme) {
      toggleTheme();
    }
    setShowDropdown(false);
  };

  const toggleFolder = (key: string) => {
    setOpenFolders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`w-64 p-3 border-r transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#1e1e1e] text-gray-200 border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {/* Branding badge at the top */}
      <div className="flex items-center gap-3 mb-4 select-none text-2xl font-bold tracking-tight px-3 py-1 rounded  text-white shadow  ">
        <span className={theme === "dark" ? "text-white" : "text-[#1e1e1e]"}>
          tejas
        </span>
        {/* 3D flip badge with group for hover effect */}
        <span className="relative w-12 h-8 [perspective:600px] group">
          <span className="block w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(180deg)] [transform-style:preserve-3d]">
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold bg-[#3178c6] text-white border border-[#2563eb] rounded shadow [backface-visibility:hidden]">
              .ts
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold bg-[#f7e018] text-[#323330] border border-yellow-400 rounded shadow [transform:rotateY(180deg)] [backface-visibility:hidden]">
              .js
            </span>
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold">EXPLORER</div>
        {/* Settings button */}
        <div className="relative">
          <button
            className={`p-1 rounded transition-colors ${
              theme === "dark"
                ? "hover:bg-gray-700/30 text-gray-300"
                : "hover:bg-gray-200 text-gray-600"
            }`}
            aria-label="Settings"
            onClick={() => setShowDropdown((v) => !v)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className=""
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.34a1 1 0 0 0 .26-1.09l-1.07-3.11a1 1 0 0 1 .21-1.09l2.13-2.13a1 1 0 0 0 0-1.41l-2.12-2.12a1 1 0 0 0-1.41 0l-2.13 2.13a1 1 0 0 1-1.09.21l-3.11-1.07a1 1 0 0 0-1.09.26l-1.5 1.5a1 1 0 0 0-.26 1.09l1.07 3.11a1 1 0 0 1-.21 1.09l-2.13 2.13a1 1 0 0 0 0 1.41l2.12 2.12a1 1 0 0 0 1.41 0l2.13-2.13a1 1 0 0 1 1.09-.21l3.11 1.07a1 1 0 0 0 1.09-.26l1.5-1.5z"
              />
            </svg>
          </button>
          {/* Settings dropdown */}
          {showDropdown && (
            <div
              className={`absolute right-0 mt-2 w-40 border rounded shadow-lg z-20 transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-[#23272e] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`px-4 py-2 text-xs font-semibold border-b ${
                  theme === "dark"
                    ? "text-gray-300 border-gray-700 bg-[#23272e]"
                    : "text-gray-500 border-gray-100 bg-white"
                }`}
              >
                Theme
              </div>
              <button
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  theme === "light"
                    ? "font-bold text-blue-600 dark:text-blue-400"
                    : ""
                }`}
                onClick={() => handleThemeChange("light")}
              >
                Light
              </button>
              <button
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  theme === "dark"
                    ? "font-bold text-blue-600 dark:text-blue-400"
                    : ""
                }`}
                onClick={() => handleThemeChange("dark")}
              >
                Dark
              </button>
            </div>
          )}
        </div>
      </div>
      <ul className="space-y-1 text-sm">
        {/* Home page (index) - logical name */}
        <li className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700/30 rounded cursor-pointer">
          <VscFile className="text-cyan-400" />
          <a href="#home">
            Home <span className="ml-1 text-xs text-gray-400">(index.tsx)</span>
          </a>
        </li>
        {/* About */}
        <li className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700/30 rounded cursor-pointer">
          <VscFile className="text-blue-400" />
          <a href="#about">About.tsx</a>
        </li>
        {/* Projects folder */}
        <li>
          <div
            onClick={() => toggleFolder("projects")}
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700/30 rounded cursor-pointer"
          >
            <span className="text-gray-400">&gt;</span>
            {openFolders.projects ? (
              <VscFolderOpened className="text-yellow-400" />
            ) : (
              <VscFolder className="text-yellow-400" />
            )}
            <span>Projects</span>
          </div>
          {openFolders.projects && (
            <ul className="pl-6 mt-1 space-y-1">
              {["portfolio.md", "github-clone.md", "startup-app.md"].map(
                (file, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700/30 rounded cursor-pointer"
                  >
                    <VscFile className="text-green-400" />
                    <a href={`#project-${index}`}>{file}</a>
                  </li>
                )
              )}
            </ul>
          )}
        </li>
        {/* Skills */}
        <li className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700/30 rounded cursor-pointer">
          <VscFile className="text-purple-400" />
          <a href="#skills">Skills.tsx</a>
        </li>
        {/* Contact */}
        <li className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700/30 rounded cursor-pointer">
          <VscFile className="text-red-400" />
          <a href="#contact">Contact.tsx</a>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarExplorer;
