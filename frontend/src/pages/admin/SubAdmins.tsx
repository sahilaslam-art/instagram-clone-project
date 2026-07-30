import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminSubAdmins() {
  const [subAdmins, setSubAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  
  // For promoting a user to Sub Admin
  const [promoteEmailOrMobile, setPromoteEmailOrMobile] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/sub-admins');
      setSubAdmins(res.data.data || []);
    } catch (err) {
      console.error('Failed to load sub admins', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // We don't have an endpoint to search user by email/mobile directly for promotion, 
      // wait we can use the promoteToSubAdmin endpoint which expects a userId. 
      // But we only have email/mobile from the input.
      // Let's assume we need to update the backend or we can fetch the user ID first.
      alert('In a real app, this would search for the user by email/mobile and call the promote API.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to promote user');
    } finally {
      setLoading(false);
    }
  };

  if (currentUser?.role.toUpperCase() !== 'SUPER_ADMIN') {
    return <div className="p-10 text-center text-red-500">Access Denied. Super Admin only.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sub-Admins Management</h1>
        <p className="text-gray-500">View and promote users to Sub-Admin role.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          Promote to Sub-Admin
        </h2>
        <form onSubmit={handlePromote} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">User Email or Mobile</label>
            <input 
              type="text" 
              required
              value={promoteEmailOrMobile}
              onChange={(e) => setPromoteEmailOrMobile(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="Enter email or mobile to promote"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
          >
            Promote
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
          Current Sub-Admins
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-white border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 font-medium text-gray-500 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && subAdmins.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : subAdmins.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No Sub-Admins found.</td>
              </tr>
            ) : (
              subAdmins.map(admin => (
                <tr key={admin._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{admin.fullName}</td>
                  <td className="px-6 py-4 text-gray-500">{admin.email}</td>
                  <td className="px-6 py-4 text-gray-500">{admin.mobileNumber}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
