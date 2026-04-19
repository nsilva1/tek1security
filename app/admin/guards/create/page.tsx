'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Phone, Mail, MapPin, BadgeCheck, Calendar, Briefcase, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function CreateGuardPage() {
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
          <h1 className="text-3xl font-bold text-foreground">Add New Guard</h1>
          <p className="text-muted-foreground mt-1">Onboard a new security personnel into the system.</p>
        </div>
      </div>

      <Card className="shadow-sm border-border bg-card">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Guard Profile Details</CardTitle>
            <CardDescription>Enter the personal and professional information for the new guard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 mt-4">
            
            {/* Photo Upload Mock */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-2">
              <div className="relative h-24 w-24 rounded-full border-2 border-dashed border-border bg-muted/30 flex items-center justify-center group cursor-pointer hover:border-primary transition-colors">
                <Camera size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" accept="image/*" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Profile Photo</h3>
                <p className="text-sm text-muted-foreground mb-3">Upload a clear, front-facing professional photo.</p>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" size="sm" className="relative cursor-pointer">
                    Choose File
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" accept="image/*" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="firstName" type="text" placeholder="e.g. John" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="lastName" type="text" placeholder="e.g. Doe" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input id="dob" type="date" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <select 
                      id="gender" 
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>Select gender...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-2.5 text-muted-foreground">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="phone" type="tel" placeholder="+234 (0) 800 000 0000" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Residential Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="address" type="text" placeholder="Full local residential address" className="pl-10 block w-full" required />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-semibold text-lg mb-4">Professional & Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="license">Security License ID</Label>
                  <div className="relative">
                    <BadgeCheck className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="license" type="text" placeholder="e.g. SEC-8254-99" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry">License Expiry Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input id="expiry" type="date" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empType">Employment Type</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <select 
                      id="empType" 
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                      required
                      defaultValue="full-time"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contractor</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-2.5 text-muted-foreground">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Label className="text-base">Initial Status</Label>
                  <div className="flex flex-wrap gap-4">
                    {['Active', 'In Training', 'Pending Verification'].map((status) => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer bg-muted/30 px-3 py-2 rounded-lg border border-transparent hover:border-border transition-colors">
                        <input 
                          type="radio" 
                          name="status" 
                          value={status} 
                          className="text-primary focus:ring-primary focus:ring-offset-background h-4 w-4 bg-background border-border accent-primary" 
                          defaultChecked={status === 'Pending Verification'} 
                        />
                        <span className="text-sm font-medium">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3 border-t border-border py-4 mt-2 bg-muted/10 rounded-b-xl">
            <Button 
              className="bg-transparent text-foreground border border-border hover:bg-muted" 
              type="button" 
              onClick={() => router.push('/admin/dashboard')}
            >
              Cancel
            </Button>
            <Button className="font-semibold px-8" type="submit">
              Add Guard
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
