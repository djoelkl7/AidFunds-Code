
import React, { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black pt-4 pb-12">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 flex-shrink-0">
          <AdminSidebar />
        </aside>
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
