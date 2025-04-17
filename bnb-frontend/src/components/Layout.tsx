// components/Layout.tsx
import React, { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout = ({ children, title = 'Winnie\'s Pastries' }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>Winnie's Pastries - Handmade pastries in the heart of Nairobi.</title>
        
        <meta name="description" content="Handmade pastries for every occasion" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/icon.png" />
      </Head>
      {children}
    </div>
  );
};