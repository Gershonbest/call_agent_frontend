import React, { useEffect, useState } from 'react';
import { 
  PlusIcon, 
  PhoneIcon, 
  PlayIcon, 
  StopIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { apiService, Call, Agent } from '../services/api';

export default function Calls() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInitiateModal, setShowInitiateModal] = useState(false);
  const [formData, setFormData] = useState({
    agent_id: '',
    phone_number: '',
    caller_number: '',
    metadata: '',
  });

  useEffect(() => {
    fetchCalls();
    fetchAgents();
  }, []);

  const fetchCalls = async () => {
    try {
      const response = await apiService.getCalls();
      setCalls(response.calls);
    } catch (error) {
      console.error('Error fetching calls:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await apiService.getAgents();
      setAgents(response.agents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleInitiateCall = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.initiateCall({
        agent_id: parseInt(formData.agent_id),
        phone_number: formData.phone_number,
        caller_number: formData.caller_number,
        metadata: formData.metadata ? JSON.parse(formData.metadata) : {},
      });
      setShowInitiateModal(false);
      setFormData({
        agent_id: '',
        phone_number: '',
        caller_number: '',
        metadata: '',
      });
      fetchCalls();
    } catch (error) {
      console.error('Error initiating call:', error);
    }
  };

  const handleEndCall = async (id: number) => {
    try {
      await apiService.endCall(id);
      fetchCalls();
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  const getCallStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (duration: number) => {
    if (!duration) return '-';
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calls</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your voice calls
          </p>
        </div>
        <button
          onClick={() => setShowInitiateModal(true)}
          className="btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Initiate Call
        </button>
      </div>

      {/* Calls List */}
      <div className="card">
        {calls.length === 0 ? (
          <div className="text-center py-8">
            <PhoneIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No calls yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by initiating your first call.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowInitiateModal(true)}
                className="btn-primary"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Initiate Call
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calls.map((call) => {
                  const agent = agents.find(a => a.id === call.agent_id);
                  return (
                    <tr key={call.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{call.phone_number}</div>
                        <div className="text-sm text-gray-500">{call.caller_number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {agent?.name || 'Unknown Agent'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCallStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDuration(call.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(call.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {call.status === 'active' && (
                            <button
                              onClick={() => handleEndCall(call.id)}
                              className="text-red-600 hover:text-red-900"
                              title="End Call"
                            >
                              <StopIcon className="h-4 w-4" />
                            </button>
                          )}
                          {call.recording_url && (
                            <a
                              href={call.recording_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-900"
                              title="View Recording"
                            >
                              <PlayIcon className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Initiate Call Modal */}
      {showInitiateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowInitiateModal(false)} />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleInitiateCall}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Initiate New Call
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Agent</label>
                          <select
                            required
                            value={formData.agent_id}
                            onChange={(e) => setFormData({ ...formData, agent_id: e.target.value })}
                            className="input-field mt-1"
                          >
                            <option value="">Select an agent</option>
                            {agents.filter(a => a.is_active).map((agent) => (
                              <option key={agent.id} value={agent.id}>
                                {agent.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={formData.phone_number}
                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                            className="input-field mt-1"
                            placeholder="+1234567890"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Caller Number</label>
                          <input
                            type="tel"
                            value={formData.caller_number}
                            onChange={(e) => setFormData({ ...formData, caller_number: e.target.value })}
                            className="input-field mt-1"
                            placeholder="+1234567890"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Metadata (JSON)</label>
                          <textarea
                            value={formData.metadata}
                            onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                            className="input-field mt-1"
                            rows={3}
                            placeholder='{"context": "Customer support call"}'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Initiate Call
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInitiateModal(false)}
                    className="btn-secondary ml-3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 