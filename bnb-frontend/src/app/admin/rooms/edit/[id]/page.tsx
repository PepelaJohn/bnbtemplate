// app/admin/rooms/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { getApartment, updateApartment } from '@/lib/api';
// import { Apartment, ApartmentType, SeasonType } from '@/types';
import PageContainer from '@/components/PageContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import LoadingSpinner from '@/components/LoadingSpinner';

interface EditRoomPageProps {
  params: { id: string };
}

export default function EditRoomPage({ params }: EditRoomPageProps) {
  const [apartment, setApartment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Form fields
  const [type, setType] = useState('Studio');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [overridePrice, setOverridePrice] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState(0);
  const [peakPrice, setPeakPrice] = useState(0);
  const [offPeakPrice, setOffPeakPrice] = useState(0);
  const [availability, setAvailability] = useState(true);

  const router = useRouter();
  
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        // const data:any[] = await getApartment(params.id);
        const data: any = {};
        if (data) {
          setApartment(data);
          
          // Initialize form fields
          setType(data.type);
          setName(data.name);
          setDescription(data.description);
          setOverridePrice(data.overridePrice || null);
          setBasePrice(data.seasonalPricing.Normal);
          setPeakPrice(data.seasonalPricing.Peak);
          setOffPeakPrice(data.seasonalPricing['Off-Peak']);
          setAvailability(data.availability);
          
          setError(null);
        } else {
          setError('Apartment not found. Please check the ID and try again.');
        }
      } catch (err) {
        setError('Failed to load apartment details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApartment();
  }, [params.id]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      
      if (!apartment) return;
      
      const updatedApartment: any = {
        ...apartment,
        type,
        name,
        description,
        overridePrice: overridePrice !== null ? overridePrice : null,
        seasonalPricing: {
          Normal: basePrice,
          Peak: peakPrice,
          'Off-Peak': offPeakPrice
        },
        availability
      };
      
    //   await updateApartment(params.id, updatedApartment);
      setSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to update apartment. Please try again later.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  
  const handleCancel = () => {
    router.push('/admin/rooms');
  };
  
  if (loading) {
    return (
      <PageContainer title="Loading...">
        <LoadingSpinner />
      </PageContainer>
    );
  }
  
  if (error && !apartment) {
    return (
      <PageContainer title="Error">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
          <div className="mt-4">
            <Button variant="secondary" onClick={handleCancel}>
              Back to Apartments
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer 
      title={`Edit Apartment - ${name}`}
      subtitle="Update apartment information and pricing"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <Input
                label="Apartment Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter apartment name"
                required
              />
            </div>
            
            <Select
              label="Apartment Type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              options={[
                { value: 'Studio', label: 'Studio' },
                { value: 'One Bedroom', label: 'One Bedroom' },
                { value: 'Two Bedroom', label: 'Two Bedroom' },
                { value: 'Three Bedroom', label: 'Three Bedroom' },
                { value: 'Penthouse', label: 'Penthouse' }
              ]}
              required
            />
            
            <Select
              label="Availability"
              value={availability ? 'available' : 'booked'}
              onChange={(e) => setAvailability(e.target.value === 'available')}
              options={[
                { value: 'available', label: 'Available' },
                { value: 'booked', label: 'Booked' }
              ]}
              required
            />
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter apartment description"
                required
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-4">Pricing</h3>
            
            <div className="mb-4">
              <Input
                type="number"
                label="Override Price (optional)"
                value={overridePrice !== null ? overridePrice.toString() : ''}
                onChange={(e) => setOverridePrice(e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="Enter override price (leave empty to use seasonal pricing)"
                // help="If set, this price will be used instead of seasonal pricing"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                label="Normal Season Price"
                value={basePrice.toString()}
                onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
                placeholder="Enter base price"
                required
              />
              
              <Input
                type="number"
                label="Peak Season Price"
                value={peakPrice.toString()}
                onChange={(e) => setPeakPrice(parseFloat(e.target.value) || 0)}
                placeholder="Enter peak season price"
                required
              />
              
              <Input
                type="number"
                label="Off-Peak Season Price"
                value={offPeakPrice.toString()}
                onChange={(e) => setOffPeakPrice(parseFloat(e.target.value) || 0)}
                placeholder="Enter off-peak price"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-4">
              Apartment updated successfully!
            </div>
          )}
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              disabled={saving}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}