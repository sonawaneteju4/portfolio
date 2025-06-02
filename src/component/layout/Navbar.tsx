import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaUserAlt, FaLaptopCode, FaTools, FaEnvelope } from "react-icons/fa";

const NAV_LINKS = [
  { href: "#about", label: "About", icon: <FaUserAlt /> },
  { href: "#projects", label: "Projects", icon: <FaLaptopCode /> },
  { href: "#skills", label: "Skills", icon: <FaTools /> },
  { href: "#contact", label: "Contact", icon: <FaEnvelope /> },
];

const crazyColors = [
  "from-pink-500 via-yellow-400 to-blue-500",
  "from-green-400 via-blue-500 to-purple-600",
  "from-yellow-400 via-red-500 to-pink-500",
  "from-purple-500 via-indigo-500 to-blue-500",
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [crazy, setCrazy] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const crazyColor =
    crazyColors[Math.floor(Math.random() * crazyColors.length)];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-700 shadow-xl font-poppins
        ${
          theme === "dark"
            ? "bg-black/95 text-white"
            : "bg-white/95 text-gray-900"
        }
        ${
          crazy
            ? `bg-gradient-to-r ${crazyColor} text-white animate-gradient-x`
            : ""
        }
        bg-[linear-gradient(145deg,rgba(255,255,255,0.05)_25%,transparent_25%),linear-gradient(-145deg,rgba(255,255,255,0.05)_25%,transparent_25%)] bg-[length:20px_20px]
      `}
      onMouseEnter={() => setCrazy(true)}
      onMouseLeave={() => setCrazy(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center gap-2 cursor-pointer group select-none">
            <span className="text-2xl font-bold tracking-tight px-3 py-1 rounded bg-[#3178c6] text-white shadow border border-[#2563eb]">
              tejas
            </span>
            <span className="relative w-12 h-8 [perspective:600px]">
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
        </div>

        {/* Nav Links + Toggle */}
        <div className="flex items-center gap-4 justify-end flex-1">
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center font-mono text-sm">
            {NAV_LINKS.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-1 group transition duration-300 relative font-semibold"
              >
                <span className="text-lg">{icon}</span>
                <span className={`group-hover:text-blue-500`}>
                  &lt;{label} /&gt;
                </span>
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r ${crazyColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === "dark"
                ? "border-white bg-black/60 hover:bg-gray-800"
                : "border-black bg-white/60 hover:bg-gray-200"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.24 4.24l-.71-.71M6.34 6.34l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t shadow-lg ${
            theme === "dark"
              ? "bg-gray-900/95 text-white"
              : "bg-white/90 text-gray-900"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-3 font-mono text-base">
            {NAV_LINKS.map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 py-2 px-3 rounded transition duration-300 ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{`<${label} />`}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
