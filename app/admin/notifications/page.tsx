'use client';

import { useState } from 'react';
import { Check, CheckCircle2, Circle, AlertCircle, Clock, ShieldAlert, MessageSquare, Briefcase, MapPin } from 'lucide-react';

type NotificationType = 'Incidents' | 'Shifts' | 'Compliance' | 'Client' | 'Messages' | 'Patrol';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  isRead: boolean;
};

const initialNotifications: Notification[] = [
  { id: '1', title: 'Severe Incident Reported', message: 'Unauthorized access attempt at Main Gate.', type: 'Incidents', date: '2 mins ago', isRead: false },
  { id: '2', title: 'Missed Patrol Checkpoint', message: 'Guard John Doe missed checkpoint Alpha.', type: 'Patrol', date: '15 mins ago', isRead: false },
  { id: '3', title: 'Shift Starting Soon', message: 'Night shift starts in 30 minutes at Site B.', type: 'Shifts', date: '30 mins ago', isRead: true },
  { id: '4', title: 'License Expiration', message: 'Guard Sarah Smith license expires in 3 days.', type: 'Compliance', date: '1 hour ago', isRead: false },
  { id: '5', title: 'New Client Message', message: 'Client at Site A requested a schedule change.', type: 'Messages', date: '2 hours ago', isRead: true },
  { id: '6', title: 'Client Onboarding', message: 'New site added for Horizon Corp.', type: 'Client', date: '1 day ago', isRead: true },
  { id: '7', title: 'Incident Resolved', message: 'Water leak issue has been addressed by maintenance.', type: 'Incidents', date: '1 day ago', isRead: true },
  { id: '8', title: 'Shift Coverage Complete', message: 'All posts are fully staffed for current shift.', type: 'Shifts', date: '2 days ago', isRead: true },
];

const filters = ['All', 'Unread', 'Incidents', 'Shifts', 'Compliance', 'Client', 'Messages', 'Patrol'];

const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case 'Incidents': return <AlertCircle size={16} className="text-destructive" />;
    case 'Shifts': return <Clock size={16} className="text-blue-500" />;
    case 'Compliance': return <ShieldAlert size={16} className="text-amber-500" />;
    case 'Client': return <Briefcase size={16} className="text-emerald-500" />;
    case 'Messages': return <MessageSquare size={16} className="text-purple-500" />;
    case 'Patrol': return <MapPin size={16} className="text-indigo-500" />;
    default: return <Circle size={16} />;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.isRead;
    return n.type === activeFilter;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col h-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Manage and track your platform alerts.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors cursor-pointer"
        >
          <Check size={18} />
          Mark all as read
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col flex-1 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-border overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeFilter === filter 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground w-12 text-center">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground whitespace-nowrap">Type</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground">Notification Details</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground whitespace-nowrap">Date</th>
                <th className="py-4 px-6 font-semibold text-sm text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <tr 
                    key={notif.id} 
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${!notif.isRead ? 'bg-primary/5' : ''}`}
                  >
                    <td className="py-4 px-6 text-center">
                      {!notif.isRead ? (
                        <div className="w-2.5 h-2.5 mx-auto rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" title="Unread" />
                      ) : (
                        <div className="w-2 h-2 mx-auto rounded-full bg-muted-foreground/30" title="Read" />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-background rounded-md shadow-sm border border-border">
                          {getTypeIcon(notif.type)}
                        </div>
                        <span className="text-sm font-medium">{notif.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 min-w-[300px]">
                      <p className={`text-sm ${!notif.isRead ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>
                        {notif.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{notif.message}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap font-medium">
                      {notif.date}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {!notif.isRead ? (
                        <button 
                          onClick={() => markAsRead(notif.id)}
                          className="text-primary hover:text-primary/70 text-sm font-semibold flex items-center gap-1.5 justify-end ml-auto bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <CheckCircle2 size={16} />
                          Mark Read
                        </button>
                      ) : (
                        <span className="text-muted-foreground/50 text-sm font-medium px-3 py-1.5">Read</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                        <Check size={32} className="text-muted-foreground/50" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-lg">All caught up!</p>
                        <p className="text-sm">No notifications matching this filter.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
