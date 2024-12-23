import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const aqiToPM25 = (aqi: number | null) => {
  if (!aqi) return 0;

  if (aqi < 0) return 0; // Invalid AQI
  if (aqi <= 50) return (aqi / 50) * 12; // Good
  if (aqi <= 100) return ((aqi - 51) / 49) * 23 + 12; // Moderate
  if (aqi <= 150) return ((aqi - 101) / 49) * 35.4 + 35.5; // Unhealthy for sensitive groups
  if (aqi <= 200) return ((aqi - 151) / 49) * 54.4 + 55.5; // Unhealthy
  if (aqi <= 300) return ((aqi - 201) / 99) * 150.4 + 150.5; // Very Unhealthy
  if (aqi <= 400) return ((aqi - 301) / 99) * 250.4 + 250.5; // Hazardous
  if (aqi <= 500) return ((aqi - 401) / 99) * 350.4 + 350.5; // Hazardous (higher range)
  return 500; // For AQI above 500
};