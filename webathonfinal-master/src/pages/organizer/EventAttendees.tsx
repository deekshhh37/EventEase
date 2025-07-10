
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Download, Upload, QrCode, Plus, Filter, Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import DashboardHeader from '@/components/DashboardHeader';
import OrganizerSidebar from '@/components/OrganizerSidebar';
import { useToast } from '@/hooks/use-toast';

// Mock event data
const eventData = {
  id: '1',
  title: 'Tech Innovation Summit',
  date: 'April 15, 2024',
  registrations: 15,
  checkedIn: 8,
};

// Mock attendees data
const initialAttendeesData = [
  { id: '1', name: 'John Doe', email: 'john.doe@university.edu', studentId: 'S12345678', registrationDate: '2024-04-02', status: 'checked-in', points: 50 },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@university.edu', studentId: 'S23456789', registrationDate: '2024-04-03', status: 'registered', points: 50 },
  { id: '3', name: 'Alex Johnson', email: 'alex.j@university.edu', studentId: 'S34567890', registrationDate: '2024-04-03', status: 'checked-in', points: 50 },
  { id: '4', name: 'Sarah Williams', email: 'sarah.w@university.edu', studentId: 'S45678901', registrationDate: '2024-04-04', status: 'registered', points: 50 },
  { id: '5', name: 'Michael Brown', email: 'michael.b@university.edu', studentId: 'S56789012', registrationDate: '2024-04-04', status: 'no-show', points: 0 },
  { id: '6', name: 'Emily Davis', email: 'emily.d@university.edu', studentId: 'S67890123', registrationDate: '2024-04-05', status: 'checked-in', points: 50 },
  { id: '7', name: 'Daniel Wilson', email: 'daniel.w@university.edu', studentId: 'S78901234', registrationDate: '2024-04-05', status: 'registered', points: 50 },
  { id: '8', name: 'Olivia Taylor', email: 'olivia.t@university.edu', studentId: 'S89012345', registrationDate: '2024-04-06', status: 'checked-in', points: 50 },
  { id: '9', name: 'William Martin', email: 'william.m@university.edu', studentId: 'S90123456', registrationDate: '2024-04-06', status: 'registered', points: 50 },
  { id: '10', name: 'Sophia Anderson', email: 'sophia.a@university.edu', studentId: 'S01234567', registrationDate: '2024-04-07', status: 'checked-in', points: 50 },
  { id: '11', name: 'James Thomas', email: 'james.t@university.edu', studentId: 'S11223344', registrationDate: '2024-04-07', status: 'no-show', points: 0 },
  { id: '12', name: 'Emma Garcia', email: 'emma.g@university.edu', studentId: 'S22334455', registrationDate: '2024-04-08', status: 'checked-in', points: 50 },
  { id: '13', name: 'Lucas Martinez', email: 'lucas.m@university.edu', studentId: 'S33445566', registrationDate: '2024-04-08', status: 'checked-in', points: 50 },
  { id: '14', name: 'Ava Robinson', email: 'ava.r@university.edu', studentId: 'S44556677', registrationDate: '2024-04-09', status: 'registered', points: 50 },
  { id: '15', name: 'Noah Clark', email: 'noah.c@university.edu', studentId: 'S55667788', registrationDate: '2024-04-09', status: 'checked-in', points: 50 },
];

type AttendeeStatus = 'registered' | 'checked-in' | 'no-show';

