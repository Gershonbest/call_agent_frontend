import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon, UserGroupIcon, ChartBarIcon, ShieldCheckIcon,
  BuildingOfficeIcon, HomeIcon, BanknotesIcon, HeartIcon,
  CheckCircleIcon, ArrowRightIcon, PlayIcon, SparklesIcon,
  GlobeAltIcon, ClockIcon, CpuChipIcon, RocketLaunchIcon,
  CogIcon, ServerIcon, CloudIcon,
  MicrophoneIcon, StarIcon
} from '@heroicons/react/24/outline';

const industries = [
  {
    name: 'Real Estate',
    icon: HomeIcon,
    description: 'Automate property inquiries, schedule viewings, and qualify leads 24/7',
    features: ['Property search assistance', 'Viewing scheduling', 'Lead qualification', 'Market updates'],
    color: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200',
    stats: { calls: '2,500+', satisfaction: '98%', languages: '15+' }
  },
  {
    name: 'Hotels & Hospitality',
    icon: BuildingOfficeIcon,
    description: 'Handle reservations, room service, and guest inquiries seamlessly',
    features: ['Reservation management', 'Room service orders', 'Guest support', 'Concierge services'],
    color: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200',
    stats: { calls: '3,200+', satisfaction: '96%', languages: '20+' }
  },
  {
    name: 'Banking & Finance',
    icon: BanknotesIcon,
    description: 'Provide account information, transaction support, and financial guidance',
    features: ['Account inquiries', 'Transaction support', 'Financial guidance', 'Appointment scheduling'],
    color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200',
    stats: { calls: '1,800+', satisfaction: '99%', languages: '12+' }
  },
  {
    name: 'Insurance',
    icon: ShieldCheckIcon,
    description: 'Process claims, provide policy information, and offer customer support',
    features: ['Claims processing', 'Policy information', 'Customer support', 'Quote generation'],
    color: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200',
    stats: { calls: '1,200+', satisfaction: '97%', languages: '10+' }
  },
  {
    name: 'Healthcare',
    icon: HeartIcon,
    description: 'Schedule appointments, provide health information, and offer patient support',
    features: ['Appointment scheduling', 'Health information', 'Patient support', 'Prescription refills'],
    color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200',
    stats: { calls: '900+', satisfaction: '99%', languages: '8+' }
  }
];

const features = [
  {
    title: '24/7 Availability',
    description: 'Your AI agents never sleep, providing round-the-clock customer support',
    icon: ClockIcon,
    animation: 'animate-pulse',
    details: 'Handle customer inquiries at any time, reducing wait times and improving satisfaction',
    bgColor: 'bg-gradient-to-br from-blue-500 to-purple-600'
  },
  {
    title: 'Multi-language Support',
    description: 'Reach global customers with AI agents that speak their language',
    icon: GlobeAltIcon,
    animation: 'animate-bounce',
    details: 'Support for 50+ languages with natural accent and cultural understanding',
    bgColor: 'bg-gradient-to-br from-green-500 to-blue-600'
  },
  {
    title: 'Seamless Integration',
    description: 'Integrate with your existing CRM, databases, and business systems',
    icon: CpuChipIcon,
    animation: 'animate-spin',
    details: 'REST API, webhooks, and SDK support for easy system integration',
    bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600'
  },
  {
    title: 'Analytics & Insights',
    description: 'Track call performance, customer satisfaction, and business metrics',
    icon: ChartBarIcon,
    animation: 'animate-ping',
    details: 'Real-time dashboards with call analytics, sentiment analysis, and performance metrics',
    bgColor: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    title: 'Customizable Voices',
    description: 'Choose from natural-sounding voices that match your brand personality',
    icon: MicrophoneIcon,
    animation: 'animate-pulse',
    details: '20+ voice options with customizable speed, tone, and personality traits',
    bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-600'
  },
  {
    title: 'Scalable Solution',
    description: 'Handle thousands of calls simultaneously without additional infrastructure',
    icon: RocketLaunchIcon,
    animation: 'animate-bounce',
    details: 'Auto-scaling infrastructure that handles peak loads and traffic spikes',
    bgColor: 'bg-gradient-to-br from-teal-500 to-green-600'
  }
];

