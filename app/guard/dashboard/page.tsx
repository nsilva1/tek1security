'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Clock, Power, QrCode, Calendar as CalendarIcon, Navigation, ArrowRight, Loader2, CheckCircle2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Function to fetch location
const fetchLocation = async (): Promise<string> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Error getting location", error);
          resolve("Location unavailable");
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      resolve("Geolocation not supported");
    }
  });
};

export default function GuardDashboard() {
  // Card 1: Shift Status State
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [shiftLocation, setShiftLocation] = useState<string | null>(null);
  const [shiftTimestamp, setShiftTimestamp] = useState<Date | null>(null);
  const [isClocking, setIsClocking] = useState(false);

  // Card 2: Tracking State
  const [trackingLocation, setTrackingLocation] = useState<string | null>(null);
  const [lastTrackingTime, setLastTrackingTime] = useState<Date | null>(null);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false); 

  // Card 3: Checkpoints State
  const [scannedCheckpoints, setScannedCheckpoints] = useState<{ id: number; name: string; time: Date }[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  const mockCheckpoints = ["Main Gate", "Lobby", "Parking Lot A", "North Wing", "Cafeteria"];

  // Handle Clock In / Out
  const handleClockToggle = async () => {
    setIsClocking(true);
    const loc = await fetchLocation();
    
    setIsOnDuty(!isOnDuty);
    setShiftLocation(loc);
    setShiftTimestamp(new Date());
    
    // Automatically enable tracking when on duty, disable when off duty
    if (!isOnDuty) {
      setIsTrackingEnabled(true);
      setTrackingLocation(loc);
      setLastTrackingTime(new Date());
    } else {
      setIsTrackingEnabled(false);
    }
    
    setIsClocking(false);
  };

  // Periodic Location Tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTrackingEnabled) {
      interval = setInterval(async () => {
        const loc = await fetchLocation();
        setTrackingLocation(loc);
        setLastTrackingTime(new Date());
      }, 30000); // Check every 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTrackingEnabled]);

  // Handle Checkpoint Scan
  const handleScan = () => {
    setIsScanning(true);
    // Simulate a scan delay
    setTimeout(() => {
      const randomCheckpoint = mockCheckpoints[Math.floor(Math.random() * mockCheckpoints.length)];
      setScannedCheckpoints(prev => [
        { id: Date.now(), name: randomCheckpoint, time: new Date() },
        ...prev
      ]);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Guard Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
            G
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Overview</h2>
          <p className="text-muted-foreground">Manage your shift, track location, and scan checkpoints.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Shift Status */}
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Shift Status</span>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${isOnDuty ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                  {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
                </span>
              </CardTitle>
              <CardDescription>Clock in to start your shift and enable tracking.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${isOnDuty ? 'bg-emerald-500/20 text-emerald-500' : 'bg-muted text-muted-foreground'}`}>
                  <Power size={24} />
                </div>
                <div>
                  <p className="font-medium text-lg">
                    {isOnDuty ? 'Active Shift' : 'Inactive'}
                  </p>
                  {shiftLocation && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {shiftLocation}
                    </p>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={handleClockToggle} 
                disabled={isClocking}
                className={`w-full py-6 text-lg font-semibold shadow-md transition-all ${
                  isOnDuty 
                    ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                {isClocking ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                ) : (
                  <>{isOnDuty ? 'Clock Out' : 'Clock In'}</>
                )}
              </Button>
              
              {shiftTimestamp && (
                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-2">
                  <Clock size={12} /> Last action: {shiftTimestamp.toLocaleTimeString()}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Location Tracking Status */}
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Navigation className="text-primary" size={20} />
                Location Tracking
              </CardTitle>
              <CardDescription>Live location tracking during active shifts.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-center">
              <div className="flex flex-col items-center justify-center space-y-4 py-8 bg-muted/30 rounded-xl border border-border">
                <div className="relative">
                  <div className={`absolute -inset-1 rounded-full opacity-30 ${isTrackingEnabled ? 'bg-primary animate-ping' : 'bg-muted'}`}></div>
                  <div className={`relative p-4 rounded-full ${isTrackingEnabled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <MapPin size={32} />
                  </div>
                </div>
                
                <div className="text-center space-y-1">
                  <p className="font-semibold text-lg">
                    {isTrackingEnabled ? 'Tracking Active' : 'Tracking Disabled'}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-[250px] mx-auto">
                    {trackingLocation ? trackingLocation : (isTrackingEnabled ? 'Acquiring location...' : 'Start your shift to enable tracking.')}
                  </p>
                </div>
              </div>
              
              {lastTrackingTime && isTrackingEnabled && (
                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-6">
                  <Clock size={12} /> Last updated: {lastTrackingTime.toLocaleTimeString()}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Card 3: Checkpoint Scanner */}
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <QrCode className="text-primary" size={20} />
                Scan Checkpoint
              </CardTitle>
              <CardDescription>Log your patrol progress along the route.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <Button 
                onClick={handleScan} 
                disabled={isScanning || !isOnDuty}
                variant="outline"
                className="w-full py-8 border-dashed border-2 border-primary/50 hover:bg-primary/5 hover:border-primary text-primary transition-all mb-4"
              >
                {isScanning ? (
                  <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Scanning...</>
                ) : (
                  <><QrCode className="mr-2 h-6 w-6" /> Scan Next Checkpoint</>
                )}
              </Button>
              
              {!isOnDuty && (
                <p className="text-xs text-center text-destructive mb-4">You must be on duty to scan checkpoints.</p>
              )}

              <div className="flex-1 overflow-y-auto max-h-[180px] space-y-3 pr-2">
                {scannedCheckpoints.length === 0 ? (
                  <div className="text-center text-muted-foreground text-sm py-4">
                    No checkpoints scanned yet.
                  </div>
                ) : (
                  scannedCheckpoints.map((cp) => (
                    <div key={cp.id} className="flex justify-between items-center p-3 bg-muted/40 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-emerald-500" size={18} />
                        <span className="font-medium">{cp.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={12} /> {cp.time.toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Upcoming Shift */}
          <Card className="flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="text-primary" size={20} />
                Upcoming Shift
              </CardTitle>
              <CardDescription>Your next scheduled assignment.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">Tomorrow</h3>
                    <p className="text-primary font-medium">08:00 AM - 04:00 PM</p>
                  </div>
                  <div className="bg-background px-3 py-1 rounded-full text-xs font-semibold border border-border">
                    8 hrs
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={18} className="text-muted-foreground" />
                    <span className="font-medium">Main Campus, Building A</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase size={18} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Front Desk Security</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Link 
                href="/guard/dashboard/shifts" 
                className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 font-medium p-3 rounded-lg hover:bg-primary/5 transition-colors"
              >
                View all scheduled shifts <ArrowRight size={16} />
              </Link>
            </CardFooter>
          </Card>

        </div>
      </main>
    </div>
  );
}
