'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowUpDown,
  FileBadge,
  AlertCircle,
  FileWarning,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- MOCK DATA --- 
const mockCertifications = [
  { id: 'CERT-001', guardName: 'John Doe', type: 'Security License', issueDate: '2023-05-10', expiryDate: '2026-05-10', status: 'Expiring Soon' },
  { id: 'CERT-002', guardName: 'John Doe', type: 'First Aid / CPR', issueDate: '2024-01-15', expiryDate: '2027-01-15', status: 'Valid' },
  { id: 'CERT-003', guardName: 'Jane Smith', type: 'Security License', issueDate: '2021-08-20', expiryDate: '2024-08-20', status: 'Expired' },
  { id: 'CERT-004', guardName: 'Michael Johnson', type: 'Fire Safety', issueDate: '2023-11-05', expiryDate: '2026-11-05', status: 'Valid' },
  { id: 'CERT-005', guardName: 'Sarah Williams', type: 'Weapon Handling', issueDate: '2023-10-12', expiryDate: '2025-10-12', status: 'Expiring Soon' },
  { id: 'CERT-006', guardName: 'Sarah Williams', type: 'Security License', issueDate: '2022-03-22', expiryDate: '2025-03-22', status: 'Expired' },
  { id: 'CERT-007', guardName: 'David Okeke', type: 'First Aid / CPR', issueDate: '2023-09-18', expiryDate: '2026-09-18', status: 'Valid' },
  { id: 'CERT-008', guardName: 'Faith Abiodun', type: 'Security License', issueDate: '2024-02-28', expiryDate: '2027-02-28', status: 'Valid' },
  { id: 'CERT-009', guardName: 'Emmanuel Eze', type: 'Fire Safety', issueDate: '2023-07-14', expiryDate: '2026-07-14', status: 'Expiring Soon' },
  { id: 'CERT-010', guardName: 'Blessing Okafor', type: 'Security License', issueDate: '2024-04-10', expiryDate: '2027-04-10', status: 'Valid' },
  { id: 'CERT-011', guardName: 'Samuel Mensah', type: 'Weapon Handling', issueDate: '2022-01-11', expiryDate: '2024-01-11', status: 'Expired' },
  { id: 'CERT-012', guardName: 'Grace Agyeman', type: 'First Aid / CPR', issueDate: '2024-03-12', expiryDate: '2027-03-12', status: 'Valid' },
  { id: 'CERT-013', guardName: 'Thomas Kalu', type: 'Security License', issueDate: '2023-08-05', expiryDate: '2026-08-05', status: 'Valid' },
  { id: 'CERT-014', guardName: 'Victoria Nnadi', type: 'Fire Safety', issueDate: '2022-06-15', expiryDate: '2025-06-15', status: 'Expiring Soon' },
  { id: 'CERT-015', guardName: 'Daniel Asuzu', type: 'Security License', issueDate: '2021-12-01', expiryDate: '2024-12-01', status: 'Expired' },
  { id: 'CERT-016', guardName: 'Rebecca Eyo', type: 'Weapon Handling', issueDate: '2024-02-20', expiryDate: '2026-02-20', status: 'Valid' },
  { id: 'CERT-017', guardName: 'Peter Obinna', type: 'First Aid / CPR', issueDate: '2023-05-18', expiryDate: '2026-05-18', status: 'Expiring Soon' },
  { id: 'CERT-018', guardName: 'Mark Duru', type: 'Security License', issueDate: '2024-01-25', expiryDate: '2027-01-25', status: 'Valid' },
  { id: 'CERT-019', guardName: 'Joy Udoh', type: 'Fire Safety', issueDate: '2022-11-10', expiryDate: '2025-11-10', status: 'Expiring Soon' },
  { id: 'CERT-020', guardName: 'Alex Mba', type: 'Security License', issueDate: '2020-04-14', expiryDate: '2023-04-14', status: 'Expired' },
];

