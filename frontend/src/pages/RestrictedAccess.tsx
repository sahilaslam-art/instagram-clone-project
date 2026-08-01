import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, LogOut, Upload } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function RestrictedAccess() {
  const { currentUser, logout, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // KYC Form State
  const [kycData, setKycData] = useState({
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    bankInfo: { accountHolderName: '', bankName: '', accountNumber: '', ifscCode: '' },
    documents: { idProof: '', addressProof: '', bankProof: '' }
  });

  if (!currentUser) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // If active, they shouldn't be here
  if (currentUser.accountStatus === 'Active') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <ShieldAlert className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account is Active</h1>
          <p className="text-gray-500 mb-6">Your account is fully active. You can proceed to the dashboard.</p>
          <button onClick={() => navigate('/')} className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = URL.createObjectURL(file); // Temporary mock URL for frontend preview
      
      setKycData(prev => ({
        ...prev,
        documents: { ...prev.documents, [type]: url }
      }));
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload document');
    }
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/admin/kyc/submit', kycData);
      alert('KYC submitted successfully. It is now under review by the Admin.');
      await checkAuth(); // Refresh user state (kycStatus should become Pending)
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit KYC');
    } finally {
      setLoading(false);
    }
  };

  const isSuspended = currentUser.accountStatus === 'Suspended';
  const isHold = currentUser.accountStatus === 'Hold';
  const kycPending = currentUser.kycStatus === 'Pending';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden">
          {/* Header */}
          <div className={`p-8 text-center ${isHold ? 'bg-amber-50 border-b border-amber-100' : 'bg-red-50 border-b border-red-100'}`}>
            <ShieldAlert className={`w-16 h-16 mx-auto mb-4 ${isHold ? 'text-amber-500' : 'text-red-500'}`} />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isHold ? 'Account Temporarily On Hold' : 'Account Suspended'}
            </h1>
            <p className="text-gray-600 text-lg">
              {isHold 
                ? 'Your account has been temporarily placed on hold by the administrator. Please contact support for more information.'
                : 'Your account has been suspended. You must submit your KYC documents again for verification.'}
            </p>
          </div>

          {/* Action Area */}
          <div className="p-8">
            {isHold ? (
              <div className="text-center">
                <button onClick={logout} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : isSuspended && kycPending ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">KYC Under Review</h3>
                <p className="text-gray-500 mb-6">Your submitted documents are currently being reviewed by our team. You will be notified once the verification is complete.</p>
                <button onClick={logout} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            ) : isSuspended && !kycPending ? (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Submit KYC Documents</h2>
                  <p className="text-gray-500">Please provide your updated details and legal documents.</p>
                </div>

                <form onSubmit={handleKycSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input required type="date" value={kycData.dateOfBirth} onChange={e => setKycData({...kycData, dateOfBirth: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select required value={kycData.gender} onChange={e => setKycData({...kycData, gender: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Residential Address</label>
                      <textarea required rows={3} value={kycData.address} onChange={e => setKycData({...kycData, address: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-4">Bank Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                        <input required type="text" value={kycData.bankInfo.accountHolderName} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, accountHolderName: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input required type="text" value={kycData.bankInfo.bankName} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, bankName: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                        <input required type="text" value={kycData.bankInfo.accountNumber} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, accountNumber: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                        <input required type="text" value={kycData.bankInfo.ifscCode} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, ifscCode: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-4">Upload Legal Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* ID Proof */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">ID Proof</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                          <input type="file" accept="image/*,.pdf" className="hidden" id="idProofUpload" onChange={(e) => handleFileUpload(e, 'idProof')} required />
                          <label htmlFor="idProofUpload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-8 h-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-600">Click to upload</span>
                            <span className="text-xs text-gray-400 mt-1">
                              {kycData.documents.idProof ? 'File selected ✓' : 'JPEG, PNG or PDF'}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Address Proof */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Address Proof</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                          <input type="file" accept="image/*,.pdf" className="hidden" id="addressProofUpload" onChange={(e) => handleFileUpload(e, 'addressProof')} required />
                          <label htmlFor="addressProofUpload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-8 h-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-600">Click to upload</span>
                            <span className="text-xs text-gray-400 mt-1">
                              {kycData.documents.addressProof ? 'File selected ✓' : 'JPEG, PNG or PDF'}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Bank Proof */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Bank Proof (Passbook)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-500 transition-colors">
                          <input type="file" accept="image/*,.pdf" className="hidden" id="bankProofUpload" onChange={(e) => handleFileUpload(e, 'bankProof')} required />
                          <label htmlFor="bankProofUpload" className="cursor-pointer flex flex-col items-center">
                            <Upload className="w-8 h-8 text-red-500 mb-2" />
                            <span className="text-sm text-gray-600">Click to upload</span>
                            <span className="text-xs text-gray-400 mt-1">
                              {kycData.documents.bankProof ? 'File selected ✓' : 'JPEG, PNG or PDF'}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button type="button" onClick={logout} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      Sign Out
                    </button>
                    <button type="submit" disabled={loading} className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70">
                      {loading ? 'Submitting...' : 'Submit Documents'}
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
