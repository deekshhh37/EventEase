
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import StudentSidebar from '@/components/StudentSidebar';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', events: 3 },
  { name: 'Feb', events: 5 },
  { name: 'Mar', events: 2 },
  { name: 'Apr', events: 7 },
  { name: 'May', events: 4 },
  { name: 'Jun', events: 6 },
  { name: 'Jul', events: 3 },
  { name: 'Aug', events: 1 },
  { name: 'Sep', events: 8 },
  { name: 'Oct', events: 5 },
  { name: 'Nov', events: 4 },
  { name: 'Dec', events: 6 },
];

const yearlyData = [
  { name: '2021', events: 24 },
  { name: '2022', events: 36 },
  { name: '2023', events: 42 },
  { name: '2024', events: 31 },
];

// Mock event data
const featuredEvents = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    description: 'Learn about the latest trends in technology and innovation.',
    image: 'https://picsum.photos/seed/event1/400/200',
    category: 'Academic',
    location: 'Main Auditorium',
    date: '2024-04-15T10:00:00',
  },
  {
    id: '2',
    title: 'Spring Music Festival',
    description: 'Annual music festival featuring student bands and performers.',
    image: 'https://picsum.photos/seed/event2/400/200',
    category: 'Cultural',
    location: 'Campus Green',
    date: '2024-04-20T16:00:00',
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    description: 'Inter-department basketball championship with exciting prizes.',
    image: 'https://picsum.photos/seed/event3/400/200',
    category: 'Sports',
    location: 'Sports Complex',
    date: '2024-04-25T14:00:00',
  },
];

const upcomingEvents = [
  {
    id: '4',
    title: 'Career Development Workshop',
    category: 'Career',
    location: 'Business School, Room 203',
    date: '2024-04-12T13:00:00',
  },
  {
    id: '5',
    title: 'AI Research Presentation',
    category: 'Academic',
    location: 'Computer Science Building',
    date: '2024-04-18T15:30:00',
  },
  {
    id: '6',
    title: 'Photography Exhibition',
    category: 'Cultural',
    location: 'Arts Center Gallery',
    date: '2024-04-22T10:00:00',
  },
];

const topUsers = [
  { rank: 1, name: 'Sarah Johnson', points: 1250, avatar: 'https://picsum.photos/seed/user1/100/100' },
  { rank: 2, name: 'Michael Chen', points: 1180, avatar: 'https://picsum.photos/seed/user2/100/100' },
  { rank: 3, name: 'Emily Davis', points: 1050, avatar: 'https://picsum.photos/seed/user3/100/100' },
  { rank: 4, name: 'You', points: 950, avatar: 'https://github.com/shadcn.png' },
  { rank: 5, name: 'Robert Wilson', points: 920, avatar: 'https://picsum.photos/seed/user5/100/100' },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('monthly');
  
  const handleViewEvent = (id: string) => {
    navigate(`/student/events/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />
      
      <div className="flex flex-1 flex-col">
        <DashboardHeader userType="student" />
        
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">12</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    20%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Compared to previous month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <div className="mt-2 flex items-center text-xs">
                  <span className="font-medium text-campus-600">Next:</span>
                  <span className="ml-1 truncate">Career Workshop (Apr 12)</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">450</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="mr-1 h-4 w-4" />
                    15%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">50 points earned this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <div className="mt-2 flex items-center text-xs">
                  <span className="font-medium text-campus-600">Latest:</span>
                  <span className="ml-1 truncate">5+ Events Attended</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Chart and Calendar */}
          <div className="mb-8 grid gap-6 md:grid-cols-5">
            <Card className="col-span-5 md:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Event Participation</CardTitle>
                  <CardDescription>Track your event attendance over time</CardDescription>
                </div>
                <Tabs defaultValue={chartType} onValueChange={setChartType}>
                  <TabsList className="grid w-36 grid-cols-2">
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={chartType === 'monthly' ? monthlyData : yearlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="events"
                      stroke="#7C3AED"
                      fillOpacity={1}
                      fill="url(#colorEvents)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-5 md:col-span-2">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Upcoming event dates</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simple event date list as placeholder for calendar */}
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center rounded-lg border p-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-campus-100 text-campus-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="ml-3 flex-1 truncate">
                        <div className="truncate font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(event.date), 'MMM d, h:mm a')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  className="mt-4 w-full"
                  onClick={() => navigate('/student/calendar')}
                >
                  View Full Calendar
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Featured Events */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">Featured Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>{event.category}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(event.date), 'MMM d')}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {event.location}
                    </div>
                    <div className="flex items-center mb-4 text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      {format(new Date(event.date), 'h:mm a')}
                    </div>
                    <Button 
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      onClick={() => handleViewEvent(event.id)}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Leaderboard Preview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Leaderboard</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/student/leaderboard')}
              >
                View All
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {topUsers.map((user, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-4 ${
                        user.name === 'You' ? 'bg-campus-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-campus-100 text-campus-600 font-bold">
                          {user.rank}
                        </div>
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="ml-3 h-8 w-8 rounded-full"
                        />
                        <span className="ml-3 font-medium">
                          {user.name}
                          {user.name === 'You' && (
                            <span className="ml-2 text-xs font-normal text-muted-foreground">
                              (That's you!)
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="font-bold text-campus-600">
                        {user.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
