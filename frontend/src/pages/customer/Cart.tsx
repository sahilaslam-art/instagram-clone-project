import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../../services/api';

export default function CustomerCart() {
  const [cartProjects, setCartProjects] = useState<any[]>([]);
  const [investAmount, setInvestAmount] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get('/customer/cart');
      setCartProjects(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async (projectId: string, minInvestment: number) => {
    const amount = Number(investAmount[projectId]);
    if (amount && amount >= minInvestment) {
      try {
        await api.post('/customer/investments', { projectId, amount });
        setInvestAmount({ ...investAmount, [projectId]: '' });
        alert('Investment successful!');
        handleRemoveFromCart(projectId);
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to invest');
      }
    } else {
      alert(`Please enter a valid amount (Minimum $${minInvestment})`);
    }
  };

  const handleRemoveFromCart = async (projectId: string) => {
    try {
      await api.delete(`/customer/cart/${projectId}`);
      fetchCart();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to remove from cart');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>
        <p className="text-gray-500">Review and invest in your saved projects.</p>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading cart...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : cartProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          Your cart is currently empty.
        </div>
      ) : (
        <div className="space-y-4">
          {cartProjects.map((project: any) => (
            <div key={project._id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{project.projectTitle}</h3>
                <p className="text-sm text-gray-500 mb-2">{project.projectCategory} • {project.expectedReturn}%</p>
                <div className="text-sm font-medium">Min Investment: ${project.minimumInvestmentAmount?.toLocaleString()}</div>
              </div>
              
              <div className="flex w-full md:w-auto items-center gap-3">
                <input
                  type="number"
                  placeholder={`$ Amount`}
                  value={investAmount[project._id] || ''}
                  onChange={(e) => setInvestAmount({ ...investAmount, [project._id]: e.target.value })}
                  className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button 
                  onClick={() => handleInvest(project._id, project.minimumInvestmentAmount)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Invest
                </button>
                <button 
                  onClick={() => handleRemoveFromCart(project._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