const platformFeatures = [
  {
    title: 'Advanced AI Engine',
    description: 'Powered by GPT-4 and Claude for intelligent conversations',
    icon: CpuChipIcon,
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
    icon: CloudIcon,
    color: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
];

const testimonials = [
  {
    quote: "Our AI agent handles 80% of customer inquiries, allowing our team to focus on complex cases. The ROI was immediate.",
    author: "Sarah Johnson",
    role: "Customer Service Director",
    company: "Premier Real Estate",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    improvement: "80% reduction in call wait times"
  },
  {
    quote: "The voice AI has transformed our hotel's guest experience with instant, personalized support. Guest satisfaction scores increased by 25%.",
    author: "Michael Chen",
    role: "Operations Manager",
    company: "Grand Hotel Group",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    improvement: "25% increase in guest satisfaction"
  },
  {
    quote: "We've reduced call wait times by 90% while improving customer satisfaction scores. The integration was seamless.",
    author: "Lisa Rodriguez",
    role: "VP of Customer Experience",
    company: "Metro Bank",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    improvement: "90% reduction in wait times"
  }
];

export default function Homepage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Navigation Header */}
      <nav className="relative z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <SparklesIcon className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">NigerVoiceFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center justify-center mb-6">
                  <SparklesIcon className="w-8 h-8 text-blue-600 mr-3 animate-pulse" />
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                    NigerVoiceFlow
                  </h1>
                  <SparklesIcon className="w-8 h-8 text-blue-600 ml-3 animate-pulse" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  Transform Your Customer Service with
                  <span className="block text-blue-600">Intelligent Voice AI</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Build enterprise-grade voice AI agents that handle customer calls 24/7. 
                  Perfect for real estate, hotels, banks, insurance, and healthcare companies 
                  looking to enhance customer experience and reduce operational costs.
                </p>
                
                {/* Platform Stats */}
                <div className="flex justify-center mb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl font-bold text-blue-600">10,000+</div>
                      <div className="text-gray-600">Daily Calls</div>
                    </div>
                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl font-bold text-green-600">95%</div>
                      <div className="text-gray-600">Satisfaction</div>
                    </div>
                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl font-bold text-purple-600">50+</div>
                      <div className="text-gray-600">Languages</div>
                    </div>
                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="text-3xl font-bold text-orange-600">24/7</div>
                      <div className="text-gray-600">Availability</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/register"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <PlayIcon className="w-6 h-6 mr-3" />
                    Start Building Your AI Agent
                  </Link>
                  <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400 hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <PhoneIcon className="w-6 h-6 mr-3" />
                    Schedule a Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Platform
            </h2>
            <p className="text-xl text-gray-600">
              Built for scale, security, and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="group relative p-6 rounded-xl bg-white border border-gray-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50"
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

      {/* Interactive Features Showcase */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to build, deploy, and manage intelligent voice AI agents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`group relative p-8 rounded-xl bg-white border border-gray-200 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                  activeFeature === index ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-4">{feature.description}</p>
                <p className="text-sm text-gray-500 text-center">{feature.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our AI voice agents are helping companies across industries deliver exceptional customer experiences
            </p>
            <Link
              to="/templates"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300"
            >
              <UserGroupIcon className="w-5 h-5 mr-2" />
              Browse All Templates
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const industryKey = industry.name.toLowerCase().replace(/\s+&\s+/, '-').replace(/\s+/g, '-');
              return (
                <Link
                  key={industry.name}
                  to={`/templates/${industryKey}`}
                  className={`group relative p-8 rounded-xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${industry.color}`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <industry.icon className="w-10 h-10 text-gray-700 mr-4" />
                      <h3 className="text-2xl font-bold text-gray-900">{industry.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{industry.description}</p>
                    <ul className="space-y-3 mb-6">
                      {industry.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-600">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Industry Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2">
                        <div className="text-lg font-bold text-gray-900">{industry.stats.calls}</div>
                        <div className="text-xs text-gray-500">Daily Calls</div>
                      </div>
                      <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2">
                        <div className="text-lg font-bold text-gray-900">{industry.stats.satisfaction}</div>
                        <div className="text-xs text-gray-500">Satisfaction</div>
                      </div>
                      <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-2">
                        <div className="text-lg font-bold text-gray-900">{industry.stats.languages}</div>
                        <div className="text-xs text-gray-500">Languages</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Ready-to-use templates</span>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                        <span className="mr-2">Explore Templates</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How NigerVoiceFlow Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple setup, powerful results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Template</h3>
              <p className="text-gray-600">Select from industry-specific templates or create a custom agent with our intuitive builder.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Configure & Customize</h3>
              <p className="text-gray-600">Set up your agent's personality, knowledge base, and integrate with your existing systems.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Deploy & Monitor</h3>
              <p className="text-gray-600">Go live in minutes and monitor performance through our comprehensive analytics dashboard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
              <div className="text-6xl font-bold text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                10,000+
              </div>
              <div className="text-gray-600 text-lg">Calls Handled Daily</div>
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
              <div className="text-6xl font-bold text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                95%
              </div>
              <div className="text-gray-600 text-lg">Customer Satisfaction</div>
            </div>
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
              <div className="text-6xl font-bold text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-600 text-lg">Availability</div>
            </div>
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 border border-orange-200">
              <div className="text-6xl font-bold text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-600 text-lg">Languages Supported</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative p-8 rounded-xl bg-white border border-gray-200 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-blue-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed mb-4">"{testimonial.quote}"</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm font-semibold text-green-800">Key Improvement:</div>
                    <div className="text-sm text-green-700">{testimonial.improvement}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-12 border border-gray-200">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Customer Service?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join hundreds of companies already using NigerVoiceFlow to enhance customer experience and reduce operational costs
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <span className="relative flex items-center">
                    Get Started Now
                    <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>
                <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 border-2 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-400 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">NigerVoiceFlow</h3>
              <p className="text-gray-400">
                Building intelligent voice AI agents for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Real Estate</li>
                <li>Hotels & Hospitality</li>
                <li>Banking & Finance</li>
                <li>Insurance</li>
                <li>Healthcare</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>24/7 Availability</li>
                <li>Multi-language Support</li>
                <li>Analytics & Insights</li>
                <li>Customizable Voices</li>
                <li>Seamless Integration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@nigervoiceflow.com</li>
                <li>+234 (555) 123-4567</li>
                <li>Mon-Fri 9AM-6PM WAT</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NigerVoiceFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `
      }} />
    </div>
  );
} 