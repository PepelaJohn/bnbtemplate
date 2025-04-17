'use client'
// pages/index.tsx
import React, { useState } from 'react';

import { Layout } from '../components/Layout';
export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
   <Layout>
     <div className="min-h-screen flex flex-col">
      

      {/* Top navigation */}
      <div className="bog bg-amber-50 text-black py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
    
          <div className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-grow flex justify-center">
          <div className="text-white text-2xl overflow-hidden font-light">
            <img src="/logo.png" alt="Logo" className='h-[60px]' />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-amber-50 rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#541414" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          {/* <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </div> */}
        </div>
      </div>


<div className="border-b bg-[#541414] text-white overflow-hidden border-gray-200">
  <div className="container mx-auto py-3 px-4">
    <div className="overflow-x-auto">
      <ul className="flex space-x-4 justify-start md:justify-center text-sm whitespace-nowrap min-w-max md:min-w-0 px-1">
        <li><a href="#" className="hover:text-pink-500">Easter</a></li>
        <li className="hidden sm:block">•</li>
        <li><a href="#" className="hover:text-pink-500">Birthday Cakes</a></li>
        <li className="hidden sm:block">•</li>
        <li><a href="#" className="hover:text-pink-500">Pastry Tray</a></li>
        <li className="hidden sm:block">•</li>
        <li><a href="#" className="hover:text-pink-500">Cakes</a></li>
        <li className="hidden sm:block">•</li>
        <li><a href="#" className="hover:text-pink-500">Cupcakes</a></li>
        <li className="hidden sm:block">•</li>
        <li className="hidden md:block"><a href="#" className="hover:text-pink-500">Hampers</a></li>
        <li className="hidden md:block">•</li>
        <li className="hidden md:block"><a href="#" className="hover:text-pink-500">Occasions</a></li>
        <li className="hidden md:block">•</li>
        <li className="hidden lg:block"><a href="#" className="hover:text-pink-500">Pies & Cheesecakes</a></li>
        <li className="hidden lg:block">•</li>
        <li className="hidden lg:block"><a href="#" className="hover:text-pink-500">Brownies & Cookies</a></li>
        <li className="hidden lg:block">•</li>
        <li className="hidden xl:block"><a href="#" className="hover:text-pink-500">Tiered Wedding Cakes</a></li>
        <li className="hidden xl:block">•</li>
        <li className="hidden xl:block"><a href="#" className="hover:text-pink-500">Viennese</a></li>
      </ul>
    </div>
    {/* Mobile dropdown for smaller screens */}
    <div className="md:hidden mt-2">
      <select className="bg-transparent border border-white rounded px-2 py-1 text-sm w-full">
        <option value="">More Categories...</option>
        <option value="hampers">Hampers</option>
        <option value="occasions">Occasions</option>
        <option value="pies">Pies & Cheesecakes</option>
        <option value="brownies">Brownies & Cookies</option>
        <option value="wedding">Tiered Wedding Cakes</option>
        <option value="viennese">Viennese</option>
      </select>
    </div>
  </div>
</div>

{/* Hero Section - Mobile Friendly */}
<div className="relative h-[50vh] sm:h-[70vh] md:h-[90vh]">
  <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/images/hero.jpeg')"}}></div>
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
    <div className="bg-black/40 rounded-lg sm:rounded-2xl  p-4 sm:p-6 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-auto sm:h-80 md:h-96 flex flex-col items-center justify-center">
      <div className="uppercase tracking-wider text-xs sm:text-sm mb-1">
        HAND MADE IN NAIROBI
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6">
        CELEBRATING EVERY<br className="hidden sm:block" /> OCCASION WITH YOU
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 w-full max-w-xs sm:max-w-lg">
        <div className="border-white border cursor-pointer rounded-full bg-opacity-40 backdrop-blur-sm px-3 py-2 sm:py-3 bg-transparent">
          <p className="text-xs sm:text-sm">Shop Now</p>
        </div>
        <div className="border-white border cursor-pointer rounded-full bg-opacity-40 backdrop-blur-sm px-3 py-2 sm:py-3 bg-transparent">
          <p className="text-xs sm:text-sm">Cake Delivery</p>
        </div>
        <div className="border-white border cursor-pointer rounded-full bg-opacity-40 backdrop-blur-sm px-3 py-2 sm:py-3 bg-transparent">
          <p className="text-xs sm:text-sm">Early Orders</p>
        </div>
      </div>
    </div>
  </div>
