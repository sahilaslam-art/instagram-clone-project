import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';
import api from '../services/api';
import { 
  LogOut, LayoutDashboard, Briefcase, ShoppingCart, TrendingUp, 
  Wallet, User, HelpCircle, CheckSquare, List, Users, HandCoins, ShieldAlert, Bell
} from 'lucide-react';

export default function Layout() {
  const { currentUser, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/');
    } else if (currentUser && (currentUser.accountStatus === 'Suspended' || currentUser.accountStatus === 'Hold')) {
      navigate('/restricted-access');
    }
  }, [currentUser, isLoading, navigate]);

  useEffect(() => {
    let interval: any;
    if (currentUser && ['SUPER_ADMIN', 'ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN', 'WORKER'].includes(currentUser.role.toUpperCase())) {
      fetchDashboardStats();
      interval = setInterval(fetchDashboardStats, 30000); // Polling every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
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
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse shadow-md border border-red-600">
          {val}
        </span>
      );
    }
    return null;
  };

  const getTotalNotifications = () => {
    if (!stats) return 0;
    const { pendingApprovals, openSupportTickets } = stats;
    let total = openSupportTickets || 0;
    if (pendingApprovals) {
      Object.values(pendingApprovals).forEach((val: any) => {
        if (typeof val === 'number') total += val;
      });
    }
    return total;
  };

  const totalNotifs = getTotalNotifications();

  const getStaffNotificationRoute = () => {
    const role = currentUser?.role.toUpperCase();
    if (role === 'SUPER_ADMIN') return '/admin/staff/zonal_admin';
    if (role === 'ZONAL_ADMIN') return '/admin/staff/admin';
    if (role === 'ADMIN') return '/admin/staff/sub_admin';
    return '/admin/staff/worker';
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
      
      if (uRole === 'ZONAL_ADMIN') {
        adminLinks.push({ to: '/admin/staff/admin', icon: Users, label: 'Admins' });
        adminLinks.push({ to: '/admin/staff/sub_admin', icon: Users, label: 'Sub-Admins' });
        adminLinks.push({ to: '/admin/staff/worker', icon: Users, label: 'Workers' });
      } else if (uRole === 'ADMIN') {
        adminLinks.push({ to: '/admin/staff/sub_admin', icon: Users, label: 'Sub-Admins' });
        adminLinks.push({ to: '/admin/staff/worker', icon: Users, label: 'Workers' });
      } else if (uRole === 'SUB_ADMIN') {
        adminLinks.push({ to: '/admin/staff/worker', icon: Users, label: 'Workers' });
      }
      
      if (['ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN'].includes(uRole)) {
        adminLinks.push({ to: '/admin/restricted-accounts', icon: ShieldAlert, label: 'Restricted Accounts' });
      }
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
            
            {/* Notification Bell Dropdown for Admins */}
            {['SUPER_ADMIN', 'ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN', 'WORKER'].includes(currentUser.role.toUpperCase()) && (
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none"
                >
                  <Bell className="w-6 h-6" />
                  {totalNotifs > 0 && (
                    <span className="absolute top-1 right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden transform transition-all">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-semibold text-gray-800 flex justify-between items-center">
                      <span>Notifications</span>
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-bold">{totalNotifs} New</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {totalNotifs === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <CheckSquare className="w-8 h-8 mx-auto text-green-400 mb-2" />
                          <p>You're all caught up!</p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-50">
                          {stats?.pendingApprovals?.staff > 0 && (
                            <li className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { navigate(getStaffNotificationRoute()); setShowNotifications(false); }}>
                              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">{stats.pendingApprovals.staff}</span> Staff Verifications Pending</div>
                            </li>
                          )}
                          {stats?.pendingApprovals?.customersAndOwners > 0 && (
                            <li className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { navigate('/admin/customers'); setShowNotifications(false); }}>
                              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">{stats.pendingApprovals.customersAndOwners}</span> Customer/Owner Verifications Pending</div>
                            </li>
                          )}
                          {stats?.pendingApprovals?.profileUpdates > 0 && (
                            <li className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { navigate('/admin/profile-updates'); setShowNotifications(false); }}>
                              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">{stats.pendingApprovals.profileUpdates}</span> Profile Updates Pending</div>
                            </li>
                          )}
                          {stats?.pendingApprovals?.projects > 0 && (
                            <li className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { navigate('/admin/validations'); setShowNotifications(false); }}>
                              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">{stats.pendingApprovals.projects}</span> Project Validations Pending</div>
                            </li>
                          )}
                          {stats?.pendingApprovals?.withdrawals > 0 && (
                            <li className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { navigate('/admin/withdrawals'); setShowNotifications(false); }}>
                              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">{stats.pendingApprovals.withdrawals}</span> Withdrawals Pending</div>
                            </li>
                          )}
                          {stats?.openSupportTickets > 0 && (
                            <li className="p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => { navigate('/admin/support'); setShowNotifications(false); }}>
                              <div className="text-sm text-gray-600"><span className="font-bold text-gray-900">{stats.openSupportTickets}</span> Support Tickets Open</div>
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

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
