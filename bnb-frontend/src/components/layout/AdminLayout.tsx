// --- components/layout/AdminLayout.tsx ---
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface AdminLayoutProps {
  children: ReactNode;
  path: string;
}

export default function AdminLayout({ children, path }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar path={path} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}