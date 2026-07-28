import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Wallet as WalletIcon, ArrowUpFromLine } from 'lucide-react';
import api from '../../services/api';

export default function OwnerWallet() {
  const { currentUser, updateUser } = useAuth();
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get('/owner/wallet');
      const { wallet, transactions } = res.data.data;
      updateUser({ walletBalance: wallet.availableBalance });
      setTransactions(transactions || []);
    } catch (e) {
      console.error('Failed to fetch wallet', e);
    }
  };

  if (!currentUser) return null;

  const handleWithdraw = async () => {
    const val = Number(amount);
    if (val > 0) {
      if (val > (currentUser.walletBalance || 0)) {
        alert('Insufficient balance.');
      } else {
        try {
          setLoading(true);
          const res = await api.post('/owner/wallet/withdraw', { amount: val });
          updateUser({ walletBalance: res.data.data.wallet.availableBalance });
          setAmount('');
          alert('Withdrawal requested successfully!');
          fetchWallet();
        } catch (err: any) {
          alert(err.response?.data?.message || 'Failed to withdraw');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Owner Wallet</h1>
        <p className="text-gray-500">Manage your available balance and withdrawals from raised funds.</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2 opacity-80">
          <WalletIcon className="w-6 h-6" />
          <span className="font-medium">Available Balance</span>
        </div>
        <div className="text-5xl font-bold mb-8">
          ${(currentUser.walletBalance || 0).toLocaleString()}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleWithdraw}
              disabled={loading}
              className="flex-1 sm:flex-none px-6 py-3 bg-emerald-700 hover:bg-emerald-900 text-white border border-emerald-500/50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <ArrowUpFromLine className="w-5 h-5" />
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {transactions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {transactions.map((tx: any) => (
              <div key={tx._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{tx.transactionType}</p>
                  <p className="text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${tx.transactionType === 'Add Funds' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {tx.transactionType === 'Add Funds' ? '+' : '-'}${tx.transactionAmount.toLocaleString()}
                  </p>
                  <p className={`text-sm ${
                    tx.transactionStatus === 'Successful' ? 'text-emerald-500' :
                    tx.transactionStatus === 'Pending' ? 'text-amber-500' : 'text-red-500'
                  }`}>
                    {tx.transactionStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
