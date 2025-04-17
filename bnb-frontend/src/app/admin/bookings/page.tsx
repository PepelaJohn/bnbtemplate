import { useState } from 'react';
import { Search, Filter, Plus, Check, Clock, X } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/layout/AdminLayout';

const bookings = [
  { 
    id: 'B001', 
    guest: 'Jane Doe', 
    email: 'jane@example.com',
    phone: '+254712345678',
    apartment: 'Deluxe Suite', 
    checkIn: '2025-04-12', 
    checkOut: '2025-04-19',
    status: 'confirmed',
    amount: 35000
  },
  { 
    id: 'B002', 
    guest: 'John Smith', 
    email: 'john@example.com',
    phone: '+254723456789',
    apartment: 'Studio Apartment', 
    checkIn: '2025-04-15', 
    checkOut: '2025-04-22',
    status: 'pending',
    amount: 21000
  },
  { 
    id: 'B003', 
    guest: 'Sarah Johnson', 
    email: 'sarah@example.com',
    phone: '+254734567890',
    apartment: 'Executive Suite', 
    checkIn: '2025-04-20', 
    checkOut: '2025-04-25',
    status: 'confirmed',
    amount: 42500
  },
  { 
    id: 'B004', 
    guest: 'Michael Brown', 
    email: 'michael@example.com',
    phone: '+254745678901',
    apartment: 'Family Apartment', 
    checkIn: '2025-04-18', 
    checkOut: '2025-04-28',
    status: 'cancelled',
    amount: 55000
  },
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.apartment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { icon: <Check size={14} />, class: 'bg-green-100 text-green-800' },
      pending: { icon: <Clock size={14} />, class: 'bg-yellow-100 text-yellow-800' },
      cancelled: { icon: <X size={14} />, class: 'bg-red-100 text-red-800' }
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status as keyof typeof  statusConfig].class}`}>
        {statusConfig[status as keyof typeof statusConfig].icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <AdminLayout path="/admin/bookings">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all apartment bookings</p>
        </div>
        <Button icon={<Plus size={18} />}>New Booking</Button>
      </div>
      
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{booking.guest}</div>
                  <div className="text-sm text-gray-500">{booking.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.apartment}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">to {new Date(booking.checkOut).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">KES {booking.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(booking.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="outline" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-md">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBookings.length}</span> of <span className="font-medium">{bookings.length}</span> bookings
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
