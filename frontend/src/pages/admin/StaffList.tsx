import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Eye } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminStaffList() {
  const { role } = useParams<{ role: string }>();
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      fetchStaff(role);
    }
  }, [role]);

  const fetchStaff = async (roleType: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/staff-list/${roleType}`);
      setStaff(res.data.data || []);
    } catch (err) {
      console.error('Failed to load staff', err);
    } finally {
      setLoading(false);
    }
  };

  const allowedRoles = ['SUPER_ADMIN', 'ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN'];
  if (!allowedRoles.includes(currentUser?.role.toUpperCase() || '')) {
    return <div className="p-10 text-center text-red-500">Access Denied. Admins only.</div>;
  }

  const roleTitle = role?.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + 's';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{roleTitle} Management</h1>
        <p className="text-gray-500">View registered {roleTitle} in the system.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          Current {roleTitle}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 font-medium text-gray-500">Phone</th>
                <th className="px-6 py-3 font-medium text-gray-500">Geographic Mapping</th>
                <th className="px-6 py-3 font-medium text-gray-500">KYC Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No {roleTitle} found.</td>
                </tr>
              ) : (
                staff.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.fullName}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-gray-500">{user.mobileNumber}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {[user.domain, user.zone, user.region].filter(Boolean).join(' > ') || 'None'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 
                        user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.kycStatus || 'Incomplete'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/admin/staff-details/${user._id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
