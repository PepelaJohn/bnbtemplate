// components/PageContainer.tsx
import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function PageContainer({
  children,
  title,
  subtitle,
  className = '',
}: PageContainerProps) {
  return (
    <main className={`max-w-7xl mx-auto mt-[120px] px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {title && (
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </main>
  );
}
