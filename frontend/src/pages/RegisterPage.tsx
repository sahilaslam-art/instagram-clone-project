import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [registeredMobile, setRegisteredMobile] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    role: 'Customer', // default
    featureRole: '',
    domain: '',
    zone: '',
    region: '',
    category: '',
    speciality: ''
  });

  const [otpData, setOtpData] = useState({
    emailOtp: '',
    mobileOtp: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/auth/register', formData);
      setRegisteredEmail(formData.email);
      setRegisteredMobile(formData.mobileNumber);
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Verify Mobile
      await api.post('/auth/verify-mobile', {
        identifier: registeredMobile,
        otp: otpData.mobileOtp
      });

      // Verify Email
      await api.post('/auth/verify-email', {
        identifier: registeredEmail,
        otp: otpData.emailOtp
      });

      navigate('/login', { state: { message: 'Registration and verification successful! Please login to continue.' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to verify OTPs. Make sure you entered 123456');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-2">StageFund</h1>
        <p className="text-gray-500 text-center mb-8">
          {step === 'details' ? 'Create your account' : 'Verify your contact details'}
        </p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {step === 'details' ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="10 digit number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I want to</label>
              <select
                name="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Customer">Customer (Invest in Projects)</option>
                <option value="Owner">Owner (Raise Funds)</option>
                <option value="Zonal_Admin">Zonal Admin</option>
                <option value="Admin">Admin</option>
                <option value="Sub_Admin">Sub Admin</option>
                <option value="Worker">Worker</option>
              </select>
            </div>

            {['Sub_Admin', 'Worker'].includes(formData.role) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Functional Role (Department)</label>
                <select
                  name="featureRole"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  value={formData.featureRole}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Owner verification and profile update admin">Owner Verification & Profile</option>
                  <option value="Customer verification and profile update admin">Customer Verification & Profile</option>
                  <option value="Project verification and projects update admin">Project Verification & Updates</option>
                  <option value="Support admin">Support</option>
                  <option value="Owner / Customer withdrawal manage admin">Withdrawal Management</option>
                </select>
              </div>
            )}

            {['Zonal_Admin', 'Admin', 'Sub_Admin', 'Worker'].includes(formData.role) && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                  <select name="domain" required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" value={formData.domain} onChange={handleChange}>
                    <option value="">Select</option>
                    {[...Array(9)].map((_, i) => <option key={i} value={`D${i+1}`}>D{i+1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                  <select name="zone" required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" value={formData.zone} onChange={handleChange}>
                    <option value="">Select</option>
                    {[...Array(9)].map((_, i) => <option key={i} value={`Z${i+1}`}>Z{i+1}</option>)}
                  </select>
                </div>
              </div>
            )}

            {['Admin', 'Sub_Admin', 'Worker'].includes(formData.role) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select name="region" required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" value={formData.region} onChange={handleChange}>
                  <option value="">Select Region</option>
                  {[...Array(20)].map((_, i) => <option key={i} value={`R${i+1}`}>R{i+1}</option>)}
                </select>
              </div>
            )}

            {['Sub_Admin', 'Worker'].includes(formData.role) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" required className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {[...Array(10)].map((_, i) => <option key={i} value={`C${i+1}`}>C{i+1}</option>)}
                </select>
              </div>
            )}

            {formData.role === 'Worker' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                <input
                  type="text"
                  name="speciality"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={formData.speciality}
                  onChange={handleChange}
                  placeholder="e.g. KYC Reviewer"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 mt-4"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800 text-center">
                For testing purposes, please use the mock OTP <strong>123456</strong> for both fields.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email OTP</label>
              <input
                type="text"
                name="emailOtp"
                required
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none tracking-widest text-center text-lg"
                value={otpData.emailOtp}
                onChange={handleOtpChange}
                placeholder="------"
              />
              <p className="text-xs text-gray-500 mt-1">Sent to {registeredEmail}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile OTP</label>
              <input
                type="text"
                name="mobileOtp"
                required
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none tracking-widest text-center text-lg"
                value={otpData.mobileOtp}
                onChange={handleOtpChange}
                placeholder="------"
              />
              <p className="text-xs text-gray-500 mt-1">Sent to {registeredMobile}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 mt-4"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
        )}

        {step === 'details' && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
