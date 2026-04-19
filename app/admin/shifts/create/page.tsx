'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function CreateShiftPage() {
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // mock form submission
    router.push('/admin/dashboard');
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full flex flex-col min-h-screen animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/dashboard" 
          className="p-2 bg-card border border-border rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Shift</h1>
          <p className="text-muted-foreground mt-1">Assign personnel to a new patrol shift schedule.</p>
        </div>
      </div>

      <Card className="shadow-sm border-border bg-card">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Shift Details</CardTitle>
            <CardDescription>Enter the primary information for this security shift.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Guard Selection */}
              <div className="space-y-2">
                <Label htmlFor="guard">Assigned Guard</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <select 
                    id="guard" 
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select a guard...</option>
                    <option value="1">John Doe - ID: T1-0042</option>
                    <option value="2">Sarah Smith - ID: T1-0089</option>
                    <option value="3">Michael Johnson - ID: T1-0105</option>
                  </select>
                  {/* Custom dropdown arrow to replace native via appearance-none */}
                  <div className="pointer-events-none absolute right-3 top-2.5 text-muted-foreground">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Client/Site Selection */}
              <div className="space-y-2">
                <Label htmlFor="site">Client / Site Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <select 
                    id="site" 
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select a site location...</option>
                    <option value="site_a">Seplat Energy Plc (Port Harcourt)</option>
                    <option value="site_b">Bluecrest Estates (Ikeja)</option>
                    <option value="site_c">Zenith Bank Branch (VI)</option>
                    <option value="site_d">Chevron Nigeria Limited (Lagos)</option>
                    <option value="site_e">TotalEnergies (Port Harcourt)</option>
                    <option value="site_f">Shell (Port Harcourt)</option>
                    <option value="site_g">TotalEnergies (Abuja)</option>
                    
                  </select>
                  <div className="pointer-events-none absolute right-3 top-2.5 text-muted-foreground">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Shift Date */}
              <div className="space-y-2">
                <Label htmlFor="date">Shift Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input id="date" type="date" className="pl-10 block w-full" required />
                </div>
              </div>

              {/* Start Time */}
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input id="startTime" type="time" className="pl-10 block w-full" required />
                </div>
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input id="endTime" type="time" className="pl-10 block w-full" required />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label htmlFor="type" className="text-base">Shift Type</Label>
              <div className="flex flex-wrap gap-4">
                {['Day Shift', 'Night Shift', 'Weekend', 'Event/Special'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer bg-muted/30 px-3 py-2 rounded-lg border border-transparent hover:border-border transition-colors">
                    <input 
                      type="radio" 
                      name="shiftType" 
                      value={type} 
                      className="text-primary focus:ring-primary focus:ring-offset-background h-4 w-4 bg-background border-border accent-primary" 
                      defaultChecked={type === 'Day Shift'} 
                    />
                    <span className="text-sm font-medium">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="notes">Supervisor Notes / Instructions (Optional)</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any special instructions or patrol routes expected for this shift..." 
                className="min-h-[120px] resize-y"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3 border-t border-border  bg-muted/10 rounded-b-xl">
            <Button 
              className="bg-transparent text-foreground border border-border hover:bg-muted" 
              type="button" 
              onClick={() => router.push('/admin/dashboard')}
            >
              Cancel
            </Button>
            <Button className="font-semibold px-6" type="submit">
              Create Shift
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
