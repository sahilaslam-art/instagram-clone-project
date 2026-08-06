export type Role = 'CUSTOMER' | 'OWNER' | 'ADMIN';

export type ProjectStatus = 'DRAFT' | 'SUBMITTED' | 'STAGE' | 'LIVE' | 'FINISHED';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedReturn: string;
  minimumInvestment: number;
  targetAmount: number;
  raisedAmount: number;
  status: ProjectStatus;
  ownerId: string;
  updates: ProjectUpdate[];
  createdAt: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  content: string;
}

export interface User {
  id: string;
  role: Role | 'SUPER_ADMIN' | 'ZONAL_ADMIN' | 'ADMIN' | 'SUB_ADMIN' | 'WORKER';
  fullName: string;
  email: string;
  mobileNumber: string;
  kycStatus: 'Pending' | 'Verified' | 'Rejected' | 'Not Submitted';
  walletBalance: number;
  domain?: string;
  zone?: string;
  region?: string;
  category?: string;
  speciality?: string;
}

export interface Investment {
  id: string;
  projectId: string;
  customerId: string;
  amount: number;
  date: string;
  status: 'ACTIVE' | 'COMPLETED';
  returnsReceived?: number;
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  category: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  createdAt: string;
}

export interface ProfileUpdateRequest {
  id: string;
  ownerId: string;
  oldDetails: Partial<User>;
  newDetails: Partial<User>;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
