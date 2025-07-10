
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"student" | "organizer">("student");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (e: React.FormEvent, userType: "student" | "organizer") => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Instead of using authentication, let's direct users to the dashboard
      if (userType === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/organizer/dashboard");
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome back! You're logged in as ${userType}.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An error occurred during login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-700 to-campus-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">CampusEvents</h1>
          <p className="text-white/80">Discover, Join, and Track Campus Events</p>
        </div>

        <Card className="w-full">
          <Tabs 
            defaultValue="student" 
            className="w-full"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "student" | "organizer")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="organizer">Event Organizer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="student" className="animate-slide-up">
              <CardHeader>
                <CardTitle>Student Login</CardTitle>
                <CardDescription>Enter your credentials to access your student dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, "student")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input 
                        id="student-email" 
                        type="email" 
                        placeholder="your.email@university.edu" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="student-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-campus-600 hover:text-campus-800">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="student-password" 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="student-remember" />
                      <label htmlFor="student-remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember me
                      </label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Log In"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup"
                    className="text-campus-600 hover:text-campus-800 font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="organizer" className="animate-slide-up">
              <CardHeader>
                <CardTitle>Organizer Login</CardTitle>
                <CardDescription>Enter your credentials to manage your events.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, "organizer")}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="organizer-email">Email</Label>
                      <Input 
                        id="organizer-email" 
                        type="email" 
                        placeholder="organizer@university.edu" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="organizer-password">Password</Label>
                        <Link to="/forgot-password" className="text-xs text-campus-600 hover:text-campus-800">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="organizer-password" 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="organizer-remember" />
                      <label htmlFor="organizer-remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Remember me
                      </label>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Log In"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                  Contact your administrator for organizer access.
                </div>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
