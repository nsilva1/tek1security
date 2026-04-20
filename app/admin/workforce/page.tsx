'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Clock,
  Edit, 
  ShieldCheck, 
  UserCheck, 
  UserPlus, 
  MapPin, 
  Eye, 
  CalendarDays,
  MoreVertical,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- MOCK DATA --- 

const weekShifts = [
  { day: 'Monday, Apr 19', count: 42, active: true },
  { day: 'Tuesday, Apr 20', count: 45, active: false },
  { day: 'Wednesday, Apr 21', count: 43, active: false },
  { day: 'Thursday, Apr 22', count: 47, active: false },
  { day: 'Friday, Apr 23', count: 50, active: false },
  { day: 'Saturday, Apr 24', count: 38, active: false },
  { day: 'Sunday, Apr 25', count: 35, active: false },
];

const guardRosters: Record<string, any[]> = {
  'guard1': [
    { id: 1, date: 'Mon, Apr 19', type: 'Day Shift', site: 'Horizon Corp HQ', time: '08:00 - 18:00' },
    { id: 2, date: 'Tue, Apr 20', type: 'Day Shift', site: 'Horizon Corp HQ', time: '08:00 - 18:00' },
    { id: 3, date: 'Wed, Apr 21', type: 'Day Shift', site: 'Horizon Corp HQ', time: '08:00 - 18:00' },
    { id: 4, date: 'Thu, Apr 22', type: 'Off', site: '-', time: '-' },
  ],
  'guard2': [
    { id: 1, date: 'Mon, Apr 19', type: 'Night Shift', site: 'Zenith Bank VI', time: '18:00 - 06:00' },
    { id: 2, date: 'Tue, Apr 20', type: 'Night Shift', site: 'Zenith Bank VI', time: '18:00 - 06:00' },
    { id: 3, date: 'Wed, Apr 21', type: 'Off', site: '-', time: '-' },
    { id: 4, date: 'Thu, Apr 22', type: 'Day Shift', site: 'Bluecrest Estates', time: '06:00 - 18:00' },
  ]
};

const personnelMocks = [
  { id: 'T1-0042', name: 'John Doe', role: 'Guard', status: 'Active', phone: '+234 801 234 5678', assignedClient: 'Horizon Corp', clockStatus: 'Clocked In', lastUpdate: '10 mins ago' },
  { id: 'T1-0045', name: 'Jane Smith', role: 'Supervisor', status: 'Active', phone: '+234 802 345 6789', assignedClient: 'Multiple', clockStatus: 'On Shift', lastUpdate: '1 hour ago' },
  { id: 'T1-0088', name: 'Michael Johnson', role: 'Guard', status: 'OnLeave', phone: '+234 803 456 7890', assignedClient: '-', clockStatus: 'Off Shift', lastUpdate: '2 days ago' },
  { id: 'T1-0105', name: 'Sarah Williams', role: 'Guard', status: 'Inactive', phone: '+234 804 567 8901', assignedClient: '-', clockStatus: 'Clocked Out', lastUpdate: '1 week ago' },
  { id: 'T1-0112', name: 'David Okeke', role: 'Guard', status: 'Active', phone: '+234 805 678 9012', assignedClient: 'Zenith Bank VI', clockStatus: 'Clocked In', lastUpdate: '5 mins ago' },
];

