import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  HomeIcon, BuildingOfficeIcon, BanknotesIcon, ShieldCheckIcon, HeartIcon,
  CheckIcon, PlayIcon, UserGroupIcon, PhoneIcon, ClockIcon, StarIcon,
  ArrowLeftIcon, PlusIcon, SparklesIcon, CogIcon, ChartBarIcon,
  GlobeAltIcon, MicrophoneIcon, RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { apiService } from '../services/api';

interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  instructions: string;
  voice_id: string;
  temperature: number;
  max_tokens: number;
  model: string;
  industry: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  stats: {
    calls: string;
    satisfaction: string;
    languages: string;
  };
  useCases: string[];
}

const agentTemplates: AgentTemplate[] = [
  // Real Estate Templates
  {
    id: 're-property-inquiry',
    name: 'Property Inquiry Agent',
    description: 'Handles property search inquiries, schedules viewings, and qualifies leads',
    instructions: `You are a professional real estate agent assistant. Your role is to help potential buyers and renters find their perfect property.

Key responsibilities:
- Answer questions about available properties
- Schedule property viewings
- Qualify leads by understanding their requirements
- Provide market information and pricing details
- Follow up with interested clients

Always be professional, friendly, and helpful. Ask clarifying questions to better understand client needs.`,
    voice_id: 'alloy',
    temperature: 7,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'real-estate',
    features: ['Property search', 'Viewing scheduling', 'Lead qualification', 'Market updates'],
    icon: HomeIcon,
    color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200',
    stats: { calls: '2,500+', satisfaction: '98%', languages: '15+' },
    useCases: ['Property inquiries', 'Lead qualification', 'Viewing scheduling', 'Market updates']
  },
  {
    id: 're-rental-agent',
    name: 'Rental Agent',
    description: 'Specializes in rental properties and tenant inquiries',
    instructions: `You are a rental property specialist. Help tenants find their ideal rental property.

Key responsibilities:
- Assist with rental property searches
- Explain rental terms and conditions
- Schedule property viewings
- Handle rental applications
- Provide neighborhood information

Be thorough in explaining rental processes and requirements.`,
    voice_id: 'echo',
    temperature: 6,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'real-estate',
    features: ['Rental searches', 'Application assistance', 'Property viewings', 'Tenant support'],
    icon: HomeIcon,
    color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200',
    stats: { calls: '1,800+', satisfaction: '97%', languages: '12+' },
    useCases: ['Rental inquiries', 'Application support', 'Property tours', 'Tenant assistance']
  },

  // Hotel & Hospitality Templates
  {
    id: 'hotel-reservation',
    name: 'Hotel Reservation Agent',
    description: 'Handles hotel bookings, room availability, and guest services',
    instructions: `You are a hotel reservation specialist. Help guests book rooms and provide excellent service.

Key responsibilities:
- Check room availability and rates
- Process hotel reservations
- Handle special requests
- Provide hotel information and amenities
- Assist with booking modifications

Always confirm booking details and provide clear information about policies.`,
    voice_id: 'fable',
    temperature: 6,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'hotels-&-hospitality',
    features: ['Room bookings', 'Availability checks', 'Special requests', 'Guest services'],
    icon: BuildingOfficeIcon,
    color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200',
    stats: { calls: '3,200+', satisfaction: '96%', languages: '20+' },
    useCases: ['Room reservations', 'Availability queries', 'Special requests', 'Guest assistance']
  },
  {
    id: 'hotel-concierge',
    name: 'Hotel Concierge',
    description: 'Provides concierge services, local recommendations, and guest assistance',
    instructions: `You are a hotel concierge. Provide personalized assistance to hotel guests.

Key responsibilities:
- Recommend local attractions and restaurants
- Arrange transportation and tours
- Handle guest requests and special arrangements
- Provide local information and directions
- Assist with room service orders

Be knowledgeable about local attractions and always provide helpful recommendations.`,
    voice_id: 'onyx',
    temperature: 7,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'hotels-&-hospitality',
    features: ['Local recommendations', 'Transportation', 'Tour arrangements', 'Guest assistance'],
    icon: BuildingOfficeIcon,
    color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200',
    stats: { calls: '1,500+', satisfaction: '99%', languages: '25+' },
    useCases: ['Local recommendations', 'Transportation booking', 'Tour arrangements', 'Guest services']
  },

  // Banking & Finance Templates
  {
    id: 'bank-customer-service',
    name: 'Bank Customer Service',
    description: 'Handles account inquiries, transaction support, and banking services',
    instructions: `You are a bank customer service representative. Help customers with their banking needs.

Key responsibilities:
- Answer account-related questions
- Provide transaction information
- Assist with basic banking services
- Schedule appointments with specialists
- Handle general inquiries

Always verify customer identity and maintain security protocols.`,
    voice_id: 'nova',
    temperature: 5,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'banking-&-finance',
    features: ['Account inquiries', 'Transaction support', 'Appointment scheduling', 'General assistance'],
    icon: BanknotesIcon,
    color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200',
    stats: { calls: '1,800+', satisfaction: '99%', languages: '12+' },
    useCases: ['Account inquiries', 'Transaction support', 'Appointment booking', 'General assistance']
  },
  {
    id: 'bank-loan-officer',
    name: 'Loan Officer Assistant',
    description: 'Assists with loan applications, requirements, and financial guidance',
    instructions: `You are a loan officer assistant. Help customers understand loan options and requirements.

Key responsibilities:
- Explain loan products and requirements
- Assist with loan applications
- Provide financial guidance
- Schedule loan consultations
- Handle loan inquiries

Be thorough in explaining loan terms and requirements.`,
    voice_id: 'shimmer',
    temperature: 6,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'banking-&-finance',
    features: ['Loan information', 'Application assistance', 'Financial guidance', 'Consultation scheduling'],
    icon: BanknotesIcon,
    color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200',
    stats: { calls: '900+', satisfaction: '98%', languages: '10+' },
    useCases: ['Loan inquiries', 'Application support', 'Financial guidance', 'Consultation booking']
  },

  // Insurance Templates
  {
    id: 'insurance-customer-service',
    name: 'Insurance Customer Service',
    description: 'Handles policy inquiries, claims assistance, and insurance services',
    instructions: `You are an insurance customer service representative. Help customers with their insurance needs.

Key responsibilities:
- Answer policy-related questions
- Assist with claims information
- Provide coverage explanations
- Schedule appointments with agents
- Handle general insurance inquiries

Always provide accurate information about policies and procedures.`,
    voice_id: 'alloy',
    temperature: 5,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'insurance',
    features: ['Policy inquiries', 'Claims assistance', 'Coverage explanations', 'Appointment scheduling'],
    icon: ShieldCheckIcon,
    color: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200',
    stats: { calls: '1,200+', satisfaction: '97%', languages: '10+' },
    useCases: ['Policy inquiries', 'Claims assistance', 'Coverage explanations', 'Appointment booking']
  },
  {
    id: 'insurance-claims',
    name: 'Claims Processing Agent',
    description: 'Specializes in claims processing and customer support',
    instructions: `You are a claims processing specialist. Help customers with their insurance claims.

Key responsibilities:
- Guide customers through claims process
- Explain claims requirements and documentation
- Provide claims status updates
- Assist with claims filing
- Handle claims-related inquiries

Be thorough in explaining the claims process and requirements.`,
    voice_id: 'echo',
    temperature: 6,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'insurance',
    features: ['Claims processing', 'Documentation guidance', 'Status updates', 'Claims assistance'],
    icon: ShieldCheckIcon,
    color: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200',
    stats: { calls: '800+', satisfaction: '96%', languages: '8+' },
    useCases: ['Claims processing', 'Documentation support', 'Status updates', 'Claims assistance']
  },

  // Healthcare Templates
  {
    id: 'health-appointment',
    name: 'Appointment Scheduler',
    description: 'Handles appointment scheduling, patient inquiries, and healthcare services',
    instructions: `You are a healthcare appointment scheduler. Help patients schedule appointments and access care.

Key responsibilities:
- Schedule medical appointments
- Provide healthcare information
- Handle patient inquiries
- Assist with prescription refills
- Direct patients to appropriate services

Always maintain patient confidentiality and provide accurate healthcare information.`,
    voice_id: 'fable',
    temperature: 6,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'healthcare',
    features: ['Appointment scheduling', 'Healthcare information', 'Patient support', 'Prescription assistance'],
    icon: HeartIcon,
    color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200',
    stats: { calls: '900+', satisfaction: '99%', languages: '8+' },
    useCases: ['Appointment scheduling', 'Healthcare information', 'Patient support', 'Prescription assistance']
  },
  {
    id: 'health-patient-support',
    name: 'Patient Support Agent',
    description: 'Provides patient support, health information, and care coordination',
    instructions: `You are a patient support specialist. Help patients access healthcare services and information.

Key responsibilities:
- Provide health information and guidance
- Assist with care coordination
- Handle patient inquiries
- Support medication management
- Direct patients to appropriate resources

Always provide accurate health information and maintain patient privacy.`,
    voice_id: 'onyx',
    temperature: 7,
    max_tokens: 150,
    model: 'gpt-4',
    industry: 'healthcare',
    features: ['Health information', 'Care coordination', 'Patient support', 'Resource guidance'],
    icon: HeartIcon,
    color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200',
    stats: { calls: '600+', satisfaction: '99%', languages: '6+' },
    useCases: ['Health information', 'Care coordination', 'Patient support', 'Resource guidance']
  }
];

