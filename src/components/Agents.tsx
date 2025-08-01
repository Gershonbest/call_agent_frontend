import React, { useEffect, useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { apiService, Agent } from '../services/api';

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructions: '',
    voice_id: '',
    temperature: 5,
    max_tokens: 1000,
    model: 'gpt-4',
    is_active: true,
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await apiService.getAgents();
      setAgents(response.agents);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createAgent(formData);
      setShowCreateModal(false);
      setFormData({
        name: '',
        description: '',
        instructions: '',
        voice_id: '',
        temperature: 5,
        max_tokens: 1000,
        model: 'gpt-4',
        is_active: true,
      });
      fetchAgents();
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  const handleEditAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent) return;
    
    try {
      await apiService.updateAgent(selectedAgent.id, formData);
      setShowEditModal(false);
      setSelectedAgent(null);
      fetchAgents();
    } catch (error) {
      console.error('Error updating agent:', error);
    }
  };

  const handleDeleteAgent = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await apiService.deleteAgent(id);
        fetchAgents();
      } catch (error) {
        console.error('Error deleting agent:', error);
      }
    }
  };

  const openEditModal = (agent: Agent) => {
    setSelectedAgent(agent);
    setFormData({
      name: agent.name,
      description: agent.description,
      instructions: agent.instructions,
      voice_id: agent.voice_id,
      temperature: agent.temperature,
      max_tokens: agent.max_tokens,
      model: agent.model,
      is_active: agent.is_active,
    });
    setShowEditModal(true);
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
          <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your AI voice agents
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Agent
        </button>
      </div>

      {/* Agents List */}
      <div className="card">
        {agents.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No agents</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first agent.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Agent
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">
                        {agent.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {agent.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agent.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {agent.is_active ? (
                          <>
                            <CheckIcon className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <XMarkIcon className="h-3 w-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(agent)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCreateModal(false)} />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleCreateAgent}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Create New Agent
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input-field mt-1"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Instructions</label>
                          <textarea
                            required
                            value={formData.instructions}
                            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                            className="input-field mt-1"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Voice ID</label>
                            <input
                              type="text"
                              value={formData.voice_id}
                              onChange={(e) => setFormData({ ...formData, voice_id: e.target.value })}
                              className="input-field mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <select
                              value={formData.model}
                              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                              className="input-field mt-1"
                            >
                              <option value="gpt-4">GPT-4</option>
                              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Temperature</label>
                            <input
                              type="range"
                              min="0"
                              max="10"
                              value={formData.temperature}
                              onChange={(e) => setFormData({ ...formData, temperature: parseInt(e.target.value) })}
                              className="w-full mt-1"
                            />
                            <span className="text-sm text-gray-500">{formData.temperature}</span>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
                            <input
                              type="number"
                              value={formData.max_tokens}
                              onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                              className="input-field mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.is_active}
                              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Active</span>
                          </label>
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
                    Create Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
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

      {/* Edit Agent Modal */}
      {showEditModal && selectedAgent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEditModal(false)} />
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleEditAgent}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Edit Agent
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="input-field mt-1"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Instructions</label>
                          <textarea
                            required
                            value={formData.instructions}
                            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                            className="input-field mt-1"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Voice ID</label>
                            <input
                              type="text"
                              value={formData.voice_id}
                              onChange={(e) => setFormData({ ...formData, voice_id: e.target.value })}
                              className="input-field mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <select
                              value={formData.model}
                              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                              className="input-field mt-1"
                            >
                              <option value="gpt-4">GPT-4</option>
                              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Temperature</label>
                            <input
                              type="range"
                              min="0"
                              max="10"
                              value={formData.temperature}
                              onChange={(e) => setFormData({ ...formData, temperature: parseInt(e.target.value) })}
                              className="w-full mt-1"
                            />
                            <span className="text-sm text-gray-500">{formData.temperature}</span>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Max Tokens</label>
                            <input
                              type="number"
                              value={formData.max_tokens}
                              onChange={(e) => setFormData({ ...formData, max_tokens: parseInt(e.target.value) })}
                              className="input-field mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.is_active}
                              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Active</span>
                          </label>
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
                    Update Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
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