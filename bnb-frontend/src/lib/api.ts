// lib/api.ts - Add this function to your existing API file

// Interface based on your MongoDB model
export interface ApartmentData {
    name: string;
    _location: string;
    rooms: string[];
    gallery: string[];
    description: string;
    amenities: string[];
    isAvailable: boolean;
  }
  
  // Create a new apartment
  export async function createApartment(data: ApartmentData): Promise<any> {
    try {
      const response = await fetch('/api/apartments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create apartment');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating apartment:', error);
      throw error;
    }
  }
  
  // Fetch all apartments
  export async function getApartments(): Promise<ApartmentData[]> {
    try {
      const response = await fetch('/api/apartments');
      
      if (!response.ok) {
        throw new Error('Failed to fetch apartments');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching apartments:', error);
      throw error;
    }
  }
  
  // Fetch a single apartment by ID
  export async function getApartment(id: string): Promise<ApartmentData> {
    try {
      const response = await fetch(`/api/apartments/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch apartment');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching apartment:', error);
      throw error;
    }
  }
  
  // Update an apartment
  export async function updateApartment(id: string, data: Partial<ApartmentData>): Promise<ApartmentData> {
    try {
      const response = await fetch(`/api/apartments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update apartment');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating apartment:', error);
      throw error;
    }
  }
  
  // Delete an apartment
  export async function deleteApartment(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/apartments/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete apartment');
      }
    } catch (error) {
      console.error('Error deleting apartment:', error);
      throw error;
    }
  }