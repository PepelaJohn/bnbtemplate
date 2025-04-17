// --- app/admin/users/page.tsx ---
import { useState } from 'react';
import { Search, Plus, User, Edit, Trash, Key } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/layout/AdminLayout';

const users = [
  { 
    id: 'U001', 
    name: 'John Doe', 
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-04-17T09:35:22',
    permissions: ['bookings.view', 'bookings.edit', 'rooms.view']
  },
  { 
    id: 'U002', 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2025-04-16T16:22:45',
    permissions: ['all']
  },
  { 
    id: 'U003', 
    name: 'Michael Johnson', 
    email: 'michael@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2025-04-15T11:18:09',
    permissions: ['bookings.view', 'bookings.edit', 'rooms.view', 'rooms.edit', 'transactions.view']
  },
  { 
    id: 'U004', 
    name: 'Sarah Williams', 
    email: 'sarah@example.com',
    role: 'receptionist',
    status: 'inactive',
    lastLogin: '2025-04-10T08:45:30',
    permissions: ['bookings.view', 'rooms.view']
  },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { class: 'bg-purple-100 text-purple-800' },
      admin: { class: 'bg-blue-100 text-blue-800' },
      manager: { class: 'bg-green-100 text-green-800' },
      receptionist: { class: 'bg-yellow-100 text-yellow-800' }
    };
    
    return (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${roleConfig[role as keyof typeof roleConfig].class}`}>
        {role.replace('_', ' ').charAt(0).toUpperCase() + role.replace('_', ' ').slice(1)}
      </span>
    );
  };
  
  const getStatusDot = (status: string) => {
    return (
      <span className={`inline-block w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
    );
  };
  
  return (
    <AdminLayout path="/admin/users">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage administrator accounts and permissions</p>
        </div>
        <Button icon={<Plus size={18} />}>Add New User</Button>
      </div>
      
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="receptionist">Receptionist</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-start">
              <div className="bg-gray-100 rounded-full p-3 mr-4">
                <User className="text-gray-600" size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  {getRoleBadge(user.role)}
                </div>
                
                <div className="mt-2 flex items-center text-sm">
                  {getStatusDot(user.status)}
                  <span className="ml-2 text-gray-700 capitalize">
                    {user.status}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500">
                    Last login: {new Date(user.lastLogin).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Permissions</h4>
                  {user.permissions.includes('all') ? (
                    <p className="text-sm text-gray-700">Full system access</p>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((perm) => (
                        <span key={perm} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {perm}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" icon={<Edit size={16} />}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" icon={<Key size={16} />}>
                    Permissions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    icon={<Trash size={16} />} 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}