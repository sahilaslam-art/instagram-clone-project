import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import api from '../../services/api';

export default function AdminValidations() {
  const [submittedProjects, setSubmittedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingProjects();
  }, []);

  const fetchPendingProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/projects/pending');
      setSubmittedProjects(res.data.data || []);
    } catch (err) {
      console.error('Failed to load pending projects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (projectId: string, status: 'Stage' | 'Rejected') => {
    let rejectionReason;
    if (status === 'Rejected') {
      rejectionReason = window.prompt('Please enter a rejection reason:');
      if (!rejectionReason) return; // user cancelled
    }
    
    try {
      setLoading(true);
      await api.put(`/admin/projects/${projectId}/review`, { status, rejectionReason, adminRemarks: 'Reviewed by Admin' });
      alert(`Project ${status.toLowerCase()} successfully!`);
      fetchPendingProjects();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to review project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Project Validations</h1>
        <p className="text-gray-500">Review submitted projects and approve them for funding stage.</p>
      </div>

      {loading && submittedProjects.length === 0 ? (
        <div className="py-10 text-center text-gray-500">Loading pending projects...</div>
      ) : submittedProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          No projects pending validation at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {submittedProjects.map(project => {
            return (
              <div key={project._id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.projectTitle}</h3>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">Pending Review</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.projectDescription}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                    <div>
                      <div className="text-gray-500 mb-1">Owner</div>
                      <div className="font-medium text-gray-900">{project.ownerId?.fullName || 'Unknown'}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Target Amount</div>
                      <div className="font-medium text-gray-900">${project.fundingTarget?.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Expected Return</div>
                      <div className="font-medium text-gray-900">{project.expectedReturn}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Risk Level</div>
                      <div className="font-medium text-gray-900">{project.riskLevel}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-48 justify-center">
                  <button 
                    onClick={() => handleReview(project._id, 'Stage')}
                    disabled={loading}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" /> Approve for Stage
                  </button>
                  <button 
                    onClick={() => handleReview(project._id, 'Rejected')}
                    disabled={loading}
                    className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" /> Reject (Back to Draft)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
