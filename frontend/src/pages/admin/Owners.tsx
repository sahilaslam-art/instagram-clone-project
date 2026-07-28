import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';

export default function AdminOwners() {
  const [owners, setOwners] = useState<any[]>([]);
  const [pendingKycs, setPendingKycs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'REGISTERED' | 'PENDING' | 'DENIED' | 'VERIFIED' | 'SUSPENDED'>('REGISTERED');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ownersRes, kycRes] = await Promise.all([
        api.get('/admin/owners'),
        api.get('/admin/kyc/pending')
      ]);
      setOwners(ownersRes.data.data || []);
      setPendingKycs(kycRes.data.data || []);
    } catch (err) {
      console.error('Failed to load owners', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId: string, status: 'Verified' | 'Rejected') => {
    const kyc = pendingKycs.find(k => k.userId?._id === userId);
    if (!kyc) {
      alert('KYC record not found for this user. Ensure they submitted KYC.');
      return;
    }

    let rejectionReason;
    if (status === 'Rejected') {
      rejectionReason = window.prompt('Please enter a rejection reason:');
      if (!rejectionReason) return; // cancelled
    }

    try {
      setLoading(true);
      await api.put(`/admin/kyc/${kyc._id}/verify`, { status, rejectionReason });
      alert(`User ${status.toLowerCase()} successfully!`);
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update verification status');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId: string, accountStatus: string, kycStatus: string) => {
    try {
      setLoading(true);
      await api.put(`/admin/users/${userId}/status`, { accountStatus, kycStatus });
      alert('User status updated successfully!');
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update user status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Owner Verification</h1>
        <p className="text-gray-500">Review and approve new project owner registrations.</p>
      </div>

      <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
        {[
          { id: 'REGISTERED', label: 'Registered' },
          { id: 'PENDING', label: 'Pending Verification' },
          { id: 'DENIED', label: 'Denied Verification' },
          { id: 'VERIFIED', label: 'Verified Verification' },
          { id: 'SUSPENDED', label: 'Suspended Verification' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              tab === t.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>


      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Company / Name</th>
              <th className="px-6 py-3 font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 font-medium text-gray-500">Phone</th>
              <th className="px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && owners.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : (() => {
              const filteredOwners = owners.filter(owner => {
                if (tab === 'REGISTERED') return owner.kycStatus === 'Incomplete';
                if (tab === 'PENDING') return owner.kycStatus === 'Pending';
                if (tab === 'DENIED') return owner.kycStatus === 'Rejected';
                if (tab === 'VERIFIED') return owner.kycStatus === 'Verified';
                if (tab === 'SUSPENDED') return owner.accountStatus === 'Inactive' || owner.kycStatus === 'Suspended';
                return true;
              });

              if (filteredOwners.length === 0) {
                return (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No {tab.toLowerCase()} owners found.</td>
                  </tr>
                );
              }

              return filteredOwners.map(owner => (
                <tr key={owner._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{owner.fullName}</td>
                  <td className="px-6 py-4 text-gray-500">{owner.email}</td>
                  <td className="px-6 py-4 text-gray-500">{owner.mobileNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      owner.kycStatus === 'Verified' ? 'bg-green-100 text-green-700' :
                      owner.kycStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {owner.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {tab === 'PENDING' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleVerify(owner._id, 'Verified')}
                          disabled={loading}
                          className="p-1 text-green-600 hover:bg-green-50 rounded disabled:opacity-50" title="Approve"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleVerify(owner._id, 'Rejected')}
                          disabled={loading}
                          className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50" title="Reject"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    {tab === 'VERIFIED' && owner.accountStatus !== 'Inactive' && (
                      <button 
                        onClick={() => handleStatusUpdate(owner._id, 'Inactive', 'Verified')}
                        disabled={loading}
                        className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        Suspend
                      </button>
                    )}
                    {tab === 'SUSPENDED' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(owner._id, 'Active', 'Pending')}
                          disabled={loading}
                          className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors disabled:opacity-50"
                        >
                          To Pending
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(owner._id, 'Active', 'Verified')}
                          disabled={loading}
                          className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                        >
                          To Verified
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
