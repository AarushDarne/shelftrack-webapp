import React from 'react';
import { School, Plus, Search, Filter, User, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { mockSchools } from '../data/mockData';

const Schools = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Schools</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage school libraries in the system</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add New School
          </button>
        </div>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search schools..."
          className="input !pl-10"
        />
      </div>
      
      {/* Schools grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSchools.map((school) => (
          <div key={school.id} className="card hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  <School className="h-5 w-5" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                  {school.name}
                </h3>
              </div>
              <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex">
                <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {school.address}, {school.city}, {school.state} {school.zipCode}
                </span>
              </div>
              <div className="flex">
                <Phone className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{school.phone}</span>
              </div>
              <div className="flex">
                <Mail className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{school.email}</span>
              </div>
              {school.website && (
                <div className="flex">
                  <Globe className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <a
                    href={`https://${school.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400"
                  >
                    {school.website}
                  </a>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  {Math.floor(Math.random() * 50) + 10} Users
                </span>
              </div>
              <div className="flex items-center">
                <School className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  {Math.floor(Math.random() * 1000) + 100} Books
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="btn btn-outline text-sm">View Details</button>
              <button className="btn btn-primary text-sm">Manage</button>
            </div>
          </div>
        ))}
        
        {/* Add new school card */}
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Plus className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Add a new school</h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Add another school to the library management system
          </p>
          <button className="mt-4 btn btn-outline">Add School</button>
        </div>
      </div>
    </div>
  );
};

export default Schools;