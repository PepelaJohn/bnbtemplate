// app/apartments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import PageContainer from '@/components/PageContainer';
import ApartmentCard from '@/components/ApartmentCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getApartments } from '@/api';
import Input from '@/components/ui/Input';


export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Appartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        const data  = await getApartments() as unknown as Appartment[];
        console.log(data)
        if(!!data?.length){

          setApartments(data);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load apartments. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApartments();
  }, []);
  
 

const [location, setLocation] = useState('');
  
  const filteredApartments = apartments.filter(apartment => {
 
    
    // Filter by price range
    if (!apartment._location.includes(location)) {
      return false;
    }
    
    
    return true;
  });
  
  return (
    <PageContainer 
      title="Available Apartments" 
      subtitle="Browse our selection of premium apartments for your stay"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment Location
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                
              </Input>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range (KES)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="p-2 border border-gray-300 rounded-md"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                  className="p-2 border border-gray-300 rounded-md"
                  placeholder="Max"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Show available only</span>
              </label>
            </div>
            
            <button
              onClick={() => {
                setSelectedType('all');
                setPriceRange([0, 10000]);
                setShowAvailableOnly(false);
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Apartments Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : filteredApartments.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-md">
              No apartments matching your filters. Try adjusting your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApartments.map((apartment) => (
                <ApartmentCard key={apartment._id} apartment={apartment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}