
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  Home, 
  Medal, 
  Settings, 
  Ticket, 
  GraduationCap, 
  Music, 
  Trophy, 
  BookOpen, 
  Briefcase
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const StudentSidebar: React.FC = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/student/dashboard" },
    { icon: Ticket, label: "Events", path: "/student/events" },
    { icon: Calendar, label: "Calendar", path: "/student/calendar" },
    { icon: Medal, label: "Leaderboard", path: "/student/leaderboard" },
    { icon: Settings, label: "Settings", path: "/student/settings" },
  ];

  const categories = [
    { icon: BookOpen, label: "Academic", count: 12 },
    { icon: Music, label: "Cultural", count: 8 },
    { icon: Trophy, label: "Sports", count: 15 },
    { icon: GraduationCap, label: "Workshops", count: 6 },
    { icon: Briefcase, label: "Career", count: 10 },
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
            <h3 className="mt-4 font-medium">John Doe</h3>
            <p className="text-xs text-muted-foreground">Computer Science, Year 3</p>
          </div>

          {/* Stats Section */}
          <div className="rounded-lg border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium">Points</span>
              <span className="font-bold text-campus-600">450</span>
            </div>
            <Progress value={45} className="mb-2 h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Level 2</span>
              <span>550 pts to Level 3</span>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium">Events Attended</span>
              <span className="font-bold text-campus-600">12</span>
            </div>
            
            <div className="mt-4">
              <span className="text-sm font-medium">Badges</span>
              <div className="mt-2 flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">First Event</Badge>
                <Badge variant="outline" className="text-xs">5+ Events</Badge>
                <Badge variant="outline" className="text-xs">Organizer</Badge>
              </div>
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

          {/* Categories */}
          <div>
            <h3 className="mb-2 text-sm font-medium">Event Categories</h3>
            <div className="space-y-1">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </div>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentSidebar;
