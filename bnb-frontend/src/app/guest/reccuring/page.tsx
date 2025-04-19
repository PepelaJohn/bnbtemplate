
'use client';

import { useState } from 'react';
// import { verifyReceipt, makePayment } from '@/lib/api';
// import { Receipt } from '@/types';
import PageContainer from '@/components/PageContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function MonthlyPaymentPage() {
  const [receiptCode, setReceiptCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const handleVerifyReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!receiptCode.trim()) {
      setError('Please enter a receipt code');
      return;
    }
    
    try {
      setLoading(true);
      // const data = await verifyReceipt(receiptCode);
      
      // if (data) {
      //   setReceipt(data);
      // } else {
      //   setError('Receipt not found. Please check the code and try again.');
      // }
    } catch (err) {
      setError('Failed to verify receipt. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleMakePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!receipt) return;
    
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid payment amount');
      return;
    }
    
    if (amount > receipt.balance) {
      setError(`Payment amount cannot exceed the outstanding balance of KES ${receipt.balance.toLocaleString()}`);
      return;
    }
    
    try {
      setLoading(true);
      // const updatedReceipt = await makePayment(receipt.id, amount);
      // setReceipt(updatedReceipt);
      setPaymentSuccess(true);
      setPaymentAmount('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Payment failed. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageContainer 

    >
      <div className="max-w-2xl mx-auto">
        {!receipt ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleVerifyReceipt}>
              <Input
                label="Receipt Code"
                value={receiptCode}
                onChange={(e) => setReceiptCode(e.target.value)}
                placeholder="Enter your receipt code (e.g., RCT-001-2025)"
                required
                error={error || undefined}
              />
              <Button
                type="submit"
                variant="primary"
             
                className="mt-4 w-full"
              >
                Verify Receipt
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center pb-4 border-b mb-4">
              <h2 className="text-xl font-semibold">Receipt Details</h2>
              <button
                onClick={() => setReceipt(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                Enter different code
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Receipt Code</p>
                <p className="font-medium">{receipt.code}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Guest Name</p>
                <p className="font-medium">{receipt.guestName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-in Date</p>
                <p className="font-medium">{new Date(receipt.checkIn).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check-out Date</p>
                <p className="font-medium">{new Date(receipt.checkOut).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">KES {receipt.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="font-medium">KES {receipt.paidAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center">
                <p className="text-gray-700">Outstanding Balance:</p>
                <p className="text-xl font-bold text-blue-600">
                  KES {receipt.balance.toLocaleString()}
                </p>
              </div>
            </div>
            
            {receipt.balance > 0 ? (
              <form onSubmit={handleMakePayment}>
                <div className="mb-4">
                  <Input
                    type="number"
                    label="Payment Amount (KES)"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount to pay"
                    required
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                    {error}
                  </div>
                )}
                
                {paymentSuccess && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
                    Payment successful! Your updated balance is KES {receipt.balance.toLocaleString()}.
                  </div>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  
                  className="w-full"
                >
                  Make Payment
                </Button>
              </form>
            ) : (
              <div className="bg-green-50 text-green-700 p-4 rounded-md">
                Your balance has been fully paid. Thank you!
              </div>
            )}
          </div>
        )}
        
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">Payment Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter your receipt code to view your current balance</li>
            <li>• Enter the amount you wish to pay</li>
            <li>• For assistance, contact our support team at support@apartmentmanager.com</li>
            <li>• Payment receipt will be sent to your registered email address</li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
