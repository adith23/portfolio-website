'use client';

import React, { useState } from 'react';
import { Moon, Sun, ChevronUp, ChevronDown } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
      className="absolute top-4 right-4 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Moon size={18} className={isDark ? 'text-gray-900' : ''} />
      <div className="w-8 h-4 bg-gray-200 rounded-full relative flex items-center p-0.5 border border-gray-300">
        <div className={`w-3 h-3 bg-gray-800 rounded-full shadow-sm transition-transform duration-300 ${isDark ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
      <Sun size={18} className={!isDark ? 'text-gray-900' : ''} />
    </button>
  );
};

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const ExpandableSection: React.FC<SectionProps> = ({ title, icon, children, defaultExpanded = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="mb-8 border-t border-gray-200 pt-8">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between group mb-4"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3 text-gray-900">
          <div className="text-gray-700 group-hover:text-gray-900 transition-colors">{icon}</div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>
      
      {isExpanded && <div className="animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>}
    </section>
  );
};