import React, { useState, useEffect } from 'react';
import { PlusCircle, Eye, Edit2, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function OwnerProjects() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'Created' | 'Submitted' | 'Stage' | 'Live' | 'Finished'>('Created');
  const [showCreate, setShowCreate] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newProject, setNewProject] = useState({
    projectTitle: '', projectCategory: '', projectDescription: '', projectLocation: '',
    riskLevel: 'Medium' as 'Low' | 'Medium' | 'High', expectedReturn: '',
    minimumInvestmentAmount: 0, fundingTarget: 0,
    // Hierarchical routing
    domain: '', zone: '', region: '', category: '', requiredSpecialities: [] as string[]
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/owner/projects');
      setProjects(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/owner/projects', {
        ...newProject,
        expectedReturn: Number(newProject.expectedReturn)
      });
      setShowCreate(false);
      setNewProject({
        projectTitle: '', projectDescription: '', projectCategory: '', projectLocation: '',
        riskLevel: 'Medium', expectedReturn: '', minimumInvestmentAmount: 0, fundingTarget: 0,
        domain: '', zone: '', region: '', category: '', requiredSpecialities: []
      });
      alert('Project created in Draft stage!');
      fetchProjects();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to submit this project for review?')) {
      try {
        setLoading(true);
        await api.post(`/owner/projects/${projectId}/submit`);
        alert('Project submitted successfully!');
        fetchProjects();
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to submit project');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredProjects = projects.filter(p => p.projectStatus === tab);

  const tabs: { id: 'Created' | 'Submitted' | 'Stage' | 'Live' | 'Finished', label: string }[] = [
    { id: 'Created', label: 'Created (Drafts)' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Stage', label: 'Stage (Funding)' },
    { id: 'Live', label: 'Live' },
    { id: 'Finished', label: 'Finished' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-500">Manage your investment projects across all stages.</p>
        </div>
        <button 
          onClick={() => {
            if (currentUser?.kycStatus !== 'Verified') {
              alert('You cannot create projects until your profile is verified.');
              navigate('/owner/profile');
              return;
            }
            setShowCreate(!showCreate);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          {showCreate ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Project</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input required type="text" value={newProject.projectTitle} onChange={e => setNewProject({...newProject, projectTitle: e.target.value})} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input required type="text" value={newProject.projectCategory} onChange={e => setNewProject({...newProject, projectCategory: e.target.value})} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required rows={3} value={newProject.projectDescription} onChange={e => setNewProject({...newProject, projectDescription: e.target.value})} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input required type="text" value={newProject.projectLocation} onChange={e => setNewProject({...newProject, projectLocation: e.target.value})} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Return (%)</label>
              <input required type="number" step="0.01" value={newProject.expectedReturn} onChange={e => setNewProject({...newProject, expectedReturn: e.target.value})} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount ($)</label>
              <input required type="number" value={newProject.fundingTarget} onChange={e => setNewProject({...newProject, fundingTarget: Number(e.target.value)})} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Investment ($)</label>
              <input required type="number" value={newProject.minimumInvestmentAmount} onChange={e => setNewProject({...newProject, minimumInvestmentAmount: Number(e.target.value)})} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70" />
            </div>

            {/* Hierarchical Routing Section */}
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-gray-700 mb-3 mt-2 border-t pt-4">Project Geographic & Category Mapping <span className="text-xs text-gray-400 font-normal">(Required before submission)</span></p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Domain</label>
                  <select value={newProject.domain} onChange={e => setNewProject({...newProject, domain: e.target.value})} disabled={loading} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70">
                    <option value="">Select Domain</option>
                    {[...Array(9)].map((_, i) => <option key={i} value={`D${i+1}`}>D{i+1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Zone</label>
                  <select value={newProject.zone} onChange={e => setNewProject({...newProject, zone: e.target.value})} disabled={loading} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70">
                    <option value="">Select Zone</option>
                    {[...Array(9)].map((_, i) => <option key={i} value={`Z${i+1}`}>Z{i+1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Region</label>
                  <select value={newProject.region} onChange={e => setNewProject({...newProject, region: e.target.value})} disabled={loading} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70">
                    <option value="">Select Region</option>
                    {[...Array(20)].map((_, i) => <option key={i} value={`R${i+1}`}>R{i+1}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                  <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} disabled={loading} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-70">
                    <option value="">Select Category</option>
                    {[...Array(10)].map((_, i) => <option key={i} value={`C${i+1}`}>C{i+1}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-500 mb-2">Required Specialities <span className="text-gray-400">(Select all that apply)</span></label>
                <div className="flex flex-wrap gap-2">
                  {[...Array(10)].map((_, i) => {
                    const val = `S${i+1}`;
                    const checked = newProject.requiredSpecialities.includes(val);
                    return (
                      <label key={i} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-colors ${checked ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checked}
                          onChange={() => {
                            const updated = checked
                              ? newProject.requiredSpecialities.filter(s => s !== val)
                              : [...newProject.requiredSpecialities, val];
                            setNewProject({...newProject, requiredSpecialities: updated});
                          }}
                        />
                        {val}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={loading} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70">
                {loading ? 'Saving...' : 'Save Draft'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-4 border-b border-gray-200 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === t.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && !showCreate ? (
        <div className="text-center py-10">Loading projects...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
              No projects found in this stage.
            </div>
          ) : (
            filteredProjects.map(project => (
              <div key={project._id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{project.projectTitle}</h3>
                <p className="text-sm text-gray-500 mb-4">{project.projectCategory} • {project.projectLocation}</p>
                
                <div className="space-y-2 text-sm mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Target Amount:</span>
                    <span className="font-medium">${project.fundingTarget?.toLocaleString()}</span>
                  </div>
                  {(tab === 'Stage' || tab === 'Live' || tab === 'Finished') && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Raised Amount:</span>
                      <span className="font-medium text-emerald-600">${project.currentRaisedAmount?.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expected Return:</span>
                    <span className="font-medium">{project.expectedReturn}%</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-gray-200">
                    <Eye className="w-4 h-4" /> View Details
                  </button>
                  {tab === 'Created' && (
                    <button 
                      onClick={() => handleSubmitProject(project._id)}
                      disabled={loading}
                      className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-blue-200 disabled:opacity-70"
                    >
                      <Send className="w-4 h-4" /> Submit
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
