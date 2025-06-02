import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const codeLines = [
  "const tejas = {",
  '  name: "Tejas Sonawane",',
  '  role: "Frontend Engineer",',
  '  username: "@tejasdev",',
  '  location: "India",',
  '  skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],',
  '  tools: ["VS Code", "Vite", "Figma", "Postman"],',
  "  theme: window.matchMedia(\"(prefers-color-scheme: dark)\").matches ? 'dark' : 'light',",
  '  currentlyWorkingOn: "Building sleek UI in React",',
  "  dailyLife: [",
  "    '💻 Code UI components',",
  "    '🔄 Git commits',",
  "    '🧪 Test features',",
  "    '☕️ Debug things',",
  "    '📦 Push to production'",
  "  ],",
  '  motto: "Make it clean. Make it responsive. Make it fast."',
  "};",
];

function highlight(line: string) {
  // Simple regex-based highlighting for demo
  let highlighted = line
    .replace(
      /^(const|let|var|return|if|else|function|window|console)/,
      `<span class='text-purple-400'>$1</span>`
    )
    .replace(/("[^"]*"|'[^']*')/g, `<span class='text-green-400'>$1</span>`)
    .replace(/([a-zA-Z0-9_]+)(?=\: )/g, `<span class='text-blue-400'>$1</span>`)
    .replace(/([\[\]\{\}\(\)\,])/g, `<span class='text-gray-400'>$1</span>`)
    .replace(/&lt;.*?&gt;/g, (match) => match); // don't highlight HTML tags

  // Remove purple span from 'const tejas = {' and 'const tejas ='
  if (
    highlighted.startsWith(
      "<span class='text-purple-400'>const</span> tejas = <span class='text-gray-400'>{</span>"
    )
  ) {
    highlighted =
      'const tejas = <span class="text-gray-400">{</span>' +
      highlighted.slice(
        "<span class='text-purple-400'>const</span> tejas = <span class='text-gray-400'>{</span>"
          .length
      );
  } else if (
    highlighted.startsWith("<span class='text-purple-400'>const</span> tejas =")
  ) {
    highlighted =
      "const tejas =" +
      highlighted.slice(
        "<span class='text-purple-400'>const</span> tejas =".length
      );
  }
  return highlighted;
}

interface TypewriterCodeProps {
  lines: string[];
  delay?: number;
}

const TypewriterCode = ({
  lines,
  delay = 30,
  onDone,
}: TypewriterCodeProps & { onDone?: () => void }) => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const lineIdx = useRef(0);
  const charIdx = useRef(0);
  const buffer = useRef("");

  useEffect(() => {
    // Start from the very first char
    lineIdx.current = 0;
    charIdx.current = 0;
    buffer.current = "";
    setDisplayed([]);
    setDone(false);
    if (lines.length === 0) return;
    const type = () => {
      const line = lines[lineIdx.current];
      if (charIdx.current < line.length) {
        buffer.current += line[charIdx.current];
        charIdx.current++;
        setDisplayed((prev) => [
          ...prev.slice(0, lineIdx.current),
          buffer.current,
        ]);
        setTimeout(type, delay);
      } else {
        setDisplayed((prev) => [...prev, ""]);
        lineIdx.current++;
        charIdx.current = 0;
        buffer.current = "";
        setTimeout(type, delay * 10);
      }
    };
    type();
    // eslint-disable-next-line
  }, [lines]);

  return (
    <pre className="text-sm md:text-base font-mono leading-6 select-text">
      {displayed.map((line, i) => (
        <div key={i} className="whitespace-pre flex">
          <span className="text-gray-500 select-none pr-4 w-8 text-right">
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
        </div>
      ))}
      {!done && <span className="animate-pulse">|</span>}
    </pre>
  );
};

interface FakeTerminalProps {}

