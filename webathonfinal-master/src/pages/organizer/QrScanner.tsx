
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import OrganizerSidebar from '@/components/OrganizerSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { SearchIcon, QrCode, CheckCircle2, XCircle, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock events data
const events = [
  { id: '1', title: 'Tech Innovation Summit', date: 'Apr 15, 2024' },
  { id: '2', title: 'Spring Music Festival', date: 'Apr 20, 2024' },
  { id: '3', title: 'Basketball Tournament', date: 'Apr 25, 2024' },
];

// Mock scanned users data
const scannedUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@university.edu', time: '10:15 AM', status: 'success' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@university.edu', time: '10:23 AM', status: 'success' },
  { id: '3', name: 'Alex Johnson', email: 'alex.j@university.edu', time: '10:38 AM', status: 'error' },
];

const QrScanner = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>();
  const [isScanning, setIsScanning] = useState(false);
  const [scanHistory, setScanHistory] = useState(scannedUsers);

  const handleStartScan = () => {
    if (!selectedEvent) {
      toast({
        title: "Event Required",
        description: "Please select an event before scanning.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would activate the camera for scanning
    setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  const handleManualEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate the student ID and check them in
    toast({
      title: "Check-in Successful",
      description: "Student has been checked in to the event.",
    });
    
    // Add the mock scan to history
    setScanHistory([
      {
        id: Date.now().toString(),
        name: "Manual Entry",
        email: "student@university.edu",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'success'
      },
      ...scanHistory
    ]);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />
      
      <div className="flex flex-1 flex-col">
        <DashboardHeader userType="organizer" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="mb-6 text-3xl font-bold">QR Code Scanner</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Event Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="w-full sm:w-1/2">
                    <Select 
                      value={selectedEvent}
                      onValueChange={setSelectedEvent}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event to scan for" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.title} - {event.date}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {!isScanning ? (
                    <Button 
                      onClick={handleStartScan}
                      className="w-full bg-campus-600 hover:bg-campus-700 sm:w-auto"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Start Scanning
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleStopScan}
                      variant="destructive"
                      className="w-full sm:w-auto"
                    >
                      Stop Scanning
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>QR Scanner</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col items-center justify-center">
                {isScanning ? (
                  <div className="w-full">
                    <div className="aspect-square w-full max-w-md mx-auto rounded-lg border border-dashed border-muted-foreground bg-muted p-2">
                      <div className="relative h-full w-full overflow-hidden rounded bg-background">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="h-24 w-24 text-muted-foreground" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-48 w-48 animate-pulse border-2 border-campus-600"></div>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
                          Position QR code within the frame
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Scanning for: {events.find(e => e.id === selectedEvent)?.title}
                      </p>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                        <span className="text-sm">Scanner active</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <QrCode className="mb-4 h-16 w-16 text-muted" />
                    <h3 className="mb-2 text-lg font-medium">QR Scanner Inactive</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Select an event and click "Start Scanning"<br />to begin scanning QR codes
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Manual Check-In</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualEntry}>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 text-sm font-medium">Student ID or Email</div>
                      <div className="flex">
                        <Input 
                          placeholder="Enter student ID or email" 
                          className="rounded-r-none"
                          disabled={!selectedEvent}
                        />
                        <Button 
                          type="submit" 
                          className="rounded-l-none bg-campus-600 hover:bg-campus-700"
                          disabled={!selectedEvent}
                        >
                          <SearchIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Tabs defaultValue="success">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="success">Recent Check-ins</TabsTrigger>
                          <TabsTrigger value="error">Issues</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="success" className="mt-2 max-h-[300px] overflow-y-auto rounded-md border">
                          <div className="divide-y">
                            {scanHistory
                              .filter(user => user.status === 'success')
                              .map(user => (
                                <div key={user.id} className="flex items-center justify-between p-3">
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="mr-2 text-xs text-muted-foreground">{user.time}</div>
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="error" className="mt-2 max-h-[300px] overflow-y-auto rounded-md border">
                          <div className="divide-y">
                            {scanHistory
                              .filter(user => user.status === 'error')
                              .map(user => (
                                <div key={user.id} className="flex items-center justify-between p-3">
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="mr-2 text-xs text-muted-foreground">{user.time}</div>
                                    <XCircle className="h-5 w-5 text-red-500" />
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QrScanner;
