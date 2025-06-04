import React from 'react';
import { User, Users as UsersIcon, Plus, Search, Filter } from 'lucide-react';
import { Role } from '../types';

const Users = () => {
  // Mock data for demonstration
  const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: Role.Teacher, status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: Role.Staff, status: 'active' },
    { id: '3', name: 'Robert Johnson', email: 'robert@example.com', role: Role.Teacher, status: 'inactive' },
    { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: Role.Teacher, status: 'active' },
    { id: '5', name: 'Michael Brown', email: 'michael@example.com', role: Role.Admin, status: 'active' },
    { id: '6', name: 'Emily Davis', email: 'emily@example.com', role: Role.Teacher, status: 'active' },
    { id: '7', name: 'David Miller', email: 'david@example.com', role: Role.Teacher, status: 'inactive' },
    { id: '8', name: 'Jennifer Wilson', email: 'jennifer@example.com', role: Role.Staff, status: 'active' },
  ];

  const getRoleBadgeClass = (role: Role) => {
    switch (role) {
      case Role.Admin:
        return 'badge-primary';
      case Role.Staff:
        return 'badge-secondary';
      case Role.Teacher:
        return 'badge-accent';
      default:
        return 'badge-secondary';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'inactive':
        return 'badge-error';
      default:
        return 'badge-secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage library users and permissions</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="input !pl-10"
          />
        </div>
        <button className="btn btn-outline flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>
      
      {/* Users table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`badge ${getStatusBadgeClass(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="mr-2 text-primary-600 hover:text-primary-900 dark:text-primary-500 dark:hover:text-primary-400">
                      Edit
                    </button>
                    <button className="text-error-600 hover:text-error-900 dark:text-error-500 dark:hover:text-error-400">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">24</span> results
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-outline">Previous</button>
          <button className="btn btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Users;