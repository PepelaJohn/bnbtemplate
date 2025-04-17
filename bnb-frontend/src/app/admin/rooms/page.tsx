// --- app/admin/rooms/page.tsx ---
import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash, Home } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/layout/AdminLayout';

const rooms = [
  {
    id: 'R001',
    name: 'Deluxe Suite',
    type: 'suite',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 5000,
    status: 'available'
  },
  {
    id: 'R002',
    name: 'Studio Apartment',
    type: 'studio',
    capacity: 1,
    bedrooms: 1,
    bathrooms: 1,
    price: 3000,
    status: 'occupied'
  },
  {
    id: 'R003',
    name: 'Executive Suite',
    type: 'suite',
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 8500,
    status: 'maintenance'
  },
  {
    id: 'R004',
    name: 'Family Apartment',
    type: 'apartment',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 12000,
    status: 'available'
  },
  {
    id: 'R005',
    name: 'Penthouse Suite',
    type: 'suite',
    capacity: 4,
    bedrooms: 3,
    bathrooms: 2,
    price: 20000,
    status: 'occupied'
  }
];

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         room.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || room.type === filterType;
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { class: 'bg-green-100 text-green-800' },
      occupied: { class: 'bg-blue-100 text-blue-800' },
      maintenance: { class: 'bg-red-100 text-red-800' }
    };
    
    return (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status as keyof typeof statusConfig].class}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <AdminLayout path="/admin/rooms">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rooms & Apartments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage all properties and their availability</p>
        </div>
        <Button icon={<Plus size={18} />}>Add New Room</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-md p-3 mr-4">
              <Home className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Rooms</p>
              <h3 className="text-xl font-semibold text-gray-900">{rooms.length}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-md p-3 mr-4">
              <Home className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {rooms.filter(room => room.status === 'available').length}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-md p-3 mr-4">
              <Home className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Occupied</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {rooms.filter(room => room.status === 'occupied').length}
              </h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-md p-3 mr-4">
              <Home className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Maintenance</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {rooms.filter(room => room.status === 'maintenance').length}
              </h3>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="studio">Studio</option>
                <option value="suite">Suite</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <Home size={48} className="text-gray-400" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{room.type}</p>
                </div>
                {getStatusBadge(room.status)}
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Room ID</span>
                  <span className="text-gray-900 font-medium">{room.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacity</span>
                  <span className="text-gray-900 font-medium">{room.capacity} Persons</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bedrooms</span>
                  <span className="text-gray-900 font-medium">{room.bedrooms}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price per Night</span>
                  <span className="text-gray-900 font-medium">KES {room.price.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" icon={<Edit size={16} />} className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" icon={<Trash size={16} />} className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}
