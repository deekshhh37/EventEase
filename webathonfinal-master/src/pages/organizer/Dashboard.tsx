
import React from 'react';
import { CalendarIcon, Users, Clock, MapPin, ChevronRight, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import OrganizerSidebar from '@/components/OrganizerSidebar';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for charts
const eventData = [
  { name: 'Jan', attendees: 65, events: 4 },
  { name: 'Feb', attendees: 80, events: 5 },
  { name: 'Mar', attendees: 125, events: 6 },
  { name: 'Apr', attendees: 90, events: 3 },
  { name: 'May', attendees: 110, events: 4 },
  { name: 'Jun', attendees: 150, events: 5 },
];

// Mock pie chart data
const eventTypeData = [
  { name: 'Academic', value: 35 },
  { name: 'Cultural', value: 25 },
  { name: 'Sports', value: 20 },
  { name: 'Workshops', value: 15 },
  { name: 'Career', value: 5 },
];

const COLORS = ['#7C3AED', '#9F7AEA', '#B794F4', '#D6BCFA', '#E9D8FD'];

// Mock events data
const upcomingEvents = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    date: '2024-04-15T10:00:00',
    location: 'Main Auditorium',
    registrations: 78,
    capacity: 100,
  },
  {
    id: '2',
    title: 'Spring Music Festival',
    date: '2024-04-20T16:00:00',
    location: 'Campus Green',
    registrations: 125,
    capacity: 200,
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    date: '2024-04-25T14:00:00',
    location: 'Sports Complex',
    registrations: 45,
    capacity: 60,
  },
];

const pastEvents = [
  {
    id: '4',
    title: 'Data Science Seminar',
    date: '2024-03-25T13:00:00',
    location: 'Science Building, Room 103',
    attendees: 43,
    registrations: 50,
  },
  {
    id: '5',
    title: 'Alumni Networking Night',
    date: '2024-03-18T18:00:00',
    location: 'Business School Atrium',
    attendees: 65,
    registrations: 70,
  },
  {
    id: '6',
    title: 'Hackathon 2024',
    date: '2024-03-10T09:00:00',
    location: 'Engineering Building',
    attendees: 112,
    registrations: 120,
  },
];

const OrganizerDashboard = () => {
  const navigate = useNavigate();

  const viewEventDetails = (id: string) => {
    navigate(`/organizer/events/${id}`);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />
      
      <div className="flex flex-1 flex-col">
        <DashboardHeader userType="organizer" />
        
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
              <p className="text-muted-foreground">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
            </div>
            <Button 
              className="mt-4 bg-campus-600 hover:bg-campus-700 md:mt-0"
              onClick={() => navigate('/organizer/create-event')}
            >
              Create New Event
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>20% increase</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">850</div>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>15% increase</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="mt-2 flex items-center text-xs">
                  <span className="font-medium text-campus-600">Next:</span>
                  <span className="ml-1 truncate">Tech Summit (Apr 15)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    5%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Compared to last quarter</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Analytics Charts */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Event Activity</CardTitle>
                <CardDescription>Monthly attendance and event counts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={eventData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attendees" fill="#7C3AED" name="Attendees" />
                    <Bar dataKey="events" fill="#D6BCFA" name="Events" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Event Categories</CardTitle>
                <CardDescription>Distribution by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={eventTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {eventTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Events Management */}
          <Tabs defaultValue="upcoming" className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Events Management</h2>
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="upcoming" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-4">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <CalendarIcon className="mr-1 h-4 w-4" />
                                {format(new Date(event.date), 'MMM d, yyyy')}
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                {format(new Date(event.date), 'h:mm a')}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 sm:items-end">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                <Users className="mr-1 h-3 w-3" />
                                {event.registrations}/{event.capacity}
                              </Badge>
                              <Badge 
                                className={event.registrations >= event.capacity ? 
                                  "bg-red-500" : "bg-green-500"}
                              >
                                {event.registrations >= event.capacity ? "Full" : "Open"}
                              </Badge>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => viewEventDetails(event.id)}
                            >
                              Manage Event
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="past" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {pastEvents.map((event) => (
                      <div key={event.id} className="p-4">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <CalendarIcon className="mr-1 h-4 w-4" />
                                {format(new Date(event.date), 'MMM d, yyyy')}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-4 w-4" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 sm:items-end">
                            <div className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                <Users className="mr-1 h-3 w-3" />
                                {event.attendees}/{event.registrations} attended
                              </Badge>
                              <Badge 
                                className={
                                  event.attendees / event.registrations > 0.8 
                                    ? "bg-green-500" 
                                    : event.attendees / event.registrations > 0.5 
                                      ? "bg-yellow-500" 
                                      : "bg-red-500"
                                }
                              >
                                {Math.round((event.attendees / event.registrations) * 100)}% attendance
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/organizer/events/${event.id}/analytics`)}
                              >
                                <BarChart3 className="mr-1 h-4 w-4" />
                                Analytics
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => viewEventDetails(event.id)}
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
