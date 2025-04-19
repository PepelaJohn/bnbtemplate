'use client';

import React, { useState, useEffect, useRef, Usable } from 'react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/PageContainer';
import LoadingSpinner from '@/components/LoadingSpinner';
import Input from '@/components/ui/Input';
import { getApartment, updateApartment, uploadImage } from '@/api';
import { Upload, X, ImagePlus, Loader2, Plus, Trash } from 'lucide-react';

interface Apartment {
  _id: string;
  name: string;
  _location: string;
  rooms: any[];
  gallery: any[];
  rules: string[];
  features: string[];
  description: string;
  amenities: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function EditApartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } =  React.use(params);
  
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  
  // Array fields
  const [rules, setRules] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  
  // New item inputs
  const [newRule, setNewRule] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  
  // Image upload
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        const data = await getApartment(id);
        if (data) {
          setApartment(data);
          
          // Populate form fields
          setName(data.name);
          setLocation(data._location);
          setDescription(data.description);
          setIsAvailable(data.isAvailable);
          setRules(data.rules || []);
          setFeatures(data.features || []);
          setAmenities(data.amenities || []);
          
          // Set existing gallery images
          setExistingImages(data.gallery || []);
        }
      } catch (err) {
        setError('Failed to load apartment details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApartment();
  }, [id]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      
      // First, handle image uploads if there are any
      let uploadedImages: any[] = [];
      if (previewImages.length > 0 && fileInputRef.current?.files) {
        const formData = new FormData();
        Array.from(fileInputRef.current.files).forEach((file) => {
          formData.append("images", file);
        });
        
        const imageResponse = await uploadImage(formData);
        if (imageResponse && (imageResponse as any).urls) {
          uploadedImages = (imageResponse as any).urls;
        }
      }
      
      // Prepare apartment data for update
      const updatedData = {
        name,
        _location: location,
        description,
        isAvailable,
        rules,
        features,
        amenities,
        gallery: [ ...uploadedImages, ...(existingImages || []) ], // Combine new and existing images
      };
      
      const data = await updateApartment(id, updatedData);
      if(!data) {
        throw new Error('Failed to update apartment');}
        // setApartment(data);
      setSuccess('Apartment updated successfully!');
      
      // Clear uploaded images after successful save
      setPreviewImages([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      // Wait a moment then redirect back to the apartment page
      setTimeout(() => {
        router.push(`/apartments/${id}`);
      }, 2000);
      
    } catch (err) {
      setError('Failed to update apartment. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  
  // Image upload handlers
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    addNewFiles(files);
  };

  const addNewFiles = (files: FileList) => {
    const newImageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newImageUrls]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addNewFiles(e.dataTransfer.files);
    }
  };

  const removePreviewImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, idx) => idx !== index));
  };
  
  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  // List items handlers
  const addRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule.trim()]);
      setNewRule('');
    }
  };
  
  const removeRule = (index: number) => {
    setRules(rules.filter((_, idx) => idx !== index));
  };
  
  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };
  
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, idx) => idx !== index));
  };
  
  const addAmenity = () => {
    if (newAmenity.trim()) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity('');
    }
  };
  
  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, idx) => idx !== index));
  };
  
  if (loading) {
    return (
      <PageContainer title="Loading Apartment...">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </PageContainer>
    );
  }
  
  if (!apartment && !loading) {
    return (
      <PageContainer title="Apartment Not Found">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          The apartment you are looking for does not exist or you do not have permission to edit it.
        </div>
        <button
          onClick={() => router.push('/apartments')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Back to Apartments
        </button>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer 
      title={`Edit Apartment: ${name}`}
      subtitle="Update apartment details and manage gallery"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
            {success}
          </div>
        )}
        
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apartment Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md min-h-32"
              required
            />
          </div>
          
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Available for rent</span>
            </label>
          </div>
        </div>
        
        {/* Features, Rules, and Amenities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Features */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            
            <div className="flex space-x-2 mb-4">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addFeature}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Rules */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Rules</h2>
            
            <div className="flex space-x-2 mb-4">
              <Input
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Add a rule"
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addRule}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <ul className="space-y-2">
              {rules.map((rule, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                  <span>{rule}</span>
                  <button
                    type="button"
                    onClick={() => removeRule(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Amenities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            
            <div className="flex space-x-2 mb-4">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add an amenity"
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <ul className="space-y-2">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                  <span>{amenity}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Gallery Images */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>
          
          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Current Images ({existingImages.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {existingImages.map((image, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden aspect-square">
                    <img 
                      src={typeof image === 'string' ? image : image.url} 
                      alt={`apartment-${idx}`} 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1 rounded-full transition-opacity"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Upload New Images */}
          <div 
            className={`border-2 border-dashed rounded-lg p-6 transition-all ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <ImagePlus size={48} className="text-gray-400" />
              <div className="text-center">
                <p className="text-lg font-medium">Drag & drop images here</p>
                <p className="text-sm text-gray-500 mt-1">Or click to browse files</p>
              </div>
              <button
                type="button"
                onClick={triggerFileInput}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium flex items-center space-x-2"
              >
                <Upload size={16} />
                <span>Select Files</span>
              </button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleSelectImages}
            className="hidden"
          />
          
          {previewImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">New Images to Upload ({previewImages.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {previewImages.map((src, idx) => (
                  <div key={idx} className="relative group rounded-lg overflow-hidden aspect-square">
                    <img 
                      src={src} 
                      alt={`preview-${idx}`} 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => removePreviewImage(idx)}
                      className="absolute top-2 right-2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1 rounded-full transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Submission buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className={`px-6 py-2 rounded-md font-medium flex items-center space-x-2 ${
              saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white transition-colors`}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>
    </PageContainer>
  );
}