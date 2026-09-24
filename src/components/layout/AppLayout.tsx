import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { CartDrawer } from './CartDrawer';
import { ToastContainer } from './ToastContainer';

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#111111] flex flex-col selection:bg-[#FFD400] selection:text-[#111111]">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex shrink-0" />

        {/* Mobile Slide-in Sidebar (when triggered from top header) */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-[#FBF9F5] z-10 shadow-2xl">
              <Sidebar onItemClick={() => setMobileMenuOpen(false)} className="h-full w-full border-r-0" />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Floating System Toasts */}
      <ToastContainer />
    </div>
  );
};
