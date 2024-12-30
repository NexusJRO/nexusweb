"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  href: string;
  label: string;
  onClick?: () => void;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  // Effect to handle body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = savedTheme || (prefersDarkMode ? "dark" : "light");
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  const applyTheme = (selectedTheme: "light" | "dark") => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle(
        "dark",
        selectedTheme === "dark"
      );
      document.documentElement.style.colorScheme = selectedTheme;
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

  if (!isMounted) {
    return null;
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      x: 50,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const lineVariants = {
    closed: {
      width: "0%",
      opacity: 0,
    },
    open: {
      width: "100%",
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
      },
    },
  };

  const closeButtonVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 90,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition duration-300"
              >
                Nexus JR
              </Link>
            </div>

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

              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                ) : (
                  <SunIcon className="h-6 w-6 text-yellow-500 group-hover:text-blue-600 transition-colors" />
                )}
              </motion.button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                ) : (
                  <SunIcon className="h-6 w-6 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                )}
              </motion.button>

              <motion.button
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 z-40 overflow-hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <div className="h-full">
                  <div className="p-4 flex justify-end space-x-2">
                    <motion.button
                      onClick={toggleTheme}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Toggle theme"
                    >
                      {theme === "light" ? (
                        <MoonIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                      ) : (
                        <SunIcon className="h-6 w-6 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                      )}
                    </motion.button>

                    <motion.button
                      onClick={toggleMenu}
                      className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md p-2"
                      variants={closeButtonVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      whileHover="hover"
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </motion.button>
                  </div>

                  <motion.div
                    className="px-2 pt-4 pb-3 space-y-1 sm:px-3"
                    variants={{
                      open: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        className="relative"
                        variants={menuItemVariants}
                      >
                        <Link
                          href={item.href}
                          onClick={() => {
                            toggleMenu();
                            if (item.onClick) item.onClick();
                          }}
                          className="relative block px-6 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 group"
                        >
                          <motion.span
                            className="relative z-10 flex items-center"
                            whileHover={{ x: 10 }}
                          >
                            {item.label}
                          </motion.span>
                        </Link>

                        {index < menuItems.length - 1 && (
                          <motion.div
                            className="h-px mx-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
                            variants={lineVariants}
                            initial="closed"
                            animate="open"
                          />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
