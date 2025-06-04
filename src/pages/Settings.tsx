import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserCircle, 
  Mail, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette,
  Check
} from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="h-5 w-5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="px-4 py-5 sm:p-6">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-3">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="md:col-span-3">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="px-4 py-5 sm:p-6">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Information</h3>
                  
                  <div className="flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                      <UserCircle className="h-10 w-10" />
                    </div>
                    <div className="ml-4">
                      <button className="btn btn-outline text-sm">Change Avatar</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="input mt-1"
                        defaultValue={currentUser?.name}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="input mt-1"
                        defaultValue={currentUser?.email}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        className="input mt-1"
                        defaultValue={currentUser?.role}
                        disabled
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        School
                      </label>
                      <select id="school" className="input mt-1">
                        <option>Highland Elementary</option>
                        <option>Lincoln Middle School</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <button className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              )}
              
              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          emailNotifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        role="switch"
                        aria-checked={emailNotifications}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            emailNotifications ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in the app</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                          pushNotifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                        role="switch"
                        aria-checked={pushNotifications}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            pushNotifications ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Notification Types</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="book-checkouts"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                          />
                          <label htmlFor="book-checkouts" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Book checkouts
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="book-returns"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                          />
                          <label htmlFor="book-returns" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Book returns
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="overdue-books"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                          />
                          <label htmlFor="overdue-books" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Overdue books
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="new-books"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                          />
                          <label htmlFor="new-books" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            New books added
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button className="btn btn-primary">Save Preferences</button>
                  </div>
                </div>
              )}
              
              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appearance Settings</h3>
                  
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Theme</h4>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div
                        className={`relative cursor-pointer overflow-hidden rounded-lg border-2 p-4 ${
                          theme === 'light'
                            ? 'border-primary-500'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="flex h-24 flex-col rounded-md bg-white shadow-sm">
                          <div className="h-8 border-b border-gray-200 bg-gray-50"></div>
                          <div className="flex-1 p-2">
                            <div className="mb-2 h-2 w-16 rounded bg-gray-200"></div>
                            <div className="h-2 w-full rounded bg-gray-100"></div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                          {theme === 'light' && (
                            <Check className="h-4 w-4 text-primary-500" />
                          )}
                        </div>
                      </div>
                      
                      <div
                        className={`relative cursor-pointer overflow-hidden rounded-lg border-2 p-4 ${
                          theme === 'dark'
                            ? 'border-primary-500'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="flex h-24 flex-col rounded-md bg-gray-900 shadow-sm">
                          <div className="h-8 border-b border-gray-700 bg-gray-800"></div>
                          <div className="flex-1 p-2">
                            <div className="mb-2 h-2 w-16 rounded bg-gray-700"></div>
                            <div className="h-2 w-full rounded bg-gray-800"></div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                          {theme === 'dark' && (
                            <Check className="h-4 w-4 text-primary-500" />
                          )}
                        </div>
                      </div>
                      
                      <div
                        className={`relative cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 p-4 dark:border-gray-700`}
                        onClick={() => {
                          // In a real app, would set to "system" and detect OS preference
                          // For this demo, just toggle between light and dark
                          setTheme(theme === 'light' ? 'dark' : 'light');
                        }}
                      >
                        <div className="flex h-24 flex-col">
                          <div className="flex h-full">
                            <div className="flex w-1/2 flex-col rounded-l-md bg-white shadow-sm">
                              <div className="h-8 border-b border-gray-200 bg-gray-50"></div>
                              <div className="flex-1"></div>
                            </div>
                            <div className="flex w-1/2 flex-col rounded-r-md bg-gray-900 shadow-sm">
                              <div className="h-8 border-b border-gray-700 bg-gray-800"></div>
                              <div className="flex-1"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <button className="btn btn-primary">Save Preferences</button>
                  </div>
                </div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Change Password</h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="current-password"
                            className="input mt-1"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            className="input mt-1"
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirm-password"
                            className="input mt-1"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="btn btn-primary">Update Password</button>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <button className="btn btn-outline">Enable 2FA</button>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Active Sessions</h4>
                      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        Manage your active sessions across different devices.
                      </p>
                      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 dark:text-white">Current Session</h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Started on {new Date().toLocaleDateString()}
                              </p>
                            </div>
                            <span className="badge badge-success">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;