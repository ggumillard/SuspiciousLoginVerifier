import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
}

export function validatePhone(phone: string): boolean {
  const pattern = /^\d{10}$/;
  return pattern.test(phone);
}

export function validateUrl(url: string): boolean {
  const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return pattern.test(url);
}

export function getBrowserAndOS(): string {
  if (typeof window === 'undefined' || !window.navigator) {
    return 'Unknown Browser on Unknown OS';
  }

  // Get browser info
  const userAgent = window.navigator.userAgent;
  let browserName = 'Unknown Browser';
  let osName = 'Unknown OS';

  // Detect browser
  if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1 && userAgent.indexOf('OPR') === -1) {
    browserName = 'Chrome';
  } else if (userAgent.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
  } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
    browserName = 'Safari';
  } else if (userAgent.indexOf('Edg') > -1) {
    browserName = 'Edge';
  } else if (userAgent.indexOf('OPR') > -1 || userAgent.indexOf('Opera') > -1) {
    browserName = 'Opera';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
    browserName = 'Internet Explorer';
  }

  // Detect OS
  if (userAgent.indexOf('Win') > -1) {
    osName = userAgent.indexOf('Windows NT 10') > -1 ? 'Windows 11' : 'Windows';
  } else if (userAgent.indexOf('Mac') > -1) {
    osName = 'macOS';
  } else if (userAgent.indexOf('Linux') > -1) {
    osName = 'Linux';
  } else if (userAgent.indexOf('Android') > -1) {
    osName = 'Android';
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    osName = 'iOS';
  }

  return `${browserName} on ${osName}`;
}
