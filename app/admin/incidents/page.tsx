'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  ArrowUpDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- MOCK DATA --- 
const mockIncidents = [
  { id: 'INC-2026-045', datetime: '2026-04-20T08:30:00Z', readableDate: 'Apr 20, 2026 08:30 AM', reportedBy: 'John Doe', location: 'Main Gate, Horizon Corp', type: 'Unauthorized Access', severity: 'high', status: 'new' },
  { id: 'INC-2026-044', datetime: '2026-04-19T14:15:00Z', readableDate: 'Apr 19, 2026 02:15 PM', reportedBy: 'Jane Smith', location: 'Server Room Alpha', type: 'Equipment Failure', severity: 'medium', status: 'investigating' },
  { id: 'INC-2026-043', datetime: '2026-04-18T23:50:00Z', readableDate: 'Apr 18, 2026 11:50 PM', reportedBy: 'Michael Johnson', location: 'Perimeter Wall B', type: 'Vandalism', severity: 'low', status: 'resolved' },
  { id: 'INC-2026-042', datetime: '2026-04-18T10:05:00Z', readableDate: 'Apr 18, 2026 10:05 AM', reportedBy: 'Sarah Williams', location: 'Parking Structure', type: 'Vehicle Collision', severity: 'medium', status: 'resolved' },
  { id: 'INC-2026-041', datetime: '2026-04-17T03:20:00Z', readableDate: 'Apr 17, 2026 03:20 AM', reportedBy: 'David Okeke', location: 'Lobby Wing C', type: 'Suspicious Package', severity: 'high', status: 'investigating' },
  { id: 'INC-2026-040', datetime: '2026-04-16T18:40:00Z', readableDate: 'Apr 16, 2026 06:40 PM', reportedBy: 'Faith Abiodun', location: 'Cafeteria', type: 'Slip and Fall', severity: 'low', status: 'resolved' },
  { id: 'INC-2026-039', datetime: '2026-04-15T09:15:00Z', readableDate: 'Apr 15, 2026 09:15 AM', reportedBy: 'Emmanuel Eze', location: 'Executive Suite', type: 'Theft Report', severity: 'high', status: 'new' },
  { id: 'INC-2026-038', datetime: '2026-04-14T21:00:00Z', readableDate: 'Apr 14, 2026 09:00 PM', reportedBy: 'Blessing Okafor', location: 'Loading Dock', type: 'Door Left Open', severity: 'low', status: 'investigating' },
];

export default function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'new', 'investigating', 'resolved'
  const [severityFilter, setSeverityFilter] = useState('All'); // 'All', 'low', 'medium', 'high'
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'severity-desc', 'severity-asc'

  const filteredAndSortedIncidents = useMemo(() => {
    let result = [...mockIncidents];

    // 1. Search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(incident => 
        incident.id.toLowerCase().includes(lowerQuery) ||
        incident.reportedBy.toLowerCase().includes(lowerQuery) ||
        incident.location.toLowerCase().includes(lowerQuery) ||
        incident.type.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Status filter
    if (statusFilter !== 'All') {
      result = result.filter(incident => incident.status === statusFilter);
    }

    // 3. Severity filter
    if (severityFilter !== 'All') {
      result = result.filter(incident => incident.severity === severityFilter);
    }

    // 4. Sorting logic
    result.sort((a, b) => {
      // Helper function for severity weighting
      const getSeverityWeight = (severity: string) => {
        switch(severity) {
          case 'high': return 3;
          case 'medium': return 2;
          case 'low': return 1;
          default: return 0;
        }
      };

      if (sortBy === 'date-desc') {
        return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
      }
      if (sortBy === 'date-asc') {
        return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
      }
      if (sortBy === 'severity-desc') {
        return getSeverityWeight(b.severity) - getSeverityWeight(a.severity);
      }
      if (sortBy === 'severity-asc') {
        return getSeverityWeight(a.severity) - getSeverityWeight(b.severity);
      }
      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, severityFilter, sortBy]);

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col min-h-screen animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Incident Reports</h1>
          <p className="text-muted-foreground mt-1">Track, investigate, and resolve security incidents and protocol breaches.</p>
        </div>
        {/* <Button className="flex items-center gap-2 font-semibold shadow-md">
          <FilePlus size={18} /> Log New Incident
        </Button> */}
      </div>

      <div className="flex flex-col gap-6">
        {/* Controls Bar */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
          
          {/* Global Search */}
          <div className="relative w-full xl:w-96 shrink-0">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search by ID, Reporter, Location, or Type..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="new">New</option>
                  <option value="investigating">Investigating</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-muted-foreground hidden sm:block">Severity:</label>
                <select 
                  value={severityFilter} 
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="bg-background border border-border rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="All">All Severities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
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
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="severity-desc">Severity (High to Low)</option>
                <option value="severity-asc">Severity (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Incident ID</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Date / Time</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Reported By</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Location</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Type</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Severity</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedIncidents.length > 0 ? (
                filteredAndSortedIncidents.map((incident) => (
                  <tr key={incident.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-sm font-bold text-primary whitespace-nowrap">{incident.id}</td>
                    <td className="py-4 px-6 text-sm font-medium text-foreground whitespace-nowrap">{incident.readableDate}</td>
                    <td className="py-4 px-6 text-sm font-medium text-foreground whitespace-nowrap">{incident.reportedBy}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{incident.location}</td>
                    <td className="py-4 px-6 text-sm text-foreground font-medium whitespace-nowrap">{incident.type}</td>
                    
                    <td className="py-4 px-6 text-sm">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold w-fit capitalize ${
                        incident.severity === 'high' ? 'text-destructive bg-destructive/10' : 
                        incident.severity === 'medium' ? 'text-amber-500 bg-amber-500/10' : 
                        'text-blue-500 bg-blue-500/10'
                      }`}>
                        {incident.severity === 'high' && <AlertTriangle size={14} />}
                        {incident.severity === 'medium' && <AlertCircle size={14} />}
                        {incident.severity}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-sm">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold w-fit capitalize ${
                        incident.status === 'new' ? 'text-purple-500 bg-purple-500/10' : 
                        incident.status === 'investigating' ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20' : 
                        'text-emerald-500 bg-emerald-500/10'
                      }`}>
                        {incident.status === 'new' && <AlertCircle size={14} />}
                        {incident.status === 'investigating' && <Clock size={14} />}
                        {incident.status === 'resolved' && <CheckCircle2 size={14} />}
                        {incident.status}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6 text-sm text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View Details">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-md transition-colors" title="Update Incident">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="More Options">
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
                      <p className="text-lg font-semibold text-foreground">No incidents found</p>
                      <p className="text-sm">We couldn't find any reports matching your search and filter parameters.</p>
                      <Button variant="outline" className="mt-2" onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('All');
                        setSeverityFilter('All');
                        setSortBy('date-desc');
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
