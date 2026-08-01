import React, { useState, useEffect } from 'react';
import { Users, Briefcase, CheckSquare, MessageSquare, Shield, Settings, Wallet, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard');
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to load admin dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtext, colorClass, linkTo }: any) => (
    <div 
      onClick={() => navigate(linkTo)}
      className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${colorClass}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">{title}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {subtext && <div className="text-xs text-gray-500 mt-1">{subtext}</div>}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of platform activity and pending tasks.</p>
      </div>

      {loading ? (
        <div className="py-10 text-center">Loading dashboard...</div>
      ) : stats ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              icon={Users} 
              title="Total Users" 
              value={stats.userStats.totalUsers} 
              subtext={`${stats.userStats.totalCustomers} Customers • ${stats.userStats.totalOwners} Owners`}
              colorClass="bg-blue-50 text-blue-600"
              linkTo="/admin/customers"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions Required</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <StatCard 
                icon={Shield} 
                title="Staff Verifications" 
                value={stats.pendingApprovals.staff} 
                colorClass="bg-red-50 text-red-600"
                linkTo="/admin/staff-verification"
              />

              <StatCard 
                icon={CheckSquare} 
                title="Customer/Owner KYC" 
                value={stats.pendingApprovals.customersAndOwners} 
                colorClass="bg-orange-50 text-orange-600"
                linkTo="/admin/validations"
              />

              <StatCard 
                icon={Settings} 
                title="Profile Updates" 
                value={stats.pendingApprovals.profileUpdates} 
                colorClass="bg-yellow-50 text-yellow-600"
                linkTo="/admin/profile-updates"
              />

              <StatCard 
                icon={Briefcase} 
                title="Projects to Verify" 
                value={stats.pendingApprovals.projects} 
                colorClass="bg-emerald-50 text-emerald-600"
                linkTo="/admin/validations"
              />

              <StatCard 
                icon={Wallet} 
                title="Pending Withdrawals" 
                value={stats.pendingApprovals.withdrawals} 
                colorClass="bg-cyan-50 text-cyan-600"
                linkTo="/admin/withdrawals"
              />

              <StatCard 
                icon={MessageSquare} 
                title="Open Support Tickets" 
                value={stats.openSupportTickets} 
                colorClass="bg-purple-50 text-purple-600"
                linkTo="/admin/support"
              />

            </div>
          </div>
        </div>
      ) : (
        <div className="py-10 text-center text-red-500">Failed to load dashboard data.</div>
      )}
    </div>
  );
}
