import { useState, useEffect } from 'react';

interface LocationData {
  ip: string;
  location: string;
  city: string;
  country: string;
  loading: boolean;
  error: string | null;
}

export function useIpLocation(): LocationData {
  const [data, setData] = useState<LocationData>({
    ip: '',
    location: '',
    city: '',
    country: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    // Simulate a short loading delay for better UX
    const delay = setTimeout(() => {
      // Always return the fixed values as per requirements
      setData({
        ip: '103.21.58.65',
        location: 'Bengaluru, India',
        city: 'Bengaluru',
        country: 'India',
        loading: false,
        error: null
      });
    }, 800);

    return () => clearTimeout(delay);
  }, []);

  return data;
}
