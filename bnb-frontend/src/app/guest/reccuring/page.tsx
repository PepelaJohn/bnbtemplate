// --- app/guest/monthly/page.tsx ---
import { useState } from 'react';
import { ArrowRight, CreditCard } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function MonthlyPaymentPage() {
  const [receiptCode, setReceiptCode] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Pay for Ongoing Stay</h1>
          <p className="mt-2 text-gray-600">Enter your receipt code to continue with your payment</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="receiptCode" className="block text-sm font-medium text-gray-700 mb-1">
              Receipt Code
            </label>
            <input
              id="receiptCode"
              type="text"
              value={receiptCode}
              onChange={(e) => setReceiptCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your receipt code"
            />
          </div>
          
          <Button 
            className="w-full" 
            icon={<ArrowRight size={18} />}
            disabled={!receiptCode}
          >
            Continue to Payment
          </Button>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Accepted Payment Methods</h3>
            <div className="flex gap-3">
              <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2">
                <CreditCard size={16} />
                <span className="text-sm">Credit Card</span>
              </div>
              <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2">
                <span className="font-medium text-green-600">M</span>
                <span className="text-sm">M-Pesa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        Need help? Contact support at <a href="mailto:support@luxstay.com" className="text-blue-600 hover:underline">support@luxstay.com</a>
      </p>
    </div>
  );
}