import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { identifier, password });
      // The API response is wrapped in { success, message, data }
      const { token, user } = response.data.data;
      
      // Update AuthContext
      login(user, token);
      
      const role = user.role.toUpperCase();
      // All admin-level roles go to admin dashboard
      if (['SUPER_ADMIN', 'SUB_ADMIN', 'ADMIN', 'ZONAL_ADMIN', 'WORKER'].includes(role)) {
        navigate('/admin/dashboard');
      } else if (role === 'FEATURE_ADMIN') {
        if (user.kycStatus === 'Verified') {
          // Redirect to specific feature page
          switch (user.featureRole) {
            case 'KYC Admin':
              navigate('/admin/customers');
              break;
            case 'Finance Admin':
              navigate('/admin/withdrawals');
              break;
            case 'Support Admin':
              navigate('/admin/support');
              break;
            case 'Project Admin':
              navigate('/admin/validations');
              break;
            default:
              navigate('/admin/feature-onboarding');
          }
        } else {
          navigate('/admin/feature-onboarding');
        }
      } else if (role === 'OWNER') {
        navigate('/owner/projects');
      } else {
        navigate('/customer/projects');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 mb-2">StageFund</h1>
        <p className="text-gray-500 text-center mb-8">Sign in to your account</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Mobile Number</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter email or mobile"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
