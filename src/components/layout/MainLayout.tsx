import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-14">
        <div className="min-h-[calc(100vh-3.5rem)] px-3 py-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
