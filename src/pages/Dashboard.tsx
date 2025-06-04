import { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Users, 
  BookX, 
  Clock, 
  BarChart3 
} from 'lucide-react';
import { DashboardStats, Activity } from '../types';

// Mock data for demonstration
const mockDashboardData: DashboardStats = {
  totalBooks: 1256,
  availableBooks: 1089,
  checkedOutBooks: 167,
  overdueBooks: 23,
  totalUsers: 342,
  topCategories: [
    { category: 'Fiction', count: 423 },
    { category: 'Science', count: 276 },
    { category: 'History', count: 201 },
    { category: 'Mathematics', count: 187 },
    { category: 'Literature', count: 169 },
  ],
  recentActivities: [
    {
      id: '1',
      type: 'checkout',
      description: 'Book "The Great Gatsby" checked out by Emma Johnson',
      userId: '1',
      resourceId: 'book-1',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      schoolId: '1',
    },
    {
      id: '2',
      type: 'return',
      description: 'Book "To Kill a Mockingbird" returned by Michael Brown',
      userId: '2',
      resourceId: 'book-2',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      schoolId: '1',
    },
    {
      id: '3',
      type: 'add_book',
      description: 'New book "Dune" added to the library',
      userId: '3',
      resourceId: 'book-3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      schoolId: '1',
    },
    {
      id: '4',
      type: 'edit_user',
      description: 'User account for Sophie Wilson updated',
      userId: '4',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      schoolId: '1',
    },
  ],
};

const formatTimeAgo = (timestamp: string): string => {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats(mockDashboardData);
      setIsLoading(false);
    };
    
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center">
        <p>Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Overview of your library system</p>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900">
              <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Books</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalBooks}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900">
              <BookOpen className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Checked Out</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.checkedOutBooks}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning-100 dark:bg-warning-900">
              <Clock className="h-6 w-6 text-warning-600 dark:text-warning-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.overdueBooks}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success-100 dark:bg-success-900">
              <Users className="h-6 w-6 text-success-600 dark:text-success-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent activity and charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent activity */}
        <div className="card">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <div className="space-y-4">
            {stats.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  {activity.type === 'checkout' && (
                    <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  )}
                  {activity.type === 'return' && (
                    <BookX className="h-5 w-5 text-success-600 dark:text-success-400" />
                  )}
                  {activity.type === 'add_book' && (
                    <BookOpen className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                  )}
                  {activity.type === 'edit_user' && (
                    <Users className="h-5 w-5 text-warning-600 dark:text-warning-400" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="btn btn-outline">View All Activity</button>
          </div>
        </div>
        
        {/* Top categories */}
        <div className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Top Categories</h2>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
              <BarChart3 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {stats.topCategories.map((category) => (
              <div key={category.category} className="flex items-center">
                <span className="text-sm text-gray-700 dark:text-gray-300">{category.category}</span>
                <div className="ml-4 flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div 
                      className="h-full rounded-full bg-primary-500" 
                      style={{ width: `${(category.count / stats.totalBooks) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{category.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="btn btn-outline">View All Categories</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;