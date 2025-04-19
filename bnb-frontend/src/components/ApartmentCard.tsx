// components/ApartmentCard.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { Apartment } from '@/types';
import Button from '@/components/ui/Button';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';
import useAuth from '@/hooks/useAuth';
import { optimizeImage } from '@/constants';

interface ApartmentCardProps {
  apartment: Appartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const router = useRouter();
  const {user} = useAuth()
  console.log(user?.role)
  return (
    <div className="border rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg bg-white">
      <div className="relative h-48 md:h-64">
        <Image 
          src={optimizeImage(apartment.gallery[0], 350)} 
          alt={apartment.name}
          fill
          loading='lazy'
          className="object-cover"
        />
        {!apartment.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold text-lg px-4 py-2 bg-red-500 rounded-md">
              Currently Booked
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800">{apartment.name}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {apartment._location}
          </span>
        </div>
        
        <p className="text-gray-600 mt-2 line-clamp-2">{apartment.description}</p>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-1">
            {apartment.amenities.slice(0, 3).map((amenity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {apartment.amenities.length > 3 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                +{apartment.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
       {!!user && (user?.role === "admin" || user?.role === "super_admin")  &&<Button 
            variant="secondary" 
            size="sm"
            onClick={() => router.push(`admin/apartments/${apartment._id}/edit`)}
          >
            Edit Apartment
          </Button>}
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => router.push(`/apartments/${apartment._id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
