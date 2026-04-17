import { Bell } from 'lucide-react';
import { adminDashboardMetrics } from '@/lib/constants';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-7.75 bg-card flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            <Link
            href='/admin/notifications'
          className='relative cursor-pointer'
          aria-label='View Notifications'
        >
          <Bell size={26} strokeWidth={2} />
            <span className='absolute top-1 right-1 block h-1 w-1 rounded-full bg-primary ring-2'></span>
        </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Welcome back, Admin!</h2>
          <p className="text-muted-foreground">Here is an overview of your platform activities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminDashboardMetrics.map((metrics, i) => (
            <div key={i} className={`${metrics.bg} p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-all duration-200 group`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metrics.title}</p>
                  <h3 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">{metrics.value}</h3>
                </div>
                <metrics.icon size={50} className={`${metrics.color} opacity-30`} />
              </div>
              {/* <p className="text-xs text-emerald-500 font-medium">{metrics.change}</p> */}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Shift Fulfilment Rate Graph */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-4 text-muted-foreground">Shift Fulfilment Rate</h3>
            <div className="flex-1 flex flex-col justify-center items-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-10 border-muted">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">85%</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-emerald-500 font-medium flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-full">
                <span className="text-lg leading-none">&uarr;</span> 5% from last week
              </p>
            </div>
          </div>

          {/* Incident Rates Graph */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-6 text-muted-foreground">Incident Rates</h3>
            <div className="flex-1 flex items-end gap-2 h-32 mt-auto pt-4 relative">
              {[40, 70, 45, 90, 65, 30, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/10 rounded-t-lg hover:bg-primary/20 transition-colors relative group h-full flex items-end">
                  <div style={{ height: `${h}%` }} className="w-full bg-primary rounded-t-lg group-hover:opacity-90 transition-opacity" />
                  {/* Tooltip mock */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium shadow-xl z-10">
                    {h}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs font-medium text-muted-foreground px-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Overall Guard Performance (NPS score) Graph */}
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-4 text-muted-foreground">Guard Performance (NPS)</h3>
            <div className="flex-1 flex flex-col justify-end gap-6 mt-auto">
              <div className="flex items-center gap-6">
                <div className="text-5xl font-bold text-primary flex items-end gap-1">
                  78 <span className="text-base text-muted-foreground font-medium mb-1">NPS</span>
                </div>
              </div>
              <div className="w-full">
                <div className="flex justify-between text-xs font-medium mb-2 text-muted-foreground">
                  <span>Industry Avg: 45</span>
                  <span className="text-primary font-bold">Excellent</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                  {/* Mock stacked bar */}
                  <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: '80%' }} title="Promoters" />
                  <div className="h-full bg-yellow-500 transition-all duration-1000" style={{ width: '15%' }} title="Passives" />
                  <div className="h-full bg-destructive transition-all duration-1000" style={{ width: '5%' }} title="Detractors" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                <div className="p-2 bg-muted/40 rounded-lg">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Promoters</p>
                  <p className="font-bold text-emerald-500 mt-1">80%</p>
                </div>
                <div className="p-2 bg-muted/40 rounded-lg">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Passives</p>
                  <p className="font-bold text-yellow-500 mt-1">15%</p>
                </div>
                <div className="p-2 bg-muted/40 rounded-lg">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Detractors</p>
                  <p className="font-bold text-destructive mt-1">5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
