
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ArrowLeft,
  Phone,
  Mail,
  User,
  Navigation,
  Power,
  AlertTriangle
} from 'lucide-react';
import { TasksCard } from './TasksCard';

export default async function ShiftDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Mock data for the shift details based on ID
  const shift = {
    id: id,
    company: "Tek1 Security Solutions",
    date: "2026-05-20",
    time: "08:00 AM - 04:00 PM",
    location: "Main Campus, Building A",
    address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
    client: {
      name: "Jane Doe",
      role: "Facility Manager",
      phone: "+1 (555) 123-4567",
      email: "jane.doe@tek1security.com"
    },
    tasks: [
      "Perform initial perimeter check upon arrival",
      "Verify visitor logs at the front desk",
      "Ensure all emergency exits are clear and unobstructed",
      "Monitor security cameras and report blind spots",
      "Submit a comprehensive end-of-shift report"
    ]
  };

  // Google Maps URL (encoded address for the button)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shift.address)}`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex items-center border-b border-border gap-4">
        <Link href="/guard/dashboard/shifts" className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-primary">Shift Details</h1>
      </header>
      
      <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto space-y-6">
        
        {/* Top Row: Overview & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 - Overview */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Building className="text-primary" size={24} />
                {shift.company}
              </CardTitle>
              <CardDescription>Shift ID: #{shift.id.padStart(5, '0')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-muted/40 p-4 rounded-lg border border-border">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <CalendarIcon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{shift.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 p-4 rounded-lg border border-border">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{shift.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 p-4 rounded-lg border border-border sm:col-span-2">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{shift.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 5 - Shift Actions */}
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage your current shift</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center space-y-4">
              <Button className="w-full py-6 text-lg bg-primary hover:bg-primary/90">
                <Power className="mr-2" size={20} />
                Clock In
              </Button>
              <Button variant="outline" className="w-full py-6 text-lg border-destructive text-destructive hover:bg-destructive/10">
                <AlertTriangle className="mr-2" size={20} />
                Report Incident
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* Middle Row: Tasks & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 2 - Tasks */}
          <TasksCard tasks={shift.tasks} />

          {/* Location & Client Stack */}
          <div className="space-y-6">
            
            {/* Card 4 - Location & Direction */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  Location & Directions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium">{shift.address}</p>
                <Button 
                  asChild
                  className="w-full py-5 bg-primary text-secondary-foreground hover:bg-primary/80"
                >
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2" size={18} />
                    Open in Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Card 3 - Client Contact */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="text-primary" size={20} />
                  Client Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">{shift.client.name}</p>
                    <p className="text-sm text-muted-foreground">{shift.client.role}</p>
                  </div>
                  
                  <div className="space-y-2 pt-2 border-t border-border">
                    <a href={`tel:${shift.client.phone}`} className="flex items-center gap-3 text-sm text-primary hover:underline">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Phone size={16} />
                      </div>
                      {shift.client.phone}
                    </a>
                    <a href={`mailto:${shift.client.email}`} className="flex items-center gap-3 text-sm text-primary hover:underline">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Mail size={16} />
                      </div>
                      {shift.client.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
