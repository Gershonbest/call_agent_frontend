import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API base URL - adjust this to match your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types for API responses
export interface Agent {
  id: number;
  name: string;
  description: string;
  instructions: string;
  voice_id: string;
  temperature: number;
  max_tokens: number;
  model: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  tool_type: string;
  configuration: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Call {
  id: number;
  agent_id: number;
  phone_number: string;
  caller_number: string;
  status: string;
  duration: number;
  recording_url: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeBase {
  id: number;
  name: string;
  description: string;
  kb_type: string;
  configuration: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PhoneNumber {
  id: number;
  phone_number: string;
  agent_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Registration and onboarding types
export interface CompanyRegistration {
  company: {
    name: string;
    industry: string;
    size: string;
    website?: string;
    phone?: string;
    address?: string;
    country?: string;
  };
  admin: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role?: string;
    password?: string;
  };
  account: {
    plan: string;
    features: string[];
  };
  template: {
    selected: boolean;
    industry: string;
    templateId?: string;
  };
}

export interface AccountSettings {
  language: string;
  timezone: string;
  notifications: boolean;
}

// API service class
class ApiService {
  // Registration and Onboarding
  async registerCompany(registrationData: CompanyRegistration): Promise<{ companyId: number; userId: number; token: string }> {
    const response: AxiosResponse = await apiClient.post('/register', registrationData);
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    return response.data;
  }

  async updateAccountSettings(settings: AccountSettings): Promise<void> {
    await apiClient.put('/account/settings', settings);
  }

  // Agents
  async getAgents(params?: { skip?: number; limit?: number; active_only?: boolean }): Promise<{ agents: Agent[]; total: number; page: number; per_page: number }> {
    const response: AxiosResponse = await apiClient.get('/agents', { params });
    return response.data;
  }

  async getAgent(id: number): Promise<Agent> {
    const response: AxiosResponse = await apiClient.get(`/agents/${id}`);
    return response.data;
  }

  async createAgent(agentData: Partial<Agent>): Promise<Agent> {
    const response: AxiosResponse = await apiClient.post('/agents', agentData);
    return response.data;
  }

  async updateAgent(id: number, agentData: Partial<Agent>): Promise<Agent> {
    const response: AxiosResponse = await apiClient.put(`/agents/${id}`, agentData);
    return response.data;
  }

  async deleteAgent(id: number): Promise<void> {
    await apiClient.delete(`/agents/${id}`);
  }

  // Tools
  async getTools(params?: { skip?: number; limit?: number; active_only?: boolean; tool_type?: string }): Promise<Tool[]> {
    const response: AxiosResponse = await apiClient.get('/tools', { params });
    return response.data;
  }

  async getTool(id: number): Promise<Tool> {
    const response: AxiosResponse = await apiClient.get(`/tools/${id}`);
    return response.data;
  }

  async createTool(toolData: Partial<Tool>): Promise<Tool> {
    const response: AxiosResponse = await apiClient.post('/tools', toolData);
    return response.data;
  }

  async updateTool(id: number, toolData: Partial<Tool>): Promise<Tool> {
    const response: AxiosResponse = await apiClient.put(`/tools/${id}`, toolData);
    return response.data;
  }

  async deleteTool(id: number): Promise<void> {
    await apiClient.delete(`/tools/${id}`);
  }

  // Calls
  async getCalls(params?: { agent_id?: number; status_filter?: string; skip?: number; limit?: number }): Promise<{ calls: Call[]; total: number; page: number; per_page: number }> {
    const response: AxiosResponse = await apiClient.get('/calls', { params });
    return response.data;
  }

  async getCall(id: number): Promise<Call> {
    const response: AxiosResponse = await apiClient.get(`/calls/${id}`);
    return response.data;
  }

  async initiateCall(callData: { agent_id: number; phone_number: string; caller_number: string; metadata?: any }): Promise<any> {
    const response: AxiosResponse = await apiClient.post('/calls/initiate', callData);
    return response.data;
  }

  async endCall(id: number): Promise<void> {
    await apiClient.post(`/calls/${id}/end`);
  }

  // Knowledge Bases
  async getKnowledgeBases(params?: { skip?: number; limit?: number; active_only?: boolean; kb_type?: string }): Promise<{ knowledge_bases: KnowledgeBase[]; total: number; page: number; per_page: number }> {
    const response: AxiosResponse = await apiClient.get('/knowledge-bases', { params });
    return response.data;
  }

  async getKnowledgeBase(id: number): Promise<KnowledgeBase> {
    const response: AxiosResponse = await apiClient.get(`/knowledge-bases/${id}`);
    return response.data;
  }

  async createKnowledgeBase(kbData: Partial<KnowledgeBase>): Promise<KnowledgeBase> {
    const response: AxiosResponse = await apiClient.post('/knowledge-bases', kbData);
    return response.data;
  }

  async updateKnowledgeBase(id: number, kbData: Partial<KnowledgeBase>): Promise<KnowledgeBase> {
    const response: AxiosResponse = await apiClient.put(`/knowledge-bases/${id}`, kbData);
    return response.data;
  }

  async deleteKnowledgeBase(id: number): Promise<void> {
    await apiClient.delete(`/knowledge-bases/${id}`);
  }

  // Phone Numbers
  async getPhoneNumbers(params?: { skip?: number; limit?: number; agent_id?: number; active_only?: boolean }): Promise<PhoneNumber[]> {
    const response: AxiosResponse = await apiClient.get('/phone-numbers', { params });
    return response.data;
  }

  async getPhoneNumber(id: number): Promise<PhoneNumber> {
    const response: AxiosResponse = await apiClient.get(`/phone-numbers/${id}`);
    return response.data;
  }

  async createPhoneNumber(phoneData: Partial<PhoneNumber>): Promise<PhoneNumber> {
    const response: AxiosResponse = await apiClient.post('/phone-numbers', phoneData);
    return response.data;
  }

  async updatePhoneNumber(id: number, phoneData: Partial<PhoneNumber>): Promise<PhoneNumber> {
    const response: AxiosResponse = await apiClient.put(`/phone-numbers/${id}`, phoneData);
    return response.data;
  }

  async deletePhoneNumber(id: number): Promise<void> {
    await apiClient.delete(`/phone-numbers/${id}`);
  }
}

export const apiService = new ApiService();
export default apiService; 