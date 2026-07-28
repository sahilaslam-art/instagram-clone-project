import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import api from '../../services/api';

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/withdrawals/pending');
      setWithdrawals(res.data.data || []);
    } catch (err) {
      console.error('Failed to load withdrawals', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async (transactionId: string, status: 'Successful' | 'Failed') => {
    if (!window.confirm(`Are you sure you want to mark this withdrawal as ${status}?`)) {
      return;
    }

    try {
      setLoading(true);
      await api.put(`/admin/withdrawals/${transactionId}/process`, { status });
      alert(`Withdrawal marked as ${status} successfully!`);
      fetchWithdrawals();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to process withdrawal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Withdrawal Processing</h1>
        <p className="text-gray-500">Review and process pending withdrawal requests from users.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">User Details</th>
              <th className="px-6 py-3 font-medium text-gray-500">Role</th>
              <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
              <th className="px-6 py-3 font-medium text-gray-500">Date Request</th>
              <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && withdrawals.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : withdrawals.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No pending withdrawals found.</td>
              </tr>
            ) : (
              withdrawals.map(tx => (
                <tr key={tx._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{tx.userId?.fullName || 'Unknown'}</div>
                    <div className="text-gray-500 text-xs">{tx.userId?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 border border-gray-200">
                      {tx.transactionType === 'Customer Withdrawal' ? 'Customer' : 'Owner'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ${tx.transactionAmount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(tx.transactionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleProcess(tx._id, 'Successful')}
                        disabled={loading}
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded border border-transparent hover:border-emerald-200 disabled:opacity-50 transition-colors" 
                        title="Approve & Send Funds"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleProcess(tx._id, 'Failed')}
                        disabled={loading}
                        className="p-1 text-red-600 hover:bg-red-50 rounded border border-transparent hover:border-red-200 disabled:opacity-50 transition-colors" 
                        title="Reject & Refund"
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
