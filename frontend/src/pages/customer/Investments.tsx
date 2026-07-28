import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function CustomerInvestments() {
  const { investments, projects, currentUser } = useAppContext();
  const [tab, setTab] = useState<'LIVE' | 'FINISHED'>('LIVE');

  const myInvestments = investments.filter(i => i.customerId === currentUser?.id);
  const liveInvestments = myInvestments.filter(i => i.status === 'ACTIVE');
  const finishedInvestments = myInvestments.filter(i => i.status === 'COMPLETED');

  const totalLiveInvested = liveInvestments.reduce((sum, i) => sum + i.amount, 0);
  const totalFinishedInvested = finishedInvestments.reduce((sum, i) => sum + i.amount, 0);
  const totalReturns = finishedInvestments.reduce((sum, i) => sum + (i.returnsReceived || 0), 0);
  const netProfit = totalReturns - totalFinishedInvested;

  const currentList = tab === 'LIVE' ? liveInvestments : finishedInvestments;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Track My Money</h1>
        <p className="text-gray-500 mb-6">Monitor your active investments and past returns.</p>
      </div>

      <div className="flex gap-4 border-b border-gray-200 mt-8">
        <button
          onClick={() => setTab('LIVE')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            tab === 'LIVE' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Live Projects
        </button>
        <button
          onClick={() => setTab('FINISHED')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            tab === 'FINISHED' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Finished Projects
        </button>
      </div>

      {tab === 'LIVE' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Invested (Live)</div>
            <div className="text-2xl font-bold text-gray-900">${totalLiveInvested.toLocaleString()}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Active Investments</div>
            <div className="text-2xl font-bold text-gray-900">{liveInvestments.length} Projects</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Invested (Finished)</div>
            <div className="text-2xl font-bold text-gray-900">${totalFinishedInvested.toLocaleString()}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Returns Received</div>
            <div className="text-2xl font-bold text-emerald-600">${totalReturns.toLocaleString()}</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Net Profit / Loss</div>
            <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {netProfit >= 0 ? '+' : ''}${netProfit.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-500">Project</th>
              <th className="px-6 py-3 font-medium text-gray-500">Amount Invested</th>
              <th className="px-6 py-3 font-medium text-gray-500">Date</th>
              {tab === 'FINISHED' && <th className="px-6 py-3 font-medium text-gray-500">Returns</th>}
              <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentList.length === 0 ? (
              <tr>
                <td colSpan={tab === 'FINISHED' ? 5 : 4} className="px-6 py-8 text-center text-gray-500">
                  No {tab.toLowerCase()} investments found.
                </td>
              </tr>
            ) : (
              currentList.map(inv => {
                const project = projects.find(p => p.id === inv.projectId);
                return (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{project?.title}</td>
                    <td className="px-6 py-4">${inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-500">{inv.date}</td>
                    {tab === 'FINISHED' && (
                      <td className="px-6 py-4 font-medium text-emerald-600">
                        ${inv.returnsReceived?.toLocaleString() || 0}
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">
                        See {tab === 'LIVE' ? 'Updates' : 'Details'}
                      </button>
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
