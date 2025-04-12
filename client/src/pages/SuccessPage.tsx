import React from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function SuccessPage() {
  const [, setLocation] = useLocation();

  const handleRestart = () => {
    setLocation("/");
  };

  return (
    <>
      <Card className="w-full max-w-md bg-white rounded-lg shadow-md">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-[#42B72A] h-8 w-8" />
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Verification Complete</h1>
            <p className="text-gray-600 mb-6">
              Thank you for verifying your identity. Your account has been secured.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6 text-left">
              <h3 className="font-bold text-blue-700 mb-2">Account Protection Tips:</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Use a strong, unique password</li>
                <li>Enable two-factor authentication</li>
                <li>Be cautious about third-party apps</li>
                <li>Check login alerts regularly</li>
                <li>Log out when using shared devices</li>
              </ul>
            </div>
            
            <Button
              className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200"
              onClick={handleRestart}
            >
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-md text-center mt-4 text-gray-500 text-xs">
        <p>Your information is used only for verification purposes. All data is confidential.</p>
      </div>
    </>
  );
}
