

import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import Loader from "./Loader";
// Weather Widget Component
export default function WeatherWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getWeather("London").then(setData).catch(() => setError("Failed to load weather")).finally(() => setLoading(false));
           
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="flex flex-col items-center gap-3">
                    <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-500 text-sm">Loading weather...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="text-center">
                    <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-red-500 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Weather</h3>
                    <p className="text-gray-500 text-sm">Current conditions</p>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-3 rounded-xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 font-medium">{data.name}</span>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-5xl font-bold text-gray-800">
                                {data.main.temp}°C
                            </div>
                            <p className="text-gray-600 mt-2 capitalize">{data.weather[0].description}</p>
                        </div>
                        <div className="text-6xl">☁️</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
