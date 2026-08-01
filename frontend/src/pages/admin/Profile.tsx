import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Briefcase, MapPin, ListTree, AlignLeft, ShieldCheck, ShieldAlert, FileText, Upload } from 'lucide-react';
import api from '../../services/api';

export default function AdminProfile() {
  const { currentUser, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    mobileNumber: currentUser?.mobileNumber || ''
  });
  
  const [kycData, setKycData] = useState({
    fullName: currentUser?.fullName || '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
    bankInfo: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: ''
    },
    documents: {
      identityProof: '',
      addressProof: '',
      bankProof: ''
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        mobileNumber: currentUser.mobileNumber || ''
      });
      setKycData(prev => ({ ...prev, fullName: currentUser.fullName || '' }));
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const handleSave = async () => {
    try {
      setLoading(true);
      // Fallback local update since specific admin profile PUT might not exist
      alert('Note: Updating admin profile via API is not fully implemented. Updating locally for now.');
      updateUser(formData);
      setIsEditing(false);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update profile');
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (e.g. limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should not exceed 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setKycData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [field]: reader.result as string
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/admin/kyc/submit', kycData);
      updateUser({ kycStatus: 'Pending' });
      alert('KYC submitted successfully. It is now under review by your Senior Admin.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit KYC');
    } finally {
      setLoading(false);
    }
  };

  const isVerified = currentUser.kycStatus === 'Verified';
  const showKycForm = currentUser.kycStatus === 'Incomplete' || currentUser.kycStatus === 'Not Submitted' || currentUser.kycStatus === 'Rejected' || !currentUser.kycStatus;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500">View and manage your platform admin identity.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
            {isVerified ? (
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-amber-500" />
            )}
            <div>
              <div className="font-semibold text-gray-900">Verification Status</div>
              <div className={`text-sm font-medium ${
                isVerified ? 'text-blue-600' : 'text-amber-500'
              }`}>
                {currentUser.kycStatus || 'Incomplete'}
              </div>
            </div>
          </div>
          {!isEditing && !showKycForm && (
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
            >
              Edit Details
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-900">System Role</div>
              <div className="text-sm font-medium text-blue-600 capitalize">
                {currentUser.role.replace('_', ' ')}
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            {isEditing ? (
              <input 
                type="text" 
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{currentUser.fullName}</div>
            )}
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
            {isEditing ? (
              <input 
                type="text" 
                value={formData.mobileNumber}
                onChange={e => setFormData({...formData, mobileNumber: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{currentUser.mobileNumber}</div>
            )}
          </div>
          
          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    fullName: currentUser.fullName || '',
                    mobileNumber: currentUser.mobileNumber || ''
                  });
                }}
                disabled={loading}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      {showKycForm && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden mt-6">
          <div className="p-6 bg-blue-50 border-b border-blue-100 flex items-start gap-3">
            <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Complete Your Staff Verification</h2>
              <p className="text-sm text-gray-600 mt-1">Please submit your details to verify your identity. This is required before you can access the staff dashboard and perform your duties.</p>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleKycSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <h3 className="font-medium text-gray-900 mb-4">Bank Details</h3>
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
                <h3 className="font-medium text-gray-900 mb-4">Documents (Max 2MB per file)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Identity Proof (Aadhaar/ID) */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Identity Proof (Aadhaar / Voter ID)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        className="hidden" 
                        id="identityProofUpload"
                        onChange={(e) => handleFileUpload(e, 'identityProof')}
                        required
                      />
                      <label htmlFor="identityProofUpload" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-sm text-gray-600">Click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">
                          {kycData.documents.identityProof ? 'File selected ✓' : 'JPEG, PNG or PDF'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Address Proof (Pan Card) */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Address Proof (PAN Card / Utility Bill)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        className="hidden" 
                        id="addressProofUpload"
                        onChange={(e) => handleFileUpload(e, 'addressProof')}
                        required
                      />
                      <label htmlFor="addressProofUpload" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-sm text-gray-600">Click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">
                          {kycData.documents.addressProof ? 'File selected ✓' : 'JPEG, PNG or PDF'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Bank Proof (Passbook) */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Bank Proof (Passbook / Cancelled Cheque)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        className="hidden" 
                        id="bankProofUpload"
                        onChange={(e) => handleFileUpload(e, 'bankProof')}
                        required
                      />
                      <label htmlFor="bankProofUpload" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-sm text-gray-600">Click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">
                          {kycData.documents.bankProof ? 'File selected ✓' : 'JPEG, PNG or PDF'}
                        </span>
                      </label>
                    </div>
                  </div>

                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Submit Profile Documents'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {(currentUser as any).featureRole && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden mt-6">
          <div className="p-6 bg-blue-50 border-b border-blue-100 flex items-start gap-3">
            <ListTree className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Hierarchy & Department Assignment</h2>
              <p className="text-sm text-gray-600 mt-1">Your assigned geographic and operational scope.</p>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <AlignLeft className="w-4 h-4" /> Department (Feature Role)
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 font-medium">
                  {(currentUser as any).featureRole}
                </div>
              </div>

              {(currentUser as any).domain && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" /> Domain Assignment
                  </label>
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {(currentUser as any).domain}
                  </div>
                </div>
              )}

              {(currentUser as any).zone && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" /> Zone Assignment
                  </label>
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {(currentUser as any).zone}
                  </div>
                </div>
              )}

              {(currentUser as any).region && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" /> Region Assignment
                  </label>
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {(currentUser as any).region}
                  </div>
                </div>
              )}

              {(currentUser as any).category && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" /> Category Assignment
                  </label>
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {(currentUser as any).category}
                  </div>
                </div>
              )}

              {(currentUser as any).speciality && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" /> Speciality
                  </label>
                  <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                    {(currentUser as any).speciality}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
