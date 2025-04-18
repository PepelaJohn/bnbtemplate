"use client";
// --- app/admin/dashboard/page.tsx (New addition) ---
import { useState } from "react";
import {
  Users,
  Home,
  CreditCard,
  TrendingUp,
  Calendar,
  ArrowUp,
  ArrowDown,
  AlertCircle,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { title: "Total Bookings", value: "543", trend: "+12%", positive: true },
    { title: "Revenue", value: "KES 4.2M", trend: "+8%", positive: true },
    { title: "Active Guests", value: "37", trend: "-3%", positive: false },
    { title: "Occupancy Rate", value: "78%", trend: "+5%", positive: true },
  ];

  const recentBookings = [
    {
      id: "B001",
      guest: "Jane Doe",
      apartment: "Deluxe Suite",
      checkin: "2025-04-15",
      checkout: "2025-04-18",
      status: "Confirmed",
    },
    {
      id: "B002",
      guest: "John Smith",
      apartment: "Studio Apartment",
      checkin: "2025-04-16",
      checkout: "2025-04-19",
      status: "Pending",
    },
    {
      id: "B003",
      guest: "Robert Johnson",
      apartment: "Penthouse",
      checkin: "2025-04-17",
      checkout: "2025-04-20",
      status: "Confirmed",
    },
    {
      id: "B004",
      guest: "Mary Williams",
      apartment: "Executive Room",
      checkin: "2025-04-18",
      checkout: "2025-04-22",
      status: "Cancelled",
    },
  ];

  const alerts = [
    {
      id: "A001",
      type: "warning",
      message: "Cleaning service pending for Room 205",
      time: "2 hours ago",
    },
    {
      id: "A002",
      type: "info",
      message: "New booking received for Deluxe Suite",
      time: "5 hours ago",
    },
    {
      id: "A003",
      type: "error",
      message: "Maintenance required in Room 302",
      time: "1 day ago",
    },
  ];
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline">Export Report</Button>
            <Button>New Booking</Button>
          </div>
        </div>

        

        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "revenue"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("revenue")}
          >
            Revenue
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "occupancy"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("occupancy")}
          >
            Occupancy
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                <span
                  className={`text-sm ${
                    stat.positive ? "text-green-600" : "text-red-600"
                  } flex items-center`}
                >
                  {stat.positive ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-1 transform rotate-180" />
                  )}
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
                <Link
                  href="/admin/bookings"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guest
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Apartment
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check-in
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {booking.guest}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {booking.apartment}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          {booking.checkin}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
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
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.type === "warning"
                        ? "border-yellow-200 bg-yellow-50"
                        : alert.type === "error"
                        ? "border-red-200 bg-red-50"
                        : "border-blue-200 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`rounded-full p-1 ${
                          alert.type === "warning"
                            ? "bg-yellow-400"
                            : alert.type === "error"
                            ? "bg-red-400"
                            : "bg-blue-400"
                        } mr-3`}
                      >
                        <AlertCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link
                  href="/admin/alerts"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All Alerts
                </Link>
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
      </div>
    </AdminLayout>
  );
}
