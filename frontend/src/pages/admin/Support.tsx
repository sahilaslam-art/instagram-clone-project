import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { MessageSquare, Send } from 'lucide-react';

export default function AdminSupport() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/support');
      setTickets(res.data.data || []);
    } catch (err) {
      console.error('Failed to load tickets', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyChange = (id: string, value: string) => {
    setReplyText(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmitReply = async (id: string, status: string) => {
    const text = replyText[id];
    if (!text && status !== 'Closed') {
      alert('Please enter a reply message.');
      return;
    }

    try {
      setLoading(true);
      await api.put(`/admin/support/${id}`, { status, response: text || 'Ticket Closed without additional response.' });
      alert(`Ticket updated successfully!`);
      setReplyText(prev => ({ ...prev, [id]: '' }));
      fetchTickets();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <p className="text-gray-500">Manage and respond to user inquiries and issues.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading && tickets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No support tickets found.</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {tickets.map(ticket => (
              <div key={ticket._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{ticket.subject}</h3>
                    <p className="text-sm text-gray-500">
                      From: {ticket.userId?.fullName || 'Unknown'} • {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ticket.status === 'Open' ? 'bg-amber-100 text-amber-700' :
                    ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm mb-4 border border-gray-100">
                  <div className="flex gap-2 items-start">
                    <MessageSquare className="w-4 h-4 mt-0.5 text-gray-400" />
                    <div>{ticket.description}</div>
                  </div>
                </div>

                {ticket.response && (
                  <div className="bg-blue-50 p-4 rounded-lg text-blue-900 text-sm mb-4 border border-blue-100">
                    <div className="font-semibold mb-1">Admin Response:</div>
                    <div>{ticket.response}</div>
                  </div>
                )}

                {ticket.status !== 'Closed' && (
                  <div className="mt-4">
                    <textarea 
                      value={replyText[ticket._id] || ''}
                      onChange={(e) => handleReplyChange(ticket._id, e.target.value)}
                      placeholder="Type your response here..."
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      rows={3}
                    />
                    <div className="mt-2 flex gap-3 justify-end">
                      <button 
                        onClick={() => handleSubmitReply(ticket._id, 'In Progress')}
                        disabled={loading || !replyText[ticket._id]}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                      >
                        Reply & Mark In Progress
                      </button>
                      <button 
                        onClick={() => handleSubmitReply(ticket._id, 'Closed')}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" /> Reply & Close Ticket
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