const EventAttendees = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [attendeesData, setAttendeesData] = useState(initialAttendeesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<string | null>(null);
  const [newAttendee, setNewAttendee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: ''
  });

  const filteredAttendees = attendeesData.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.studentId.toLowerCase().includes(searchTerm.toLowerCase());
                       
    const matchesStatus = statusFilter === 'all' || attendee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (attendeeId: string, newStatus: AttendeeStatus) => {
    setAttendeesData(current => 
      current.map(attendee => 
        attendee.id === attendeeId 
          ? { ...attendee, status: newStatus } 
          : attendee
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Attendee status has been updated to ${newStatus}.`,
    });
  };
  
  const handleSendQR = (attendeeId: string) => {
    setSelectedAttendee(attendeeId);
    setShowQRDialog(true);
  };
  
  const handleSendQREmail = () => {
    toast({
      title: "QR Code Sent",
      description: "QR code ticket has been sent to the attendee's email.",
    });
    setShowQRDialog(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewAttendee(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleAddAttendee = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new attendee object
    const fullName = `${newAttendee.firstName} ${newAttendee.lastName}`;
    const today = new Date().toISOString().split('T')[0];
    
    const newAttendeeEntry = {
      id: `${attendeesData.length + 1}`,
      name: fullName,
      email: newAttendee.email,
      studentId: newAttendee.studentId,
      registrationDate: today,
      status: 'registered' as AttendeeStatus,
      points: 50
    };
    
    // Add the new attendee to the attendees list
    setAttendeesData(prevData => [...prevData, newAttendeeEntry]);
    
    toast({
      title: "Attendee Added",
      description: `${fullName} has been added to the event.`,
    });
    
    // Reset form and close dialog
    setNewAttendee({
      firstName: '',
      lastName: '',
      email: '',
      studentId: ''
    });
    setShowAddDialog(false);
  };

  const getStatusBadge = (status: AttendeeStatus) => {
    switch (status) {
      case 'checked-in':
        return <Badge className="bg-green-500">Checked In</Badge>;
      case 'registered':
        return <Badge className="bg-blue-500">Registered</Badge>;
      case 'no-show':
        return <Badge variant="outline" className="text-muted-foreground">No Show</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <OrganizerSidebar />
      
      <div className="flex flex-1 flex-col">
        <DashboardHeader userType="organizer" />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{eventData.title}</h1>
              <p className="text-muted-foreground">
                {eventData.date} • {eventData.registrations} registrations • {eventData.checkedIn} checked in
              </p>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <Button 
                variant="outline" 
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Attendee
              </Button>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              
              <Button 
                className="bg-campus-600 hover:bg-campus-700"
                onClick={() => navigate(`/organizer/scanner?event=${id}`)}
              >
                <QrCode className="mr-2 h-4 w-4" />
                QR Scanner
              </Button>
            </div>
          </div>
          
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ID"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex w-full gap-3 sm:w-auto">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Filter</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Reset
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.length > 0 ? (
                  filteredAttendees.map((attendee) => (
                    <TableRow key={attendee.id}>
                      <TableCell className="font-medium">{attendee.name}</TableCell>
                      <TableCell>{attendee.email}</TableCell>
                      <TableCell>{attendee.studentId}</TableCell>
                      <TableCell>{new Date(attendee.registrationDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(attendee.status as AttendeeStatus)}</TableCell>
                      <TableCell>{attendee.points}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSendQR(attendee.id)}
                            title="Send QR Code"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          
                          {attendee.status !== 'checked-in' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStatusChange(attendee.id, 'checked-in')}
                              title="Mark as Checked In"
                              className="text-green-500 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {attendee.status === 'registered' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStatusChange(attendee.id, 'no-show')}
                              title="Mark as No Show"
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No attendees found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
      
      {/* Add Attendee Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Attendee</DialogTitle>
            <DialogDescription>
              Add a new attendee to {eventData.title}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddAttendee}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <Input 
                    id="firstName" 
                    required 
                    value={newAttendee.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <Input 
                    id="lastName" 
                    required 
                    value={newAttendee.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  value={newAttendee.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="studentId" className="text-sm font-medium">Student ID</label>
                <Input 
                  id="studentId" 
                  required 
                  value={newAttendee.studentId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-campus-600 hover:bg-campus-700">
                Add Attendee
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Send QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send QR Code</DialogTitle>
            <DialogDescription>
              Send QR code ticket to the attendee's email
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4 rounded-lg border border-campus-200 p-2">
              <div className="h-48 w-48 bg-white p-4">
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <QrCode className="h-32 w-32 text-campus-600" />
                </div>
              </div>
            </div>
            <p className="text-center text-sm">
              This QR code will be sent to: <br />
              <span className="font-medium">
                {attendeesData.find(a => a.id === selectedAttendee)?.email}
              </span>
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQRDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSendQREmail}
              className="bg-campus-600 hover:bg-campus-700"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventAttendees;
