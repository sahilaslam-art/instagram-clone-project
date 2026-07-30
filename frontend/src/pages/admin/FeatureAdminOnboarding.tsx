import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, ShieldCheck, ShieldAlert, FileText, Upload } from 'lucide-react';
import api from '../../services/api';

export default function FeatureAdminOnboarding() {
  const { currentUser, updateUser } = useAuth();
  const [kycData, setKycData] = useState({
    fullName: currentUser?.fullName || '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    appliedFeatureRole: 'KYC Admin', // Default Feature Role
    bankInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: ''
    },
    documents: {
      identityProof: 'https://example.com/id-proof.jpg',
      addressProof: 'https://example.com/address-proof.jpg',
      bankProof: 'https://example.com/bank-proof.jpg'
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setKycData(prev => ({ ...prev, fullName: currentUser.fullName || '' }));
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // The backend route is specifically for feature admins now
      await api.post('/admin/feature-admin/kyc', kycData); 
      updateUser({ kycStatus: 'Pending' });
      alert('Application submitted successfully. It is now under review.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const isVerified = currentUser.kycStatus === 'Verified';
  const showKycForm = currentUser.kycStatus === 'Incomplete' || currentUser.kycStatus === 'Not Submitted' || currentUser.kycStatus === 'Rejected' || !currentUser.kycStatus;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feature Admin Onboarding</h1>
        <p className="text-gray-500">Complete your profile to become a Feature Admin.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
            {isVerified ? (
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-amber-500" />
            )}
            <div>
              <div className="font-semibold text-gray-900">Application Status</div>
              <div className={`text-sm font-medium ${
                isVerified ? 'text-emerald-600' : 'text-amber-500'
              }`}>
                {currentUser.kycStatus || 'Incomplete'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{currentUser.fullName}</div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{currentUser.email}</div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4" /> Phone Number
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{currentUser.mobileNumber}</div>
          </div>
        </div>
      </div>

      {showKycForm && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-blue-50 border-b border-blue-100 flex items-start gap-3">
            <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Apply for Admin Role</h2>
              <p className="text-sm text-gray-600 mt-1">Please submit your details and select the admin role you are applying for.</p>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleKycSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Role You Are Applying For</label>
                  <select required value={kycData.appliedFeatureRole} onChange={e => setKycData({...kycData, appliedFeatureRole: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="KYC Admin">KYC Admin (Verifies User Accounts)</option>
                    <option value="Finance Admin">Finance Admin (Manages Withdrawals & Transactions)</option>
                    <option value="Support Admin">Support Admin (Handles Tickets)</option>
                    <option value="Project Admin">Project Admin (Reviews Project Pitches)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input required type="date" value={kycData.dateOfBirth} onChange={e => setKycData({...kycData, dateOfBirth: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select required value={kycData.gender} onChange={e => setKycData({...kycData, gender: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Residential Address</label>
                  <textarea required rows={3} value={kycData.address} onChange={e => setKycData({...kycData, address: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">Bank Details (For Admin Payroll)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                    <input required type="text" value={kycData.bankInfo.accountHolderName} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, accountHolderName: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input required type="text" value={kycData.bankInfo.bankName} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, bankName: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input required type="text" value={kycData.bankInfo.accountNumber} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, accountNumber: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input required type="text" value={kycData.bankInfo.ifscCode} onChange={e => setKycData({...kycData, bankInfo: {...kycData.bankInfo, ifscCode: e.target.value}})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">Documents</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600 flex items-center gap-3">
                  <Upload className="w-5 h-5 text-gray-400" />
                  For testing purposes, dummy document URLs are automatically populated.
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
