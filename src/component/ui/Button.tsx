import React from "react";
import { useTheme } from "../../context/ThemeContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const { theme } = useTheme();
  const base =
    "px-5 py-2 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      theme === "dark"
        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
        : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary:
      theme === "dark"
        ? "bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-400"
        : "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300",
  };
  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
