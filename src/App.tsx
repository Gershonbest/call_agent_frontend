import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './components/Homepage';
import AgentTemplates from './components/AgentTemplates';
import RegistrationFlow from './components/RegistrationFlow';
import OnboardingFlow from './components/OnboardingFlow';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Agents from './components/Agents';
import Calls from './components/Calls';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public homepage */}
        <Route path="/" element={<Homepage />} />
        
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        
        {/* Registration and Onboarding */}
        <Route path="/register" element={<RegistrationFlow />} />
        <Route path="/onboarding" element={<OnboardingFlow />} />
        
        {/* Agent Templates */}
        <Route path="/templates" element={<AgentTemplates />} />
        <Route path="/templates/:industry" element={<AgentTemplates />} />
        
        {/* Admin dashboard with layout - protected routes */}
        <Route path="/admin" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/admin/agents" element={<ProtectedRoute><Layout><Agents /></Layout></ProtectedRoute>} />
        <Route path="/admin/calls" element={<ProtectedRoute><Layout><Calls /></Layout></ProtectedRoute>} />
        <Route path="/admin/tools" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Tools Management</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
        <Route path="/admin/knowledge-base" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Knowledge Base</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
        <Route path="/admin/phone-numbers" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Phone Numbers</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Settings</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
        
        {/* Redirect old routes to admin - also protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/agents" element={<ProtectedRoute><Layout><Agents /></Layout></ProtectedRoute>} />
        <Route path="/calls" element={<ProtectedRoute><Layout><Calls /></Layout></ProtectedRoute>} />
        <Route path="/tools" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Tools Management</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
        <Route path="/knowledge-base" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Knowledge Base</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
        <Route path="/phone-numbers" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Phone Numbers</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><div className="text-center py-8"><h2 className="text-xl font-semibold">Settings</h2><p className="text-gray-500">Coming soon...</p></div></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
