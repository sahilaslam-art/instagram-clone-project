import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminFeatureRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role.toUpperCase() === 'SUPER_ADMIN' || currentUser?.role.toUpperCase() === 'SUB_ADMIN';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/feature-requests');
      setRequests(res.data.data || []);
    } catch (err) {
      console.error('Failed to load feature admin requests', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (requestId: string, status: 'Verified' | 'Rejected') => {
    let rejectionReason;
    if (status === 'Rejected') {
      rejectionReason = window.prompt('Please enter a rejection reason:');
      if (!rejectionReason) return; // cancelled
    }

    try {
      setLoading(true);
      await api.put(`/admin/feature-requests/${requestId}/review`, { status, rejectionReason });
      alert(`Request ${status.toLowerCase()} successfully!`);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update request');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return <div className="p-10 text-center text-red-500">Access Denied. Admins only.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feature Admin Requests</h1>
        <p className="text-gray-500">
          {currentUser?.role.toUpperCase() === 'SUB_ADMIN' 
            ? 'Review initial feature admin applications before sending them to the Super Admin.' 
            : 'Final review and approval of feature admin applications.'}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Applicant Name</th>
              <th className="px-6 py-3 font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 font-medium text-gray-500">Applied Role</th>
              <th className="px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No pending requests found.</td>
              </tr>
            ) : (
              requests.map(req => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{req.fullName}</td>
                  <td className="px-6 py-4 text-gray-500">{req.userId?.email}</td>
                  <td className="px-6 py-4 font-medium text-blue-600">{req.appliedFeatureRole || 'Feature_Admin'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      currentUser?.role.toUpperCase() === 'SUPER_ADMIN' 
                        ? (req.subAdminDecision === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {currentUser?.role.toUpperCase() === 'SUPER_ADMIN' ? `Sub-Admin: ${req.subAdminDecision}` : 'Pending Review'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleReview(req._id, 'Verified')}
                        disabled={loading}
                        className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50" title="Approve"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleReview(req._id, 'Rejected')}
                        disabled={loading}
                        className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50" title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
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
