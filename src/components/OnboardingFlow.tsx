import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  RocketLaunchIcon, CogIcon, CheckIcon, ArrowRightIcon,
  PhoneIcon, MicrophoneIcon, CpuChipIcon, ChartBarIcon,
  PlayIcon, PauseIcon, StarIcon, SparklesIcon, HomeIcon,
  BuildingOfficeIcon, BanknotesIcon, ShieldCheckIcon, HeartIcon
} from '@heroicons/react/24/outline';
import { apiService } from '../services/api';

// Agent templates by industry
const agentTemplates = {
  'real-estate': [
    { 
      id: 're-property-inquiry', 
      name: 'Property Inquiry Agent', 
      description: 'Handle property searches and viewings',
      instructions: 'You are a professional real estate assistant. Help customers find properties, schedule viewings, and answer questions about listings. Be knowledgeable about property features, pricing, and neighborhood information. Always be helpful and maintain a friendly, professional tone.',
      sampleInteractions: ['Property search assistance', 'Viewing scheduling', 'Neighborhood information']
    },
    { 
      id: 're-rental-agent', 
      name: 'Rental Agent', 
      description: 'Manage rental inquiries and applications',
      instructions: 'You are a rental specialist. Assist customers with rental inquiries, explain lease terms, help with applications, and provide information about available rental properties. Be thorough in explaining rental processes and requirements.',
      sampleInteractions: ['Rental applications', 'Lease explanations', 'Tenant screening']
    }
  ],
  'hotels-&-hospitality': [
    { 
      id: 'hotel-reservation', 
      name: 'Hotel Reservation Agent', 
      description: 'Handle bookings and guest services',
      instructions: 'You are a hotel reservation specialist. Help guests with bookings, room upgrades, special requests, and provide information about hotel amenities. Always prioritize guest satisfaction and provide excellent customer service.',
      sampleInteractions: ['Room bookings', 'Special requests', 'Amenity information']
    },
    { 
      id: 'hotel-concierge', 
      name: 'Hotel Concierge', 
      description: 'Provide concierge and guest assistance',
      instructions: 'You are a hotel concierge. Assist guests with restaurant recommendations, event bookings, transportation arrangements, and local area information. Be knowledgeable about local attractions and provide personalized recommendations.',
      sampleInteractions: ['Restaurant recommendations', 'Local attractions', 'Transportation booking']
    }
  ],
  'banking-&-finance': [
    { 
      id: 'bank-customer-service', 
      name: 'Bank Customer Service', 
      description: 'Handle account inquiries and support',
      instructions: 'You are a bank customer service representative. Help customers with account inquiries, transaction history, card issues, and general banking questions. Always prioritize security and follow proper verification procedures.',
      sampleInteractions: ['Account balances', 'Transaction history', 'Card services']
    },
    { 
      id: 'bank-loan-officer', 
      name: 'Loan Officer Assistant', 
      description: 'Assist with loan applications',
      instructions: 'You are a loan officer assistant. Help customers understand loan products, gather application information, and explain the loan process. Be clear about requirements and timelines.',
      sampleInteractions: ['Loan applications', 'Credit requirements', 'Rate information']
    }
  ],
  'insurance': [
    { 
      id: 'insurance-customer-service', 
      name: 'Insurance Customer Service', 
      description: 'Handle policy inquiries and claims',
      instructions: 'You are an insurance customer service representative. Help customers with policy information, coverage details, claims processing, and billing inquiries. Be empathetic and thorough in addressing customer concerns.',
      sampleInteractions: ['Policy information', 'Claims processing', 'Coverage explanations']
    },
    { 
      id: 'insurance-claims', 
      name: 'Claims Processing Agent', 
      description: 'Process claims and provide support',
      instructions: 'You are a claims processing specialist. Guide customers through the claims process, collect necessary information, and provide updates on claim status. Be supportive during stressful situations.',
      sampleInteractions: ['Claims filing', 'Documentation requirements', 'Status updates']
    }
  ],
  'healthcare': [
    { 
      id: 'health-appointment', 
      name: 'Appointment Scheduler', 
      description: 'Schedule appointments and patient support',
      instructions: 'You are a medical appointment scheduler. Help patients schedule appointments, provide preparation instructions, and answer basic questions about procedures. Always maintain patient confidentiality and be compassionate.',
      sampleInteractions: ['Appointment scheduling', 'Preparation instructions', 'Provider availability']
    },
    { 
      id: 'health-patient-support', 
      name: 'Patient Support Agent', 
      description: 'Provide patient care coordination',
      instructions: 'You are a patient support coordinator. Help patients navigate their care, understand treatment plans, and connect with appropriate resources. Always be empathetic and maintain strict confidentiality.',
      sampleInteractions: ['Care coordination', 'Treatment explanations', 'Resource connections']
    }
  ]
};

const industryIcons = {
  'real-estate': HomeIcon,
  'hotels-&-hospitality': BuildingOfficeIcon,
  'banking-&-finance': BanknotesIcon,
  'insurance': ShieldCheckIcon,
  'healthcare': HeartIcon
};

