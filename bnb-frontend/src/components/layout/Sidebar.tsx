// --- components/layout/Sidebar.tsx ---
import Link from 'next/link';
import { Home, Users, Calendar, CreditCard, FileText, Settings, BarChart3, UserCheck, LogOut } from 'lucide-react';
import { webname } from '@/constants';

export default function Sidebar() {
  

  return (
     <div className="bg-white w-64 min-h-screen shadow-sm hidden md:block">
           <div className="p-6">
             <h1 className="text-xl font-bold text-blue-600">{webname} Admin</h1>
           </div>
           <nav className="mt-6">
             <div className="px-4 py-2">
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</p>
             </div>
             <Link href="/admin" className="flex items-center py-3 px-4 bg-blue-50 text-blue-700 border-r-4 border-blue-600">
               <Home className="h-5 w-5 mr-3" />
               <span>Dashboard</span>
             </Link>
             <Link href="/admin/bookings" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <Calendar className="h-5 w-5 mr-3" />
               <span>Bookings</span>
             </Link>
             <Link href="/admin/rooms" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <Home className="h-5 w-5 mr-3" />
               <span>Rooms</span>
             </Link>
             <Link href="/admin/transactions" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <CreditCard className="h-5 w-5 mr-3" />
               <span>Transactions</span>
             </Link>
             
             <div className="px-4 py-2 mt-6">
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Administration</p>
             </div>
             <Link href="/admin/users" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <Users className="h-5 w-5 mr-3" />
               <span>Users</span>
             </Link>
             <Link href="/admin/logs" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <BarChart3 className="h-5 w-5 mr-3" />
               <span>Logs</span>
             </Link>
             <Link href="/admin/settings" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <Settings className="h-5 w-5 mr-3" />
               <span>Settings</span>
             </Link>
             
             <div className="px-4 py-2 mt-6">
               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</p>
             </div>
             <Link href="/admin/profile" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <UserCheck className="h-5 w-5 mr-3" />
               <span>Profile</span>
             </Link>
             <Link href="/logout" className="flex items-center py-3 px-4 text-gray-700 hover:bg-gray-50">
               <LogOut className="h-5 w-5 mr-3" />
               <span>Logout</span>
             </Link>
           </nav>
         </div>
  );
}