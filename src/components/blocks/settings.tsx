import React from 'react';
import { Moon, Sun, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-foreground hover:text-foreground/80">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>

        {/* Theme Toggle */}
        <div className="p-4 rounded-lg border border-border bg-background/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-foreground">Theme</h2>
              <p className="text-sm text-foreground/60">{isDarkMode ? 'Dark' : 'Light'} mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-foreground/5"
            >
              {isDarkMode ? <Moon size={20} className="text-foreground" /> : <Sun size={20} className="text-foreground" />}
            </button>
          </div>
        </div>

        {/* Version Info */}
        <div className="p-4 rounded-lg border border-border bg-background/50">
          <h2 className="text-lg font-medium text-foreground">About</h2>
          <p className="text-sm text-foreground/60">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}; 