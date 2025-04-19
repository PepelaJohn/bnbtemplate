// app/admin/apartments/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createApartment } from "@/api";
import MultipleImageUpload from "@/app/upload/page";
// import LoadingSpinner from '@/components/LoadingSpinner';

export default function CreateApartmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  // Amenities management
  const [amenities, setAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState("");

  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const [rules, setRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState("");

  const addAmenity = () => {
    if (newAmenity.trim()) {
      const splitFeatures = newAmenity.split(",").map((a) => a.trim());
      setAmenities([...amenities, ...splitFeatures]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (index: number) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };
  const addFeature = () => {
    if (newFeature.trim()) {
      const splitFeatures = newFeature.split(",").map((a) => a.trim());
      setFeatures([...features, ...splitFeatures]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  const addRule = () => {
    if (newRule.trim()) {
      const splitrules = newRule.split(",").map((a) => a.trim());

      setRules([...rules, ...splitrules]);
    }
    setNewRule("");
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      if (!name.trim() || !location.trim() || !description.trim()) {
        setError("Please fill in all required fields");
        return;
      }

      const apartmentData = {
        name,
        _location: location,
        description,
        amenities,
        isAvailable,
        rules,
        features,
        rooms: [], // Initially empty
      };

      const data = await createApartment(apartmentData);
      console.log(data);
      if (!!data) {
        //   router.push('/admin/apartments');
      }
    } catch (err) {
      console.log(err);
      setError("Failed to create apartment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      title="Create New Apartment"
      subtitle="Add a new apartment to the system"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Apartment Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter apartment name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Input
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter apartment location"
                    required
                  />
                </div>

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

                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="isAvailable"
                      type="checkbox"
                      checked={isAvailable}
                      onChange={(e) => setIsAvailable(e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="isAvailable"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Available for booking
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm"
                  >
                    <span>{amenity}</span>
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Add an amenity (e.g., Wi-Fi, Pool, etc.)"
                  className="flex-grow"
                />
                <Button type="button" variant="secondary" onClick={addAmenity}>
                  Add
                </Button>
              </div>
            </div>
            {/* Features Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Features
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add an feature (e.g Sound Proof walls.)"
                  className="flex-grow"
                />
                <Button type="button" variant="secondary" onClick={addFeature}>
                  Add
                </Button>
              </div>
            </div>
            {/* Rules Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Rules</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm"
                  >
                    <span>{rule}</span>
                    <button
                      type="button"
                      onClick={() => removeRule(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder="Add an rule (e.g.,No smoking.)"
                  className="flex-grow"
                />
                <Button type="button" variant="secondary" onClick={addRule}>
                  Add
                </Button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.push("/admin/apartments")}
              >
                Cancel
              </Button>

              <Button type="submit" variant="primary" disabled={loading}>
                Create Apartment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
