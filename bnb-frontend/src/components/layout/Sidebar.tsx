// --- components/layout/Sidebar.tsx ---
import Link from 'next/link';
import { Home, Users, Calendar, CreditCard, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  path: string;
}

export default function Sidebar({ path }: SidebarProps) {
  const menuItems = [
    { href: '/admin/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { href: '/admin/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
    { href: '/admin/rooms', icon: <Home size={20} />, label: 'Rooms' },
    { href: '/admin/transactions', icon: <CreditCard size={20} />, label: 'Transactions' },
    { href: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { href: '/admin/logs', icon: <FileText size={20} />, label: 'Logs' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-800 text-white w-64 py-6 px-4">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold">LuxStay Admin</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = path.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-700">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}