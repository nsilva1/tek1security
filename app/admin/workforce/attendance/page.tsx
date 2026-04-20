'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit, 
  Eye, 
  MoreVertical, 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- MOCK DATA --- 
const rawMockData = [
  { id: '1', date: '2026-04-20', name: 'John Doe', shiftTime: '08:00 - 16:00', clockIn: '07:55', clockOut: '16:05', duration: '8h 10m', status: 'On Time', deductions: '$0.00' },
  { id: '2', date: '2026-04-20', name: 'Jane Smith', shiftTime: '08:00 - 16:00', clockIn: '08:15', clockOut: '16:00', duration: '7h 45m', status: 'Late', deductions: '$15.00' },
  { id: '3', date: '2026-04-20', name: 'Michael Johnson', shiftTime: '16:00 - 00:00', clockIn: '-', clockOut: '-', duration: '-', status: 'Absent', deductions: '$100.00' },
  { id: '4', date: '2026-04-19', name: 'Sarah Williams', shiftTime: '00:00 - 08:00', clockIn: '23:50', clockOut: '08:10', duration: '8h 20m', status: 'On Time', deductions: '$0.00' },
  { id: '5', date: '2026-04-19', name: 'David Okeke', shiftTime: '08:00 - 16:00', clockIn: '07:58', clockOut: '16:02', duration: '8h 04m', status: 'On Time', deductions: '$0.00' },
  { id: '6', date: '2026-04-19', name: 'John Doe', shiftTime: '16:00 - 00:00', clockIn: '16:05', clockOut: '00:00', duration: '7h 55m', status: 'Late', deductions: '$5.00' },
  { id: '7', date: '2026-04-18', name: 'Faith Abiodun', shiftTime: '08:00 - 16:00', clockIn: '07:45', clockOut: '16:15', duration: '8h 30m', status: 'On Time', deductions: '$0.00' },
  { id: '8', date: '2026-04-18', name: 'Jane Smith', shiftTime: '16:00 - 00:00', clockIn: '15:55', clockOut: '00:05', duration: '8h 10m', status: 'On Time', deductions: '$0.00' },
  { id: '9', date: '2026-04-18', name: 'David Okeke', shiftTime: '00:00 - 08:00', clockIn: '00:10', clockOut: '08:00', duration: '7h 50m', status: 'Late', deductions: '$10.00' },
  { id: '10', date: '2026-04-17', name: 'Michael Johnson', shiftTime: '08:00 - 16:00', clockIn: '07:50', clockOut: '16:00', duration: '8h 10m', status: 'On Time', deductions: '$0.00' },
  { id: '11', date: '2026-04-17', name: 'Sarah Williams', shiftTime: '16:00 - 00:00', clockIn: '15:59', clockOut: '00:03', duration: '8h 04m', status: 'On Time', deductions: '$0.00' },
  { id: '12', date: '2026-04-16', name: 'John Doe', shiftTime: '08:00 - 16:00', clockIn: '-', clockOut: '-', duration: '-', status: 'Absent', deductions: '$100.00' },
  { id: '13', date: '2026-04-16', name: 'Jane Smith', shiftTime: '16:00 - 00:00', clockIn: '16:10', clockOut: '00:00', duration: '7h 50m', status: 'Late', deductions: '$10.00' },
];

export default function AttendancePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter application
  const filteredData = useMemo(() => {
    return rawMockData.filter((record) => {
      // Date filtering logic
      if (startDate && record.date < startDate) return false;
      if (endDate && record.date > endDate) return false;
      return true;
    });
  }, [startDate, endDate]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(begin, begin + itemsPerPage);
  }, [filteredData, currentPage]);

  // Handlers
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col min-h-screen animate-in fade-in duration-500">
      
      {/* Header and Back navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/workforce" 
            className="p-2 bg-card border border-border rounded-full hover:bg-muted transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Detailed Attendance</h1>
            <p className="text-muted-foreground mt-1">Review clock-ins, duration logs, and lateness deductions.</p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col flex-1">
        
        {/* Filter Section */}
        <div className="p-5 border-b border-border bg-muted/10 rounded-t-xl flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mr-2">
              <Filter size={16} /> Date Filter
            </div>
            
            <div className="flex items-center gap-2 relative">
              <span className="text-sm font-medium text-muted-foreground">From:</span>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setCurrentPage(1); // Reset pagination on filter change
                  }}
                  className="pl-9 pr-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full" 
                />
              </div>
            </div>

            <div className="flex items-center gap-2 relative">
              <span className="text-sm font-medium text-muted-foreground">To:</span>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 pr-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary w-full" 
                />
              </div>
            </div>
            
            {(startDate || endDate) && (
              <button 
                onClick={() => { setStartDate(''); setEndDate(''); setCurrentPage(1); }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground underline decoration-muted-foreground/30 underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Showing <span className="text-foreground">{filteredData.length}</span> records
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Date</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Guard Name</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Shift Time</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Clock In</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Clock Out</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Duration</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-right">Deductions</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((record) => (
                  <tr key={record.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-foreground whitespace-nowrap">{record.date}</td>
                    <td className="py-4 px-6 text-sm font-semibold">{record.name}</td>
                    <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">{record.shiftTime}</td>
                    <td className="py-4 px-6 text-sm font-medium">
                      <span className={record.clockIn === '-' ? 'text-muted-foreground/40' : ''}>{record.clockIn}</span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">
                      <span className={record.clockOut === '-' ? 'text-muted-foreground/40' : ''}>{record.clockOut}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{record.duration}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        record.status === 'On Time' ? 'bg-emerald-500/10 text-emerald-500' : 
                        record.status === 'Late' ? 'bg-amber-500/10 text-amber-500' : 
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className={`py-4 px-6 text-sm font-medium text-right ${record.deductions !== '$0.00' ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {record.deductions}
                    </td>
                    <td className="py-4 px-6 text-sm text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View Detail">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-md transition-colors" title="Edit Record">
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
                  <td colSpan={9} className="py-20 text-center text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="p-3 bg-muted rounded-full">
                        <Filter size={24} className="text-muted-foreground/50" />
                      </div>
                      <p className="text-base font-medium text-foreground">No records found</p>
                      <p className="text-sm">Try adjusting your date filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 0 && (
          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/5 rounded-b-xl">
            <span className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-foreground">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-medium text-foreground">{filteredData.length}</span> entries
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
              <div className="flex items-center gap-1">
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
    </div>
  );
}
