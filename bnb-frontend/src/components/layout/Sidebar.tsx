import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Home, Users, Calendar, CreditCard, FileText, Settings, BarChart3, UserCheck, LogOut } from 'lucide-react';
import { webname } from '@/constants';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('/admin');
  
  useEffect(() => {
    // Update active link when component mounts and when URL changes
    const updateActiveLink = () => {
      const path = window.location.pathname;
      
      // Check for exact match with /admin
      if (path === '/admin') {
        setActiveLink('/admin');
        return;
      }
      
      // Check other paths
      const allLinks = [...managementLinks, ...administrationLinks, ...accountLinks];
      const matchedLink = allLinks.find(link => path.includes(link.href) && link.href !== '/admin');
      
      if (matchedLink) {
        setActiveLink(matchedLink.href);
      }
    };
    
    // Set initial active link
    updateActiveLink();
    
    // Optional: Add event listener for URL changes (for SPA navigation without page refresh)
    window.addEventListener('popstate', updateActiveLink);
    
    return () => {
      window.removeEventListener('popstate', updateActiveLink);
    };
  }, []);
  
  const managementLinks = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Rooms", href: "/admin/rooms", icon: Home },
    { name: "Transactions", href: "/admin/transactions", icon: CreditCard }
  ];
  
  const administrationLinks = [
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Logs", href: "/admin/logs", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings }
  ];
  
  const accountLinks = [
    { name: "Profile", href: "/admin/profile", icon: UserCheck },
    { name: "Logout", href: "/logout", icon: LogOut }
  ];
  
  // Check if a link is active based on state
  const isActiveLink = (href: string) => activeLink === href;

  // Render a category of links
  const renderLinkGroup = (links: { name: string; href: string; icon: any }[], title: string) => (
    <>
      <div className="px-4 py-2 mt-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      </div>
      {links.map((link) => {
        const Icon = link.icon;
        const active = isActiveLink(link.href);
        
        return (
          <Link 
            key={link.name}
            href={link.href} 
            onClick={() => setActiveLink(link.href)}
            className={`flex items-center py-3 px-4 ${
              active 
                ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600" 
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Icon className="h-5 w-5 mr-3" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="bg-white w-64 min-h-screen shadow-sm hidden md:block">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600">{webname} Admin</h1>
      </div>
      <nav className="mt-6">
        {renderLinkGroup(managementLinks, "Management")}
        {renderLinkGroup(administrationLinks, "Administration")}
        {renderLinkGroup(accountLinks, "Account")}
      </nav>
    </div>
  );
}