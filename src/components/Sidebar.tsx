import { Link, useLocation } from 'react-router-dom';
import { Home, Users, FileText, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: 'Início',
      path: '/',
      icon: Home,
    },
    {
      label: 'Clientes',
      path: '/clientes',
      icon: Users,
    },
    {
      label: 'Alvarás',
      path: '/alvaras',
      icon: FileText,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-900">O2controle</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:relative left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 shadow-lg z-40',
        'transition-transform duration-300 transform lg:transform-none',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'lg:mt-0 mt-16'
      )}>
        {/* Logo/Header - Desktop only */}
        <div className="p-6 border-b border-slate-200 hidden lg:block">
          <h1 className="text-2xl font-bold text-slate-900">Menu</h1>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 p-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

