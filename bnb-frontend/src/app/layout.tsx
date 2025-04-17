import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from 'react-toastify';
export const metadata: Metadata = {
  title: "Winnie's Pastries",
  description: "Handmade pastries and cakes for every occasion",
  // openGraph: {
  //   title: "Winnie's Pastries",
  //   description: "Handmade pastries and cakes for every occasion",
  // },
  // twitter: {
  //   title: "Winnie's Pastries",
  //   description: "Handmade pastries and cakes for every occasion",
  //   card: "summary_large_image",
  //   images: [
  //     {
  //       url: "/icon.png",
  //       alt: "Winnie's Pastries Icon",
  //     },
  //   ],
  // },
  // appleWebApp: {
  //   title: "Winnie's Pastries",
  //   statusBarStyle: "default",
  //   capable: true,

  // },
  
  // manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
  },
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gray-50"
      >
        <AuthProvider>
        <Navbar></Navbar>
        {children}
        <ToastContainer></ToastContainer>
        </AuthProvider>
      </body>
    </html>
  );
}