interface OnboardingData {
  agent: {
    name: string;
    description: string;
    voice_id: string;
    temperature: number;
    instructions: string;
  };
  settings: {
    language: string;
    timezone: string;
    notifications: boolean;
  };
  template: {
    selected: boolean;
    templateId: string;
  };
  selectedTemplate?: any; // Current template selection for agent setup
}

const voices = [
  { id: 'alloy', name: 'Alloy', description: 'Professional and clear' },
  { id: 'echo', name: 'Echo', description: 'Warm and friendly' },
  { id: 'fable', name: 'Fable', description: 'Calm and soothing' },
  { id: 'onyx', name: 'Onyx', description: 'Deep and authoritative' },
  { id: 'nova', name: 'Nova', description: 'Bright and energetic' },
  { id: 'shimmer', name: 'Shimmer', description: 'Smooth and engaging' }
];

const languages = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' }
];

const timezones = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'Africa/Lagos', label: 'West Africa Time (WAT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' }
];

const onboardingSteps = [
  { id: 1, name: 'Welcome', icon: SparklesIcon },
  { id: 2, name: 'Agent Setup', icon: CpuChipIcon },
  { id: 3, name: 'Voice & Settings', icon: MicrophoneIcon },
  { id: 4, name: 'Test Call', icon: PhoneIcon },
  { id: 5, name: 'Complete', icon: CheckIcon }
];

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    agent: {
      name: '',
      description: '',
      voice_id: 'alloy',
      temperature: 7,
      instructions: ''
    },
    settings: {
      language: 'en-US',
      timezone: 'Africa/Lagos',
      notifications: true
    },
    template: {
      selected: false,
      templateId: ''
    }
  });

  useEffect(() => {
    // Load template data from registration if available
    if (location.state?.template?.selected) {
      setOnboardingData(prev => ({
        ...prev,
        template: location.state.template
      }));
    }
  }, [location.state]);

  const updateOnboardingData = (section: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Create the agent
      const agentData = {
        name: onboardingData.agent.name,
        description: onboardingData.agent.description,
        voice_id: onboardingData.agent.voice_id,
        temperature: onboardingData.agent.temperature,
        instructions: onboardingData.agent.instructions,
        is_active: true
      };

      const agent = await apiService.createAgent(agentData);

      // Update account settings
      await apiService.updateAccountSettings({
        language: onboardingData.settings.language,
        timezone: onboardingData.settings.timezone,
        notifications: onboardingData.settings.notifications
      });

      // Navigate to dashboard
      navigate('/admin/dashboard', { 
        state: { 
          message: 'Welcome to NigerVoiceFlow! Your AI agent is ready to use.',
          agentId: agent.id 
        } 
      });
    } catch (error) {
      console.error('Onboarding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <AgentSetupStep data={onboardingData.agent} updateData={updateOnboardingData} onboardingData={onboardingData} />;
      case 3:
        return <VoiceSettingsStep data={onboardingData.settings} updateData={updateOnboardingData} />;
      case 4:
        return <TestCallStep />;
      case 5:
        return <CompleteStep />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return onboardingData.agent.name && onboardingData.agent.description;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <SparklesIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">NigerVoiceFlow</h1>
            </div>
            <div className="text-sm text-gray-600">
              Welcome to your new account!
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
                {index < onboardingSteps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Previous
            </button>

            {currentStep < onboardingSteps.length ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed() || isLoading}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </>
                ) : (
                  <>
                    Complete Setup
                    <CheckIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function WelcomeStep() {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center">
        <SparklesIcon className="w-20 h-20 text-blue-600 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to NigerVoiceFlow!</h2>
        <p className="text-xl text-gray-600 mb-8">
          Let's get your first AI agent up and running in just a few minutes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <CpuChipIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Create Your Agent</h3>
            <p className="text-sm text-gray-600">Set up your AI agent with custom instructions and personality</p>
          </div>
          <div className="text-center">
            <MicrophoneIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Choose Voice & Settings</h3>
            <p className="text-sm text-gray-600">Select the perfect voice and configure your preferences</p>
          </div>
          <div className="text-center">
            <PhoneIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Test & Launch</h3>
            <p className="text-sm text-gray-600">Test your agent and start handling calls immediately</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">What you'll accomplish:</h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Create your first AI voice agent
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Configure voice and language settings
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Test your agent with a sample call
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Access your dashboard and analytics
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function AgentSetupStep({ data, updateData, onboardingData }: any) {
  const location = useLocation();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  
  // Get industry from registration or state  
  const industry = location.state?.companyData?.industry || onboardingData?.template?.industry || 'real-estate';
  const availableTemplates = (agentTemplates as any)[industry] || [];
  const IndustryIcon = (industryIcons as any)[industry] || CpuChipIcon;

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setShowCustomForm(false);
    updateData('agent', {
      name: template.name,
      description: template.description,
      instructions: template.instructions
    });
    updateData('selectedTemplate', template);
  };

  const handleCustomSelect = () => {
    setSelectedTemplate(null);
    setShowCustomForm(true);
    updateData('agent', {
      name: '',
      description: '',
      instructions: ''
    });
    updateData('selectedTemplate', null);
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <CpuChipIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your AI Agent</h2>
        <p className="text-gray-600">Choose a template or create a custom agent for your industry</p>
      </div>

      {/* Template Selection */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <IndustryIcon className="w-6 h-6 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            {industry.charAt(0).toUpperCase() + industry.slice(1).replace(/-&-/g, ' & ').replace(/-/g, ' ')} Templates
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {availableTemplates.map((template: any) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedTemplate?.id === template.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <div className="text-xs text-gray-500">
                <strong>Sample interactions:</strong>
                <ul className="list-disc list-inside mt-1">
                  {template.sampleInteractions.map((interaction: string, index: number) => (
                    <li key={index}>{interaction}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom Option */}
        <div
          onClick={handleCustomSelect}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            showCustomForm
              ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <h4 className="font-semibold text-gray-900 mb-2">
            <CogIcon className="w-5 h-5 inline mr-2" />
            Custom Agent
          </h4>
          <p className="text-sm text-gray-600">Create a custom agent with your own specifications</p>
        </div>
      </div>

      {/* Custom Form or Template Preview */}
      {(showCustomForm || selectedTemplate) && (
        <div className="border-t pt-8">
          {selectedTemplate && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Selected Template: {selectedTemplate.name}</h4>
              <p className="text-sm text-blue-800 mb-2">{selectedTemplate.description}</p>
              <details className="text-xs text-blue-700">
                <summary className="cursor-pointer font-medium">View Instructions</summary>
                <p className="mt-2 pl-4 border-l-2 border-blue-300">{selectedTemplate.instructions}</p>
              </details>
            </div>
          )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData('agent', { name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Customer Service Agent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={data.description}
            onChange={(e) => updateData('agent', { description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of your agent's role"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
          <textarea
            value={data.instructions}
            onChange={(e) => updateData('agent', { instructions: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe how your AI agent should behave, what it should do, and how it should interact with customers..."
          />
          <p className="text-sm text-gray-500 mt-2">
                {selectedTemplate ? 'You can modify the template instructions above.' : 'Be specific about your agent\'s role, tone, and responsibilities.'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="10"
              value={data.temperature}
              onChange={(e) => updateData('agent', { temperature: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-8">{data.temperature}</span>
          </div>
              <p className="text-sm text-gray-500 mt-1">
                Higher values make responses more creative, lower values make them more focused
          </p>
      </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Voice</label>
              <select
                value={data.voice_id}
                onChange={(e) => updateData('agent', { voice_id: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="alloy">Alloy (Neutral)</option>
                <option value="echo">Echo (Male)</option>
                <option value="fable">Fable (British Male)</option>
                <option value="onyx">Onyx (Deep Male)</option>
                <option value="nova">Nova (Female)</option>
                <option value="shimmer">Shimmer (Gentle Female)</option>
              </select>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VoiceSettingsStep({ data, updateData }: any) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <MicrophoneIcon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Voice & Settings</h2>
        <p className="text-gray-600">Choose your agent's voice and configure your preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Voice Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Voice</h3>
          <div className="grid grid-cols-1 gap-3">
            {voices.map((voice) => (
              <button
                key={voice.id}
                onClick={() => updateData('agent', { voice_id: voice.id })}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  data.voice_id === voice.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{voice.name}</h4>
                    <p className="text-sm text-gray-600">{voice.description}</p>
                  </div>
                  <PlayIcon className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={data.language}
                onChange={(e) => updateData('settings', { language: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={data.timezone}
                onChange={(e) => updateData('settings', { timezone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                checked={data.notifications}
                onChange={(e) => updateData('settings', { notifications: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="notifications" className="ml-2 text-sm text-gray-700">
                Receive email notifications for important updates
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestCallStep() {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const handleTestCall = async () => {
    setIsTesting(true);
    // Simulate test call
    setTimeout(() => {
      setTestResult('success');
      setIsTesting(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <PhoneIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Your AI Agent</h2>
        <p className="text-gray-600">Let's make sure everything is working perfectly</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneIcon className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Test?</h3>
          <p className="text-gray-600">
            We'll make a test call to verify your AI agent is working correctly.
          </p>
        </div>

        <button
          onClick={handleTestCall}
          disabled={isTesting}
          className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 transition-all duration-300"
        >
          {isTesting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Testing...
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5 mr-2" />
              Start Test Call
            </>
          )}
        </button>

        {testResult === 'success' && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-800 font-medium">Test call successful!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your AI agent is ready to handle real calls.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete!</h2>
        <p className="text-xl text-gray-600 mb-8">
          Your AI agent is ready to start handling calls.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <RocketLaunchIcon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Your Agent is Live</h3>
            <p className="text-sm text-gray-600">Ready to handle customer calls 24/7</p>
          </div>
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Analytics Available</h3>
            <p className="text-sm text-gray-600">Track performance and insights</p>
          </div>
          <div className="text-center">
            <CogIcon className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Easy Management</h3>
            <p className="text-sm text-gray-600">Configure and update anytime</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Access your dashboard to monitor calls and performance
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Configure additional agents for different use cases
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Set up integrations with your existing systems
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
              Explore advanced features and customization options
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 