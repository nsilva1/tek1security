'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Megaphone, Users, AlertTriangle, Paperclip, Type, Mail, Smartphone, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function SendAnnouncementPage() {
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
          <h1 className="text-3xl font-bold text-foreground">Send Company Announcement</h1>
          <p className="text-muted-foreground mt-1">Broadcast important information to your workforce and clients.</p>
        </div>
      </div>

      <Card className="shadow-sm border-border bg-card">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Announcement Composition</CardTitle>
            <CardDescription>Target your audience and compose your broadcast message.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 mt-4">
            
            {/* Target Audience & Priority */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Targeting & Urgency</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience Segment</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <select 
                      id="audience" 
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none font-medium"
                      required
                      defaultValue="all_guards"
                    >
                      <option value="all_staff">All Company Personnel</option>
                      <option value="all_guards">All Security Guards</option>
                      <option value="supervisors">Supervisors Only</option>
                      <option value="clients">All Registered Clients</option>
                      <option value="specific_site">Users at a Specific Site...</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-2.5 text-muted-foreground">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Urgency / Priority Level</Label>
                  <div className="relative">
                    <AlertTriangle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <select 
                      id="priority" 
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none font-medium"
                      required
                      defaultValue="normal"
                    >
                      <option value="low">Low - General Info</option>
                      <option value="normal">Normal - Standard Notice</option>
                      <option value="high">High - Important Update</option>
                      <option value="critical">Critical - Emergency Alert</option>
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

            {/* Delivery Channels */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Delivery Channels</h3>
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 cursor-pointer transition-colors shadow-sm min-w-[200px]">
                  <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary" defaultChecked />
                  <div className="flex items-center gap-2">
                    <BellRing size={18} className="text-primary" />
                    <span className="font-medium text-sm">App Push Notification</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 cursor-pointer transition-colors shadow-sm min-w-[200px]">
                  <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary" defaultChecked />
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-primary" />
                    <span className="font-medium text-sm">Email Broadcast</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 cursor-pointer transition-colors shadow-sm min-w-[200px]">
                  <input type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary" />
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} className="text-primary" />
                    <span className="font-medium text-sm">SMS Text Message</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Message Composition */}
            <div className="space-y-4 pt-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Message Body</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject / Announcement Title</Label>
                  <div className="relative">
                    <Type className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="subject" type="text" placeholder="e.g. Protocol update for all night shifts" className="pl-10 block w-full text-lg font-medium" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <Label htmlFor="message">Main Content</Label>
                  </div>
                  <Textarea 
                    id="message" 
                    placeholder="Type the full announcement details here..." 
                    className="min-h-[200px] resize-y p-4 text-base"
                    required
                  />
                </div>

                {/* File Attachment Mock */}
                <div className="pt-2">
                  <Label className="mb-2 block">Attachment (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="outline" className="flex items-center gap-2 border-dashed border-2 hover:bg-muted/50">
                      <Paperclip size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Attach File</span>
                      <input type="file" className="absolute opacity-0 cursor-pointer max-w-[120px]" />
                    </Button>
                    <span className="text-xs text-muted-foreground">Max size 5MB. PDF, DOCX, IMG only.</span>
                  </div>
                </div>
              </div>
            </div>

          </CardContent>
          
          <CardFooter className="flex justify-between items-center border-t border-border py-4 mt-6 bg-muted/10 rounded-b-xl px-6">
            <Button 
              className="bg-transparent text-foreground border border-border hover:bg-muted ml-0" 
              type="button" 
              onClick={() => router.push('/admin/dashboard')}
            >
              Cancel
            </Button>
            <Button className="font-semibold px-8 flex items-center gap-2" type="submit">
              <Megaphone size={16} />
              Broadcast Announcement
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
