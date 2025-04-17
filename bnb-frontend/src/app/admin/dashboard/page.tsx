// --- app/admin/dashboard/page.tsx (New addition) ---
import { useState } from 'react';
import { Users, Home, CreditCard, TrendingUp, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/layout/AdminLayout';

export default function DashboardPage() {
    const summaryStats = [
      { title: 'Total Bookings', value: 156, icon: <Calendar size={24} className="text-blue-600" />, change: '+12%', trend: 'up' },
      { title: 'Room Occupancy', value: '85%', icon: <Home size={24} className="text-green-600" />, change: '+5%', trend: 'up' },
      { title: 'Monthly Revenue', value: 'KES 358,450', icon: <CreditCard size={24} className="text-purple-600" />, change: '+18%', trend: 'up' },
      { title: 'Active Guests', value: 42, icon: <Users size={24} className="text-yellow-600" />, change: '-3%', trend: 'down' },
    ];
  
    const recentBookings = [
      { id: 'B006', guest: 'Emma Taylor', room: 'Deluxe Suite', date: '2025-04-17', status: 'checked-in' },
      { id: 'B005', guest: 'David Wilson', room: 'Family Apartment', date: '2025-04-16', status: 'confirmed' },
      { id: 'B004', guest: 'Michael Brown', room: 'Studio Apartment', date: '2025-04-15', status: 'checked-in' },
      { id: 'B003', guest: 'Sarah Johnson', room: 'Executive Suite', date: '2025-04-14', status: 'confirmed' },
    ];
  
    const [activeTab, setActiveTab] = useState('overview');
  
    return (
      <AdminLayout path="/admin/dashboard">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex space-x-2">
              <Button variant="outline">Export Report</Button>
              <Button>New Booking</Button>
            </div>
          </div>
  
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'revenue' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('revenue')}
            >
              Revenue
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'occupancy' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('occupancy')}
            >
              Occupancy
            </button>
          </div>
  
          {/* Summary Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryStats.map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">{stat.icon}</div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.trend === 'up' ? (
                    <ArrowUp size={16} className="text-green-500" />
                  ) : (
                    <ArrowDown size={16} className="text-red-500" />
                  )}
                  <span className={`ml-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </span>
                </div>
              </Card>
            ))}
          </div>
  
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Recent Bookings</h2>
                <Button variant="primary" className="text-blue-600">View All</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.guest}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'checked-in'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="primary" className="text-blue-600">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
  
          {/* Two Column Layout for Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Occupancy Trends */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Occupancy Trends</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <TrendingUp size={48} className="text-gray-400" />
                <p className="ml-2 text-gray-500">Occupancy chart will render here</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">Last 30 Days</Button>
              </div>
            </Card>
  
            {/* Revenue Breakdown */}
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Revenue Breakdown</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <CreditCard size={48} className="text-gray-400" />
                <p className="ml-2 text-gray-500">Revenue chart will render here</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">This Month</Button>
              </div>
            </Card>
          </div>
        </div>
      </AdminLayout>
    );
  }