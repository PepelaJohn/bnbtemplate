
import { useState } from 'react';
import { Search, Filter, Clock, Download } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/layout/AdminLayout';

const logs = [
  { 
    id: 'L001', 
    timestamp: '2025-04-17T14:32:45', 
    action: 'Marked booking B001 as paid',
    user: 'Admin John',
    userRole: 'admin',
    ip: '192.168.1.45',
    module: 'bookings'
  },
  { 
    id: 'L002', 
    timestamp: '2025-04-17T13:18:22', 
    action: 'Edited room R003 price from KES 7500 to KES 8500',
    user: 'Admin Jane',
    userRole: 'super_admin',
    ip: '192.168.1.50',
    module: 'rooms'
  },
  { 
    id: 'L003', 
    timestamp: '2025-04-16T16:05:10', 
    action: 'Added new room R005 - Penthouse Suite',
    user: 'Admin Jane',
    userRole: 'super_admin',
    ip: '192.168.1.50',
    module: 'rooms'
  },
  { 
    id: 'L004', 
    timestamp: '2025-04-16T11:32:18', 
    action: 'Created new booking B004 for Michael Brown',
    user: 'Admin John',
    userRole: 'admin',
    ip: '192.168.1.45',
    module: 'bookings'
  },
  { 
    id: 'L005', 
    timestamp: '2025-04-15T10:14:30', 
    action: 'Marked transaction TX001 as completed',
    user: 'Admin Jane',
    userRole: 'super_admin',
    ip: '192.168.1.50',
    module: 'transactions'
  },
  { 
    id: 'L006', 
    timestamp: '2025-04-15T09:45:12', 
    action: 'Changed room R002 status to occupied',
    user: 'Admin John',
    userRole: 'admin',
    ip: '192.168.1.45',
    module: 'rooms'
  },
];

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModule, setFilterModule] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  
  // Get unique users for filter
  const uniqueUsers = [...new Set(logs.map(log => log.user))];
  
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesModule = filterModule === 'all' || log.module === filterModule;
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    
    return matchesSearch && matchesModule && matchesUser;
  });
  
  const getModuleColor = (module: string) => {
    const moduleColors = {
      bookings: 'text-blue-600 bg-blue-100',
      rooms: 'text-green-600 bg-green-100',
      transactions: 'text-purple-600 bg-purple-100',
      users: 'text-yellow-600 bg-yellow-100'
    };
    
    return moduleColors[module as keyof typeof moduleColors] || 'text-gray-600 bg-gray-100';
  };
  
  return (
    <AdminLayout path="/admin/logs">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Activity Logs</h1>
          <p className="mt-1 text-sm text-gray-500">Track all administrative actions on the system</p>
        </div>
        <Button variant="outline" icon={<Download size={18} />}>Export Logs</Button>
      </div>
      
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Modules</option>
                <option value="bookings">Bookings</option>
                <option value="rooms">Rooms</option>
                <option value="transactions">Transactions</option>
                <option value="users">Users</option>
              </select>
            </div>
            
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <Clock size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">{log.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">IP: {log.ip}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getModuleColor(log.module)}`}>
                  {log.module.charAt(0).toUpperCase() + log.module.slice(1)}
                </span>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{log.user}</p>
                  <p className="text-xs text-gray-500 capitalize">{log.userRole.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredLogs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No log entries found matching your filters.</p>
        </div>
      )}
      
      <div className="mt-4 flex justify-center">
        <Button variant="outline" size="sm">Load More</Button>
      </div>
    </AdminLayout>
  );
}