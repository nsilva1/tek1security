'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  ShieldAlert, 
  ShieldCheck, 
  UserPlus,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- MOCK DATA --- 
const mockGuards = [
  { id: 'T1-0042', name: 'John Doe', phone: '+234 801 234 5678', email: 'john.doe@email.com', status: 'Active', certifications: 'Valid', lastActivityDate: '2026-04-20T08:30:00Z', lastActivityText: '2 hours ago' },
  { id: 'T1-0045', name: 'Jane Smith', phone: '+234 802 345 6789', email: 'jane.smith@email.com', status: 'Inactive', certifications: 'Expired', lastActivityDate: '2026-03-15T12:00:00Z', lastActivityText: '1 month ago' },
  { id: 'T1-0088', name: 'Michael Johnson', phone: '+234 803 456 7890', email: 'michael.j@email.com', status: 'Active', certifications: 'Expiring Soon', lastActivityDate: '2026-04-19T18:45:00Z', lastActivityText: '15 hours ago' },
  { id: 'T1-0091', name: 'Sarah Williams', phone: '+234 804 567 8901', email: 'sarah.w@email.com', status: 'Active', certifications: 'Valid', lastActivityDate: '2026-04-20T09:15:00Z', lastActivityText: '1 hour ago' },
  { id: 'T1-0105', name: 'David Okeke', phone: '+234 805 678 9012', email: 'david.o@email.com', status: 'Active', certifications: 'Valid', lastActivityDate: '2026-04-20T05:00:00Z', lastActivityText: '5 hours ago' },
  { id: 'T1-0112', name: 'Faith Abiodun', phone: '+234 806 789 0123', email: 'faith.a@email.com', status: 'Inactive', certifications: 'Expired', lastActivityDate: '2026-02-10T10:00:00Z', lastActivityText: '2 months ago' },
  { id: 'T1-0150', name: 'Emmanuel Eze', phone: '+234 807 890 1234', email: 'emmanuel.e@email.com', status: 'Active', certifications: 'Expiring Soon', lastActivityDate: '2026-04-18T16:20:00Z', lastActivityText: '2 days ago' },
  { id: 'T1-0165', name: 'Blessing Okafor', phone: '+234 808 901 2345', email: 'blessing.o@email.com', status: 'Active', certifications: 'Valid', lastActivityDate: '2026-04-20T09:40:00Z', lastActivityText: 'Just now' },
];

export default function GuardsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [certFilter, setCertFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'activity', 'status'

  const filteredAndSortedGuards = useMemo(() => {
    let result = [...mockGuards];

    // 1. Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(g => 
        g.name.toLowerCase().includes(lowerQuery) ||
        g.id.toLowerCase().includes(lowerQuery) ||
        g.phone.includes(lowerQuery) ||
        g.email.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Status filter
    if (statusFilter !== 'All') {
      result = result.filter(g => g.status === statusFilter);
    }

    // 3. Certification filter
    if (certFilter !== 'All') {
      result = result.filter(g => g.certifications === certFilter);
    }

    // 4. Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'activity') {
        // Activity (newest first)
        return new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime();
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, certFilter, sortBy]);

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col min-h-screen animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Guard Profiles</h1>
          <p className="text-muted-foreground mt-1">Manage personnel registry, certification status, and individual assignments.</p>
        </div>
        <Link href="/admin/guards/create">
          <Button className="flex items-center gap-2 font-semibold shadow-md">
            <UserPlus size={18} /> Add New Guard
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {/* Controls Bar */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          
          {/* Global Search */}
          <div className="relative w-full lg:w-96 shrink-0">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search by Name, ID, Phone, or Email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Filters */}
            <div className="flex items-center gap-3 border-r border-border pr-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <label className="text-xs font-semibold text-muted-foreground hidden sm:block">Status:</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground hidden sm:block">Certs:</label>
                <select 
                  value={certFilter} 
                  onChange={(e) => setCertFilter(e.target.value)}
                  className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="All">All Certifications</option>
                  <option value="Valid">Valid</option>
                  <option value="Expiring Soon">Expiring Soon (6m)</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-muted-foreground" />
              <label className="text-xs font-semibold text-muted-foreground hidden sm:block">Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="name">Name (A-Z)</option>
                <option value="activity">Last Activity (Newest)</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Guard ID</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Provider Name</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Phone</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Email</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Certifications</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Last Activity</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedGuards.length > 0 ? (
                filteredAndSortedGuards.map((guard) => (
                  <tr key={guard.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-sm font-bold text-foreground whitespace-nowrap">{guard.id}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-primary">{guard.name}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{guard.phone}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{guard.email}</td>
                    
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        guard.status === 'Active' ? 'text-emerald-500 bg-emerald-500/10' : 
                        'text-muted-foreground bg-muted'
                      }`}>
                        {guard.status}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6 text-sm">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold w-fit ${
                        guard.certifications === 'Valid' ? 'text-emerald-500 bg-emerald-500/5' : 
                        guard.certifications === 'Expiring Soon' ? 'text-amber-500 bg-amber-500/10' : 
                        'text-destructive bg-destructive/10'
                      }`}>
                        {guard.certifications === 'Valid' && <ShieldCheck size={14} />}
                        {guard.certifications === 'Expiring Soon' && <ShieldAlert size={14} />}
                        {guard.certifications === 'Expired' && <ShieldAlert size={14} />}
                        {guard.certifications}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {guard.lastActivityText}
                    </td>
                    
                    <td className="py-4 px-6 text-sm text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View Profile">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-md transition-colors" title="Edit Guard">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="More">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-20 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-muted/50 rounded-full">
                        <Search size={28} className="text-muted-foreground/50" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">No guards found</p>
                      <p className="text-sm">We couldn't find any personnel matching your search and filter criteria.</p>
                      <Button variant="outline" className="mt-2" onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                        setCertFilter('All');
                      }}>
                        Clear all filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
