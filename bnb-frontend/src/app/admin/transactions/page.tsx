// --- app/admin/transactions/page.tsx ---
import { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, CreditCard, Banknote, Check, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/layout/AdminLayout';

const transactions = [
  { 
    id: 'TX001', 
    date: '2025-04-15', 
    method: 'M-Pesa', 
    amount: 5000, 
    status: 'completed',
    description: 'Monthly payment for Room 304',
    guest: 'Jane Doe'
  },
  { 
    id: 'TX002', 
    date: '2025-04-14', 
    method: 'Card', 
    amount: 3000, 
    status: 'completed',
    description: 'Booking deposit for Studio Room',
    guest: 'John Smith'
  },
  { 
    id: 'TX003', 
    date: '2025-04-13', 
    method: 'Bank Transfer', 
    amount: 8500, 
    status: 'pending',
    description: 'Full payment for Executive Suite',
    guest: 'Sarah Johnson'
  },
  { 
    id: 'TX004', 
    date: '2025-04-12', 
    method: 'Cash', 
    amount: 2500, 
    status: 'completed',
    description: 'Additional services',
    guest: 'Michael Brown'
  },
  { 
    id: 'TX005', 
    date: '2025-04-10', 
    method: 'M-Pesa', 
    amount: 12000, 
    status: 'completed',
    description: 'Monthly payment for Family Apartment',
    guest: 'David Wilson'
  },
  { 
    id: 'TX006', 
    date: '2025-04-09', 
    method: 'Card', 
    amount: 7500, 
    status: 'failed',
    description: 'Booking payment attempt',
    guest: 'Emma Taylor'
  },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMethod = filterMethod === 'all' || tx.method === filterMethod;
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    
    return matchesSearch && matchesMethod && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { class: 'bg-green-100 text-green-800' },
      pending: { class: 'bg-yellow-100 text-yellow-800' },
      failed: { class: 'bg-red-100 text-red-800' }
    };
    
    return (
      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status as keyof typeof statusConfig].class}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'M-Pesa':
        return <div className="bg-green-100 p-2 rounded-full"><Banknote size={16} className="text-green-600" /></div>;
      case 'Card':
        return <div className="bg-blue-100 p-2 rounded-full"><CreditCard size={16} className="text-blue-600" /></div>;
      case 'Bank Transfer':
        return <div className="bg-purple-100 p-2 rounded-full"><ArrowUpRight size={16} className="text-purple-600" /></div>;
      case 'Cash':
        return <div className="bg-gray-100 p-2 rounded-full"><Banknote size={16} className="text-gray-600" /></div>;
      default:
        return <div className="bg-gray-100 p-2 rounded-full"><CreditCard size={16} className="text-gray-600" /></div>;
    }
  };
  
  // Calculate summary stats
  const totalAmount = transactions.reduce((sum, tx) => tx.status !== 'failed' ? sum + tx.amount : sum, 0);
  const completedCount = transactions.filter(tx => tx.status === 'completed').length;
  const pendingCount = transactions.filter(tx => tx.status === 'pending').length;
  
  return (
    <AdminLayout path="/admin/transactions">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="mt-1 text-sm text-gray-500">View and manage all payment transactions</p>
        </div>
        <Button variant="outline" icon={<Download size={18} />}>Export Report</Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-md p-3 mr-4">
              <CreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-xl font-semibold text-gray-900">KES {totalAmount.toLocaleString()}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-md p-3 mr-4">
              <Check className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <h3 className="text-xl font-semibold text-gray-900">{completedCount}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-md p-3 mr-4">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-xl font-semibold text-gray-900">{pendingCount}</h3>
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
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Methods</option>
                <option value="M-Pesa">M-Pesa</option>
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </Card>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getMethodIcon(tx.method)}
                    <span className="ml-2 text-sm text-gray-900">{tx.method}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.guest}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{tx.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  KES {tx.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(tx.status)}</td>
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
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{transactions.length}</span> transactions
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
