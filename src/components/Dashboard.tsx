import React, { useEffect, useState } from 'react';
import {
  UserGroupIcon, WrenchScrewdriverIcon, PhoneIcon, BookOpenIcon,
  PlayIcon, StopIcon, ClockIcon, ChartBarIcon, ArrowTrendingUpIcon,
  EyeIcon, CalendarIcon, PlusIcon, HomeIcon, BuildingOfficeIcon, 
  BanknotesIcon, ShieldCheckIcon, HeartIcon, CogIcon, SparklesIcon,
  SunIcon, MoonIcon
} from '@heroicons/react/24/outline';
import { apiService, Call } from '../services/api';

// Agent templates by industry
const agentTemplates = {
  'real-estate': {
    name: 'Real Estate',
    icon: HomeIcon,
    color: 'from-blue-500 to-blue-600',
    templates: [
      { 
        id: 're-property-inquiry', 
        name: 'Property Inquiry Agent', 
        description: 'Handle property searches and viewings',
        instructions: 'You are a professional real estate assistant. Help customers find properties, schedule viewings, and answer questions about listings. Be knowledgeable about property features, pricing, and neighborhood information. Always be helpful and maintain a friendly, professional tone.'
      },
      { 
        id: 're-rental-agent', 
        name: 'Rental Agent', 
        description: 'Manage rental inquiries and applications',
        instructions: 'You are a rental specialist. Assist customers with rental inquiries, explain lease terms, help with applications, and provide information about available rental properties. Be thorough in explaining rental processes and requirements.'
      }
    ]
  },
  'hotels-&-hospitality': {
    name: 'Hotels & Hospitality',
    icon: BuildingOfficeIcon,
    color: 'from-purple-500 to-purple-600',
    templates: [
      { 
        id: 'hotel-reservation', 
        name: 'Hotel Reservation Agent', 
        description: 'Handle bookings and guest services',
        instructions: 'You are a hotel reservation specialist. Help guests with bookings, room upgrades, special requests, and provide information about hotel amenities. Always prioritize guest satisfaction and provide excellent customer service.'
      },
      { 
        id: 'hotel-concierge', 
        name: 'Hotel Concierge', 
        description: 'Provide concierge and guest assistance',
        instructions: 'You are a hotel concierge. Assist guests with restaurant recommendations, event bookings, transportation arrangements, and local area information. Be knowledgeable about local attractions and provide personalized recommendations.'
      }
    ]
  },
  'banking-&-finance': {
    name: 'Banking & Finance',
    icon: BanknotesIcon,
    color: 'from-green-500 to-green-600',
    templates: [
      { 
        id: 'bank-customer-service', 
        name: 'Bank Customer Service', 
        description: 'Handle account inquiries and support',
        instructions: 'You are a bank customer service representative. Help customers with account inquiries, transaction history, card issues, and general banking questions. Always prioritize security and follow proper verification procedures.'
      },
      { 
        id: 'bank-loan-officer', 
        name: 'Loan Officer Assistant', 
        description: 'Assist with loan applications',
        instructions: 'You are a loan officer assistant. Help customers understand loan products, gather application information, and explain the loan process. Be clear about requirements and timelines.'
      }
    ]
  },
  'insurance': {
    name: 'Insurance',
    icon: ShieldCheckIcon,
    color: 'from-orange-500 to-orange-600',
    templates: [
      { 
        id: 'insurance-customer-service', 
        name: 'Insurance Customer Service', 
        description: 'Handle policy inquiries and claims',
        instructions: 'You are an insurance customer service representative. Help customers with policy information, coverage details, claims processing, and billing inquiries. Be empathetic and thorough in addressing customer concerns.'
      },
      { 
        id: 'insurance-claims', 
        name: 'Claims Processing Agent', 
        description: 'Process claims and provide support',
        instructions: 'You are a claims processing specialist. Guide customers through the claims process, collect necessary information, and provide updates on claim status. Be supportive during stressful situations.'
      }
    ]
  },
  'healthcare': {
    name: 'Healthcare',
    icon: HeartIcon,
    color: 'from-red-500 to-red-600',
    templates: [
      { 
        id: 'health-appointment', 
        name: 'Appointment Scheduler', 
        description: 'Schedule appointments and patient support',
        instructions: 'You are a medical appointment scheduler. Help patients schedule appointments, provide preparation instructions, and answer basic questions about procedures. Always maintain patient confidentiality and be compassionate.'
      },
      { 
        id: 'health-patient-support', 
        name: 'Patient Support Agent', 
        description: 'Provide patient care coordination',
        instructions: 'You are a patient support coordinator. Help patients navigate their care, understand treatment plans, and connect with appropriate resources. Always be empathetic and maintain strict confidentiality.'
      }
    ]
  }
};

