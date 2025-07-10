
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import DashboardHeader from '@/components/DashboardHeader';
import StudentSidebar from '@/components/StudentSidebar';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock events data
const eventsData = [
  {
    id: '1',
    title: 'Tech Innovation Summit',
    date: new Date('2024-04-15T10:00:00'),
    category: 'Academic',
    location: 'Main Auditorium',
  },
  {
    id: '2',
    title: 'Spring Music Festival',
    date: new Date('2024-04-20T16:00:00'),
    category: 'Cultural',
    location: 'Campus Green',
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    date: new Date('2024-04-25T14:00:00'),
    category: 'Sports',
    location: 'Sports Complex',
  },
  {
    id: '4',
    title: 'Career Development Workshop',
    date: new Date('2024-04-12T13:00:00'),
    category: 'Career',
    location: 'Business School, Room 203',
  },
  {
    id: '5',
    title: 'AI Research Presentation',
    date: new Date('2024-04-18T15:30:00'),
    category: 'Academic',
    location: 'Computer Science Building',
  },
];

const CalendarView = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'agenda'>('month');

  // Calculate events for the current month
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = eachDayOfInterval({ start, end });
  
  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
    }
  };
  
  const handleViewEvent = (id: string) => {
    navigate(`/student/events/${id}`);
  };

  const getEventsForDate = (date: Date) => {
    return eventsData.filter(event => isSameDay(event.date, date));
  };

  const categoryColors = {
    Academic: 'bg-blue-100 text-blue-800',
    Cultural: 'bg-purple-100 text-purple-800',
    Sports: 'bg-green-100 text-green-800',
    Career: 'bg-orange-100 text-orange-800',
    Workshops: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />
      
      <div className="flex flex-1 flex-col">
        <DashboardHeader userType="student" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Event Calendar</h1>
              <p className="text-muted-foreground">
                View and manage your upcoming events
              </p>
            </div>
            
            <div className="mt-4 flex space-x-4 md:mt-0">
              <div className="flex items-center rounded-lg border">
                <Button
                  variant="ghost"
                  className={`${view === 'month' ? 'bg-muted' : ''} rounded-r-none`}
                  onClick={() => setView('month')}
                >
                  Month
                </Button>
                <div className="h-5 w-px bg-border"></div>
                <Button
                  variant="ghost"
                  className={`${view === 'agenda' ? 'bg-muted' : ''} rounded-l-none`}
                  onClick={() => setView('agenda')}
                >
                  Agenda
                </Button>
              </div>
              
              <Button 
                onClick={() => setDate(new Date())}
                variant="outline"
              >
                Today
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-7">
            {view === 'month' ? (
              <>
                <Card className="md:col-span-5">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between border-b p-4">
                      <h2 className="font-semibold">
                        {format(date, 'MMMM yyyy')}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      className="rounded-md border-0"
                      modifiers={{
                        hasEvent: (date) => 
                          eventsData.some(event => isSameDay(event.date, date)),
                      }}
                      modifiersStyles={{
                        hasEvent: { 
                          fontWeight: 'bold',
                          backgroundColor: '#EDE9FE',
                          color: '#6D28D9',
                        },
                      }}
                    />
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <h2 className="font-semibold">
                        Events on {format(date, 'MMMM d, yyyy')}
                      </h2>
                    </div>
                    
                    <div className="space-y-3">
                      {getEventsForDate(date).length > 0 ? (
                        getEventsForDate(date).map((event) => (
                          <div
                            key={event.id}
                            className="rounded-lg border p-3"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{event.title}</h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewEvent(event.id)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Add to Google Calendar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {event.category}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {format(event.date, 'h:mm a')}
                              </div>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {event.location}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex h-32 items-center justify-center rounded-lg border">
                          <div className="text-center text-muted-foreground">
                            <CalendarIcon className="mx-auto mb-2 h-6 w-6" />
                            <p>No events scheduled for this day</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="md:col-span-7">
                <CardContent className="p-6">
                  <h2 className="mb-4 font-semibold">
                    Upcoming Events - {format(date, 'MMMM yyyy')}
                  </h2>
                  
                  <div className="space-y-4">
                    {eventsData
                      .sort((a, b) => a.date.getTime() - b.date.getTime())
                      .map((event) => (
                        <div
                          key={event.id}
                          className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center"
                        >
                          <div className="flex-shrink-0 text-center sm:w-24">
                            <div className="font-bold text-campus-600">{format(event.date, 'd')}</div>
                            <div className="text-sm text-muted-foreground">{format(event.date, 'MMMM')}</div>
                          </div>
                          
                          <div className="mt-4 flex-grow sm:mt-0 sm:ml-4">
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="mt-1 flex items-center space-x-3">
                              <Badge 
                                className={`${(categoryColors as any)[event.category] || 'bg-gray-100 text-gray-800'}`}
                              >
                                {event.category}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                {format(event.date, 'h:mm a')}
                              </div>
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {event.location}
                            </div>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 sm:ml-4">
                            <Button 
                              size="sm" 
                              className="w-full bg-campus-600 hover:bg-campus-700 sm:w-auto"
                              onClick={() => handleViewEvent(event.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarView;
