'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/tek1-logo-transparent.png';
import { 
  LayoutDashboard, 
  Users,
  User, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  Plus,
  CalendarPlus,
  UserPlus,
  Megaphone
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const NavLinks = () => (
  <>
    <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-lg font-medium transition-colors">
      <LayoutDashboard size={20} />
      Dashboard
    </Link>
    <Link href="/admin/guards" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg font-medium transition-colors">
      <Users size={20} />
      Workforce Management
    </Link>
    <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg font-medium transition-colors">
      <User size={20} />
      Guard Profiles
    </Link>
    <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg font-medium transition-colors">
      <FileText size={20} />
      Incident Reports
    </Link>
    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg font-medium transition-colors">
      <Settings size={20} />
      Compliance Overview
    </Link>
    <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground rounded-lg font-medium transition-colors">
      <FileText size={20} />
      Incident Reports
    </Link>
  </>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isFabOpen, setIsFabOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background relative">
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

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isFabOpen && (
          <div className="flex flex-col gap-3 items-end mb-2">
            <Link 
              href="/admin/shifts/create" 
              className="flex items-center gap-3 px-4 py-2 bg-card border border-border shadow-md rounded-full hover:bg-muted transition-colors text-sm font-medium animate-in slide-in-from-bottom-2 fade-in"
              onClick={() => setIsFabOpen(false)}
            >
              <span>Create New Shift</span>
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <CalendarPlus size={16} />
              </div>
            </Link>
            <Link 
              href="/admin/guards/create" 
              className="flex items-center gap-3 px-4 py-2 bg-card border border-border shadow-md rounded-full hover:bg-muted transition-colors text-sm font-medium animate-in slide-in-from-bottom-3 fade-in"
              onClick={() => setIsFabOpen(false)}
            >
              <span>Add New Guard</span>
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <UserPlus size={16} />
              </div>
            </Link>
            <Link 
              href="/admin/reports/generate" 
              className="flex items-center gap-3 px-4 py-2 bg-card border border-border shadow-md rounded-full hover:bg-muted transition-colors text-sm font-medium animate-in slide-in-from-bottom-4 fade-in"
              onClick={() => setIsFabOpen(false)}
            >
              <span>Generate Report</span>
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <FileText size={16} />
              </div>
            </Link>
            <Link 
              href="/admin/announcements/send" 
              className="flex items-center gap-3 px-4 py-2 bg-card border border-border shadow-md rounded-full hover:bg-muted transition-colors text-sm font-medium animate-in slide-in-from-bottom-5 fade-in"
              onClick={() => setIsFabOpen(false)}
            >
              <span>Send Company announcement</span>
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <Megaphone size={16} />
              </div>
            </Link>
          </div>
        )}
        <button 
          onClick={() => setIsFabOpen(!isFabOpen)}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all focus:outline-hidden focus:ring-4 focus:ring-primary/30"
          aria-label="Action Menu"
        >
          <Plus size={24} className={`transition-transform duration-300 ${isFabOpen ? 'rotate-45' : ''}`} />
        </button>
      </div>
    </div>
  );
}
