import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ChevronRight
} from "lucide-react";
import { webname } from "../constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">{webname}</h3>
            <p className="text-gray-400 mb-6">
              Premium apartment rentals in the most desirable locations. Experience luxury living with exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Browse Apartments
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Locations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/short-term" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Short-term Rentals
                </Link>
              </li>
              <li>
                <Link href="/services/long-term" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Long-term Leases
                </Link>
              </li>
              <li>
                <Link href="/services/corporate" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Corporate Housing
                </Link>
              </li>
              <li>
                <Link href="/services/concierge" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Concierge Services
                </Link>
              </li>
              <li>
                <Link href="/services/airport" className="text-gray-400 hover:text-white transition duration-300 flex items-center">
                  <ChevronRight className="h-4 w-4 mr-2" /> Airport Transfers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Business Center, Westlands<br />Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                <span className="text-gray-400">+254 712 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
                <a href={`mailto:info@${webname.toLowerCase()}.com`} className="text-gray-400 hover:text-white transition duration-300">
                  info@${webname.toLowerCase()}.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 mb-6">Stay updated with our latest offers, new properties, and exclusive deals.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {webname}. All rights reserved.
          </p>
          <div className="mt-3 space-x-4 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-gray-400 transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-gray-400 transition duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}