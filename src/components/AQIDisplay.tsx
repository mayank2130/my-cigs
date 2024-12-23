import React from "react";
import { Cigarette } from "lucide-react";

interface AQIDisplayProps {
  aqi: number | null;
  cigarettes: string | null;
}

const AQIDisplay = ({ aqi, cigarettes }: AQIDisplayProps) => {
  return (
    <div className="bg-[#222222]/90 backdrop-blur-lg rounded-xl p-8 w-full max-w-md border border-[#F97316]/20 relative overflow-hidden hover:scale-105 transition-transform duration-300 flex justify-center items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#F97316]/10 rounded-full blur-3xl animate-smoke"></div>
      <div className="flex flex-col items-center justify-center space-y-2 ">
        <div className="text-2xl font-light text-white/60">
          Today&apos;s Air Quality
        </div>
        <div className="text-6xl font-bold text-red-400 tracking-tight">
          {aqi}
        </div>
        <div className="flex items-center space-x-2">
          <Cigarette className="w-10 h-10 text-white/60" />
          <span className="text-xl text-white/60">
            Congratulations! You&apos;ve smoked
          </span>
        </div>
        <div className="text-4xl font-bold text-[#F97316] tracking-tight flex items-baseline gap-2">
          {cigarettes}
          <span className="text-lg text-white/60 tracking-normal">
            cigarettes
          </span>
        </div>
      </div>
    </div>
  );
};

export default AQIDisplay;
