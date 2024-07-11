import React from 'react'
import Navbar from '../../components/dashboard/Navbar'
import Sidebar from '../../components/dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"

const DashboardLayout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] grid-cols-1 lg:grid-cols-[280px_1fr] bg-honey">

      {/* sidebar */}
      <Sidebar />

      <div className="flex flex-col w-full">

        {/* header navigation */}
        <Navbar />

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 lg:animate__animated lg:animate__jackInTheBox">
          {/* main body */}
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
