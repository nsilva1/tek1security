'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, CalendarIcon, ClipboardList, Clock, Plus } from 'lucide-react';

interface LogEntry {
  id: number;
  datetime: string;
  description: string;
}

const initialLogs: LogEntry[] = [
  {
    id: 1,
    datetime: '2026-05-19T08:05',
    description: 'Arrived at the post. Completed handover with outgoing guard. All clear.',
  },
  {
    id: 2,
    datetime: '2026-05-19T10:30',
    description: 'Completed perimeter patrol. Checked all entry points. No anomalies found.',
  },
  {
    id: 3,
    datetime: '2026-05-19T13:15',
    description: 'Visitor access granted to maintenance crew for HVAC inspection on 3rd floor.',
  },
  {
    id: 4,
    datetime: '2026-05-19T15:45',
    description: 'Brief power outage in the east wing. Backup lighting activated. Reported to facility manager.',
  },
];

function formatDateTime(datetime: string) {
  const d = new Date(datetime);
  return {
    date: d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }),
    time: d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  };
}

export default function LogBookPage() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!datetime || !description.trim()) return;

    const newLog: LogEntry = {
      id: Date.now(),
      datetime,
      description: description.trim(),
    };

    setLogs([newLog, ...logs]);
    setDatetime('');
    setDescription('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <BookOpen size={22} />
          Log Book
        </h1>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
          G
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-3xl w-full mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Activity Log</h2>
          <p className="text-muted-foreground">Record activities and events from your shift.</p>
        </div>

        {/* Log Entry Form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Plus size={20} className="text-primary" />
              Add Log Entry
            </CardTitle>
            <CardDescription>Log a shift activity or event with a timestamp.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Date & Time */}
              <div className="space-y-2">
                <Label htmlFor="log-datetime" className="flex items-center gap-2">
                  <CalendarIcon size={14} className="text-muted-foreground" /> Date & Time
                </Label>
                <Input
                  id="log-datetime"
                  type="datetime-local"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Activity Description */}
              <div className="space-y-2">
                <Label htmlFor="log-description" className="flex items-center gap-2">
                  <ClipboardList size={14} className="text-muted-foreground" /> Activity Description
                </Label>
                <Textarea
                  id="log-description"
                  placeholder="Describe the activity or event in detail…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-5 text-base font-semibold"
                disabled={submitted}
              >
                {submitted ? (
                  '✓ Log Entry Added'
                ) : (
                  <><Plus className="mr-2" size={18} /> Add to Log Book</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Recent Activities
            <span className="ml-auto text-sm font-normal text-muted-foreground">{logs.length} entries</span>
          </h3>

          {logs.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-dashed border-border">
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p>No log entries yet. Add your first entry above.</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

              <div className="space-y-4">
                {logs.map((log) => {
                  const { date, time } = formatDateTime(log.datetime);
                  return (
                    <div key={log.id} className="flex gap-4 group">
                      {/* Timeline dot */}
                      <div className="relative mt-3 shrink-0">
                        <div className="w-5 h-5 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors" />
                      </div>

                      {/* Log card */}
                      <Card className="flex-1 group-hover:shadow-md transition-shadow">
                        <CardContent className="pt-4 pb-4 space-y-2">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarIcon size={12} /> {date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} /> {time}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{log.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
