'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Briefcase,
} from 'lucide-react';

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface ShiftEvent {
  id: number;
  date: string;        // YYYY-MM-DD
  startTime: string;
  endTime: string;
  company: string;
  location: string;
  type: 'upcoming' | 'past';
}

const shiftEvents: ShiftEvent[] = [
  { id: 1, date: '2026-05-20', startTime: '08:00', endTime: '16:00', company: 'Tek1 Security Solutions', location: 'Main Campus, Building A', type: 'upcoming' },
  { id: 2, date: '2026-05-22', startTime: '22:00', endTime: '06:00', company: 'Downtown Plaza Management', location: 'City Center Mall', type: 'upcoming' },
  { id: 3, date: '2026-05-24', startTime: '14:00', endTime: '22:00', company: 'Tech Park Estate', location: 'Innovation Hub, Block C', type: 'upcoming' },
  { id: 4, date: '2026-05-28', startTime: '08:00', endTime: '16:00', company: 'Tek1 Security Solutions', location: 'Main Campus, Building A', type: 'upcoming' },
  { id: 5, date: '2026-05-18', startTime: '08:00', endTime: '16:00', company: 'Tek1 Security Solutions', location: 'Main Campus, Building A', type: 'past' },
  { id: 6, date: '2026-05-15', startTime: '06:00', endTime: '14:00', company: 'Harbor Logistics', location: 'Pier 4 Warehouse', type: 'past' },
  { id: 7, date: '2026-05-10', startTime: '22:00', endTime: '06:00', company: 'Downtown Plaza Management', location: 'City Center Mall', type: 'past' },
  { id: 8, date: '2026-05-05', startTime: '08:00', endTime: '16:00', company: 'Tech Park Estate', location: 'Innovation Hub, Block C', type: 'past' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${((h % 12) || 12).toString().padStart(2,'0')}:${m.toString().padStart(2,'0')} ${ampm}`;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState<string | null>(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`
  );

  // Navigation
  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1); }
    else setViewMonth(m => m + 1);
  };

  // Build calendar grid
  const firstDay   = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  // Index shifts by date string for quick lookup
  const shiftsByDate: Record<string, ShiftEvent[]> = {};
  shiftEvents.forEach((s) => {
    if (!shiftsByDate[s.date]) shiftsByDate[s.date] = [];
    shiftsByDate[s.date].push(s);
  });

  const toDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

  const selectedShifts = selectedDate ? (shiftsByDate[selectedDate] ?? []) : [];

  // Upcoming shifts for sidebar (next 4)
  const upcoming = shiftEvents
    .filter((s) => s.type === 'upcoming')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Calendar size={22} />
          Calendar
        </h1>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
          G
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold mb-1">Shift Calendar</h2>
          <p className="text-muted-foreground">View all your scheduled shifts at a glance.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── Calendar ── */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader className="pb-4">
                {/* Month navigation */}
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft size={20} />
                  </Button>
                  <CardTitle className="text-xl">
                    {MONTHS[viewMonth]} {viewYear}
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={nextMonth}>
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAYS.map((d) => (
                    <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Date cells */}
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((day, idx) => {
                    if (!day) return <div key={idx} />;
                    const dateStr = toDateStr(day);
                    const isToday    = dateStr === todayStr;
                    const isSelected = dateStr === selectedDate;
                    const dayShifts  = shiftsByDate[dateStr] ?? [];
                    const hasUpcoming = dayShifts.some((s) => s.type === 'upcoming');
                    const hasPast     = dayShifts.some((s) => s.type === 'past');

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`relative flex flex-col items-center justify-start pt-2 pb-1 h-14 rounded-lg transition-all text-sm font-medium
                          ${isSelected ? 'bg-primary text-primary-foreground shadow' : 'hover:bg-muted'}
                          ${isToday && !isSelected ? 'border-2 border-primary text-primary' : ''}
                        `}
                      >
                        <span>{day}</span>
                        {/* Shift dot indicators */}
                        {dayShifts.length > 0 && (
                          <div className="flex gap-0.5 mt-1">
                            {hasUpcoming && (
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary-foreground' : 'bg-primary'}`} />
                            )}
                            {hasPast && (
                              <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary-foreground/60' : 'bg-muted-foreground'}`} />
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> Upcoming Shift</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> Past Shift</span>
                </div>
              </CardContent>
            </Card>

            {/* Selected day detail */}
            {selectedDate && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">
                  {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
                {selectedShifts.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground bg-card rounded-xl border border-dashed border-border">
                    <Calendar size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No shifts scheduled on this day.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedShifts.map((shift) => (
                      <Link key={shift.id} href={`/guard/dashboard/shifts/${shift.id}`}>
                        <Card className={`hover:shadow-md transition-shadow cursor-pointer ${shift.type === 'upcoming' ? 'border-primary/20 bg-primary/5' : ''}`}>
                          <CardContent className="pt-4 pb-4 flex items-center gap-4">
                            <div className={`p-3 rounded-full shrink-0 ${shift.type === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                              <Briefcase size={20} />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{shift.company}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1"><Clock size={13} /> {formatTime(shift.startTime)} – {formatTime(shift.endTime)}</span>
                                <span className="flex items-center gap-1"><MapPin size={13} /> {shift.location}</span>
                              </div>
                            </div>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${shift.type === 'upcoming' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                              {shift.type === 'upcoming' ? 'Upcoming' : 'Completed'}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Sidebar: Upcoming ── */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> Upcoming Shifts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {upcoming.map((shift) => (
                  <Link key={shift.id} href={`/guard/dashboard/shifts/${shift.id}`}>
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group">
                      {/* Date badge */}
                      <div className="shrink-0 flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg w-12 h-12 font-bold leading-tight">
                        <span className="text-lg">{new Date(shift.date + 'T00:00:00').getDate()}</span>
                        <span className="text-[10px] uppercase opacity-70">{MONTHS[new Date(shift.date + 'T00:00:00').getMonth()].slice(0, 3)}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{shift.company}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock size={11} /> {formatTime(shift.startTime)} – {formatTime(shift.endTime)}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                          <MapPin size={11} /> {shift.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                <Link href="/guard/dashboard/shifts" className="flex items-center justify-center gap-1 text-sm text-primary hover:text-primary/80 font-medium py-2 rounded-lg hover:bg-primary/5 transition-colors">
                  View all shifts <ChevronRight size={16} />
                </Link>
              </CardContent>
            </Card>

            {/* Monthly stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {[
                  { label: 'Total Shifts', value: shiftEvents.filter(s => s.date.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2,'0')}`)).length },
                  { label: 'Upcoming',     value: shiftEvents.filter(s => s.date.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2,'0')}`) && s.type === 'upcoming').length },
                  { label: 'Completed',    value: shiftEvents.filter(s => s.date.startsWith(`${viewYear}-${String(viewMonth + 1).padStart(2,'0')}`) && s.type === 'past').length },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className="font-bold text-lg">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
