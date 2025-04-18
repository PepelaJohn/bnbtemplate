import Link from "next/link";
import {
  ArrowRight,
  Star,
  MapPin,
  Home,
  CreditCard,
  Shield,
} from "lucide-react";
import Container from "./Container";
import { webname } from "../constants";
import Footer from "./Footer";
export default function HomePage() {
  // Mock featured apartments
  const featuredApartments = [
    {
      id: "1",
      name: "Deluxe Suite",
      price: 4000,
      rating: 4.8,
      image: "/images/vase.jpg",
      location: "City Center",
    },
    {
      id: "2",
      name: "Studio Apartment",
      price: 3000,
      rating: 4.5,
      image: "/images/kitchen.jpg",
      location: "Westlands",
    },
    {
      id: "3",
      name: "Penthouse Suite",
      price: 6500,
      rating: 4.9,
      image: "/images/bed1.jpg",
      location: "Kilimani",
    },
  ];

  return (
    <>
      {/* Hero Section */}

      <section className="relative w-full flex flex-col h-screen">
        {/* Background image with overlay */}
        <div className="inset-0 absolute">
          <div className="absolute inset-0 bg-black/30  z-10"></div>
          <img
            src="/images/livingroom.jpg"
            alt="Luxury apartment living room"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Hero content */}
        <div className="relative z-20 flex flex-1 flex-col justify-center items-center px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
            Discover Your Perfect Home Away From Home
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Experience luxury living with our premium apartments in prime
            locations. Your perfect stay awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/admin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition duration-300 flex items-center"
            >
              Browse Apartments <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/register"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition duration-300"
            >
              Register Now
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <Container className="relative z-20 mb-8 md:mb-16 px-4">
          <section className="bg-white w-full py-6 shadow-lg rounded-lg">
            <span className="mx-6 font-bold text-2xl">{webname}</span>
            <div>
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Any Location</option>
                    <option>City Center</option>
                    <option>Westlands</option>
                    <option>Kilimani</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition duration-300 flex items-center justify-center">
                    Search Apartments <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </section>
        </Container>
      </section>

      {/* Featured Apartments */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Apartments
            </h2>
            <Link
              href="/apartments"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredApartments.map((apartment) => (
              <Link
                href={`/apartments/${apartment.id}`}
                key={apartment.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="relative">
                  <img
                    src={apartment.image}
                    alt={apartment.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {apartment.name}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="ml-1 text-gray-900">
                        {apartment.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{apartment.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-blue-600 font-bold text-xl">
                      KES {apartment.price.toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">per night</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
}
