import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import api from '../services/api';
import { 
  LogOut, LayoutDashboard, Briefcase, ShoppingCart, TrendingUp, 
  Wallet, User, HelpCircle, CheckSquare, List, Users, HandCoins, ShieldAlert
} from 'lucide-react';

export default function Layout() {
  const { currentUser, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/');
    } else if (currentUser && (currentUser.accountStatus === 'Suspended' || currentUser.accountStatus === 'Hold')) {
      navigate('/restricted-access');
    }
  }, [currentUser, isLoading, navigate]);

  useEffect(() => {
    if (currentUser && ['SUPER_ADMIN', 'ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN', 'WORKER'].includes(currentUser.role.toUpperCase())) {
      fetchDashboardStats();
    }
  }, [currentUser]);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get('/admin/dashboard');
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to load dashboard stats for badges', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error('Logout error', e);
    }
    logout();
    navigate('/');
  };

  const getBadgeValue = (badgeKey?: string) => {
    if (!stats || !badgeKey) return 0;
    if (badgeKey === 'support') return stats.openSupportTickets;
    return stats.pendingApprovals?.[badgeKey] || 0;
  };

  const renderBadge = (badgeKey?: string) => {
    const val = getBadgeValue(badgeKey);
    if (val > 0) {
      return (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {val}
        </span>
      );
    }
    return null;
  };

  const customerLinks = [
    { to: '/customer/projects', icon: Briefcase, label: 'Browse Projects' },
    { to: '/customer/cart', icon: ShoppingCart, label: 'My Cart' },
    { to: '/customer/investments', icon: TrendingUp, label: 'Track My Money' },
    { to: '/customer/wallet', icon: Wallet, label: 'My Wallet' },
    { to: '/customer/profile', icon: User, label: 'Profile' },
    { to: '/customer/support', icon: HelpCircle, label: 'Support' },
  ];

  const ownerLinks = [
    { to: '/owner/projects', icon: Briefcase, label: 'Projects' },
    { to: '/owner/wallet', icon: Wallet, label: 'My Wallet' },
    { to: '/owner/profile', icon: User, label: 'Profile' },
    { to: '/owner/support', icon: HelpCircle, label: 'Support' },
  ];

  let adminLinks: any[] = [];
  const uRole = currentUser.role.toUpperCase();

  if (uRole === 'SUPER_ADMIN') {
    adminLinks = [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/admin/staff/zonal_admin', icon: Users, label: 'Zonal Admins' },
      { to: '/admin/staff/admin', icon: Users, label: 'Admins' },
      { to: '/admin/staff/sub_admin', icon: Users, label: 'Sub-Admins' },
      { to: '/admin/staff/worker', icon: Users, label: 'Workers' },
      { to: '/admin/customers', icon: Users, label: 'Customer Verification', badgeKey: 'customersAndOwners' },
      { to: '/admin/owners', icon: Users, label: 'Owner Verification' },
      { to: '/admin/profile-updates', icon: CheckSquare, label: 'Profile Updates', badgeKey: 'profileUpdates' },
      { to: '/admin/validations', icon: CheckSquare, label: 'Project Validation', badgeKey: 'projects' },
      { to: '/admin/tracking', icon: List, label: 'Live Projects Tracking' },
      { to: '/admin/withdrawals', icon: HandCoins, label: 'Withdrawals', badgeKey: 'withdrawals' },
      { to: '/admin/support', icon: HelpCircle, label: 'Support Tickets', badgeKey: 'support' },
      { to: '/admin/restricted-accounts', icon: ShieldAlert, label: 'Restricted Accounts' },
    ];
  } else if (['ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN', 'WORKER'].includes(uRole)) {
    if (currentUser.kycStatus === 'Verified') {
      adminLinks.push({ to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' });
      
      adminLinks.push(
        { to: '/admin/customers', icon: Users, label: 'Customer Verification', badgeKey: 'customersAndOwners' },
        { to: '/admin/owners', icon: Users, label: 'Owner Verification' },
        { to: '/admin/profile-updates', icon: CheckSquare, label: 'Profile Updates', badgeKey: 'profileUpdates' },
        { to: '/admin/validations', icon: CheckSquare, label: 'Project Validation', badgeKey: 'projects' },
        { to: '/admin/tracking', icon: List, label: 'Live Projects Tracking' },
        { to: '/admin/withdrawals', icon: HandCoins, label: 'Withdrawals', badgeKey: 'withdrawals' },
        { to: '/admin/support', icon: HelpCircle, label: 'Support Tickets', badgeKey: 'support' }
      );
    }
  }

  if (['SUPER_ADMIN', 'ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN', 'WORKER'].includes(uRole)) {
    adminLinks.push({ to: '/admin/profile', icon: User, label: 'My Profile' });
  }

  const links = currentUser.role.toUpperCase() === 'CUSTOMER' ? customerLinks 
              : currentUser.role.toUpperCase() === 'OWNER' ? ownerLinks 
              : adminLinks;

  const isCustomer = currentUser.role.toUpperCase() === 'CUSTOMER';
  const themeText = isCustomer ? 'text-emerald-600' : 'text-blue-600';
  const themeBgText = isCustomer ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700';

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className={`text-2xl font-bold tracking-tight ${themeText}`}>StageFund</h1>
          <p className="text-sm text-gray-500 mt-1 capitalize">{currentUser.role.toLowerCase()} Portal</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? `${themeBgText} font-medium` 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                  {renderBadge(link.badgeKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-lg font-medium text-gray-800">Welcome, {currentUser.fullName || 'User'}</h2>
          <div className="flex items-center gap-4">
            {['CUSTOMER', 'OWNER'].includes(currentUser.role.toUpperCase()) && (
              <div className={`${themeBgText} px-4 py-2 rounded-full font-medium text-sm`}>
                Balance: ${(currentUser.walletBalance || 0).toLocaleString()}
              </div>
            )}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
              {(currentUser.fullName || 'U').charAt(0)}
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
