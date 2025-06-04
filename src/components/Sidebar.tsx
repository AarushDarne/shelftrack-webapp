import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  School, 
  Settings, 
  Home,
  X,
  Library
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <Home className="h-5 w-5" />,
      roles: [Role.Admin, Role.Staff, Role.Teacher],
    },
    {
      name: 'Books',
      path: '/books',
      icon: <BookOpen className="h-5 w-5" />,
      roles: [Role.Admin, Role.Staff, Role.Teacher],
    },
    {
      name: 'Users',
      path: '/users',
      icon: <Users className="h-5 w-5" />,
      roles: [Role.Admin, Role.Staff],
    },
    {
      name: 'Schools',
      path: '/schools',
      icon: <School className="h-5 w-5" />,
      roles: [Role.Admin],
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />,
      roles: [Role.Admin, Role.Staff],
    },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 ease-in-out dark:bg-gray-800 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
            <Link to="/" className="flex items-center">
              <Library className="h-8 w-8 text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                ShelfTrack
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems
              .filter(item => 
                item.roles.includes(currentUser?.role || Role.Teacher)
              )
              .map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
          </nav>
          
          {/* Current school selection */}
          <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <School className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current School
                </p>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 bg-transparent py-1 pl-0 pr-7 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-700 dark:text-white"
                  defaultValue="Highland Elementary"
                >
                  <option>Highland Elementary</option>
                  <option>Lincoln Middle School</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;