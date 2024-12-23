"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import AQIDisplay from "@/components/AQIDisplay";
import YearFullDisplay from "@/components/YearFullDisplay";
import { aqiToPM25 } from "@/lib/utils";

interface AQIResponse {
  indexes: Array<{
    aqi: number;
    category: string;
    dominantPollutant: string;
  }>;
}

const LocationFetcher: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setCoordinates(coords);
        localStorage.setItem("coordinates", JSON.stringify(coords));
        setLoading(false);
      },
      () => {
        setError("Location permission denied");
        alert("Please enable location permission to use this app");
        setLoading(false);
      }
    );
  };

  const calculateCigarettes = (pm25: number) => {
    return pm25 / 22; // Using the provided formula
  };
  const pm25 = aqiToPM25(aqi);
  const cigarettes = pm25 ? calculateCigarettes(pm25).toFixed(2) : 0;

  const fetchAQI = async () => {
    if (!coordinates) return;

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!API_KEY) {
      setError("API key not provided");
      return;
    }
    try {
      const response = await axios.post<AQIResponse>(
        "https://airquality.googleapis.com/v1/currentConditions:lookup",
        {
          location: {
            latitude: coordinates.lat,
            longitude: coordinates.lon,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            key: API_KEY,
          },
        }
      );

      const fetchedAqi = response.data.indexes[0].aqi;
      setAqi(fetchedAqi);
      localStorage.setItem("aqi", fetchedAqi.toString());
      setError("");
    } catch (err) {
      console.error("API Error:", err);
      if (err instanceof Error) {
        setError(`Failed to fetch AQI data: ${err.message}`);
      } else {
        setError("Failed to fetch AQI data");
      }
    }
  };

  useEffect(() => {
    const storedCoordinates = localStorage.getItem("coordinates");
    const storedAqi = localStorage.getItem("aqi");

    if (storedCoordinates) {
      setCoordinates(JSON.parse(storedCoordinates));
    } else {
      requestLocation();
    }

    if (storedAqi) {
      setAqi(parseInt(storedAqi, 10));
    }
  }, []);

  useEffect(() => {
    if (coordinates && !aqi) {
      fetchAQI();
    }
  }, [coordinates]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#221F26] animate-gradient-y">
      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Your Daily <span className="text-[#F97316]">Passive Smoking</span>{" "}
            Achievement
          </h1>
          <Image
            className="mx-auto"
            alt="trophy"
            src={"./medal.svg"}
            width={70}
            height={70}
          />
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto">
            Who needs actual cigarettes when the air is doing all the work?
            Track your involuntary smoking habits, courtesy of your local air
            quality.
          </p>
        </div>

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-10">
          <AQIDisplay aqi={aqi} cigarettes={cigarettes.toString()} />
          <YearFullDisplay />
        </div>

        <div className="mt-12 text-white/40 text-sm max-w-md text-center">
          * Based on scientific research comparing PM2.5 exposure to cigarette
          smoking. No actual cigarettes were lit in the making of these
          statistics.
        </div>
      </div>
    </div>
  );
};

export default LocationFetcher;
