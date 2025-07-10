
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  Home, 
  QrCode,
  Settings, 
  Ticket, 
  Users, 
  PlusCircle,
  ClipboardList
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const OrganizerSidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/organizer/dashboard" },
    { icon: Ticket, label: "My Events", path: "/organizer/events" },
    { icon: PlusCircle, label: "Create Event", path: "/organizer/create-event" },
    { icon: Users, label: "Attendees", path: "/organizer/attendees" },
    { icon: QrCode, label: "QR Scanner", path: "/organizer/scanner" },
    { icon: BarChart3, label: "Analytics", path: "/organizer/analytics" },
    { icon: Settings, label: "Settings", path: "/organizer/settings" },
  ];

  const upcomingEvents = [
    { name: "Tech Workshop", date: "Apr 10", attendees: 45 },
    { name: "Career Fair", date: "Apr 15", attendees: 120 },
    { name: "Coding Contest", date: "Apr 22", attendees: 30 },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-card">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-6 p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 font-medium">Jane Smith</h3>
            <p className="text-xs text-muted-foreground">Computer Science Department</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border bg-card p-3 text-center">
              <span className="text-2xl font-bold text-campus-600">12</span>
              <p className="text-xs text-muted-foreground">Total Events</p>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center">
              <span className="text-2xl font-bold text-campus-600">850</span>
              <p className="text-xs text-muted-foreground">Attendees</p>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Upcoming Events</h3>
            <div className="space-y-2">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="rounded-lg border bg-card p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{event.name}</span>
                    <Badge variant="outline" className="text-xs">{event.date}</Badge>
                  </div>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <Users className="mr-1 h-3 w-3" /> 
                    <span>{event.attendees} registered</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive 
                      ? "bg-campus-600 text-white" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default OrganizerSidebar;