</div>

    

      {/* Bestsellers Section */}
      <div className="py-12 container mx-auto">
        <h2 className="text-center text-2xl font-bold mb-8">OUR BESTSELLERS</h2>
        
        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button 
            className={`px-4 py-1 rounded-full text-xs ${activeTab === 'all' ? 'bg-[#e8b84a] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-1 rounded-full text-xs ${activeTab === 'cakes' ? 'bg-[#e8b84a] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('cakes')}
          >
            Cakes
          </button>
          <button 
            className={`px-4 py-1 rounded-full text-xs ${activeTab === 'cupcakes' ? 'bg-[#e8b84a] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('cupcakes')}
          >
            Cupcakes
          </button>
          <button 
            className={`px-4 py-1 rounded-full text-xs ${activeTab === 'other' ? 'bg-[#e8b84a] text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('other')}
          >
            Other
          </button>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {/* Product 1 */}
          <div className="text-center">
            <div className="mb-4 aspect-square relative">
              <img src="/images/rainbow-cake.webp" alt="Carrot Cake" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-medium mb-1">RainBow cake</h3>
            <p className="mb-3">KSH 4200/=</p>
            <button className="w-full border cursor-pointer border-gray-300 py-2 text-sm hover:bg-gray-50">Order</button>
          </div>
          
          {/* Product 2 */}
          <div className="text-center">
            <div className="mb-4 aspect-square relative">
              <img src="/images/red-velvet-cake.webp" alt="Cookies and Cream Cupcakes" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-medium mb-1">Red Velvet Cake</h3>
            <p className="mb-3">KSH 4030/=</p>
            <button className="w-full border cursor-pointer border-gray-300 py-2 text-sm hover:bg-gray-50">Order</button>
          </div>
          
          {/* Product 3 */}
          <div className="text-center">
            <div className="mb-4 aspect-square relative">
              <img src="/images/devils-foodcake.webp" alt="Black Butter Cupcakes" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-medium mb-1">Devil's Foodcake</h3>
            <p className="mb-3">KSH 4300/=</p>
            <button className="w-full border cursor-pointer border-gray-300 py-2 text-sm hover:bg-gray-50">Order</button>
          </div>
        </div>
        
        {/* Pagination dots */}
        {/* <div className="flex justify-center mt-8 space-x-2">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">1</div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div>
        </div> */}
      </div>

      
      {/* Corporate Section */}
      <div className="py-12 bg-pink-100">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-8">CORPORATE CELEBRATIONS</h2>
          
          <p className="text-center mb-8 max-w-3xl mx-auto">
            Perfect for corporate occasions? Everyone loves cake and, what is Winnie's Pastries? Corporate Account, you can always rely on exactly what's available anytime looking with your team onboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex items-start">
              <div className="bg-pink-500 rounded-full p-2 mr-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Get everything you'll need, delivered</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-pink-500 rounded-full p-2 mr-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Order for morning, ready with a little bit of notice</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-pink-500 rounded-full p-2 mr-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm">Secure events with brand planning</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-[#e8b84a] text-white px-6 py-2 text-sm hover:bg-[#d6a93b]">Corporate Account</button>
          </div>
        </div>
      </div>

      {/* Baking Everyday Special */}
      <div className="py-12 container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-8">
          BAKING EVERYDAY <span className="text-pink-500">SPECIAL</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-3">
              {/* <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" /> */}
            </div>
            <div>
              <p className="text-green-500 mb-1">🍰 Great to buy online with very fast App Pay, My Cheesecake was gorgeous looking and delicious! And if you're after speed well the ordering is a delicious experience of the shiniest crust enhance in flavour by the caramel. Definitely.</p>
              <p className="text-sm italic">Christine • by bit.ly but by no one else</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-3">
              {/* <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" /> */}
            </div>
            <div>
              <p className="text-green-500 mb-1">🍦Come on the Chocolate milk mix exclusive? Outstanding! I give the 🌟 🌟 🌟 🌟 a proper stronger tastefully prepared taste for the perfect holiday treat. Incredible ★ order—your purchase is great!</p>
              <p className="text-sm italic">Jenna</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mr-3">
              {/* <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" /> */}
            </div>
            <div>
              <p className="text-green-500 mb-1">🍰Gorgeous food AND THE ❤️. The shop played to perfection with flavors Vegan Egg-free that delivered an exceptional taste, and topped with an elegant madhouse wali to be incredible quality. Notable in every layer 100% pure. 5 of 5 - Deep delight!</p>
              <p className="text-sm italic">Samuel</p>
            </div>
          </div>
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">1</div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div>
        </div>
        
        <div className="text-center mt-8">
          <button className="text-sm flex items-center justify-center mx-auto">
            <span>Follow us on</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 ml-1">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-gray-100 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-2">
              LOVE <span className="text-pink-500">BAKING?</span> GET A SLICE
            </h2>
            <h3 className="text-center text-2xl font-bold mb-8">OF THE ACTION!</h3>
            
            <p className="text-center mb-8">
              Join our mailing list for the latest baking news, Winnie's pastries updates, and more.
            </p>
            
            <p className="text-center text-sm mb-8">
              By entering your email address here you are consenting to opt into the Winnie's Pastries United mailing list and your personal details in accordance with our Data Privacy Policy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="text" placeholder="First Name..." className="border px-4 py-2 flex-grow" />
              <input type="email" placeholder="Email Address..." className="border px-4 py-2 flex-grow" />
              <button className="bg-[#e8b84a] text-white px-6 py-2">Submit</button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/4 h-full">
          <img src="/api/placeholder/400/600" alt="Decorative" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#541414] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light mb-4">LIFE IS SWEET</h2>
            <div className="text-lg">
              Winnie's pastries
            </div>
            <div className="text-xs">
              BAKING SINCE 2020 • ESTABLISHED IN KENYA
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-bold mb-4">DELIVERIES ACROSS</h3>
              <ul className="space-y-2 text-sm">
              <li>Nairobi, Kenya</li>
                <li>Thika, Kenya</li>
                <li>Nakuru, Kenya</li>
                <li>Narok,  Kenya</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">SHOP ONLINE</h3>
              <ul className="space-y-2 text-sm">
                <li>Afternoon Tea</li>
                <li>Birthday Cakes</li>
                <li>Celebration Cakes</li>
                <li>Cupcakes</li>
                <li>Corporate</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">OTHER</h3>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Jobs</li>
                <li>Our Story</li>
                <li>Delivery</li>
                <li>FAQs</li>
                <li>T&Cs</li>
                <li>Cookie Policy</li>
                <li>Privacy & Returns</li>
                <li>Delivery & Collection Info</li>
                <li>Sitemap</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">LEARN</h3>
              <ul className="space-y-2 text-sm">
                <li>Blog</li>
                <li>Recipes</li>
                <li>Press</li>
                <li>Books</li>
                <li>Cake Decorating Kits</li>
                <li>Cake Decorating Classes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">LEGAL</h3>
              <ul className="space-y-2 text-sm">
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 mt-12">
            <a href="#" className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#541414" className="w-4 h-4">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#541414" className="w-4 h-4">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#541414" className="w-4 h-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#541414" className="w-4 h-4">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#541414" className="w-4 h-4">
                <path d="M6.28 3.59l.15-.13c-.11.1-.14.13-.15.13zm14.21 2.7l-.33-1.8c-.48-1.65-2-2.79-3.78-2.85-1.59.11-3.21.14-4.83.14H9.11c-1.59 0-3.18-.02-4.75-.12-1.82.04-3.39 1.17-3.89 2.86-.54 1.86-.53 3.99-.53 5.83s-.01 3.96.53 5.83c.49 1.68 2.03 2.81 3.86 2.85 1.63.1 3.27.12 4.9.12h1.31c1.63 0 3.27-.02 4.9-.12 1.83-.04 3.37-1.17 3.86-2.85.54-1.87.53-3.99.53-5.83 0-1.84.01-3.96-.53-5.83zM8.23 15.51V8.49l6.37 3.51-6.37 3.51z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#541414" className="w-4 h-4">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
              </svg>
            </a>
          </div>
          
          <div className="text-center mt-8 text-sm">
            <p>© 2025 Winnie's Pastries • All Rights Reserved</p>
          </div>
        </div>
      </footer>

      <a href="#" className="fixed bottom-4 right-4 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </a>
    </div>
   </Layout>
  );
}








