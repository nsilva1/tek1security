'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertTriangle,
  Calendar as CalendarIcon,
  MapPin,
  FileText,
  Image as ImageIcon,
  Send,
  Clock,
  Paperclip,
  ShieldAlert,
  Thermometer
} from 'lucide-react';

const INCIDENT_TYPES = [
  { value: 'theft', label: 'Theft' },
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'medical_emergency', label: 'Medical Emergency' },
  { value: 'disturbance', label: 'Disturbance' },
  { value: 'fire', label: 'Fire' },
  { value: 'patrol_check', label: 'Patrol Check' },
  { value: 'other', label: 'Other' },
];

const SEVERITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'text-emerald-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'high', label: 'High', color: 'text-orange-500' },
  { value: 'critical', label: 'Critical', color: 'text-destructive' },
];

const mockIncidents = [
  {
    id: 1,
    type: 'Theft',
    datetime: '2026-05-18T14:30',
    location: 'Parking Lot B',
    severity: 'High',
    description: 'A vehicle was broken into and personal items were stolen from the glove compartment.',
    mediaCount: 3,
  },
  {
    id: 2,
    type: 'Patrol Check',
    datetime: '2026-05-17T09:00',
    location: 'North Wing Corridor',
    severity: 'Low',
    description: 'Routine patrol completed. No anomalies observed along the corridor.',
    mediaCount: 0,
  },
  {
    id: 3,
    type: 'Disturbance',
    datetime: '2026-05-15T22:15',
    location: 'Main Entrance',
    severity: 'Medium',
    description: 'Two individuals were involved in a verbal altercation near the main gate. Situation de-escalated.',
    mediaCount: 1,
  },
];

const severityBadge = (severity: string) => {
  const map: Record<string, string> = {
    Low: 'bg-emerald-500/10 text-emerald-500',
    Medium: 'bg-yellow-500/10 text-yellow-600',
    High: 'bg-orange-500/10 text-orange-500',
    Critical: 'bg-destructive/10 text-destructive',
  };
  return map[severity] ?? 'bg-muted text-muted-foreground';
};

function ReportForm() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Incident Type */}
      <div className="space-y-2">
        <Label htmlFor="incident-type">Incident Type</Label>
        <Select required>
          <SelectTrigger id="incident-type" className="w-full">
            <SelectValue placeholder="Select incident type…" />
          </SelectTrigger>
          <SelectContent>
            {INCIDENT_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date & Time */}
      <div className="space-y-2">
        <Label htmlFor="incident-datetime" className="flex items-center gap-2">
          <CalendarIcon size={14} className="text-muted-foreground" /> Date & Time
        </Label>
        <Input
          id="incident-datetime"
          type="datetime-local"
          required
          className="w-full"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="incident-location" className="flex items-center gap-2">
          <MapPin size={14} className="text-muted-foreground" /> Location
        </Label>
        <Input
          id="incident-location"
          type="text"
          placeholder="e.g. Parking Lot A, North Wing…"
          required
          className="w-full"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="incident-description" className="flex items-center gap-2">
          <FileText size={14} className="text-muted-foreground" /> Description
        </Label>
        <Textarea
          id="incident-description"
          placeholder="Describe the incident in detail…"
          required
          rows={5}
          className="w-full resize-none"
        />
      </div>

      {/* Severity */}
      <div className="space-y-2">
        <Label htmlFor="incident-severity" className="flex items-center gap-2">
          <Thermometer size={14} className="text-muted-foreground" /> Severity
        </Label>
        <Select required>
          <SelectTrigger id="incident-severity" className="w-full">
            <SelectValue placeholder="Select severity level…" />
          </SelectTrigger>
          <SelectContent>
            {SEVERITY_LEVELS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                <span className={s.color}>{s.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="incident-image" className="flex items-center gap-2">
          <ImageIcon size={14} className="text-muted-foreground" /> Attach Images
        </Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="incident-image"
            className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-primary/40 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <ImageIcon size={32} className="text-primary/50" />
              <p className="text-sm font-medium">
                {files && files.length > 0
                  ? `${files.length} file(s) selected`
                  : 'Click to upload images'}
              </p>
              <p className="text-xs">PNG, JPG, HEIC up to 10MB each</p>
            </div>
            <Input
              id="incident-image"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setFiles(e.target.files)}
            />
          </label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full py-6 text-base font-semibold"
        disabled={submitted}
      >
        {submitted ? (
          'Incident Reported!'
        ) : (
          <><Send className="mr-2" size={18} /> Submit Report</>
        )}
      </Button>
    </form>
  );
}

function IncidentHistory() {
  return (
    <div className="space-y-4 max-w-3xl">
      {mockIncidents.map((incident) => (
        <Card key={incident.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldAlert className="text-primary" size={20} />
                {incident.type}
              </CardTitle>
              <span className={`shrink-0 px-3 py-1 text-xs rounded-full font-semibold ${severityBadge(incident.severity)}`}>
                {incident.severity}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-primary/60" />
                {new Date(incident.datetime).toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-primary/60" />
                {incident.location}
              </span>
            </div>

            <p className="text-sm leading-relaxed">{incident.description}</p>

            {incident.mediaCount > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border">
                <Paperclip size={13} />
                {incident.mediaCount} media file{incident.mediaCount > 1 ? 's' : ''} attached
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {mockIncidents.length === 0 && (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-dashed border-border">
          <ShieldAlert size={40} className="mx-auto mb-3 opacity-30" />
          <p>No incidents reported yet.</p>
        </div>
      )}
    </div>
  );
}

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <AlertTriangle size={22} />
          Report
        </h1>
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
          G
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Incident Reporting</h2>
          <p className="text-muted-foreground">Log new incidents or review your previous reports.</p>
        </div>

        <Tabs defaultValue="report" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[420px] mb-8">
            <TabsTrigger value="report">Report Incident</TabsTrigger>
            <TabsTrigger value="history">Incident History</TabsTrigger>
          </TabsList>

          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>New Incident Report</CardTitle>
                <CardDescription>Fill in all fields and submit. Your report will be sent to the admin for review.</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <IncidentHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
