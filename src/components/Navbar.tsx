"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

interface MenuItem {
  href: string;
  label: string;
  onClick?: () => void;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  // Effect to handle initial theme and theme changes
  useEffect(() => {
    setIsMounted(true);

    // Check for saved theme preference or system preference
    const savedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem("theme") as "light" | "dark")
        : null;

    const prefersDarkMode =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;

    // Set initial theme
    const initialTheme = savedTheme || (prefersDarkMode ? "dark" : "light");
    setTheme(initialTheme);

    // Apply theme to document after mount (ensure this only happens on the client)
    if (typeof window !== "undefined") {
      applyTheme(initialTheme);
    }
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (typeof window !== "undefined") {
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  // Function to apply theme to document
  const applyTheme = (selectedTheme: "light" | "dark") => {
    if (typeof document !== "undefined") {
      if (selectedTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
    }
  };

  const menuItems: MenuItem[] = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/contacto", label: "Contacto" },
  ];

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Only render theme-specific elements when mounted on the client
  if (!isMounted) {
    return null; // Prevent rendering on server-side until mounted
  }

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition duration-300"
              >
                Nexus
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={item.onClick}
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  {item.label}
                </Link>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                ) : (
                  <SunIcon className="h-6 w-6 text-yellow-500 group-hover:text-blue-600 transition-colors" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                ) : (
                  <SunIcon className="h-6 w-6 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                )}
              </button>

              <button
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md p-2"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      toggleMenu();
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      item.onClick && item.onClick();
                    }}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