interface DashboardStats {
  totalAgents: number;
  activeAgents: number;
  totalTools: number;
  totalCalls: number;
  activeCalls: number;
  totalKnowledgeBases: number;
  totalPhoneNumbers: number;
  recentCalls: Call[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAgents: 0,
    activeAgents: 0,
    totalTools: 0,
    totalCalls: 0,
    activeCalls: 0,
    totalKnowledgeBases: 0,
    totalPhoneNumbers: 0,
    recentCalls: []
  });
  const [loading, setLoading] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [agentsRes, toolsRes, callsRes, knowledgeRes] = await Promise.all([
          apiService.getAgents(),
          apiService.getTools(),
          apiService.getCalls(),
          apiService.getKnowledgeBases()
        ]);

        setStats({
          totalAgents: agentsRes.total || agentsRes.agents?.length || 0,
          activeAgents: agentsRes.agents?.filter((agent: any) => agent.is_active).length || 0,
          totalTools: Array.isArray(toolsRes) ? toolsRes.length : 0,
          totalCalls: callsRes.total || callsRes.calls?.length || 0,
          activeCalls: callsRes.calls?.filter((call: any) => call.status === 'in-progress').length || 0,
          totalKnowledgeBases: knowledgeRes.total || knowledgeRes.knowledge_bases?.length || 0,
          totalPhoneNumbers: 0, // Will be populated when phone numbers API is available
          recentCalls: (callsRes.calls || []).slice(0, 5)
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCreateAgentFromTemplate = async (template: any) => {
    setIsCreatingAgent(true);
    try {
      const agentData = {
        name: template.name,
        description: template.description,
        instructions: template.instructions,
        voice_id: 'alloy',
        temperature: 7,
        is_active: true
      };

      await apiService.createAgent(agentData);
      setShowTemplateModal(false);
      setSelectedTemplate(null);
      
      // Show success message
      alert(`Agent "${template.name}" created successfully!`);
    } catch (error) {
      console.error('Error creating agent:', error);
      alert('Failed to create agent. Please try again.');
    } finally {
      setIsCreatingAgent(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'initiated': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome to NigerVoiceFlow. Here's what's happening with your voice AI agents.
            </p>
          </div>
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {isDarkMode ? (
            <SunIcon className="w-6 h-6" />
              ) : (
            <MoonIcon className="w-6 h-6" />
              )}
            </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Agents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAgents}</p>
            </div>
          </div>
      </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <PlayIcon className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeAgents}</p>
            </div>
            </div>
          </div>
          
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <PhoneIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCalls}</p>
              </div>
          </div>
        </div>

        <div className="card">
                <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <WrenchScrewdriverIcon className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                  </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tools</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTools}</p>
              </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Calls</h3>
          <ChartBarIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        {stats.recentCalls.length === 0 ? (
          <div className="text-center py-8">
            <PhoneIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No calls yet</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start your first call to see activity here.
            </p>
          </div>
        ) : (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Call ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agent
                </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {stats.recentCalls.map((call) => (
                  <tr key={call.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{call.id}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                      {call.status}
                    </span>
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      Agent #{call.agent_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {call.duration ? `${Math.floor(call.duration / 60)}:${(call.duration % 60).toString().padStart(2, '0')}` : '-'}
                  </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(call.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* Agent Templates Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Create Agent from Template</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose from industry-specific templates to quickly create optimized AI agents
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Object.entries(agentTemplates).map(([industryKey, industry]) => {
            const IconComponent = industry.icon;
            return (
              <div key={industryKey} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${industry.color} flex items-center justify-center mb-3`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{industry.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {industry.templates.length} template{industry.templates.length !== 1 ? 's' : ''} available
                </p>
                <button
                  onClick={() => {
                    setSelectedTemplate({ industry: industryKey, ...industry });
                    setShowTemplateModal(true);
                  }}
                  className="w-full btn-secondary text-xs"
                >
                  View Templates
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="card text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center">
            <PlayIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Start New Call</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Initiate an outbound call</p>
            </div>
          </div>
        </button>
        
        <button className="card text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-green-600 dark:text-green-400 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Create Agent</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Build a new AI agent</p>
            </div>
          </div>
        </button>
        
        <button className="card text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-4" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">View Analytics</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Detailed performance metrics</p>
            </div>
          </div>
        </button>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <selectedTemplate.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedTemplate.name} Templates
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose a template to create your AI agent
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowTemplateModal(false);
                    setSelectedTemplate(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedTemplate.templates.map((template: any) => (
                  <div key={template.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {template.description}
                    </p>
                    <details className="mb-4">
                      <summary className="cursor-pointer text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        View Instructions
                      </summary>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-700 rounded border-l-2 border-blue-300 dark:border-blue-600">
                        {template.instructions}
                      </p>
                    </details>
                    <button
                      onClick={() => handleCreateAgentFromTemplate(template)}
                      disabled={isCreatingAgent}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        isCreatingAgent
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'btn-primary'
                      }`}
                    >
                      {isCreatingAgent ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <PlusIcon className="w-4 h-4 mr-2" />
                          Create Agent
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 