
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) {
        throw error;
      }

      setEmailSent(true);
      toast({
        title: "Recovery email sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error: any) {
      setError(error.message || 'An error occurred. Please try again.');
      toast({
        title: "Error",
        description: error.message || 'Failed to send recovery email.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-700 to-campus-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">CampusEvents</h1>
          <p className="text-white/80">Reset your password</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              {!emailSent 
                ? "Enter your email and we'll send you instructions to reset your password." 
                : "Check your email for password reset instructions."}
            </CardDescription>
          </CardHeader>
          
          {!emailSent ? (
            <>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@university.edu" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      disabled={loading || !email}
                    >
                      {loading ? "Sending..." : "Send Reset Instructions"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              
              <CardFooter className="flex justify-center">
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link to="/" className="text-campus-600 hover:text-campus-800 font-medium">
                    Back to Login
                  </Link>
                </div>
              </CardFooter>
            </>
          ) : (
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertTitle>Check your email</AlertTitle>
                <AlertDescription>
                  We've sent recovery instructions to <strong>{email}</strong>. Please check your inbox and spam folder.
                </AlertDescription>
              </Alert>
              
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Return to Login
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
