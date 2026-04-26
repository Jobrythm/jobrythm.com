import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';
import logo from '../../assets/Jobrythm.png';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout = ({ onLogout }: AdminLayoutProps) => {
  const navItems = [
    { to: '/admin-page', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin-page/settings', label: 'Settings', icon: Settings, end: false },
  ];

  return (
    <div className="min-h-screen bg-navy-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-800 border-r border-navy-700 flex flex-col fixed inset-y-0 left-0 z-10">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-navy-700">
          <img src={logo} alt="Jobrythm" className="h-8 w-auto" />
          <span className="ml-2 text-xs font-semibold text-electric-400 uppercase tracking-wider">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-electric-600/20 text-electric-400 border border-electric-700/40'
                    : 'text-gray-400 hover:bg-navy-700 hover:text-gray-100'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-navy-700">
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-400 hover:bg-navy-700 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-navy-800 border-b border-navy-700 flex items-center px-6">
          <h1 className="text-lg font-semibold text-white">Jobrythm Admin</h1>
          <div className="ml-auto flex items-center space-x-3">
            <span className="text-sm text-gray-400">admin@example.com</span>
            <div className="w-8 h-8 rounded-full bg-electric-600 flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
