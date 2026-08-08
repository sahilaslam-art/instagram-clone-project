import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X, Search } from 'lucide-react';
import api from '../../services/api';

export default function AdminOwners() {
  const [owners, setOwners] = useState<any[]>([]);
  const [pendingKycs, setPendingKycs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'REGISTERED' | 'PENDING' | 'DENIED' | 'VERIFIED' | 'SUSPENDED'>('REGISTERED');
  const [selectedKyc, setSelectedKyc] = useState<any | null>(null);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const limit = 20;

  useEffect(() => {
    fetchData();
  }, [page, tab, searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (searchQuery) params.append('search', searchQuery);

      if (tab === 'REGISTERED') params.append('accountStatus', 'Incomplete');
      else if (tab === 'PENDING') params.append('accountStatus', 'Pending');
      else if (tab === 'DENIED') params.append('accountStatus', 'Rejected');
      else if (tab === 'VERIFIED') params.append('accountStatus', 'Verified');
      else if (tab === 'SUSPENDED') params.append('accountStatus', 'Suspended Account');

      const [ownersRes, kycRes] = await Promise.all([
        api.get(`/admin/owners?${params.toString()}`),
        api.get('/admin/kyc/pending') // This is used for pending KYC modal operations
      ]);
      setOwners(ownersRes.data.data.data || []);
      setPendingKycs(kycRes.data.data || []);

      const total = ownersRes.data.data.total || 0;
      setTotalRecords(total);
      setTotalPages(Math.ceil(total / limit) || 1);
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
      setSelectedKyc(null);
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

  const handleRowClick = async (ownerId: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/kyc/user/${ownerId}`);
      setSelectedKyc(res.data.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'KYC data not found for this user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Owner Verification</h1>
        <p className="text-gray-500">Review and approve new project owner registrations. Total: {totalRecords}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-2">
        <div className="flex gap-4 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'REGISTERED', label: 'Registered' },
            { id: 'PENDING', label: 'Pending Verification' },
            { id: 'DENIED', label: 'Denied Verification' },
            { id: 'VERIFIED', label: 'Verified Verification' },
            { id: 'SUSPENDED', label: 'Suspended Verification' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id as any); setPage(1); }}
              className={`pb-3 px-1 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === t.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search by name / phone no. / email..." 
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
          />
        </div>
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
              const filteredOwners = owners;

              if (filteredOwners.length === 0) {
                return (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No {tab.toLowerCase()} owners found.</td>
                  </tr>
                );
              }

              return filteredOwners.map(owner => (
                <tr 
                  key={owner._id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(owner._id)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">{owner.fullName}</td>
                  <td className="px-6 py-4 text-gray-500">{owner.email}</td>
                  <td className="px-6 py-4 text-gray-500">{owner.mobileNumber}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      owner.accountStatus === 'Suspended' ? 'bg-red-100 text-red-700' :
                      owner.kycStatus === 'Verified' ? 'bg-green-100 text-green-700' :
                      owner.kycStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {owner.accountStatus === 'Suspended' ? 'Suspended Account' : owner.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 items-center">
                      {owner.kycStatus === 'Verified' ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (owner.accountStatus === 'Active') handleStatusUpdate(owner._id, 'Suspended', owner.kycStatus);
                          }}
                          className={`text-xs font-medium rounded-md px-3 py-1.5 shadow-sm transition-colors ${
                            owner.accountStatus === 'Active' 
                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' 
                              : 'bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed'
                          }`}
                          disabled={loading || owner.accountStatus === 'Suspended'}
                        >
                          {owner.accountStatus === 'Active' ? 'Suspend Account' : 'Account Suspended'}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 italic bg-gray-50 px-2 py-1 rounded">Verify to manage</span>
                      )}
                    </div>
                  </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Document Review Modal */}
      {selectedKyc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl border border-gray-200 overflow-hidden my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Owner Review: {selectedKyc.fullName}
              </h2>
              <button 
                onClick={() => setSelectedKyc(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Personal Info</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700">DOB:</span> {new Date(selectedKyc.dateOfBirth).toLocaleDateString()}</p>
                    <p><span className="font-medium text-gray-700">Gender:</span> {selectedKyc.gender}</p>
                    <p><span className="font-medium text-gray-700">Address:</span> {selectedKyc.address}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Bank Info</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2 text-sm">
                    <p><span className="font-medium text-gray-700">Account Name:</span> {selectedKyc.bankInfo?.accountHolderName}</p>
                    <p><span className="font-medium text-gray-700">Bank:</span> {selectedKyc.bankInfo?.bankName}</p>
                    <p><span className="font-medium text-gray-700">A/c No:</span> {selectedKyc.bankInfo?.accountNumber}</p>
                    <p><span className="font-medium text-gray-700">IFSC:</span> {selectedKyc.bankInfo?.ifscCode}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Uploaded Documents</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedKyc.documents && Object.entries(selectedKyc.documents).map(([key, url]) => {
                    if (key === 'additionalDocuments' || !url) return null;
                    return (
                      <button 
                        key={key}
                        onClick={() => setPreviewDoc(url as string)}
                        className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">Click to view document</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => handleVerify(selectedKyc.userId?._id, 'Rejected')}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <XCircle className="w-5 h-5" /> Reject Profile
              </button>
              <button 
                onClick={() => handleVerify(selectedKyc.userId?._id, 'Verified')}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" /> Approve Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Fullscreen Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/90 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl max-h-screen flex flex-col items-center justify-center">
            <button 
              onClick={() => setPreviewDoc(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            {previewDoc.startsWith('data:application/pdf') ? (
              <iframe src={previewDoc} className="w-full h-[85vh] bg-white rounded-lg shadow-2xl" />
            ) : (
              <img src={previewDoc} alt="Document Preview" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl bg-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
