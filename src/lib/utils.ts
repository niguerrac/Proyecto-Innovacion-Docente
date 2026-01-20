import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId() {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function getDeviceInfo() {
  if (typeof window === 'undefined') return {};
  return {
    userAgent: window.navigator.userAgent,
    language: window.navigator.language,
    platform: (window.navigator as any).platform,
    vendor: window.navigator.vendor,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
  };
}
