'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Calendar as CalendarIcon, Building } from 'lucide-react';

const upcomingShifts = [
  {
    id: 1,
    company: "Tek1 Security Solutions",
    date: "2026-05-20",
    time: "08:00 AM - 04:00 PM",
    location: "Main Campus, Building A"
  },
  {
    id: 2,
    company: "Downtown Plaza Management",
    date: "2026-05-22",
    time: "10:00 PM - 06:00 AM",
    location: "City Center Mall"
  },
  {
    id: 3,
    company: "Tech Park Estate",
    date: "2026-05-24",
    time: "02:00 PM - 10:00 PM",
    location: "Innovation Hub, Block C"
  }
];

const pastShifts = [
  {
    id: 4,
    company: "Tek1 Security Solutions",
    date: "2026-05-18",
    time: "08:00 AM - 04:00 PM",
    location: "Main Campus, Building A"
  },
  {
    id: 5,
    company: "Harbor Logistics",
    date: "2026-05-15",
    time: "06:00 AM - 02:00 PM",
    location: "Pier 4 Warehouse"
  },
  {
    id: 6,
    company: "Downtown Plaza Management",
    date: "2026-05-10",
    time: "10:00 PM - 06:00 AM",
    location: "City Center Mall"
  }
];

const ShiftCard = ({ shift }: { shift: any }) => {
  return (
    <Link href={`/guard/dashboard/shifts/${shift.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow h-full cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Building className="text-primary" size={20} />
            {shift.company}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-3 text-muted-foreground">
              <CalendarIcon size={18} className="text-primary/70" />
              <span className="font-medium text-foreground">{shift.date}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock size={18} className="text-primary/70" />
              <span>{shift.time}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin size={18} className="text-primary/70" />
              <span>{shift.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function GuardShiftsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">My Shifts</h1>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
            G
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Shift Schedule</h2>
          <p className="text-muted-foreground">View your upcoming assignments and past shift history.</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
            <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
            <TabsTrigger value="past">Past Shifts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingShifts.map((shift) => (
                <ShiftCard key={shift.id} shift={shift} />
              ))}
            </div>
            {upcomingShifts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border border-dashed">
                <p>No upcoming shifts scheduled.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastShifts.map((shift) => (
                <ShiftCard key={shift.id} shift={shift} />
              ))}
            </div>
            {pastShifts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border border-dashed">
                <p>No past shifts found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
