// app/apartments/page.tsx
import Link from 'next/link';
import { Star, MapPin, Wifi, Coffee, Home, Filter, List, Grid, ChevronDown } from 'lucide-react';

export default function ApartmentsPage() {
  // Enhanced mock apartment data
  const apartments = [
    { 
      id: '1', 
      name: 'Deluxe Suite', 
      price: 4000, 
      rating: 4.8, 
      image: '/api/placeholder/800/500', 
      location: 'City Center',
      size: '80 sqm',
      beds: 2,
      amenities: ['WiFi', 'Kitchen', 'AC', 'TV']
    },
    { 
      id: '2', 
      name: 'Studio Apartment', 
      price: 3000, 
      rating: 4.5, 
      image: '/api/placeholder/800/500', 
      location: 'Westlands',
      size: '45 sqm',
      beds: 1,
      amenities: ['WiFi', 'Kitchen', 'TV']
    },
    { 
      id: '3', 
      name: 'Penthouse Suite', 
      price: 6500, 
      rating: 4.9, 
      image: '/api/placeholder/800/500', 
      location: 'Kilimani',
      size: '120 sqm',
      beds: 3,
      amenities: ['WiFi', 'Kitchen', 'AC', 'TV', 'Pool']
    },
    { 
      id: '4', 
      name: 'Executive Room', 
      price: 3500, 
      rating: 4.4, 
      image: '/api/placeholder/800/500', 
      location: 'Riverside',
      size: '55 sqm',
      beds: 1,
      amenities: ['WiFi', 'AC', 'TV']
    },
    { 
      id: '5', 
      name: 'Family Suite', 
      price: 5500, 
      rating: 4.7, 
      image: '/api/placeholder/800/500', 
      location: 'Karen',
      size: '100 sqm',
      beds: 3,
      amenities: ['WiFi', 'Kitchen', 'AC', 'TV', 'Garden']
    },
    { 
      id: '6', 
      name: 'Budget Studio', 
      price: 2500, 
      rating: 4.2, 
      image: '/api/placeholder/800/500', 
      location: 'Eastlands',
      size: '40 sqm',
      beds: 1,
      amenities: ['WiFi', 'Kitchen']
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-blue-700 py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Find Your Perfect Apartment</h1>
          <p className="text-white/90 text-lg">Browse through our collection of premium apartments</p>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        {/* Filters and Sort Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">
                <Filter className="h-4 w-4" /> All Filters
              </button>
              
              <div className="relative">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">
                  Price <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              
              <div className="relative">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">
                  Location <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              
              <div className="relative">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium">
                  Amenities <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">View:</span>
              <button className="p-2 rounded-md bg-blue-600 text-white">
                <Grid className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">Showing {apartments.length} apartments</p>
        </div>
        
        {/* Apartments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {apartments.map((apartment) => (
            <Link href={`/apartments/${apartment.id}`} key={apartment.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300">
              <div className="relative">
                <img src={apartment.image} alt={apartment.name} className="w-full h-64 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="bg-blue-600 text-white text-sm px-2 py-1 rounded-md">KES {apartment.price.toLocaleString()}/night</span>
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
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{apartment.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Home className="h-4 w-4 mr-1" />
                  <span>{apartment.size} • {apartment.beds} {apartment.beds > 1 ? 'beds' : 'bed'}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {apartment.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                  {apartment.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      +{apartment.amenities.length - 3} more
                    </span>
                  )}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium transition duration-300">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">Previous</button>
            <button className="px-4 py-2 border rounded-md bg-blue-600 text-white">1</button>
            <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">2</button>
            <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">3</button>
            <button className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}