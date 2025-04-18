'use client'
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Link from "next/link";
import { Menu, X, Search, User, ChevronDown } from "lucide-react";

const navlinks = [
  "Book",
  "Locations",
  "Clients",
  "Check in",
  "Contact"
];

const Navbar = () => {
  const [location, setLocation] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setLocation(window.location.pathname);
    setActiveLink(window.location.pathname.split('/')[1] || '/');
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div 
      className={`fixed z-50 top-0 left-0 right-0 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 py-4'
      } ${location.includes('admin') ? "hidden" : ""}`}
    >
      <Container>
        <div className="flex justify-between items-center w-full relative">
          {/* Logo */}
          <div className="flex items-center z-20">
            <Link href='/' className="overflow-hidden">
              <img 
                src="/bnb.png" 
                alt="Logo" 
                className={`transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`} 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center gap-4 lg:gap-8">
            {navlinks.map((link) => (
              <Link 
                href={`/${link.split(" ").join("-").toLowerCase()}`} 
                key={link}
                className={`relative uppercase font-medium tracking-wide text-lg hover:text-blue-600 transition-colors duration-300 px-2 py-1 overflow-hidden group ${
                  activeLink === link.split(" ").join("-").toLowerCase() ? 'text-blue-600' : 'text-gray-800'
                }`}
              >
                {link}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ${
                  activeLink === link.split(" ").join("-").toLowerCase() 
                    ? 'scale-x-100' 
                    : 'scale-x-0 group-hover:scale-x-100'
                } origin-left`}></span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 z-20">
            <button className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200">
              <Search className="w-6 h-6 text-gray-700" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200">
              <User className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? 
                <X className="w-6 h-6 text-gray-700" /> : 
                <Menu className="w-6 h-6 text-gray-700" />
              }
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`absolute top-full left-0 right-0 bg-white shadow-lg md:hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            } overflow-hidden`}
          >
            <div className="flex flex-col p-4 gap-4">
              {navlinks.map((link) => (
                <Link 
                  href={`/${link.split(" ").join("-").toLowerCase()}`} 
                  key={link}
                  className={`py-3 px-4 uppercase font-medium text-lg border-b border-gray-100 ${
                    activeLink === link.split(" ").join("-").toLowerCase() 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      
      {/* Animation effect at the bottom of navbar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
    </div>
  );
};

export default Navbar;