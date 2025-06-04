import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, School, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Role } from '../types';

const MobileNav = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'Home',
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
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="grid grid-cols-5">
        {navItems
          .filter(item => item.roles.includes(currentUser?.role || Role.Teacher))
          .slice(0, 5) // Ensure we only show 5 nav items max
          .map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 ${
                isActive(item.path)
                  ? 'text-primary-600 dark:text-primary-500'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MobileNav;