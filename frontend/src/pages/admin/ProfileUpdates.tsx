import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import api from '../../services/api';

export default function AdminProfileUpdates() {
  const [profileUpdateRequests, setProfileUpdateRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/profile-updates');
      setProfileUpdateRequests(res.data.data || []);
    } catch (err) {
      console.error('Failed to load profile updates', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id: string, status: 'Approved' | 'Rejected') => {
    let rejectionReason;
    if (status === 'Rejected') {
      rejectionReason = window.prompt('Please enter a rejection reason:');
      if (!rejectionReason) return;
    }

    try {
      setLoading(true);
      await api.put(`/admin/profile-updates/${id}/review`, { status, rejectionReason });
      alert(`Request ${status.toLowerCase()} successfully!`);
      fetchRequests();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Update Validation</h1>
        <p className="text-gray-500">Review and approve owner profile updates.</p>
      </div>

      {loading && profileUpdateRequests.length === 0 ? (
        <div className="py-10 text-center text-gray-500">Loading requests...</div>
      ) : profileUpdateRequests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          No profile update requests pending.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {profileUpdateRequests.map(req => (
            <div key={req._id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Request from {req.ownerId?.fullName || 'Unknown Owner'}</h3>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">Pending</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Old Details</h4>
                    <pre className="bg-red-50 p-3 rounded-lg text-sm text-red-900 whitespace-pre-wrap">
                      {JSON.stringify(req.oldDetails, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">New Details</h4>
                    <pre className="bg-green-50 p-3 rounded-lg text-sm text-green-900 whitespace-pre-wrap">
                      {JSON.stringify(req.newDetails, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-32 justify-center">
                <button 
                  onClick={() => handleReview(req._id, 'Approved')}
                  disabled={loading}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button 
                  onClick={() => handleReview(req._id, 'Rejected')}
                  disabled={loading}
                  className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