export default function WorkforcePage() {
  const [selectedGuard, setSelectedGuard] = useState('guard1');
  
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [clockFilter, setClockFilter] = useState('All');

  const filteredPersonnel = personnelMocks.filter(p => {
    if (roleFilter !== 'All' && p.role !== roleFilter) return false;
    if (statusFilter !== 'All' && p.status !== statusFilter) return false;
    if (clockFilter !== 'All' && p.clockStatus !== clockFilter) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-10 max-w-[1400px] mx-auto w-full flex flex-col gap-10 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Workforce Management</h1>
        <p className="text-muted-foreground mt-1">Manage personnel, track overall attendance, and organize shift schedules.</p>
      </div>

      <div className="">
        {/* SECTION 1: Attendance Summary */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
            <Clock size={20} className="text-primary"/> Attendance Target (Today)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm font-medium text-muted-foreground mb-1">Total Shifts</span>
              <span className="text-3xl font-bold text-primary">145</span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm font-medium text-muted-foreground mb-1">On Time</span>
              <span className="text-3xl font-bold text-emerald-500">130</span>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-center items-center text-center">
              <span className="text-sm font-medium text-muted-foreground mb-1">Late</span>
              <span className="text-3xl font-bold text-destructive">15</span>
            </div>
          </div>
        </div>
        <Button variant="outline" className="mt-4 font-semibold">
          <Link href='/admin/workforce/attendance'>
            View Detailed Attendance
          </Link>
        </Button>
      </div>

      <div>
        {/* SECTION 2: Workforce Overview */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
            <Users size={20} className="text-primary"/> Workforce Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Users size={18} />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground">Total Personnel</h4>
                <p className="text-3xl font-bold mt-1">250</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <UserCheck size={18} />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground">Active Guards</h4>
                <p className="text-3xl font-bold mt-1 text-emerald-500">210</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                  <ShieldCheck size={18} />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground">Active Supervisors</h4>
                <p className="text-3xl font-bold mt-1 text-amber-500">15</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                  <UserPlus size={18} />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-muted-foreground">New Hires (Last 30d)</h4>
                <p className="text-3xl font-bold mt-1 text-purple-500">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* SECTION 3: Shift Management */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
           <CalendarDays size={20} className="text-primary"/> Shift Management
        </h2>
        <hr className="border-border" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Available Shifts for one week */}
          <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col min-h-[400px]">
            <div className="p-5 border-b border-border bg-muted/20 rounded-t-xl">
              <h3 className="font-semibold lg:text-lg">Available Shifts (This Week)</h3>
              <p className="text-xs text-muted-foreground mt-1">Aggregated target shifts mapped structurally across expected operation dates.</p>
            </div>
            <div className="flex-1 p-5 overflow-y-auto space-y-3">
              {weekShifts.map((dayObj, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg flex justify-between items-center transition-colors border ${
                    dayObj.active 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-background border-border hover:border-primary/50'
                  }`}
                >
                  <span className={`font-medium text-sm ${dayObj.active ? 'text-primary' : ''}`}>
                    {dayObj.day}
                  </span>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                    {dayObj.count} Shifts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Guard Roster View */}
          <div className="bg-card rounded-xl border border-border shadow-sm flex flex-col min-h-[400px]">
            <div className="p-5 border-b border-border bg-emerald-500/5 rounded-t-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-semibold lg:text-lg">Personnel Rosters</h3>
                <p className="text-xs text-muted-foreground mt-1">Select an individual guard to preview upcoming schedules.</p>
              </div>
              <div className="relative min-w-[200px]">
                <select 
                  value={selectedGuard} 
                  onChange={e => setSelectedGuard(e.target.value)}
                  className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm font-medium hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary focus:outline-none appearance-none pr-8"
                >
                  <option value="guard1">John Doe (T1-0042)</option>
                  <option value="guard2">Jane Smith (T1-0045)</option>
                </select>
                <div className="pointer-events-none absolute right-2.5 top-2.5 text-muted-foreground">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto space-y-3">
              {guardRosters[selectedGuard]?.map((shift: any) => (
                <div key={shift.id} className="p-4 border border-border rounded-xl bg-background hover:shadow-sm transition-shadow">
                   <div className="flex justify-between items-center mb-3">
                       <span className="font-bold text-foreground flex items-center gap-2">
                         <CalendarDays size={16} className="text-primary"/> {shift.date}
                       </span>
                       <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                          shift.type === 'Off' ? 'bg-muted text-muted-foreground' : 'bg-blue-500/10 text-blue-500'
                       }`}>
                         {shift.type}
                       </span>
                   </div>
                   <div className="flex flex-col gap-1.5 text-sm">
                     <div className="flex items-center gap-2 text-muted-foreground w-full">
                       <MapPin size={14} /> <span className="font-medium text-foreground truncate">{shift.site}</span>
                     </div>
                     <div className="flex items-center gap-2 text-muted-foreground">
                       <Clock size={14} /> <span>{shift.time}</span>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* SECTION 4: Personnel List */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users size={20} className="text-primary"/> Personnel List
          </h2>
        </div>

        <hr className="border-border" />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mr-2">
            <Filter size={16} /> Filters
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground">Role:</label>
            <select 
              value={roleFilter} 
              onChange={e => setRoleFilter(e.target.value)}
              className="bg-background border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="All">All</option>
              <option value="Guard">Guard</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground">Status:</label>
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-background border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="OnLeave">On Leave</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-muted-foreground">Clock Status:</label>
            <select 
              value={clockFilter} 
              onChange={e => setClockFilter(e.target.value)}
              className="bg-background border border-border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="All">All</option>
              <option value="Clocked In">Clocked In</option>
              <option value="Clocked Out">Clocked Out</option>
              <option value="On Shift">On Shift</option>
              <option value="Off Shift">Off Shift</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">ID</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Name</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Role</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Phone</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Assigned Client</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Clock Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Last Update</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPersonnel.length > 0 ? (
                filteredPersonnel.map(person => (
                  <tr key={person.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-foreground">{person.id}</td>
                    <td className="py-4 px-6 text-sm font-semibold">{person.name}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        person.role === 'Supervisor' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                      }`}>
                        {person.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        person.status === 'Active' ? 'text-emerald-500 bg-emerald-500/10' : 
                        person.status === 'OnLeave' ? 'text-purple-500 bg-purple-500/10' : 
                        'text-muted-foreground bg-muted'
                      }`}>
                        {person.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{person.phone}</td>
                    <td className="py-4 px-6 text-sm font-medium">{person.assignedClient}</td>
                    <td className="py-4 px-6 text-sm">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          person.clockStatus === 'Clocked In' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                          person.clockStatus === 'On Shift' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' :
                          'bg-muted-foreground/30'
                        }`} />
                        <span className="font-medium">{person.clockStatus}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{person.lastUpdate}</td>
                    <td className="py-4 px-6 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="View Profile">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-md transition-colors" title="Edit">
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
                  <td colSpan={9} className="py-12 text-center text-muted-foreground">
                    No personnel found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Bottom Spacer */}
      <div className="h-6 w-full"></div>
    </div>
  );
}
