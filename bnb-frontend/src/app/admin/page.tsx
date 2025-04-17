// app/admin/page.tsx
import Link from 'next/link';
import { 
  Home, 
  Users, 
  CreditCard, 
  Calendar, 
  Settings, 
  BarChart3, 
  LogOut, 
  Bell, 
  Search,
  TrendingUp,
  UserCheck,
  Briefcase,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    { title: 'Total Bookings', value: '543', trend: '+12%', positive: true },
    { title: 'Revenue', value: 'KES 4.2M', trend: '+8%', positive: true },
    { title: 'Active Guests', value: '37', trend: '-3%', positive: false },
    { title: 'Occupancy Rate', value: '78%', trend: '+5%', positive: true },
  ];

  const recentBookings = [
    { id: 'B001', guest: 'Jane Doe', apartment: 'Deluxe Suite', checkin: '2025-04-15', checkout: '2025-04-18', status: 'Confirmed' },
    { id: 'B002', guest: 'John Smith', apartment: 'Studio Apartment', checkin: '2025-04-16', checkout: '2025-04-19', status: 'Pending' },
    { id: 'B003', guest: 'Robert Johnson', apartment: 'Penthouse', checkin: '2025-04-17', checkout: '2025-04-20', status: 'Confirmed' },
    { id: 'B004', guest: 'Mary Williams', apartment: 'Executive Room', checkin: '2025-04-18', checkout: '2025-04-22', status: 'Cancelled' },
  ];

  const alerts = [
    { id: 'A001', type: 'warning', message: 'Cleaning service pending for Room 205', time: '2 hours ago' },
    { id: 'A002', type: 'info', message: 'New booking received for Deluxe Suite', time: '5 hours ago' },
    { id: 'A003', type: 'error', message: 'Maintenance required in Room 302', time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="bg-white w-64 min-h-screen shadow-sm hidden md:block">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">Orina Admin</h1>
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

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="md:hidden mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </span>
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <img src="/api/placeholder/40/40" alt="Admin" className="h-8 w-8 rounded-full" />
                <span className="ml-2 font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your apartments.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                  <span className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {stat.positive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />}
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Bookings</h2>
                  <Link href="/admin/bookings" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartment</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{booking.guest}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{booking.apartment}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{booking.checkin}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-6">Alerts & Notifications</h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${
                      alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 
                      alert.type === 'error' ? 'border-red-200 bg-red-50' : 
                      'border-blue-200 bg-blue-50'
                    }`}>
                      <div className="flex items-start">
                        <div className={`rounded-full p-1 ${
                          alert.type === 'warning' ? 'bg-yellow-400' : 
                          alert.type === 'error' ? 'bg-red-400' : 
                          'bg-blue-400'
                        } mr-3`}>
                          <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href="/admin/alerts" className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All Alerts</Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <h2 className="text-xl font-bold mb-4">Occupancy Overview</h2>
                <div className="h-36 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Occupancy Chart</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 mb-1">Available</p>
                    <p className="text-xl font-bold text-green-600">12</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 mb-1">Occupied</p>
                    <p className="text-xl font-bold text-blue-600">28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}