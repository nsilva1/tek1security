'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Briefcase,
  ShieldAlert,
  Megaphone,
  Settings,
  CheckCheck,
  Clock,
  Trash2,
  ChevronRight,
} from 'lucide-react';

// ─── Types & Data ─────────────────────────────────────────────────────────────

type NotifCategory = 'All' | 'Shifts' | 'Alerts' | 'Announcements' | 'System';

interface Notification {
  id: number;
  category: Exclude<NotifCategory, 'All'>;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    category: 'Shifts',
    title: 'New Shift Assigned',
    message: 'You have been assigned to a shift at Main Campus, Building A on 20 May 2026 (08:00 AM – 04:00 PM).',
    timestamp: '2026-05-19T14:30:00',
    read: false,
  },
  {
    id: 2,
    category: 'Alerts',
    title: 'Incident Report Reviewed',
    message: 'Your incident report (ID #00003) for the disturbance at Main Entrance has been reviewed and closed by admin.',
    timestamp: '2026-05-19T11:00:00',
    read: false,
  },
  {
    id: 3,
    category: 'Announcements',
    title: 'Company Announcement',
    message: 'All security personnel are required to attend a mandatory briefing on Monday, 23 May 2026 at 08:00 AM.',
    timestamp: '2026-05-18T09:00:00',
    read: false,
  },
  {
    id: 4,
    category: 'Shifts',
    title: 'Shift Reminder',
    message: 'Reminder: Your shift at City Center Mall starts tomorrow at 10:00 PM. Please arrive 15 minutes early.',
    timestamp: '2026-05-18T07:00:00',
    read: true,
  },
  {
    id: 5,
    category: 'System',
    title: 'Payslip Ready',
    message: 'Your payslip for April 2026 is now available. Navigate to the Payroll section to view and download.',
    timestamp: '2026-05-01T08:00:00',
    read: true,
  },
  {
    id: 6,
    category: 'Alerts',
    title: 'Checkpoint Missed',
    message: 'A checkpoint scan was missed during your shift on 15 May 2026 at 02:30 AM (Checkpoint: North Wing).',
    timestamp: '2026-04-30T03:00:00',
    read: true,
  },
  {
    id: 7,
    category: 'Announcements',
    title: 'New Shop Items Available',
    message: 'New safety gear has been added to the Guard Shop. Check out the latest arrivals at discounted rates.',
    timestamp: '2026-04-28T10:00:00',
    read: true,
  },
];

const categoryConfig: Record<Exclude<NotifCategory, 'All'>, { icon: React.ElementType; bg: string; color: string }> = {
  Shifts:        { icon: Briefcase,   bg: 'bg-blue-500/10',    color: 'text-blue-500' },
  Alerts:        { icon: ShieldAlert,  bg: 'bg-red-500/10',     color: 'text-red-500' },
  Announcements: { icon: Megaphone,    bg: 'bg-yellow-500/10',  color: 'text-yellow-600' },
  System:        { icon: Settings,     bg: 'bg-purple-500/10',  color: 'text-purple-500' },
};

const CATEGORIES: NotifCategory[] = ['All', 'Shifts', 'Alerts', 'Announcements', 'System'];

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return 'Just now';
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<NotifCategory>('All');

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = notifs.filter(
    (n) => activeTab === 'All' || n.category === activeTab,
  );

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const remove = (id: number) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Bell size={22} />
          Notifications
          {unreadCount > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
          G
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-3xl w-full mx-auto">
        {/* Title row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">Inbox</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
              <CheckCheck size={16} /> Mark all read
            </Button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All'
              ? notifs.filter((n) => !n.read).length
              : notifs.filter((n) => n.category === cat && !n.read).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border flex items-center gap-1.5 ${
                  activeTab === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow'
                    : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
                {count > 0 && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeTab === cat ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notification list */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-dashed border-border">
              <Bell size={40} className="mx-auto mb-3 opacity-30" />
              <p>No notifications in this category.</p>
            </div>
          ) : (
            filtered.map((n) => {
              const cfg = categoryConfig[n.category];
              const Icon = cfg.icon;
              return (
                <Card
                  key={n.id}
                  className={`transition-all hover:shadow-md cursor-pointer ${!n.read ? 'border-primary/30 bg-primary/5' : ''}`}
                  onClick={() => markRead(n.id)}
                >
                  <CardContent className="pt-4 pb-4 flex items-start gap-4">
                    {/* Icon */}
                    <div className={`${cfg.bg} ${cfg.color} p-3 rounded-full shrink-0 mt-0.5`}>
                      <Icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {!n.read && (
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                          )}
                          <p className={`font-semibold text-sm ${n.read ? 'text-foreground' : 'text-foreground'}`}>
                            {n.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                            <Clock size={11} /> {relativeTime(n.timestamp)}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                            className="p-1 hover:text-destructive text-muted-foreground rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                      <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>
                        {n.category}
                      </span>
                    </div>

                    <ChevronRight size={16} className="text-muted-foreground shrink-0 mt-1" />
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
