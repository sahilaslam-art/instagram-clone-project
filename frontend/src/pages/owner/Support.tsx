import React, { useState, useEffect } from 'react';
import { FileText, HelpCircle, MessageSquare } from 'lucide-react';
import api from '../../services/api';

export default function OwnerSupport() {
  const [tab, setTab] = useState<'FAQ' | 'PRIVACY' | 'TICKET'>('FAQ');
  const [ticketForm, setTicketForm] = useState({ ticketSubject: '', ticketCategory: 'Platform Issue', ticketDescription: '' });
  const [myTickets, setMyTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab === 'TICKET') {
      fetchTickets();
    }
  }, [tab]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/owner/support');
      setMyTickets(res.data.data || []);
    } catch (err: any) {
      console.error('Failed to fetch tickets', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/owner/support', ticketForm);
      setTicketForm({ ticketSubject: '', ticketCategory: 'Platform Issue', ticketDescription: '' });
      alert('Ticket submitted successfully!');
      fetchTickets();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
        <p className="text-gray-500">Get help, read policies, or contact our team.</p>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setTab('FAQ')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            tab === 'FAQ' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> FAQs
        </button>
        <button
          onClick={() => setTab('PRIVACY')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            tab === 'PRIVACY' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText className="w-4 h-4" /> Privacy Policy
        </button>
        <button
          onClick={() => setTab('TICKET')}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
            tab === 'TICKET' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Raise a Ticket
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {tab === 'FAQ' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'How does the funding process work?', a: 'You submit a project draft. Our admin team reviews it. Once approved, it moves to the Stage phase where customers can invest until the target is reached.' },
                { q: 'When can I withdraw raised funds?', a: 'Once your project reaches its funding target and becomes Live, the funds are credited to your owner wallet and can be withdrawn.' },
                { q: 'What happens if a project is rejected?', a: 'You will receive a notification with the rejection reason. You can address the issues and submit a new request or update the draft.' }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">{faq.q}</h3>
                  <p className="text-gray-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'PRIVACY' && (
          <div className="space-y-6 prose prose-emerald max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy Policy for Owners</h2>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Overview</h3>
              <p className="text-gray-600">We prioritize the security of your company details and project data. This policy outlines how we handle owner information.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Information We Collect</h3>
              <p className="text-gray-600">We collect KYC verification documents, company registration details, and project financial records to comply with legal regulations.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">How Information is Used</h3>
              <p className="text-gray-600">Your data is strictly used for identity verification, project validation, and facilitating payouts.</p>
            </div>
          </div>
        )}

        {tab === 'TICKET' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Submit a Request</h2>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input required type="text" value={ticketForm.ticketSubject} onChange={e => setTicketForm({...ticketForm, ticketSubject: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" disabled={loading} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={ticketForm.ticketCategory} onChange={e => setTicketForm({...ticketForm, ticketCategory: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" disabled={loading}>
                    <option value="Platform Issue">Platform Issue</option>
                    <option value="Wallet / Payout">Wallet / Payout</option>
                    <option value="Account / Profile">Account / Profile</option>
                    <option value="Project Review">Project Review</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea required rows={4} value={ticketForm.ticketDescription} onChange={e => setTicketForm({...ticketForm, ticketDescription: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" disabled={loading}></textarea>
                </div>
                <button type="submit" disabled={loading} className="w-full py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70">
                  {loading ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </form>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Tickets</h2>
              {loading && myTickets.length === 0 ? (
                <p className="text-gray-500 text-sm">Loading tickets...</p>
              ) : myTickets.length === 0 ? (
                <p className="text-gray-500 text-sm">You haven't submitted any tickets yet.</p>
              ) : (
                <div className="space-y-3">
                  {myTickets.map(ticket => (
                    <div key={ticket._id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{ticket.ticketSubject}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          ticket.ticketStatus === 'Open' ? 'bg-amber-100 text-amber-700' :
                          ticket.ticketStatus === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {ticket.ticketStatus}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{ticket.ticketCategory} • {new Date(ticket.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{ticket.ticketDescription}</p>
                      {ticket.adminResponse && (
                        <div className="mt-3 p-3 bg-white border border-gray-100 rounded text-sm text-gray-600">
                          <span className="font-semibold text-gray-800">Response:</span> {ticket.adminResponse}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
