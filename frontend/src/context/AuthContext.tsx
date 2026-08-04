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
