// app/apartments/[id]/page.tsx
import Link from 'next/link';
import { Star, MapPin, Check, Calendar, Users, ChevronRight, Coffee, Wifi, Tv, Wind, Utensils as Kitchen } from 'lucide-react';

interface ApartmentDetailProps {
  params: { id: string };
}

export default function ApartmentDetail({ params }: ApartmentDetailProps) {
  // Enhanced mock apartment data
  const apartments = [
    { 
      id: '1', 
      name: 'Deluxe Suite', 
      price: 4000, 
      rating: 4.8,
      reviews: 24, 
      images: [
        '/api/placeholder/1200/800',
        '/api/placeholder/1200/800',
        '/api/placeholder/1200/800',
        '/api/placeholder/1200/800',
      ],
      location: 'City Center',
      address: '123 Kenyatta Avenue, Nairobi',
      size: '80 sqm',
      beds: 2,
      baths: 2,
      guests: 4,
      description: 'Experience luxury in this beautifully furnished deluxe suite in the heart of the city. The apartment features a spacious living area, fully equipped kitchen, and stunning city views.',
      amenities: [
        { name: 'Free WiFi', icon: Wifi },
        { name: 'Air Conditioning', icon: Wind },
        { name: 'Fully Equipped Kitchen', icon: Kitchen },
        { name: 'Smart TV', icon: Tv },
        { name: 'Coffee Maker', icon: Coffee },
        { name: '24/7 Security', icon: Check },
        { name: 'Swimming Pool', icon: Check },
        { name: 'Gym', icon: Check },
      ],
      features: [
        'Floor-to-ceiling windows with city views',
        'Premium quality furnishings',
        'Workspace with high-speed internet',
        'Luxurious bedding and linens',
        'Walk-in closet',
        'Complimentary toiletries',
      ],
      rules: [
        'Check-in: 2:00 PM - 8:00 PM',
        'Check-out: 11:00 AM',
        'No smoking',
        'No pets',
        'No parties or events',
      ]
    },
    { 
      id: '2', 
      name: 'Studio Apartment', 
      price: 3000, 
      rating: 4.5,
      reviews: 18, 
      images: [
        '/api/placeholder/1200/800',
        '/api/placeholder/1200/800',
        '/api/placeholder/1200/800',
      ],
      location: 'Westlands',
      address: '45 Waiyaki Way, Westlands, Nairobi',
      size: '45 sqm',
      beds: 1,
      baths: 1,
      guests: 2,
      description: 'Cozy studio apartment in Westlands, perfect for solo travelers or couples. Modern design with all essential amenities for a comfortable stay.',
      amenities: [
        { name: 'Free WiFi', icon: Wifi },
        { name: 'Smart TV', icon: Tv },
        { name: 'Kitchenette', icon: Kitchen },
        { name: '24/7 Security', icon: Check },
      ],
      features: [
        'Modern furnishings',
        'Comfortable queen-sized bed',
        'Workspace with high-speed internet',
        'Complimentary toiletries',
      ],
      rules: [
        'Check-in: 2:00 PM - 8:00 PM',
        'Check-out: 11:00 AM',
        'No smoking',
        'No pets',
      ]
    }
  ];

  const apartment = apartments.find((a) => a.id === params.id);
  if (!apartment) return <div className="p-8">Apartment not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-4 px-4">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/apartments" className="text-gray-500 hover:text-blue-600">Apartments</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">{apartment.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2 lg:col-span-2 rounded-lg overflow-hidden">
            <img 
              src={apartment.images[0]} 
              alt={apartment.name} 
              className="w-full h-96 object-cover"
            />
          </div>
          {apartment.images.slice(1, 4).map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt={`${apartment.name} view ${index + 1}`} 
                className="w-full h-44 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Header */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{apartment.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500 mr-4">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 text-gray-900">{apartment.rating}</span>
                  <span className="ml-1 text-gray-600">({apartment.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{apartment.location}</span>
                </div>
              </div>
              <p className="text-gray-600">{apartment.address}</p>
            </div>

            {/* Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Apartment Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">Size</p>
                  <p className="font-medium">{apartment.size}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">Bedrooms</p>
                  <p className="font-medium">{apartment.beds}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">Bathrooms</p>
                  <p className="font-medium">{apartment.baths}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm">Max Guests</p>
                  <p className="font-medium">{apartment.guests}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 mb-6">{apartment.description}</p>
              
              <h3 className="text-lg font-semibold mb-3">Apartment Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {apartment.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {apartment.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <amenity.icon className="h-5 w-5 text-blue-600 mr-3" />
                    <span>{amenity.name}</span>
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
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">KES {apartment.price.toLocaleString()}</span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 text-gray-900">{apartment.rating}</span>
                </div>
              </div>

              <form>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-in</label>
                    <input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                 
<label className="block text-sm font-medium mb-1">Check-out</label>
<input type="date" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
</div>
</div>

<div className="mb-4">
<label className="block text-sm font-medium mb-1">Guests</label>
<select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
<option>1 guest</option>
<option>2 guests</option>
<option>3 guests</option>
<option>4 guests</option>
<option>5 guests</option>
</select>
</div>

<button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition duration-300 mb-4">
Reserve Now
</button>

<p className="text-center text-gray-500 text-sm mb-6">You won't be charged yet</p>

<div className="space-y-3 border-t pt-4">
<div className="flex justify-between">
<span>KES {apartment.price.toLocaleString()} x 3 nights</span>
<span>KES {(apartment.price * 3).toLocaleString()}</span>
</div>
<div className="flex justify-between">
<span>Cleaning fee</span>
<span>KES 1,000</span>
</div>
<div className="flex justify-between">
<span>Service fee</span>
<span>KES 1,500</span>
</div>
<div className="flex justify-between font-bold border-t pt-3">
<span>Total</span>
<span>KES {(apartment.price * 3 + 2500).toLocaleString()}</span>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
);
}