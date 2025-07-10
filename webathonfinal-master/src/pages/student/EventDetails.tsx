
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Award, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import StudentSidebar from '@/components/StudentSidebar';
import { useToast } from '@/hooks/use-toast';

// Mock event data
const eventData = {
  id: '1',
  title: 'Tech Innovation Summit',
  description: 'Join us for a day of innovative talks, workshops, and networking opportunities with industry leaders. The Tech Innovation Summit brings together students, professors, and professionals to explore cutting-edge technologies and their applications across various fields.',
  longDescription: "The Tech Innovation Summit is an annual event that showcases the latest advancements in technology and provides a platform for students to connect with industry experts. This year\\'s summit will feature keynote presentations, interactive workshops, panel discussions, and a startup showcase. Participants will have the opportunity to engage with leading tech companies, learn about emerging trends, and gain hands-on experience with new technologies.\n\nThe event is designed to inspire innovation, foster collaboration, and provide valuable insights into the future of technology. Whether you are a computer science student, an engineering enthusiast, or simply curious about the latest tech trends, this summit offers something for everyone.",
  image: 'https://picsum.photos/seed/event1/1200/600',
  category: 'Academic',
  location: 'Main Auditorium, Building A',
  date: '2024-04-15T10:00:00',
  endDate: '2024-04-15T16:00:00',
  organizer: 'Computer Science Department',
  organizerLogo: 'https://picsum.photos/seed/org1/100/100',
  capacity: 100,
  registered: 78,
  pointsAwarded: 50,
  teamSize: 'Individual',
  rounds: 'Single event (no rounds)',
  requirements: 'Open to all students. Bring your laptop for the workshops.',
  status: 'Registration Open',
  paymentRequired: false,
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  
  const handleRegister = () => {
    // In a real app, handle registration here
    setIsRegistered(true);
    toast({
      title: "Registration Successful",
      description: "You've successfully registered for this event.",
    });
  };
  
  const handleShowTicket = () => {
    setShowQRDialog(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />
      
      <div className="flex flex-1 flex-col">
        <DashboardHeader userType="student" />
        
        <main className="flex-1 overflow-y-auto pb-8">
          {/* Event Banner */}
          <div className="relative h-60 w-full md:h-80 lg:h-96">
            <img 
              src={eventData.image} 
              alt={eventData.title} 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
              <Badge className="mb-2">{eventData.category}</Badge>
              <h1 className="text-2xl font-bold text-white md:text-4xl">{eventData.title}</h1>
              <p className="mt-2 text-white/80">{eventData.description}</p>
            </div>
          </div>
          
          <div className="container max-w-6xl px-4 py-6 md:px-0">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Main Content */}
              <div className="md:col-span-2">
                <Card>
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="schedule">Schedule</TabsTrigger>
                      <TabsTrigger value="participants">Participants</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="p-4 md:p-6">
                      <h2 className="mb-4 text-2xl font-bold">Event Information</h2>
                      <p className="whitespace-pre-line text-muted-foreground">
                        {eventData.longDescription}
                      </p>
                      
                      <h3 className="mt-6 mb-3 text-lg font-semibold">Requirements</h3>
                      <p className="text-muted-foreground">{eventData.requirements}</p>
                      
                      <h3 className="mt-6 mb-3 text-lg font-semibold">Team Size</h3>
                      <p className="text-muted-foreground">{eventData.teamSize}</p>
                      
                      <h3 className="mt-6 mb-3 text-lg font-semibold">Format</h3>
                      <p className="text-muted-foreground">{eventData.rounds}</p>
                    </TabsContent>
                    
                    <TabsContent value="schedule" className="p-4 md:p-6">
                      <h2 className="mb-4 text-2xl font-bold">Event Schedule</h2>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">Registration & Welcome</div>
                            <div className="text-sm text-muted-foreground">10:00 AM - 10:30 AM</div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Registration desk opens, welcome coffee and networking.
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">Keynote Presentation</div>
                            <div className="text-sm text-muted-foreground">10:30 AM - 11:30 AM</div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            "The Future of Tech Innovation" by Dr. Jane Smith, CTO of TechCorp.
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">Workshops (Parallel Sessions)</div>
                            <div className="text-sm text-muted-foreground">11:45 AM - 1:00 PM</div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Choose from AI/ML, Web3, or Cloud Computing workshops.
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">Lunch Break & Networking</div>
                            <div className="text-sm text-muted-foreground">1:00 PM - 2:00 PM</div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Catered lunch provided in the Main Hall.
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">Panel Discussion</div>
                            <div className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            "Industry Trends and Career Opportunities" with industry leaders.
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">Startup Showcase</div>
                            <div className="text-sm text-muted-foreground">3:15 PM - 4:30 PM</div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Presentations from student and alumni startups.
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold">Closing Remarks & Networking</div>
                            <div className="text-sm text-muted-foreground">4:30 PM - 5:00 PM</div>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Summary of the day and final networking opportunity.
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="participants" className="p-4 md:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Participants</h2>
                        <div className="text-muted-foreground">
                          {eventData.registered} of {eventData.capacity} spots filled
                        </div>
                      </div>
                      
                      <div className="h-72 flex items-center justify-center border rounded-lg bg-muted/20">
                        <div className="text-center">
                          <Users className="mx-auto h-12 w-12 text-muted" />
                          <p className="mt-2 text-muted-foreground">
                            Participant list will be visible after registration
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Registration Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <Badge 
                        className={
                          eventData.status === "Registration Open" 
                            ? "bg-green-500" 
                            : eventData.status === "Registration Closed" 
                              ? "bg-red-500" 
                              : "bg-yellow-500"
                        }
                      >
                        {eventData.status}
                      </Badge>
                      <div className="text-sm">
                        <span className="font-bold text-campus-600">{eventData.registered}</span>
                        <span className="text-muted-foreground">/{eventData.capacity} registered</span>
                      </div>
                    </div>
                    
                    {!isRegistered ? (
                      <Button 
                        className="w-full bg-campus-600 hover:bg-campus-700"
                        disabled={eventData.status !== "Registration Open"}
                        onClick={handleRegister}
                      >
                        Register Now
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="rounded-lg bg-green-50 p-3 text-center text-green-700">
                          <div className="font-medium">You're registered!</div>
                          <div className="text-sm">
                            See you on {format(new Date(eventData.date), 'MMMM d')}
                          </div>
                        </div>
                        <Button 
                          className="w-full"
                          variant="outline"
                          onClick={handleShowTicket}
                        >
                          <QrCode className="mr-2 h-4 w-4" />
                          Show QR Ticket
                        </Button>
                      </div>
                    )}
                    
                    {eventData.paymentRequired && (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        * Payment required to complete registration
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <div className="flex items-center text-sm">
                        <Award className="mr-2 h-4 w-4 text-campus-600" />
                        <span>Earn <span className="font-bold text-campus-600">{eventData.pointsAwarded} points</span> for attending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Event Info Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-semibold">Event Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="mr-3 h-5 w-5 text-campus-600" />
                        <div>
                          <div className="font-medium">Date & Time</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(eventData.date), 'EEEE, MMMM d, yyyy')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(eventData.date), 'h:mm a')} - 
                            {format(new Date(eventData.endDate), 'h:mm a')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="mr-3 h-5 w-5 text-campus-600" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-sm text-muted-foreground">
                            {eventData.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users className="mr-3 h-5 w-5 text-campus-600" />
                        <div>
                          <div className="font-medium">Organized by</div>
                          <div className="mt-1 flex items-center">
                            <img 
                              src={eventData.organizerLogo} 
                              alt={eventData.organizer} 
                              className="mr-2 h-6 w-6 rounded-full"
                            />
                            <span className="text-sm">{eventData.organizer}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Event Ticket</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4 rounded-lg border border-campus-200 p-2">
              <div className="h-64 w-64 bg-white p-4">
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <QrCode className="h-40 w-40 text-campus-600" />
                </div>
              </div>
            </div>
            <h3 className="font-bold">{eventData.title}</h3>
            <div className="mt-1 text-sm text-muted-foreground">
              {format(new Date(eventData.date), 'EEEE, MMMM d, yyyy')}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Present this QR code at the event for check-in
            </div>
            <Button className="mt-4 w-full" onClick={() => setShowQRDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails;
