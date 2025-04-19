// app/apartments/[id]/page.tsx
'use client'



import Link from "next/link";
import {
  MapPin,
  Check,
  ChevronRight,
  Loader2,
  Edit
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { getApartment } from "@/api";
import { optimizeImage } from "@/constants";
import useAuth from "@/hooks/useAuth";

interface ApartmentDetailProps {
  params: Promise<{ id: string }>;
}

export default function ApartmentDetail({ params }: ApartmentDetailProps) {
  const [apartment, setApartment] = useState<Appartment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const {user } = useAuth()
  const isAdmin = user?.role === "admin" || user?.role === "superadmin"
  const {id} = React.use(params)
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        const data = await getApartment(id);
        setApartment(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching apartment:", err);
        setError("Failed to load apartment details");
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Loading apartment details...</p>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="p-8 mt-[100px] container mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {error || "Apartment not found"}
        </h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the apartment you're looking for.
        </p>
        <Link 
          href="/apartments"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Available Apartments
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-[100px] pb-16">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link
              href="/apartments"
              className="text-gray-500 hover:text-blue-600"
            >
              Apartments
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">{apartment.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2 lg:col-span-2 rounded-lg overflow-hidden shadow-md">
            {apartment.gallery && apartment.gallery.length > 0 ? (
              <img
                src={optimizeImage(apartment.gallery[0], 800)}
                alt={apartment.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          {apartment.gallery && apartment.gallery.slice(1, 4).map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md">
              <img
                src={optimizeImage(image, 400)}
                alt={`${apartment.name} view ${index + 1}`}
                className="w-full h-44 object-cover"
              />
            </div>
          ))}
          {apartment.gallery && apartment.gallery.length <= 1 && (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden bg-gray-200 h-44 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {apartment.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{apartment._location}</span>
              </div>
              {isAdmin && <div>
              <Link href={`/admin/apartments/${apartment._id}/edit`} className="flex p-2 gap-2 border  w-[100px] items-center text-gray-600 mb-4">
                <Edit className="h-5 w-5 mr-1" />
                <span>Edit</span>
              </Link>
              </div>}
              <div className="bg-green-100 text-green-800 inline-block px-3 py-1 rounded-full text-sm font-medium">
                {apartment.isAvailable ? "Available" : "Not Available"}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{apartment.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {apartment.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-blue-600 mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {apartment.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-blue-600 mr-3" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">House Rules</h2>
              <ul className="space-y-2">
                {apartment.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <div className="bg-gray-200 rounded-lg h-64 w-full flex items-center justify-center">
                <span className="text-gray-600">Map placeholder</span>
              </div>
              <p className="mt-4 text-gray-700">
                {apartment._location}
              </p>
            </div>
          </div>

          {/* Sidebar - Contact/Booking Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">Interested?</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="I'm interested in this apartment..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}