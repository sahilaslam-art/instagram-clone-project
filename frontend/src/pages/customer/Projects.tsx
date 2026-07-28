import React, { useState, useEffect } from 'react';
import { ShoppingCart, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function CustomerProjects() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [investAmount, setInvestAmount] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/customer/projects');
      setProjects(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInvest = async (projectId: string, minInvestment: number) => {
    if (currentUser?.kycStatus !== 'Verified') {
      alert('Please complete your profile verification first to start investing.');
      navigate('/customer/profile');
      return;
    }

    const amount = Number(investAmount[projectId]);
    if (amount && amount >= minInvestment) {
      try {
        await api.post('/customer/investments', { projectId, amount });
        setInvestAmount({ ...investAmount, [projectId]: '' });
        alert('Investment successful!');
        fetchProjects(); // Refresh progress
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to invest');
      }
    } else {
      alert(`Please enter a valid amount (Minimum $${minInvestment})`);
    }
  };

  const handleAddToCart = async (projectId: string) => {
    try {
      await api.post('/customer/cart', { projectId });
      alert('Added to cart!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const visibleProjects = projects.filter(
    (p) => (p.projectStatus === 'Live' || p.projectStatus === 'Stage') && 
           (p.projectTitle?.toLowerCase().includes(filter.toLowerCase()) || 
            p.projectCategory?.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Browse Projects</h1>
          <p className="text-gray-500">Discover and invest in high-return opportunities.</p>
        </div>
        <input
          type="text"
          placeholder="Search projects..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-10">Loading projects...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                    {project.projectCategory}
                  </span>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    project.riskLevel === 'Low' ? 'bg-green-50 text-green-700' :
                    project.riskLevel === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {project.riskLevel} Risk
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.projectTitle}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.projectDescription}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expected Return:</span>
                    <span className="font-semibold text-emerald-600">{project.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Min Investment:</span>
                    <span className="font-medium">${project.minimumInvestmentAmount?.toLocaleString()}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium text-gray-900">
                        ${project.currentRaisedAmount?.toLocaleString()} / ${project.fundingTarget?.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (project.currentRaisedAmount / project.fundingTarget) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={`Min $${project.minimumInvestmentAmount}`}
                      value={investAmount[project._id] || ''}
                      onChange={(e) => setInvestAmount({ ...investAmount, [project._id]: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button 
                      onClick={() => handleInvest(project._id, project.minimumInvestmentAmount)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      Invest
                    </button>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(project._id)}
                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
