'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Calendar, Building2, DownloadCloud, FileBarChart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

export default function GenerateReportPage() {
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
          <h1 className="text-3xl font-bold text-foreground">Generate Report</h1>
          <p className="text-muted-foreground mt-1">Compile and download customized system reporting data.</p>
        </div>
      </div>

      <Card className="shadow-sm border-border bg-card">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Report Parameters</CardTitle>
            <CardDescription>Configure the focus and duration for your security extraction.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 mt-4">
            
            {/* Report Type */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Primary Configuration</h3>
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Template Type</Label>
                <div className="relative">
                  <FileBarChart className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <select 
                    id="reportType" 
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none font-medium"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select the type of report to generate...</option>
                    <option value="attendance">Daily Attendance & Clock-ins</option>
                    <option value="incidents">Incident Summary & Logs</option>
                    <option value="compliance">Guard Compliance & Licenses</option>
                    <option value="payroll">Payroll Extract & Overtime</option>
                    <option value="nps">Client Interactions & NPS</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-2.5 text-muted-foreground">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Analysis Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input id="startDate" type="date" className="pl-10 block w-full" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input id="endDate" type="date" className="pl-10 block w-full" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Scope & Filters */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2">Data Scope</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clientScope">Client / Site Filter</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <select 
                      id="clientScope" 
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
                      defaultValue="all"
                    >
                      <option value="all">Export All Sites</option>
                      <option value="site_a">Seplat Energy Plc</option>
                      <option value="site_b">Bluecrest Estates</option>
                      <option value="site_c">Zenith Bank Branches</option>
                      <option value="site_d">Chevron Nigeria Limited</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-2.5 text-muted-foreground">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="statusFilter">Status Focus</Label>
                  <div className="relative">
                    <Filter className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <select 
                      id="statusFilter" 
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-10 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
                      defaultValue="all"
                    >
                      <option value="all">Include everything</option>
                      <option value="critical">Critical / High Priority only</option>
                      <option value="unresolved">Unresolved Issues</option>
                      <option value="completed">Completed / Signed-off</option>
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

            {/* Output Format */}
            <div className="space-y-4 pt-2">
              <h3 className="font-semibold text-lg text-foreground border-b border-border pb-2 flex items-center gap-2">Export Format <FileText /></h3>
              <div className="flex flex-wrap gap-4">
                {['PDF Document (.pdf)', 'Excel Spreadsheet (.xlsx)', 'Raw Data (.csv)', 'JSON Export'].map((format, index) => (
                  <label key={format} className="flex items-center gap-2 cursor-pointer bg-muted/30 px-4 py-3 rounded-lg border border-transparent hover:border-border transition-colors">
                    <input 
                      type="radio" 
                      name="exportFormat" 
                      value={format} 
                      className="text-primary focus:ring-primary focus:ring-offset-background h-4 w-4 bg-background border-border accent-primary" 
                      defaultChecked={index === 0} 
                    />
                    <div className="flex flex-col ml-1">
                      <span className="text-sm font-semibold">{format.split(' ')[0]}</span>
                      <span className="text-xs text-muted-foreground">{format.substring(format.indexOf(' ')+1)}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3 border-t border-border py-4 mt-6 bg-muted/10 rounded-b-xl">
            <Button 
              className="bg-transparent text-foreground border border-border hover:bg-muted" 
              type="button" 
              onClick={() => router.push('/admin/dashboard')}
            >
              Cancel
            </Button>
            <Button className="font-semibold px-6 flex items-center gap-2" type="submit">
              <DownloadCloud size={18} />
              Generate & Download
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
