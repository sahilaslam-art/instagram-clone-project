import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Eye, Search } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminStaffList() {
  const { role } = useParams<{ role: string }>();
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [filterDomain, setFilterDomain] = useState('');
  const [filterZone, setFilterZone] = useState('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSpeciality, setFilterSpeciality] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (role) {
      setFilterDomain('');
      setFilterZone('');
      setFilterRegion('');
      setFilterCategory('');
      setFilterSpeciality('');
      setSearchQuery('');
      fetchStaff(role);
    }
  }, [role]);

  const fetchStaff = async (roleType: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/staff-list/${roleType}`);
      setStaff(res.data.data || []);
    } catch (err) {
      console.error('Failed to load staff', err);
    } finally {
      setLoading(false);
    }
  };

  const allowedRoles = ['SUPER_ADMIN', 'ZONAL_ADMIN', 'ADMIN', 'SUB_ADMIN'];
  if (!allowedRoles.includes(currentUser?.role.toUpperCase() || '')) {
    return <div className="p-10 text-center text-red-500">Access Denied. Admins only.</div>;
  }

  const roleTitle = role?.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + 's';

  const uniqueDomains = Array.from(new Set(staff.map(s => s.domain).filter(Boolean)));
  const uniqueZones = Array.from(new Set(staff.map(s => s.zone).filter(Boolean)));
  const uniqueRegions = Array.from(new Set(staff.map(s => s.region).filter(Boolean)));
  const uniqueCategories = Array.from(new Set(staff.map(s => s.category).filter(Boolean)));
  const uniqueSpecialities = Array.from(new Set(staff.map(s => s.speciality).filter(Boolean)));

  const filteredStaff = staff.filter(user => {
    if (filterDomain && user.domain !== filterDomain) return false;
    if (filterZone && user.zone !== filterZone) return false;
    if (filterRegion && user.region !== filterRegion) return false;
    if (filterCategory && user.category !== filterCategory) return false;
    if (filterSpeciality && user.speciality !== filterSpeciality) return false;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!user.fullName?.toLowerCase().includes(q) && 
          !user.email?.toLowerCase().includes(q) && 
          !user.mobileNumber?.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{roleTitle} Management</h1>
        <p className="text-gray-500">View registered {roleTitle} in the system.</p>
      </div>

      {(uniqueDomains.length > 0 || uniqueZones.length > 0 || uniqueRegions.length > 0) && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-wrap gap-4">
          {uniqueDomains.length > 0 && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Domain</label>
              <select 
                value={filterDomain} 
                onChange={e => setFilterDomain(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Domains</option>
                {uniqueDomains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          )}
          {uniqueZones.length > 0 && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Zone</label>
              <select 
                value={filterZone} 
                onChange={e => setFilterZone(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Zones</option>
                {uniqueZones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
          )}
          {uniqueRegions.length > 0 && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Region</label>
              <select 
                value={filterRegion} 
                onChange={e => setFilterRegion(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Regions</option>
                {uniqueRegions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          )}
          {uniqueCategories.length > 0 && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Category</label>
              <select 
                value={filterCategory} 
                onChange={e => setFilterCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}
          {uniqueSpecialities.length > 0 && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Speciality</label>
              <select 
                value={filterSpeciality} 
                onChange={e => setFilterSpeciality(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">All Specialities</option>
                {uniqueSpecialities.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="font-medium text-gray-700 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            Current {roleTitle}
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name / phone no. / email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 font-medium text-gray-500">Phone</th>
                <th className="px-6 py-3 font-medium text-gray-500">Geographic Mapping</th>
                <th className="px-6 py-3 font-medium text-gray-500">KYC Status</th>
                <th className="px-6 py-3 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No {roleTitle} found matching filters.</td>
                </tr>
              ) : (
                filteredStaff.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.fullName}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-gray-500">{user.mobileNumber}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {[user.domain, user.zone, user.region, user.category, user.speciality].filter(Boolean).join(' > ') || 'None'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 
                        user.kycStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.kycStatus || 'Incomplete'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => navigate(`/admin/staff-details/${user._id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
