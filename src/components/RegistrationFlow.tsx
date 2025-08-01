import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BuildingOfficeIcon, UserIcon, ShieldCheckIcon, CogIcon,
  CheckIcon, ArrowRightIcon, ArrowLeftIcon, SparklesIcon,
  HomeIcon, BanknotesIcon, HeartIcon, PhoneIcon,
  GlobeAltIcon, ChartBarIcon, RocketLaunchIcon, StarIcon
} from '@heroicons/react/24/outline';
import { apiService } from '../services/api';

interface RegistrationData {
  company: {
    name: string;
    industry: string;
    size: string;
    website: string;
    phone: string;
    address: string;
    country: string;
  };
  admin: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    confirmPassword: string;
  };
  account: {
    plan: string;
    features: string[];
  };
  template: {
    selected: boolean;
    industry: string;
    templateId: string;
  };
}

const industries = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: HomeIcon,
    description: 'Property management, sales, and rentals',
    color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    templates: [
      { id: 're-property-inquiry', name: 'Property Inquiry Agent', description: 'Handle property searches and viewings' },
      { id: 're-rental-agent', name: 'Rental Agent', description: 'Manage rental inquiries and applications' }
    ]
  },
  {
    id: 'hotels-&-hospitality',
    name: 'Hotels & Hospitality',
    icon: BuildingOfficeIcon,
    description: 'Hotels, resorts, and hospitality services',
    color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200',
    templates: [
      { id: 'hotel-reservation', name: 'Hotel Reservation Agent', description: 'Handle bookings and guest services' },
      { id: 'hotel-concierge', name: 'Hotel Concierge', description: 'Provide concierge and guest assistance' }
    ]
  },
  {
    id: 'banking-&-finance',
    name: 'Banking & Finance',
    icon: BanknotesIcon,
    description: 'Banks, credit unions, and financial services',
    color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    templates: [
      { id: 'bank-customer-service', name: 'Bank Customer Service', description: 'Handle account inquiries and support' },
      { id: 'bank-loan-officer', name: 'Loan Officer Assistant', description: 'Assist with loan applications' }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance',
    icon: ShieldCheckIcon,
    description: 'Insurance companies and brokers',
    color: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200',
    templates: [
      { id: 'insurance-customer-service', name: 'Insurance Customer Service', description: 'Handle policy inquiries and claims' },
      { id: 'insurance-claims', name: 'Claims Processing Agent', description: 'Process claims and provide support' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: HeartIcon,
    description: 'Hospitals, clinics, and medical services',
    color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    templates: [
      { id: 'health-appointment', name: 'Appointment Scheduler', description: 'Schedule appointments and patient support' },
      { id: 'health-patient-support', name: 'Patient Support Agent', description: 'Provide patient care coordination' }
    ]
  }
];

const companySizes = [
  { id: 'startup', name: 'Startup (1-10 employees)', description: 'Perfect for new businesses getting started' },
  { id: 'small', name: 'Small Business (11-50 employees)', description: 'Ideal for growing companies' },
  { id: 'medium', name: 'Medium Business (51-200 employees)', description: 'Great for established companies' },
  { id: 'large', name: 'Large Enterprise (200+ employees)', description: 'Perfect for enterprise-level operations' }
];

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$99',
    period: 'month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 5 AI agents',
      '1,000 calls per month',
      'Basic analytics',
      'Email support',
      'Standard templates'
    ],
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$299',
    period: 'month',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 20 AI agents',
      '10,000 calls per month',
      'Advanced analytics',
      'Priority support',
      'Custom templates',
      'API access'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'month',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited AI agents',
      'Unlimited calls',
      'Custom analytics',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'On-premise options'
    ],
    popular: false
  }
];

const steps = [
  { id: 1, name: 'Company Info', icon: BuildingOfficeIcon },
  { id: 2, name: 'Admin Details', icon: UserIcon },
  { id: 3, name: 'Industry & Template', icon: CogIcon },
  { id: 4, name: 'Plan Selection', icon: StarIcon },
  { id: 5, name: 'Review & Create', icon: CheckIcon }
];

