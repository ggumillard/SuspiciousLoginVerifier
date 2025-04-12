import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryCodesProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
}

const countryCodes = [
  { value: "+1", label: "+1 (US)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+91", label: "+91 (IN)" },
  { value: "+61", label: "+61 (AU)" },
  { value: "+33", label: "+33 (FR)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+86", label: "+86 (CN)" },
  { value: "+81", label: "+81 (JP)" },
  { value: "+82", label: "+82 (KR)" },
  { value: "+7", label: "+7 (RU)" },
];

export function CountryCodes({ onChange, value, className }: CountryCodesProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="+91" />
      </SelectTrigger>
      <SelectContent>
        {countryCodes.map((code) => (
          <SelectItem key={code.value} value={code.value}>
            {code.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
