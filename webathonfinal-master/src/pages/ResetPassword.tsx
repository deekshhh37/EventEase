
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetComplete, setResetComplete] = useState(false);

  useEffect(() => {
    // Check if we have the token in the URL (Supabase adds it when redirecting from email)
    const hashParams = new URLSearchParams(location.hash.substring(1));
    if (!hashParams.get("access_token")) {
      setError("Invalid or expired reset link. Please try again.");
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      setResetComplete(true);
      toast({
        title: "Password updated",
        description: "Your password has been successfully reset.",
      });

      // Wait a moment before redirecting to login
      setTimeout(() => navigate('/'), 3000);
    } catch (error: any) {
      setError(error.message || 'An error occurred. Please try again.');
      toast({
        title: "Error",
        description: error.message || 'Failed to reset password.',
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
          <p className="text-white/80">Create a new password</p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {!resetComplete 
                ? "Please enter a new password for your account." 
                : "Your password has been successfully reset."}
            </CardDescription>
          </CardHeader>
          
          {!resetComplete ? (
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
                      <Label htmlFor="password">New Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        required 
                        minLength={6}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="••••••••" 
                        required 
                        minLength={6}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-campus-600 hover:bg-campus-700"
                      disabled={loading || !password || !confirmPassword}
                    >
                      {loading ? "Updating..." : "Reset Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="space-y-4">
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertTitle>Password Reset Complete</AlertTitle>
                <AlertDescription>
                  Your password has been successfully updated. You'll be redirected to the login page shortly.
                </AlertDescription>
              </Alert>
              
              <Button 
                className="w-full" 
                onClick={() => navigate('/')}
              >
                Go to Login
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
