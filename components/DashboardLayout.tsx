
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-light-bg-secondary dark:bg-black pt-4 pb-12">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 flex-shrink-0">
          <Sidebar />
        </aside>
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
