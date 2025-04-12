import React from 'react';
import { MapPin, NetworkIcon, Monitor } from 'lucide-react';

interface UserInfoProps {
  ipAddress: string;
  location: string;
  device: string;
}

export function UserDeviceInfo({ ipAddress, location, device }: UserInfoProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <div className="flex items-center mb-2">
        <MapPin className="text-facebook-blue h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Location:</span>
        <span className="text-sm ml-2">{location}</span>
      </div>
      
      <div className="flex items-center mb-2">
        <NetworkIcon className="text-facebook-blue h-4 w-4 mr-2" />
        <span className="text-sm font-medium">IP Address:</span>
        <span className="text-sm ml-2">{ipAddress}</span>
      </div>
      
      <div className="flex items-center">
        <Monitor className="text-facebook-blue h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Device:</span>
        <span className="text-sm ml-2">{device}</span>
      </div>
    </div>
  );
}
