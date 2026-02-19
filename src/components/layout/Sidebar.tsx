'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Home,
  Calendar,
  CheckSquare,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['agent', 'broker', 'admin'] },
  { name: 'Leads', href: '/leads', icon: Users, roles: ['agent', 'broker', 'admin'] },
  { name: 'Properties', href: '/properties', icon: Home, roles: ['agent', 'broker', 'admin'] },
  { name: 'Calendar', href: '/calendar', icon: Calendar, roles: ['agent', 'broker', 'admin'] },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare, roles: ['agent', 'broker', 'admin'] },
  { name: 'Messaging', href: '/messaging', icon: MessageSquare, roles: ['agent', 'broker', 'admin'] },
  { name: 'Broker Dashboard', href: '/broker', icon: BarChart3, roles: ['broker', 'admin'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['agent', 'broker', 'admin'] },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(user?.role || 'agent')
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-white"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SNT CRM</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-600">
                  {user?.first_name?.[0]}{user?.last_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.first_name && user?.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize truncate">
                  {user?.role || 'Agent'}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
