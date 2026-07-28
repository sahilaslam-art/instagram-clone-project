import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function AdminTracking() {
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActiveProjects();
  }, []);

  const fetchActiveProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/projects/active');
      setActiveProjects(res.data.data || []);
    } catch (err) {
      console.error('Failed to load active projects', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Projects Tracking</h1>
        <p className="text-gray-500">Monitor funding progress and status of active projects.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Project / Owner</th>
              <th className="px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 font-medium text-gray-500">Funding Progress</th>
              <th className="px-6 py-3 font-medium text-gray-500">Target</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading && activeProjects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading...</td>
              </tr>
            ) : activeProjects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No active projects found.</td>
              </tr>
            ) : (
              activeProjects.map(project => {
                const progress = project.fundingTarget > 0 
                  ? (project.currentRaisedAmount / project.fundingTarget) * 100 
                  : 0;
                
                return (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{project.projectTitle}</div>
                      <div className="text-xs text-gray-500">{project.ownerId?.fullName || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        project.projectStatus === 'Live' ? 'bg-green-100 text-green-700' : 
                        project.projectStatus === 'Finished' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {project.projectStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-900">${project.currentRaisedAmount?.toLocaleString()}</span>
                        <span className="text-gray-500">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, progress)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      ${project.fundingTarget?.toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
