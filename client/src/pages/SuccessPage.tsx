import React from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EducationalBanner } from "@/components/EducationalAlert";
import { Check } from "lucide-react";

export default function SuccessPage() {
  const [, setLocation] = useLocation();

  const handleRestart = () => {
    setLocation("/");
  };

  return (
    <>
      <EducationalBanner />
      
      <Card className="w-full max-w-md bg-white rounded-lg shadow-md">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-[#42B72A] h-8 w-8" />
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Educational Demo Complete</h1>
            <p className="text-gray-600 mb-6">
              In a real phishing attack, your personal information would have been stolen. 
              Always verify website authenticity before entering your information.
            </p>
            
            <div className="bg-red-50 p-4 rounded-md border border-red-100 mb-6 text-left">
              <h3 className="font-bold text-red-700 mb-2">What a real phishing attack might do with your data:</h3>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Gain access to your personal and business accounts</li>
                <li>Steal your identity for financial fraud</li>
                <li>Distribute malware through trusted connections</li>
                <li>Target your workplace with sophisticated attacks</li>
                <li>Sell your information on dark web marketplaces</li>
              </ul>
            </div>
            
            <Button
              className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200"
              onClick={handleRestart}
            >
              Restart Demo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-md text-center mt-4 text-gray-500 text-xs">
        <p>Your information is used only for verification purposes. All data is confidential.</p>
        <p className="mt-2 text-amber-600 font-medium">EDUCATIONAL DEMO - NO REAL DATA IS COLLECTED OR STORED</p>
      </div>
    </>
  );
}
