import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  UserGroupIcon, 
  WrenchScrewdriverIcon, 
  PhoneIcon, 
  BookOpenIcon, 
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowLeftIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Agents', href: '/admin/agents', icon: UserGroupIcon },
  { name: 'Tools', href: '/admin/tools', icon: WrenchScrewdriverIcon },
  { name: 'Calls', href: '/admin/calls', icon: PhoneIcon },
  { name: 'Knowledge Base', href: '/admin/knowledge-base', icon: BookOpenIcon },
  { name: 'Phone Numbers', href: '/admin/phone-numbers', icon: PhoneIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className={`fixed inset-y-0 left-0 flex w-64 flex-col ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              NigerVoiceFlow
            </h1>
            <button
              type="button"
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? isDarkMode 
                        ? 'bg-blue-900 text-blue-100' 
                        : 'bg-primary-100 text-primary-900'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive 
                        ? isDarkMode ? 'text-blue-300' : 'text-primary-500'
                        : isDarkMode 
                          ? 'text-gray-400 group-hover:text-gray-300' 
                          : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className={`flex min-h-0 flex-1 flex-col ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-r`}>
          <div className="flex h-16 items-center px-4">
            <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              NigerVoiceFlow
            </h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? isDarkMode 
                        ? 'bg-blue-900 text-blue-100' 
                        : 'bg-primary-100 text-primary-900'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive 
                        ? isDarkMode ? 'text-blue-300' : 'text-primary-500'
                        : isDarkMode 
                          ? 'text-gray-400 group-hover:text-gray-300' 
                          : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b ${
          isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
        } px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8`}>
          <button
            type="button"
            className={`-m-2.5 p-2.5 lg:hidden ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Link
                to="/"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Homepage
              </Link>

              {/* User menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-2 rounded-full p-2 transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <UserCircleIcon className="h-6 w-6" />
                </button>

                {/* Dropdown menu */}
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  } z-50`}>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors ${
                          isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 