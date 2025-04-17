// app/page.tsx
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Home, CreditCard, Shield } from 'lucide-react';

export default function HomePage() {
  // Mock featured apartments
  const featuredApartments = [
    { id: '1', name: 'Deluxe Suite', price: 4000, rating: 4.8, image: '/api/placeholder/800/500', location: 'City Center' },
    { id: '2', name: 'Studio Apartment', price: 3000, rating: 4.5, image: '/api/placeholder/800/500', location: 'Westlands' },
    { id: '3', name: 'Penthouse Suite', price: 6500, rating: 4.9, image: '/api/placeholder/800/500', location: 'Kilimani' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gray-900 h-96 md:h-screen w-full">
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4 md:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Orina Apartments</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">Experience luxury living with our premium apartments in prime locations. Your perfect stay awaits.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/apartments" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition duration-300">
                Browse Apartments
              </Link>
              <Link href="/register" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition duration-300">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-6 shadow-lg relative -mt-10 mx-4 md:mx-8 lg:mx-16 rounded-lg z-10">
        <div className="container mx-auto">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Any Location</option>
                <option>City Center</option>
                <option>Westlands</option>
                <option>Kilimani</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check-in Date</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition duration-300 flex items-center justify-center">
                Search Apartments <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Apartments</h2>
            <Link href="/apartments" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredApartments.map((apartment) => (
              <Link href={`/apartments/${apartment.id}`} key={apartment.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                <div className="relative">
                  <img src={apartment.image} alt={apartment.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{apartment.name}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="ml-1 text-gray-900">{apartment.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{apartment.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-blue-600 font-bold text-xl">KES {apartment.price.toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">per night</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Orina Apartments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Locations</h3>
              <p className="text-gray-600">All our apartments are located in prime areas with easy access to amenities and attractions.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Payments</h3>
              <p className="text-gray-600">Multiple payment options including M-Pesa, credit cards, and bank transfers for your convenience.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 p-4 rounded-full inline-flex mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Booking</h3>
              <p className="text-gray-600">Our booking system ensures your data is protected and your reservation is guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-700 py-16 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Luxury Living?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">Book your stay today and enjoy the comfort and convenience of Orina Apartments.</p>
          <Link href="/apartments" className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-3 rounded-md font-medium transition duration-300 inline-block">
            Browse Available Apartments
          </Link>
        </div>
      </section>
    </>
  );
}