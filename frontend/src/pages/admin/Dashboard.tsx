import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Activity, CheckSquare, MessageSquare } from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of platform activity and pending tasks.</p>
      </div>

      {loading ? (
        <div className="py-10 text-center">Loading dashboard...</div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Total Users</div>
              <div className="text-2xl font-bold text-gray-900">{stats.userStats.totalUsers}</div>
              <div className="text-xs text-gray-500 mt-1">{stats.userStats.totalCustomers} Customers • {stats.userStats.totalOwners} Owners</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Pending KYC</div>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingApprovals.kyc}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Projects to Verify</div>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingApprovals.projects}</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Open Support Tickets</div>
              <div className="text-2xl font-bold text-gray-900">{stats.openSupportTickets}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-10 text-center text-red-500">Failed to load dashboard data.</div>
      )}
    </div>
  );
}
