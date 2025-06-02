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
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <SidebarExplorer />
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  );
};

export default CodeEditorLayout;
