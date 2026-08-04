import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, FileText, CheckCircle, Clock, XCircle, ArrowLeft } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminStaffDetails() {
  const { userId } = useParams<{ userId: string }>();
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // Document Preview State
  const [previewDoc, setPreviewDoc] = useState<{ title: string; url: string; type: string } | null>(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchDetails(userId);
    }
  }, [userId]);

  const fetchDetails = async (id: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/staff-details/${id}`);
      setDetails(res.data.data);
    } catch (err) {
      console.error('Failed to load staff details', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (kycId: string, status: 'Verified' | 'Rejected') => {
    let rejectionReason;
    if (status === 'Rejected') {
      rejectionReason = window.prompt('Please enter a rejection reason:');
      if (!rejectionReason) return;
    }

    try {
      setLoading(true);
      await api.put(`/admin/staff-verification/${kycId}/review`, { status, rejectionReason });
      alert(`Staff member ${status.toLowerCase()} successfully!`);
      fetchDetails(userId!);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update verification status');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: 'Active' | 'Suspended' | 'Hold') => {
    if (!window.confirm(`Are you sure you want to change this account's status to ${newStatus}?`)) return;
    try {
      setLoading(true);
      await api.put(`/admin/users/${userId}/status`, { accountStatus: newStatus });
      alert(`Account status updated to ${newStatus}`);
      fetchDetails(userId!);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update account status');
    } finally {
      setLoading(false);
    }
  };


  const allowedRoles = ['SUPER_ADMIN', 'ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN'];
  if (!allowedRoles.includes(currentUser?.role.toUpperCase() || '')) {
    return <div className="p-10 text-center text-red-500">Access Denied. Admins only.</div>;
  }

  if (loading || !details) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  const { user, kyc, activities } = details;

  const renderDocument = (title: string, doc: { url: string; fileType: string } | undefined) => {
    if (!doc || !doc.url) {
      return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3 text-gray-400">
            <FileText className="w-5 h-5" />
            <span className="font-medium">{title}</span>
          </div>
          <span className="text-sm text-gray-400">Not Uploaded</span>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 text-gray-900">
          <FileText className="w-5 h-5 text-indigo-500" />
          <span className="font-medium">{title}</span>
        </div>
        <button
          onClick={() => setPreviewDoc({ title, url: doc.url, type: doc.fileType })}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
        >
          View Document
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Profile</h1>
          <p className="text-gray-500">View detailed information and activities of {user.fullName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                {user.fullName.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{user.fullName}</h2>
                <p className="text-sm text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Phone</p>
                <p className="text-gray-900">{user.mobileNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Account Status</p>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.accountStatus === 'Active' ? 'bg-green-100 text-green-800' : 
                    user.accountStatus === 'Suspended' ? 'bg-red-100 text-red-800' : 
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {user.accountStatus || 'Active'}
                  </span>
                  
                  {/* Action Dropdown for Super Admin */}
                  <select 
                    className="text-xs border border-gray-300 rounded-md px-2 py-1 bg-white shadow-sm focus:outline-none focus:border-indigo-500"
                    value={user.accountStatus || 'Active'}
                    onChange={(e) => handleStatusUpdate(e.target.value as any)}
                  >
                    <option value="Active">Mark Active</option>
                    <option value="Hold">Put On Hold</option>
                    <option value="Suspended">Suspend</option>
                  </select>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">KYC Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 
                  user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {user.kycStatus || 'Incomplete'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Geographic Mapping</h3>
            <div className="space-y-3">
              {user.domain && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Domain</span>
                  <span className="font-medium text-gray-900">{user.domain}</span>
                </div>
              )}
              {user.zone && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Zone</span>
                  <span className="font-medium text-gray-900">{user.zone}</span>
                </div>
              )}
              {user.region && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Region</span>
                  <span className="font-medium text-gray-900">{user.region}</span>
                </div>
              )}
              {!user.domain && !user.zone && !user.region && (
                <p className="text-sm text-gray-500 italic">No geographic mapping found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Documents and Activities */}
        <div className="lg:col-span-2 space-y-6">
          
          {kyc && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Personal Info</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">DOB:</span> {new Date(kyc.dateOfBirth).toLocaleDateString()}</p>
                    <p><span className="text-gray-500">Gender:</span> {kyc.gender}</p>
                    <p><span className="text-gray-500">Address:</span> {kyc.address}</p>
                  </div>
                </div>
                {kyc.bankInfo && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 border-b pb-1">Bank Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Bank:</span> {kyc.bankInfo.bankName}</p>
                      <p><span className="text-gray-500">A/C Name:</span> {kyc.bankInfo.accountHolderName}</p>
                      <p><span className="text-gray-500">A/C No:</span> {kyc.bankInfo.accountNumber}</p>
                      <p><span className="text-gray-500">IFSC:</span> {kyc.bankInfo.ifscCode}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">KYC Documents</h3>
            {kyc ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderDocument('ID Proof', kyc.documents?.identityProof ? { url: kyc.documents.identityProof, fileType: 'image/jpeg' } : undefined)}
                {renderDocument('Address Proof', kyc.documents?.addressProof ? { url: kyc.documents.addressProof, fileType: 'image/jpeg' } : undefined)}
                {renderDocument('Bank Proof', kyc.documents?.bankProof ? { url: kyc.documents.bankProof, fileType: 'image/jpeg' } : undefined)}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No KYC documents uploaded yet.
              </div>
            )}
            
            {kyc && user.kycStatus === 'Pending' && (
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => handleVerify(kyc._id, 'Rejected')}
                  disabled={loading}
                  className="px-6 py-2.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Reject
                </button>
                <button
                  onClick={() => handleVerify(kyc._id, 'Verified')}
                  disabled={loading}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve Verification
                </button>
              </div>
            )}

          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-900 flex justify-between items-center">
              <span>Recent Verifications by this Staff</span>
              <span className="text-xs font-medium px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                {activities.length} Users
              </span>
            </div>
            
            {activities.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                This staff member has not verified anyone yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {activities.map((act: any) => (
                  <li key={act._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          act.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {act.status === 'Verified' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{act.userId?.fullName || 'Unknown User'}</p>
                          <p className="text-xs text-gray-500 capitalize">{act.userId?.role?.replace('_', ' ')} - {act.userId?.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">
                          {new Date(act.updatedAt).toLocaleDateString()}
                        </span>
                        <span className={`text-xs font-medium ${act.status === 'Verified' ? 'text-green-600' : 'text-red-600'}`}>
                          {act.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 sm:p-8">
          <div className="bg-white rounded-xl shadow-2xl flex flex-col w-full h-full max-w-6xl max-h-full overflow-hidden relative">
            
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                {previewDoc.title}
              </h3>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Close"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-4">
              {previewDoc.url.startsWith('data:image/') || previewDoc.type?.startsWith('image/') ? (
                <img 
                  src={previewDoc.url} 
                  alt={previewDoc.title} 
                  className="max-w-full max-h-full object-contain shadow-md rounded border border-gray-200 bg-white"
                />
              ) : previewDoc.url.startsWith('data:application/pdf') || previewDoc.type === 'application/pdf' ? (
                <iframe 
                  src={previewDoc.url} 
                  title={previewDoc.title}
                  className="w-full h-full border-0 shadow-md rounded bg-white"
                />
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Preview not supported for this file type.</p>
                  <a 
                    href={previewDoc.url}
                    download
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-block"
                  >
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
