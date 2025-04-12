import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, Info } from 'lucide-react';

interface EducationalAlertProps {
  className?: string;
  title?: string;
  children: React.ReactNode;
  type?: 'warning' | 'info';
}

export function EducationalAlert({ 
  className, 
  title = 'Educational Note:', 
  children, 
  type = 'info' 
}: EducationalAlertProps) {
  const bgColor = type === 'warning' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100';
  const textColor = type === 'warning' ? 'text-red-700' : 'text-blue-500';

  return (
    <div className={cn('mt-4 p-3 rounded-md border', bgColor, className)}>
      <p className="text-xs text-gray-600">
        {type === 'warning' ? (
          <AlertCircle className={cn('inline-block mr-1 h-3 w-3', textColor)} />
        ) : (
          <Info className={cn('inline-block mr-1 h-3 w-3', textColor)} />
        )}
        <strong className={textColor}>{title}</strong> {children}
      </p>
    </div>
  );
}

export function EducationalBanner() {
  return (
    <div className="w-full max-w-3xl mb-4 bg-amber-100 text-amber-800 px-4 py-3 rounded-lg shadow-sm border border-amber-200 text-center">
      <p className="font-bold">EDUCATIONAL DEMO ONLY</p>
      <p className="text-sm">This is a simulation to help identify phishing attempts. No real data is collected.</p>
    </div>
  );
}
