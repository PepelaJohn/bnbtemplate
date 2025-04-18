// app/booking/receipt/page.tsx
import Link from 'next/link';
import { CheckCircle, Download, Home, Calendar, CreditCard, User, ChevronRight } from 'lucide-react';
import { webname } from '@/constants';

export default function ReceiptPage() {
  // Enhanced mock receipt data
  const receipt = {
    code: 'ORINA123456',
    status: 'Confirmed',
    date: '2025-04-15',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+254 712 345 678',
    apartment: 'Deluxe Suite',
    checkin: '2025-04-20',
    checkout: '2025-04-23',
    nights: 3,
    guests: 2,
    amount: 12000,
    cleaning: 1000,
    service: 1500,
    total: 14500,
    method: 'M-Pesa',
    transaction: 'MPESA123456789',
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link href="/booking" className="text-gray-500 hover:text-blue-600">Booking</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium">Receipt</span>
        </nav>

        {/* Receipt Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 py-6 px-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Booking Receipt</h1>
                <p className="text-blue-100">Reference: {receipt.code}</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                <span className="font-medium">{receipt.status}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Status Banner */}
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center mb-6">
              <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <p className="font-medium text-green-800">Booking Successful</p>
                <p className="text-green-700 text-sm">Your booking has been confirmed. You will receive an email with all details.</p>
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Guest Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" /> Guest Information
                </h2>
                <div className="space-y-3">
                  <p><span className="text-gray-600">Name:</span> {receipt.name}</p>
                  <p><span className="text-gray-600">Email:</span> {receipt.email}</p>
                  <p><span className="text-gray-600">Phone:</span> {receipt.phone}</p>
                </div>
              </div>

              {/* Accommodation Details */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-blue-600" /> Accommodation Details
                </h2>
                <div className="space-y-3">
                  <p><span className="text-gray-600">Apartment:</span> {receipt.apartment}</p>
                  <p><span className="text-gray-600">Guests:</span> {receipt.guests} person{receipt.guests !== 1 ? 's' : ''}</p>
                  <p><span className="text-gray-600">Nights:</span> {receipt.nights}</p>
                </div>
              </div>

              {/* Stay Dates */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" /> Stay Dates
                </h2>
                <div className="space-y-3">
                  <p><span className="text-gray-600">Check-in:</span> {receipt.checkin} (after 2:00 PM)</p>
                  <p><span className="text-gray-600">Check-out:</span> {receipt.checkout} (before 11:00 AM)</p>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" /> Payment Information
                </h2>
                <div className="space-y-3">
                  <p><span className="text-gray-600">Method:</span> {receipt.method}</p>
                  <p><span className="text-gray-600">Transaction ID:</span> {receipt.transaction}</p>
                  <p><span className="text-gray-600">Date:</span> {receipt.date}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accommodation ({receipt.nights} nights)</span>
                  <span>KES {receipt.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cleaning Fee</span>
                  <span>KES {receipt.cleaning.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span>KES {receipt.service.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>KES {receipt.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition duration-300">
                <Download className="h-5 w-5 mr-2" /> Download Receipt
              </button>
              <Link href="/apartments" className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-md font-medium transition duration-300">
                Browse More Apartments
              </Link>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-gray-600">
          <p>If you have any questions about your booking, please contact us at <a href="mailto:support@{webname.toLowerCase()}.com" className="text-blue-600 hover:underline">support@{webname.toLowerCase()}.com</a></p>
          <p className="mt-2">Thank you for choosing {webname}!</p>
        </div>
      </div>
    </div>
  );
}