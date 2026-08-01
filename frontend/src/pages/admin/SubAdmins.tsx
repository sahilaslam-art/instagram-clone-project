import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminSubAdmins() {
  const [subAdmins, setSubAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

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



  if (currentUser?.role.toUpperCase() !== 'SUPER_ADMIN') {
    return <div className="p-10 text-center text-red-500">Access Denied. Super Admin only.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sub-Admins Management</h1>
        <p className="text-gray-500">View registered Sub-Admins in the system.</p>
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
