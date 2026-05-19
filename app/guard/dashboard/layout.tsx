'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/images/tek1-logo-transparent.png';
import { 
  Home, 
  Briefcase,
  FileText, 
  BookOpen, 
  Banknote, 
  ShoppingCart,
  Bell,
  Calendar,
  Menu,
  LogOut
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const NavLinks = () => {
  const pathname = usePathname();
  
  const links = [
    { href: '/guard/dashboard', icon: Home, label: 'Home' },
    { href: '/guard/dashboard/shifts', icon: Briefcase, label: 'Shifts' },
    { href: '/guard/dashboard/report', icon: FileText, label: 'Report' },
    { href: '/guard/dashboard/logbook', icon: BookOpen, label: 'Log Book' },
    { href: '/guard/dashboard/payroll', icon: Banknote, label: 'Payroll' },
    { href: '/guard/dashboard/shop', icon: ShoppingCart, label: 'Shop' },
    { href: '/guard/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { href: '/guard/dashboard/calendar', icon: Calendar, label: 'Calendar' },
  ];

  return (
    <>
      {links.map((link) => {
        // Strict exact match for Home to prevent it from being active when other paths are active,
        // unless other paths don't match. But using startsWith is common.
        // For '/guard/dashboard', it matches everything. Let's fix that.
        const isActive = link.href === '/guard/dashboard' 
          ? pathname === link.href 
          : pathname.startsWith(link.href);
          
        const Icon = link.icon;
        
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              isActive 
                ? 'bg-primary/10 text-primary' 
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            }`}
          >
            <Icon size={20} />
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export default function GuardDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        <div className="p-6 border-b border-border flex items-center justify-center">
          <Image src={logo} alt="Tek1 Logo" width={100} height={100} />
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-border">
          <button className="flex w-full items-center justify-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg font-medium transition-colors">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-card border-b border-border">
          <Image src={logo} alt="Tek1 Logo" width={100} height={100} />
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-muted-foreground hover:text-foreground">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-screen sm:w-screen sm:max-w-none p-0 flex flex-col bg-card">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-6 border-b border-border flex items-center justify-center mt-8">
                  <Image src={logo} alt="Tek1 Logo" width={100} height={100} />
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
                  <NavLinks />
                </nav>
                <div className="p-4 border-t border-border mt-auto">
                  <button className="flex w-full items-center justify-center gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg font-medium transition-colors">
                    <LogOut size={20} />
                    Log Out
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