const industryInfo = {
  'real-estate': {
    name: 'Real Estate',
    description: 'Property management and real estate services',
    icon: HomeIcon,
    color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    stats: { totalCalls: '4,300+', avgSatisfaction: '97.5%', languages: '15+' }
  },
  'hotels-&-hospitality': {
    name: 'Hotels & Hospitality',
    description: 'Hotel and hospitality services',
    icon: BuildingOfficeIcon,
    color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    stats: { totalCalls: '4,700+', avgSatisfaction: '97.5%', languages: '20+' }
  },
  'banking-&-finance': {
    name: 'Banking & Finance',
    description: 'Financial services and banking',
    icon: BanknotesIcon,
    color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    stats: { totalCalls: '2,700+', avgSatisfaction: '98.5%', languages: '12+' }
  },
  'insurance': {
    name: 'Insurance',
    description: 'Insurance and risk management',
    icon: ShieldCheckIcon,
    color: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
    stats: { totalCalls: '2,000+', avgSatisfaction: '96.5%', languages: '10+' }
  },
  'healthcare': {
    name: 'Healthcare',
    description: 'Healthcare and medical services',
    icon: HeartIcon,
    color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    stats: { totalCalls: '1,500+', avgSatisfaction: '99%', languages: '8+' }
  }
};

