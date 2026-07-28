import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, User, Investment, Ticket, ProfileUpdateRequest, Role } from '../types';

interface AppState {
  currentUser: User | null;
  users: User[];
  projects: Project[];
  investments: Investment[];
  tickets: Ticket[];
  profileUpdateRequests: ProfileUpdateRequest[];
  cart: string[]; // Project IDs
}

interface AppContextType extends AppState {
  login: (role: Role) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  addFunds: (amount: number) => void;
  withdrawFunds: (amount: number) => void;
  addToCart: (projectId: string) => void;
  removeFromCart: (projectId: string) => void;
  invest: (projectId: string, amount: number) => void;
  createProject: (project: Partial<Project>) => void;
  updateProjectStatus: (projectId: string, status: Project['status']) => void;
  createTicket: (ticket: Partial<Ticket>) => void;
  updateUserVerification: (userId: string, status: User['kycStatus']) => void;
}

const mockUsers: User[] = [];
const mockProjects: Project[] = [];
const mockInvestments: Investment[] = [];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [profileUpdateRequests, setProfileUpdateRequests] = useState<ProfileUpdateRequest[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const login = (role: Role) => {
    const user = users.find(u => u.role === role && u.kycStatus === 'Verified');
    if (user) setCurrentUser(user);
  };

  const logout = () => setCurrentUser(null);

  const updateUser = (updatedDetails: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedDetails };
    setCurrentUser(updated);
    setUsers(users.map(u => u.id === updated.id ? updated : u));
  };

  const addFunds = (amount: number) => {
    if (!currentUser) return;
    updateUser({ walletBalance: currentUser.walletBalance + amount });
  };

  const withdrawFunds = (amount: number) => {
    if (!currentUser || currentUser.walletBalance < amount) return;
    updateUser({ walletBalance: currentUser.walletBalance - amount });
  };

  const addToCart = (projectId: string) => {
    if (!cart.includes(projectId)) setCart([...cart, projectId]);
  };

  const removeFromCart = (projectId: string) => {
    setCart(cart.filter(id => id !== projectId));
  };

  const invest = (projectId: string, amount: number) => {
    if (!currentUser || currentUser.walletBalance < amount) return;
    
    // Update user balance
    updateUser({ walletBalance: currentUser.walletBalance - amount });
    
    // Update project raised amount
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, raisedAmount: p.raisedAmount + amount };
      }
      return p;
    }));

    // Create investment
    const newInvestment: Investment = {
      id: `i${Date.now()}`,
      projectId,
      customerId: currentUser.id,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    setInvestments([...investments, newInvestment]);
    
    // Remove from cart if it was there
    removeFromCart(projectId);
  };

  const createProject = (projectDetails: Partial<Project>) => {
    if (!currentUser) return;
    const newProject: Project = {
      ...projectDetails,
      id: `p${Date.now()}`,
      ownerId: currentUser.id,
      raisedAmount: 0,
      status: 'DRAFT',
      updates: [],
      createdAt: new Date().toISOString().split('T')[0],
    } as Project;
    setProjects([...projects, newProject]);
  };

  const updateProjectStatus = (projectId: string, status: Project['status']) => {
    setProjects(projects.map(p => p.id === projectId ? { ...p, status } : p));
  };

  const createTicket = (ticketDetails: Partial<Ticket>) => {
    if (!currentUser) return;
    const newTicket: Ticket = {
      ...ticketDetails,
      id: `t${Date.now()}`,
      userId: currentUser.id,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0],
    } as Ticket;
    setTickets([...tickets, newTicket]);
  };
  
  const updateUserVerification = (userId: string, status: User['kycStatus']) => {
    setUsers(users.map(u => u.id === userId ? { ...u, kycStatus: status } : u));
  };

  return (
    <AppContext.Provider value={{
      currentUser, users, projects, investments, tickets, profileUpdateRequests, cart,
      login, logout, updateUser, addFunds, withdrawFunds, addToCart, removeFromCart,
      invest, createProject, updateProjectStatus, createTicket, updateUserVerification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
