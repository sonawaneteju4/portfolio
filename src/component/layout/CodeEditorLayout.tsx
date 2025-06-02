import React from "react";
import { useTheme } from "../../context/ThemeContext";
import SidebarExplorer from "./SidebarExplorer.tsx";

const CodeEditorLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen font-mono transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#1e1e1e] text-gray-200"
          : "bg-[#1e1e1e0d] text-gray-800"
      }`}
    >
      <SidebarExplorer />
      {/* VS Code-style main area */}
      <div className="flex flex-1 flex-col h-full">
        {/* Editor top bar (filename, tabs, actions) */}
        <div
          className={`flex items-center h-10 px-2 border-b ${
            theme === "dark"
              ? "bg-[#23272e] border-gray-700"
              : "bg-[#f3f3f3] border-gray-200"
          }`}
        >
          {/* Example tab bar (single tab for now) */}
          <div className="flex items-center gap-2 h-full">
            <div
              className={`flex items-center px-3 h-8 rounded-t-md mt-2 font-mono text-sm cursor-pointer ${
                theme === "dark"
                  ? "bg-[#1e1e1e] text-blue-400 border-b-2 border-blue-400"
                  : "bg-white text-blue-600 border-b-2 border-blue-600"
              }`}
            >
              <span className="mr-2">index.tsx</span>
              <span className="text-gray-400 text-xs">●</span>
            </div>
          </div>
          {/* Spacer */}
          <div className="flex-1" />
          {/* Editor actions (mock) */}
          <div className="flex items-center gap-2">
            <button
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Close tab"
              aria-label="Close tab"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Editor area */}
        <main
          className={`flex-1 p-0 overflow-auto ${
            theme === "dark" ? "bg-[#1e1e1e]" : "bg-white"
          }`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CodeEditorLayout;