const platformFeatures = [
  {
    title: 'Advanced AI Engine',
    description: 'Powered by GPT-4 and Claude for intelligent conversations',
    icon: CogIcon,
    color: 'bg-gradient-to-r from-blue-500 to-purple-500'
  },
  {
    title: 'Real-time Processing',
    description: 'Ultra-low latency voice processing for natural conversations',
    icon: RocketLaunchIcon,
    color: 'bg-gradient-to-r from-green-500 to-blue-500'
  },
  {
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption',
    icon: ShieldCheckIcon,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    title: 'Global Infrastructure',
    description: 'Deployed across 20+ regions for optimal performance',
    icon: GlobeAltIcon,
    color: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
];

export default function AgentTemplates() {
  const navigate = useNavigate();
  const { industry } = useParams<{ industry: string }>();
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const filteredTemplates = agentTemplates.filter(template => 
    !industry || template.industry === industry
  );

  const currentIndustry = industry ? industryInfo[industry as keyof typeof industryInfo] : null;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % platformFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const createAgentFromTemplate = async (template: AgentTemplate) => {
    setIsCreating(true);
    try {
      const agentData = {
        name: template.name,
        description: template.description,
        instructions: template.instructions,
        voice_id: template.voice_id,
        temperature: template.temperature,
        max_tokens: template.max_tokens,
        model: template.model,
        is_active: true
      };

      const newAgent = await apiService.createAgent(agentData);
      navigate(`/admin/agents`);
    } catch (error) {
      console.error('Error creating agent:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {currentIndustry ? `${currentIndustry.name} Templates` : 'Agent Templates'}
              </h1>
              <p className="text-xl text-gray-600">
                Choose from pre-built agent templates designed for your industry
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      {!industry && (
        <div className="py-12 bg-gradient-to-br from-white to-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Enterprise-Grade Platform Features
              </h2>
              <p className="text-xl text-gray-600">
                Built for scale, security, and performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformFeatures.map((feature, index) => (
                <div 
                  key={feature.title}
                  className={`group relative p-6 rounded-xl bg-white border border-gray-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 ${
                    activeFeature === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Industry Stats */}
      {currentIndustry && (
        <div className="py-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentIndustry.name} Industry Performance
              </h3>
              <p className="text-gray-600">
                Real-world results from our {currentIndustry.name.toLowerCase()} clients
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-600">{currentIndustry.stats.totalCalls}</div>
                <div className="text-gray-600">Total Calls Handled</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-green-600">{currentIndustry.stats.avgSatisfaction}</div>
                <div className="text-gray-600">Average Satisfaction</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-600">{currentIndustry.stats.languages}</div>
                <div className="text-gray-600">Languages Supported</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Grid */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`group relative p-8 rounded-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-lg ${template.color}`}
              >
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <template.icon className="w-10 h-10 text-gray-700 mr-4" />
                    <h3 className="text-2xl font-bold text-gray-900">{template.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-semibold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {template.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-600">
                          <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Template Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-lg font-bold text-gray-900">{template.stats.calls}</div>
                      <div className="text-xs text-gray-500">Daily Calls</div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-lg font-bold text-gray-900">{template.stats.satisfaction}</div>
                      <div className="text-xs text-gray-500">Satisfaction</div>
                    </div>
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2">
                      <div className="text-lg font-bold text-gray-900">{template.stats.languages}</div>
                      <div className="text-xs text-gray-500">Languages</div>
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 font-semibold mb-3">Use Cases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.useCases.map((useCase) => (
                        <span key={useCase} className="px-3 py-1 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full text-xs border border-gray-200">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <StarIcon className="w-4 h-4 mr-1" />
                      Pre-configured
                    </div>
                    <button
                      onClick={() => createAgentFromTemplate(template)}
                      disabled={isCreating}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isCreating ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <PlusIcon className="w-4 h-4 mr-2" />
                      )}
                      {isCreating ? 'Creating...' : 'Use Template'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Navigation */}
      {!industry && (
        <div className="py-12 bg-gradient-to-br from-white to-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Browse by Industry
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {Object.entries(industryInfo).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => navigate(`/templates/${key}`)}
                  className={`group p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${info.color}`}
                >
                  <div className="text-center">
                    <info.icon className="w-12 h-12 text-gray-700 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                    
                    {/* Industry Stats */}
                    <div className="text-xs text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg p-2">
                      <div>{info.stats.totalCalls} calls</div>
                      <div>{info.stats.avgSatisfaction} satisfaction</div>
                      <div>{info.stats.languages} languages</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 