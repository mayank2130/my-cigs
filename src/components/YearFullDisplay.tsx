"use client";
import React, { useState } from "react";
import { Cigarette } from "lucide-react";
import { aqiToPM25 } from "@/lib/utils";

const cities = [
  { name: "bangalore", aqi: 54 },
  { name: "hydrabad", aqi: 72 },
  { name: "delhi", aqi: 205 },
  { name: "mumbai", aqi: 109 },
  { name: "kolkata", aqi: 91 },
  { name: "ahmedabad", aqi: 117 },
  { name: "patna", aqi: 212 },
];

const calculateCigarettes = (pm25: number) => {
  return pm25 / 22; // Using the provided formula
};

const YearFullDisplay = () => {
  const [fullYearCigarettes, setFullYearCigarettes] = useState<
    number | null | string
  >(null);

  const calculateFullYearCigarettes = (aqi: number) => {
    const pm25 = aqiToPM25(aqi);
    const cigarettes = (
      365 * parseFloat(calculateCigarettes(pm25).toFixed(2))
    ).toFixed(2);
    setFullYearCigarettes(cigarettes);
  };

  return (
    <div className="bg-[#222222]/90 backdrop-blur-lg rounded-xl p-8 w-full max-w-md border border-[#F97316]/20 relative overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#F97316]/10 rounded-full blur-3xl animate-smoke"></div>
      <div className="flex flex-col items-center space-y-2 relative">
        <div className="text-2xl font-light text-white/60">
          Full Year Achievement:
        </div>
        {cities.map((city) => (
          <button
          key={city.name}
            onClick={() => calculateFullYearCigarettes(city.aqi)}
            className="bg-[#F97316] text-white font-bold py-2 px-4 rounded-lg"
          >
            {city.name}
          </button>
        ))}
        {fullYearCigarettes && (
          <>
            <div className="flex items-center space-x-2">
              <Cigarette className="w-10 h-10 text-white/60" />
              <span className="text-xl text-white/60">
                Congratulations! You&apos;ve smoked
              </span>
            </div>
            <div className="text-4xl font-bold text-[#F97316] tracking-tight flex items-baseline gap-2">
              {fullYearCigarettes}
              <span className="text-lg text-white/60 tracking-normal">
                cigarettes{" / "}year
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YearFullDisplay;
