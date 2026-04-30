"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, ChevronUp, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="absolute top-4 right-4 z-10 w-[72px] h-[20px]" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="absolute top-4 right-4 z-10 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
    >
      <Sun
        size={18}
        className={isDark ? "text-gray-900 dark:text-gray-100" : ""}
      />
      <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded-full relative flex items-center p-0.5 border border-gray-300 dark:border-gray-600 transition-colors">
        <div
          className={`w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full shadow-sm transition-transform duration-300 ${isDark ? "translate-x-4" : "translate-x-0"}`}
        />
      </div>
      <Moon
        size={18}
        className={!isDark ? "text-gray-900 dark:text-gray-100" : ""}
      />
    </button>
  );
};

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ExpandableSection: React.FC<SectionProps> = ({
  title,
  icon,
  children,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="mb-8 border-t-3 border-gray-600 dark:border-white pt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between group mb-4"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3 text-gray-900 dark:text-white">
          <div className="text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {icon}
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </section>
  );
};
