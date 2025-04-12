import React from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIpLocation } from "@/hooks/useIpLocation";
import { getBrowserAndOS } from "@/lib/utils";
import { UserDeviceInfo } from "@/components/UserDevice";
import { EducationalAlert, EducationalBanner } from "@/components/EducationalAlert";
import { AlertTriangle } from "lucide-react";

export default function WarningPage() {
  const [, setLocation] = useLocation();
  const { ip, location, loading } = useIpLocation();
  const deviceInfo = getBrowserAndOS();

  const handleContinue = () => {
    setLocation("/verify");
  };

  return (
    <>
      <EducationalBanner />
      
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
            <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Suspicious login detected</h1>
            <p className="text-gray-600 mb-4">Please verify your identity to continue.</p>
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
          
          <Button 
            className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-6"
            onClick={handleContinue}
          >
            Continue
          </Button>
          
          <EducationalAlert>
            Real phishing attempts often create a sense of urgency and fear to make you act quickly without thinking.
          </EducationalAlert>
        </CardContent>
      </Card>

      <div className="w-full max-w-md text-center mt-4 text-gray-500 text-xs">
        <p>Your information is used only for verification purposes. All data is confidential.</p>
        <p className="mt-2 text-amber-600 font-medium">EDUCATIONAL DEMO - NO REAL DATA IS COLLECTED OR STORED</p>
      </div>
    </>
  );
}