const terminalCommands = [
  {
    command: "help",
    description: "List available commands",
    output: [
      "\x1b[36mhelp\x1b[0m        List available commands",
      "\x1b[36mabout\x1b[0m       About Tejas",
      "\x1b[36mclear\x1b[0m       Clear the terminal",
      "\x1b[36mls\x1b[0m          List pages",
      "\x1b[36mdate\x1b[0m        Show current date/time",
      "\x1b[36mtheme\x1b[0m       Show current theme",
      "\x1b[36mtheme [name]\x1b[0m Change theme (light/dark/system)",
      "\x1b[36mconsole.log\x1b[0m Print a message to the terminal",
    ],
  },
  {
    command: "about",
    description: "About Tejas",
    output: [
      "\x1b[35mTejas is a Frontend Engineer passionate about React, TypeScript, and beautiful UIs!\x1b[0m",
    ],
  },
  {
    command: "clear",
    description: "Clear the terminal",
    output: [],
  },
  {
    command: "ls",
    description: "List pages",
    output: [
      "\x1b[33msrc\x1b[0m/",
      "\x1b[33mpages\x1b[0m/",
      "\x1b[32mindex.tsx\x1b[0m",
      "\x1b[32mabout.tsx\x1b[0m",
      "\x1b[32mprojects.tsx\x1b[0m",
      "\x1b[32mcontact.tsx\x1b[0m",
    ],
  },
  {
    command: "date",
    description: "Show current date/time",
    output: [new Date().toLocaleString()],
  },
  {
    command: "theme",
    description: "Show current theme",
    output: [
      `Current theme: ${
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      }`,
    ],
  },
];