export default function CompliancePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); 
  const [typeFilter, setTypeFilter] = useState('All'); 
  const [sortBy, setSortBy] = useState('expiry-asc'); 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedCerts = useMemo(() => {
    let result = [...mockCertifications];

    // 1. Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(cert => 
        cert.guardName.toLowerCase().includes(lowerQuery) ||
        cert.type.toLowerCase().includes(lowerQuery) ||
        cert.id.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Status filter
    if (statusFilter !== 'All') {
      result = result.filter(cert => cert.status === statusFilter);
    }

    // 3. Type filter
    if (typeFilter !== 'All') {
      result = result.filter(cert => cert.type === typeFilter);
    }

    // 4. Sorting logic
    result.sort((a, b) => {
      if (sortBy === 'expiry-asc') {
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      }
      if (sortBy === 'expiry-desc') {
        return new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime();
      }
      if (sortBy === 'name') {
        return a.guardName.localeCompare(b.guardName);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, typeFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedCerts.length / itemsPerPage);
  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCerts.slice(begin, begin + itemsPerPage);
  }, [filteredAndSortedCerts, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-10 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance Overview</h1>
          <p className="text-muted-foreground mt-1">Monitor expiration dates and actively manage workforce certifications.</p>
        </div>
      </div>

      {/* SECTION 1: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <FileBadge size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Certifications</p>
            <h3 className="text-3xl font-bold mt-1 text-foreground">428</h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <FileWarning size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Expiring Soon (6 months)</p>
            <h3 className="text-3xl font-bold mt-1 text-amber-500">45</h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-destructive/10 text-destructive rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Currently Expired</p>
            <h3 className="text-3xl font-bold mt-1 text-destructive">12</h3>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* SECTION 2: Visual Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Visual 1: Certification Types */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col min-h-[300px]">
          <h3 className="font-semibold text-lg mb-6 border-b border-border pb-2">Certification Distributions</h3>
          <div className="flex flex-col sm:flex-row items-center gap-10 m-auto w-full justify-center">
            {/* Pure CSS Pie Chart */}
            <div 
              style={{ background: 'conic-gradient(#3b82f6 0% 45%, #10b981 45% 75%, #f59e0b 75% 90%, #8b5cf6 90% 100%)' }} 
              className="rounded-full w-44 h-44 shadow-inner shrink-0 relative"
            >
               {/* Inner circle to make it a donut chart */}
               <div className="absolute inset-4 bg-card rounded-full pointer-events-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
                 <span className="font-bold text-foreground text-sm">Types</span>
               </div>
            </div>
            
            {/* Chart Legend */}
            <div className="space-y-3 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-foreground">Security License</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">45%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium text-foreground">First Aid / CPR</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">30%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium text-foreground">Fire Safety</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">15%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-foreground">Weapon Handling</span>
                </div>
                <span className="text-sm font-bold text-muted-foreground">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual 2: Status Breakdown */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col min-h-[300px]">
          <h3 className="font-semibold text-lg mb-6 border-b border-border pb-2">Status Breakdown & Readiness</h3>
          <div className="flex flex-col sm:flex-row items-center gap-10 m-auto w-full justify-center">
            {/* Pure CSS Pie Chart */}
            <div 
              style={{ background: 'conic-gradient(#10b981 0% 70%, #f59e0b 70% 90%, #ef4444 90% 100%)' }} 
              className="rounded-full w-44 h-44 shadow-inner shrink-0 relative"
            >
               <div className="absolute inset-4 bg-card rounded-full pointer-events-none flex items-center justify-center">
                 <span className="font-bold text-foreground text-sm">Valid</span>
               </div>
            </div>
            
            {/* Chart Legend */}
            <div className="space-y-3 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-sm font-medium text-foreground">Valid</span>
                </div>
                <span className="text-sm font-bold text-emerald-500">70%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                  <span className="text-sm font-medium text-foreground">Expiring Soon</span>
                </div>
                <span className="text-sm font-bold text-amber-500">20%</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                  <span className="text-sm font-medium text-foreground">Expired</span>
                </div>
                <span className="text-sm font-bold text-destructive">10%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <hr className="border-border" />

      {/* SECTION 3: Certification Table */}
      <div className="flex flex-col gap-6">
        {/* Controls Bar */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          
          {/* Global Search */}
          <div className="relative w-full xl:w-96 shrink-0">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search by Guard Name, Certificate Type, or ID..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 w-full text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            {/* Filters */}
            <div className="flex items-center gap-3 xl:border-r border-border xl:pr-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <label className="text-xs font-semibold text-muted-foreground hidden sm:block">Status:</label>
                <select 
                  value={statusFilter} 
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Valid">Valid</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground hidden sm:block">Type:</label>
                <select 
                  value={typeFilter} 
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Security License">Security License</option>
                  <option value="First Aid / CPR">First Aid / CPR</option>
                  <option value="Fire Safety">Fire Safety</option>
                  <option value="Weapon Handling">Weapon Handling</option>
                </select>
              </div>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-muted-foreground" />
              <label className="text-xs font-semibold text-muted-foreground hidden sm:block">Sort By:</label>
              <select 
                value={sortBy} 
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="expiry-asc">Expiration Date (Soonest Edge)</option>
                <option value="expiry-desc">Expiration Date (Furthest)</option>
                <option value="name">Guard Name (A-Z)</option>
                <option value="status">Status Clustering</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Guard Name</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Certification Type</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Issue Date</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground border-l border-border/50 bg-muted/10">Expiration Date</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((cert) => (
                  <tr key={cert.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-sm font-bold text-foreground whitespace-nowrap">{cert.guardName}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-primary">{cert.type}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground font-medium">{cert.issueDate}</td>
                    
                    <td className="py-4 px-6 text-sm font-bold border-l border-border/50 bg-muted/5">
                       {cert.expiryDate}
                    </td>

                    <td className="py-4 px-6 text-sm">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold w-fit ${
                        cert.status === 'Valid' ? 'text-emerald-500 bg-emerald-500/10' : 
                        cert.status === 'Expiring Soon' ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20' : 
                        'text-destructive bg-destructive/10 border border-destructive/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                      }`}>
                        {cert.status === 'Valid' && <ShieldCheck size={14} />}
                        {cert.status === 'Expiring Soon' && <ShieldAlert size={14} />}
                        {cert.status === 'Expired' && <AlertCircle size={14} />}
                        {cert.status}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-sm text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View Document">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-md transition-colors" title="Edit/Renew">
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
                  <td colSpan={6} className="py-20 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-4 bg-muted/50 rounded-full">
                        <Search size={28} className="text-muted-foreground/50" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">No certifications found</p>
                      <p className="text-sm">We couldn't find any compliance records matching your criteria.</p>
                      <Button variant="outline" className="mt-2" onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                        setTypeFilter('All');
                        setCurrentPage(1);
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
        
        {/* Pagination Footer */}
        {totalPages > 0 && (
          <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/5 rounded-b-xl -mt-6 border-x border-b">
            <span className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filteredAndSortedCerts.length)}</span> of <span className="font-medium text-foreground">{filteredAndSortedCerts.length}</span> entries
            </span>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 h-9"
              >
                <ChevronLeft size={16} /> Prev
              </Button>
              <div className="items-center gap-1 hidden sm:flex">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                      currentPage === idx + 1 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 h-9"
              >
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Spacer */}
      <div className="h-6 w-full"></div>
    </div>
  );
}
