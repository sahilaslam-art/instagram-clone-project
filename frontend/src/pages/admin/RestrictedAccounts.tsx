import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ShieldAlert, AlertCircle, Ban, CheckCircle, RefreshCcw, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RestrictedAccounts() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/restricted-accounts');
      setAccounts(res.data.data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async (userId: string) => {
    if (!window.confirm('Are you sure you want to reactivate this account?')) return;
    try {
      setActionLoading(userId);
      await api.put(`/admin/users/${userId}/status`, { accountStatus: 'Active' });
      // Remove from list
      setAccounts(accounts.filter(acc => acc._id !== userId));
      alert('Account has been reactivated successfully.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to reactivate account');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const suspendedAccounts = accounts.filter(a => a.accountStatus === 'Suspended');
  const holdAccounts = accounts.filter(a => a.accountStatus === 'Hold');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Restricted Accounts</h1>
        <p className="text-gray-500">Manage suspended and on-hold user accounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Ban className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">Suspended ({suspendedAccounts.length})</h2>
          </div>
          <p className="text-sm text-red-700">These accounts must re-submit their KYC documents to be reviewed.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <h2 className="text-lg font-semibold text-amber-900">On Hold ({holdAccounts.length})</h2>
          </div>
          <p className="text-sm text-amber-700">These accounts are temporarily paused and cannot access the platform.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {accounts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>No restricted accounts found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">User</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">KYC Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accounts.map(acc => (
                  <tr key={acc._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{acc.fullName}</div>
                      <div className="text-sm text-gray-500">{acc.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                        {acc.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        acc.accountStatus === 'Suspended' ? 'bg-red-50 text-red-700 border border-red-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {acc.accountStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        acc.kycStatus === 'Verified' ? 'bg-green-50 text-green-700' :
                        acc.kycStatus === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {acc.kycStatus || 'Incomplete'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      {['Admin', 'Sub_Admin', 'Worker', 'Zonal_Admin'].includes(acc.role) ? (
                        <Link 
                          to={`/admin/staff/${acc._id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          View Profile
                        </Link>
                      ) : null}
                      <button
                        onClick={() => handleReactivate(acc._id)}
                        disabled={actionLoading === acc._id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        {actionLoading === acc._id ? (
                          <RefreshCcw className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Re-Activate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
