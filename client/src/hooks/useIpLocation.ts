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
    const fetchData = async () => {
      try {
        // Try to use ipinfo.io to get location data
        const response = await fetch('https://ipinfo.io/json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const result = await response.json();
        
        setData({
          ip: result.ip || '103.21.58.65',
          location: `${result.city || 'Bengaluru'}, ${result.country || 'India'}`,
          city: result.city || 'Bengaluru',
          country: result.country || 'India',
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching IP data:', error);
        
        // Use hardcoded data if the API call fails
        setData({
          ip: '103.21.58.65',
          location: 'Bengaluru, India',
          city: 'Bengaluru',
          country: 'India',
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    fetchData();
  }, []);

  return data;
}