export default function RegistrationFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    company: {
      name: '',
      industry: '',
      size: '',
      website: '',
      phone: '',
      address: '',
      country: ''
    },
    admin: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      confirmPassword: ''
    },
    account: {
      plan: '',
      features: []
    },
    template: {
      selected: false,
      industry: '',
      templateId: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateRegistrationData = (section: keyof RegistrationData, data: any) => {
    console.log('Updating registration data:', section, data);
    setRegistrationData(prev => {
      const updated = {
        ...prev,
        [section]: { ...prev[section], ...data }
      };
      console.log('Updated registration data:', updated);
      return updated;
    });
  };

  const nextStep = () => {
    console.log('Next button clicked, current step:', currentStep);
    if (currentStep < steps.length) {
      console.log('Moving to next step:', currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleIndustrySelect = (industryId: string) => {
    updateRegistrationData('company', { industry: industryId });
    updateRegistrationData('template', { industry: industryId });
  };

  const handleTemplateSelect = (templateId: string) => {
    updateRegistrationData('template', { 
      selected: true, 
      templateId 
    });
  };

  const handlePlanSelect = (planId: string) => {
    updateRegistrationData('account', { plan: planId });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Create company account
      const companyData = {
        name: registrationData.company.name,
        industry: registrationData.company.industry,
        size: registrationData.company.size,
        website: registrationData.company.website,
        phone: registrationData.company.phone,
        address: registrationData.company.address,
        country: registrationData.company.country
      };

      // Create admin user
      const adminData = {
        firstName: registrationData.admin.firstName,
        lastName: registrationData.admin.lastName,
        email: registrationData.admin.email,
        phone: registrationData.admin.phone,
        role: registrationData.admin.role,
        password: registrationData.admin.password
      };

      // Create account with plan
      const accountData = {
        plan: registrationData.account.plan,
        features: registrationData.account.features
      };

      // Submit registration
      const response = await apiService.registerCompany({
        company: companyData,
        admin: adminData,
        account: accountData,
        template: registrationData.template
      });

      // Navigate to onboarding
      navigate('/onboarding', { 
        state: { 
          companyId: response.companyId,
          template: registrationData.template 
        } 
      });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep data={registrationData.company} updateData={updateRegistrationData} />;
      case 2:
        return <AdminDetailsStep data={registrationData.admin} updateData={updateRegistrationData} />;
      case 3:
        return (
          <IndustryTemplateStep 
            data={registrationData.template}
            selectedIndustry={registrationData.company.industry}
            onIndustrySelect={handleIndustrySelect}
            onTemplateSelect={handleTemplateSelect}
          />
        );
      case 4:
        return <PlanSelectionStep data={registrationData.account} onSelect={handlePlanSelect} />;
      case 5:
        return <ReviewStep data={registrationData} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    let canProceedResult = false;
    
    switch (currentStep) {
      case 1:
        canProceedResult = !!(registrationData.company.name && registrationData.company.industry && registrationData.company.size);
        console.log('Step 1 validation:', {
          name: registrationData.company.name,
          industry: registrationData.company.industry,
          size: registrationData.company.size,
          result: canProceedResult
        });
        break;
      case 2:
        const passwordsMatch = registrationData.admin.password === registrationData.admin.confirmPassword;
        const passwordValid = registrationData.admin.password.length >= 8;
        canProceedResult = !!(
          registrationData.admin.firstName && 
          registrationData.admin.lastName && 
          registrationData.admin.email &&
          registrationData.admin.password &&
          passwordValid &&
          passwordsMatch
        );
        console.log('Step 2 validation:', {
          firstName: registrationData.admin.firstName,
          lastName: registrationData.admin.lastName,
          email: registrationData.admin.email,
          passwordValid: passwordValid,
          passwordsMatch: passwordsMatch,
          result: canProceedResult
        });
        break;
      case 3:
        canProceedResult = true; // Optional step
        console.log('Step 3 validation: always true (optional)');
        break;
      case 4:
        canProceedResult = !!registrationData.account.plan;
        console.log('Step 4 validation:', {
          plan: registrationData.account.plan,
          result: canProceedResult
        });
        break;
      case 5:
        canProceedResult = true;
        console.log('Step 5 validation: always true');
        break;
      default:
        canProceedResult = false;
        console.log('Step validation: default false');
    }
    
    return canProceedResult;
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
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
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
                {index < steps.length - 1 && (
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
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={false}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next (Step {currentStep}) - Always Enabled
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
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
function CompanyInfoStep({ data, updateData }: { data: any; updateData: any }) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <BuildingOfficeIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your company</h2>
        <p className="text-gray-600">We'll use this information to customize your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData('company', { name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
          <select
            value={data.size}
            onChange={(e) => updateData('company', { size: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select company size</option>
            {companySizes.map((size) => (
              <option key={size.id} value={size.id}>{size.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updateData('company', { website: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://yourcompany.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData('company', { phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => updateData('company', { address: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your company address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
          <select
            value={data.industry}
            onChange={(e) => updateData('company', { industry: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select your industry</option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.id}>{industry.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <select
            value={data.country}
            onChange={(e) => updateData('company', { country: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select country</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function AdminDetailsStep({ data, updateData }: { data: any; updateData: any }) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <UserIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Account Details</h2>
        <p className="text-gray-600">This will be your main administrator account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateData('admin', { firstName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => updateData('admin', { lastName: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData('admin', { email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="admin@yourcompany.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData('admin', { phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role/Position</label>
          <input
            type="text"
            value={data.role}
            onChange={(e) => updateData('admin', { role: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., CEO, IT Manager, Operations Director"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <input
            type="password"
            value={data.password}
            onChange={(e) => updateData('admin', { password: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Create a secure password"
            minLength={8}
          />
          <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <input
            type="password"
            value={data.confirmPassword}
            onChange={(e) => updateData('admin', { confirmPassword: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              data.confirmPassword && data.password !== data.confirmPassword 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
            minLength={8}
          />
          {data.confirmPassword && data.password !== data.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>
      </div>
    </div>
  );
}

function IndustryTemplateStep({ data, selectedIndustry, onIndustrySelect, onTemplateSelect }: any) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <CogIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Industry & Template</h2>
        <p className="text-gray-600">Select your industry and optionally choose a template to get started quickly</p>
      </div>

      {/* Industry Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Your Industry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => onIndustrySelect(industry.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedIndustry === industry.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : industry.color
              }`}
            >
              <div className="text-center">
                <industry.icon className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-1">{industry.name}</h4>
                <p className="text-sm text-gray-600">{industry.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Selection */}
      {selectedIndustry && (
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose a Template (Optional)</h3>
          <p className="text-gray-600 mb-6">You can select a template now or set it up later</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industries.find(i => i.id === selectedIndustry)?.templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onTemplateSelect(template.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  data.templateId === template.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You can always change your template or create a custom one later in your dashboard.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PlanSelectionStep({ data, onSelect }: any) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <StarIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the plan that best fits your business needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
              data.plan === plan.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => onSelect(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-gray-600">/{plan.period}</span>
                )}
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewStep({ data }: { data: RegistrationData }) {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <CheckIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Information</h2>
        <p className="text-gray-600">Please review your details before creating your account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Company Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BuildingOfficeIcon className="w-5 h-5 mr-2" />
            Company Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Company Name:</span>
              <p className="text-gray-900">{data.company.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Industry:</span>
              <p className="text-gray-900">{industries.find(i => i.id === data.company.industry)?.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Size:</span>
              <p className="text-gray-900">{companySizes.find(s => s.id === data.company.size)?.name}</p>
            </div>
            {data.company.website && (
              <div>
                <span className="text-sm font-medium text-gray-500">Website:</span>
                <p className="text-gray-900">{data.company.website}</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UserIcon className="w-5 h-5 mr-2" />
            Admin Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Name:</span>
              <p className="text-gray-900">{data.admin.firstName} {data.admin.lastName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <p className="text-gray-900">{data.admin.email}</p>
            </div>
            {data.admin.role && (
              <div>
                <span className="text-sm font-medium text-gray-500">Role:</span>
                <p className="text-gray-900">{data.admin.role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Template Selection */}
        {data.template.selected && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CogIcon className="w-5 h-5 mr-2" />
              Selected Template
            </h3>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-900 font-medium">
                {industries.find(i => i.id === data.template.industry)?.templates.find(t => t.id === data.template.templateId)?.name}
              </p>
              <p className="text-sm text-gray-600">
                {industries.find(i => i.id === data.template.industry)?.templates.find(t => t.id === data.template.templateId)?.description}
              </p>
            </div>
          </div>
        )}

        {/* Plan Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <StarIcon className="w-5 h-5 mr-2" />
            Selected Plan
          </h3>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-gray-900 font-medium">
              {plans.find(p => p.id === data.account.plan)?.name} Plan
            </p>
            <p className="text-sm text-gray-600">
              {plans.find(p => p.id === data.account.plan)?.price} per month
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Next Steps:</strong> After account creation, you'll be guided through setting up your first AI agent and configuring your voice AI system.
        </p>
      </div>
    </div>
  );
} 