const FakeTerminal = ({ showTerminal }: { showTerminal: boolean }) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [history, setHistory] = useState<
    Array<{ cmd: string; output: string[] }>
  >([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setTheme } = useTheme();

  // Listen for Cmd+J to open terminal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "j" || e.key === "J")) {
        setOpen(true);
        setMinimized(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    setShow(false);
    const t = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (showTerminal && history.length === 0) {
      setTimeout(() => {
        setHistory([{ cmd: "help", output: terminalCommands[0].output }]);
      }, 400);
    }
  }, [showTerminal, history.length]);

  // Suggestion logic
  useEffect(() => {
    if (!showSuggestions) return;
    const filtered = terminalCommands
      .map((c) => c.command)
      .filter((cmd) => cmd.startsWith(input) && input.length > 0);
    setSuggestions(filtered);
  }, [input, showSuggestions]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setShowSuggestions(false);
    } else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0]);
      setShowSuggestions(false);
    }
  };

  const runCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    if (cmd.startsWith("console.log")) {
      // Simulate console.log output
      const match = cmd.match(/console\.log\((.*)\)/);
      let output = [];
      if (match && match[1]) {
        try {
          // eslint-disable-next-line no-eval
          const val = eval(match[1]);
          output = [String(val)];
        } catch {
          output = ["[Error evaluating expression]"];
        }
      } else {
        output = [""];
      }
      setHistory((h) => [...h, { cmd, output }]);
      return;
    }
    if (cmd.startsWith("theme ")) {
      const themeName = cmd.split(" ")[1];
      if (["light", "dark", "system"].includes(themeName)) {
        setTheme(themeName as any);
        setHistory((h) => [
          ...h,
          { cmd, output: [`Theme changed to: ${themeName}`] },
        ]);
      } else {
        setHistory((h) => [
          ...h,
          { cmd, output: ["Usage: theme [light|dark|system]"] },
        ]);
      }
      return;
    }
    const found = terminalCommands.find((c) => c.command === cmd);
    if (found) {
      if (found.command === "clear") {
        setHistory([]);
      } else if (found.command === "date") {
        setHistory((h) => [
          ...h,
          { cmd, output: [new Date().toLocaleString()] },
        ]);
      } else {
        setHistory((h) => [...h, { cmd, output: found.output }]);
      }
    } else {
      setHistory((h) => [...h, { cmd, output: ["Command not found: " + cmd] }]);
    }
  };

  if (!open) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center text-xs md:text-sm font-mono text-gray-400 bg-[#23272e] rounded-b-lg py-6 border-t border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-400"
          >
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-gray-300">Press</span>
          <kbd className="px-2 py-1 rounded bg-[#18181b] border border-gray-700 text-xs font-semibold text-gray-200">
            ⌘
          </kbd>
          <span className="text-gray-300">+</span>
          <kbd className="px-2 py-1 rounded bg-[#18181b] border border-gray-700 text-xs font-semibold text-gray-200">
            J
          </kbd>
          <span className="text-gray-300">to open terminal</span>
        </div>
        <span className="text-gray-500">(or use View &gt; Terminal)</span>
      </div>
    );
  }

  if (minimized) {
    return (
      <div className="mt-6 rounded-b-lg overflow-hidden shadow-inner border-t border-gray-700 bg-[#1e1e1e]">
        <div className="flex items-center h-8 px-3 bg-[#23272e] border-b border-gray-700 text-xs text-gray-300 font-mono select-none">
          <span
            className="mr-2 w-2 h-2 rounded-full bg-red-500 inline-block cursor-pointer"
            onClick={() => setOpen(false)}
            title="Close terminal"
          />
          <span
            className="mr-1 w-2 h-2 rounded-full bg-yellow-400 inline-block cursor-pointer"
            onClick={() => setMinimized(false)}
            title="Restore terminal"
          />
          <span
            className="mr-3 w-2 h-2 rounded-full bg-green-500 inline-block cursor-pointer"
            onClick={() => {
              setHistory([]);
              setInput("");
              setMinimized(false);
            }}
            title="New terminal"
          />
          <span className="font-semibold text-xs tracking-wide flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block align-middle text-gray-300"
            >
              <path
                d="M4 17V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 11h8M8 15h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            TERMINAL
          </span>
          <span className="ml-2 text-gray-500 text-xs">zsh</span>
          <span className="flex-1" />
          <span className="text-gray-500 text-xs">▲</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 mb-20 w-full rounded-b-lg overflow-hidden shadow-inner border-t border-gray-700 bg-[#1e1e1e]">
      {/* VS Code terminal header */}
      <div className="flex items-center h-8 px-3 bg-[#23272e] border-b border-gray-700 text-xs text-gray-300 font-mono select-none">
        <span
          className="mr-2 w-2 h-2 rounded-full bg-red-500 inline-block cursor-pointer"
          onClick={() => setOpen(false)}
          title="Close terminal"
        />
        <span
          className="mr-1 w-2 h-2 rounded-full bg-yellow-400 inline-block cursor-pointer"
          onClick={() => setMinimized(true)}
          title="Minimize terminal"
        />
        <span
          className="mr-3 w-2 h-2 rounded-full bg-green-500 inline-block cursor-pointer"
          onClick={() => {
            setHistory([]);
            setInput("");
          }}
          title="New terminal"
        />
        <span className="font-semibold text-xs tracking-wide flex items-center gap-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="inline-block align-middle text-gray-300"
          >
            <path
              d="M4 17V7a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 11h8M8 15h4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          TERMINAL
        </span>
        <span className="ml-2 text-gray-500 text-xs">zsh</span>
        <span className="flex-1" />
        <span className="text-gray-500 text-xs">▲</span>
      </div>
      {/* Terminal body */}
      <div className="px-4 py-2 text-xs md:text-sm font-mono text-green-400 bg-[#1e1e1e] min-h-[2.5rem]">
        {show && (
          <div className="space-y-1">
            {history.map((h, i) => (
              <div key={i}>
                <span className="text-[#8a8a8a] select-none">
                  tejas@macbook
                </span>
                <span className="text-blue-400 select-none"> portfolio </span>
                <span className="text-[#8a8a8a] select-none">% </span>
                <span className="text-gray-100">{h.cmd}</span>
                {h.output.length > 0 && (
                  <div className="pl-8 text-green-300 whitespace-pre-line">
                    {h.output.map((line, j) => (
                      <div
                        key={j}
                        dangerouslySetInnerHTML={{ __html: colorize(line) }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#8a8a8a] select-none">tejas@macbook</span>
              <span className="text-blue-400 select-none"> portfolio </span>
              <span className="text-[#8a8a8a] select-none">% </span>
              <input
                ref={inputRef}
                className="bg-transparent outline-none border-none text-green-400 font-mono w-40 md:w-64 text-xs md:text-sm placeholder-gray-500"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type a command..."
                title="Type a command and press Enter"
                autoFocus
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                aria-label="Terminal command input"
              />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="bg-[#23272e] border border-gray-700 rounded mt-1 w-48 text-xs text-gray-200 shadow-lg absolute z-10">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-1 hover:bg-[#2d323b] cursor-pointer"
                    onMouseDown={() => {
                      setInput(s);
                      setShowSuggestions(false);
                      inputRef.current?.focus();
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!show && <span className="opacity-50">_</span>}
      </div>
    </div>
  );
};

const Home = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  return (
    <div className="max-w-2xl mx-auto mt-8 flex flex-col min-h-[60vh]">
      <TypewriterCode lines={codeLines} onDone={() => setShowTerminal(true)} />
      <div className="flex-1" />
      <FakeTerminal showTerminal={showTerminal} />
    </div>
  );
};

export default Home;

// Colorize ANSI escape codes for output
function colorize(text: string) {
  return text
    .replace(/\x1b\[36m(.*?)\x1b\[0m/g, '<span class="text-cyan-400">$1</span>')
    .replace(/\x1b\[35m(.*?)\x1b\[0m/g, '<span class="text-pink-400">$1</span>')
    .replace(
      /\x1b\[33m(.*?)\x1b\[0m/g,
      '<span class="text-yellow-400">$1</span>'
    )
    .replace(
      /\x1b\[32m(.*?)\x1b\[0m/g,
      '<span class="text-green-400">$1</span>'
    );
}
