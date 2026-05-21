'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type Theme = 'light' | 'dark' | 'cyberpunk';
export type UserRole = 'admin' | 'teacher' | null;

interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  branch: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  // Load state from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('eci-theme') as Theme;
    if (savedTheme) setThemeState(savedTheme);

    const savedUser = localStorage.getItem('eci-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Sync theme to document body
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'cyberpunk');
    root.classList.add(theme);
    localStorage.setItem('eci-theme', theme);
  }, [theme]);

  // Auth Protection Logic
  useEffect(() => {
    if (loading) return;

    const isAuthRoute = pathname === '/';
    
    if (!user && !isAuthRoute) {
      router.push('/');
    } else if (user && isAuthRoute) {
      router.push('/dashboard');
    }
  }, [user, pathname, loading, router]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('eci-user', JSON.stringify(userData));
    localStorage.setItem('eci-token', token);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eci-user');
    localStorage.removeItem('eci-token');
    router.push('/');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        user,
        login,
        logout,
        isSidebarOpen,
        setSidebarOpen,
        loading
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
