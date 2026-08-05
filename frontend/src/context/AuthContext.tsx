import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import api from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect duplicated tabs and redirect them to login page
    const channel = new BroadcastChannel('stagefund_tab_manager');
    const myTabId = Date.now().toString() + Math.random().toString();
    
    // Announce this tab's initialization
    channel.postMessage({ type: 'TAB_INIT', senderId: myTabId });

    channel.onmessage = (event) => {
      if (event.data.type === 'TAB_INIT') {
        // Only claim we exist if we are ACTUALLY logged in!
        // This prevents the login page (which has no token) from logging out other tabs.
        if (sessionStorage.getItem('token')) {
          channel.postMessage({ type: 'TAB_EXISTS', targetId: event.data.senderId });
        }
      } else if (event.data.type === 'TAB_EXISTS' && event.data.targetId === myTabId) {
        // We are a new/duplicated tab and an existing tab is already running.
        // If we have a token (meaning we were duplicated), clear it and force login.
        if (sessionStorage.getItem('token')) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          window.location.href = '/';
        }
      }
    };

    const initAuth = async () => {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        try {
          // Call API to get fresh token and latest user details
          const res = await api.get('/auth/refresh');
          const { token: newToken, user: freshUser } = res.data.data;
          
          setToken(newToken);
          setCurrentUser(freshUser);
          sessionStorage.setItem('token', newToken);
          sessionStorage.setItem('user', JSON.stringify(freshUser));
        } catch (e) {
          console.error('Failed to refresh session', e);
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          setToken(null);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();

    return () => {
      channel.close();
    };
  }, []);

  const login = (userData: User, newToken: string) => {
    setCurrentUser(userData);
    setToken(newToken);
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  const updateUser = (updatedDetails: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedDetails };
    setCurrentUser(updated);
    sessionStorage.setItem('user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      token,
      isAuthenticated: !!token,
      login,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
