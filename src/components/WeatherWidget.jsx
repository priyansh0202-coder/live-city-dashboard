import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherService";
import Loader from "./Loader";
// Weather Widget Component
export default function WeatherWidget() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchWeather();
    }, []);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError("");
            const weatherData = await getWeather("Pune");
            if (!weatherData?.main || !weatherData?.weather?.length) {
                throw new Error("Weather data not available");
            }
            setData(weatherData);
        } catch (err) {
            const message =
                err.response?.data.message || 
                err.message ||                
                "Failed to fetch weather";

            setError(message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-48">
                <p className="text-red-500 font-medium capitalize">
                    {error}
                </p>
            </div>
        );
      }

    if (!data) return null;

    function InfoItem({ icon, label, value }) {
        return (
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm">
                <div className="text-2xl">{icon}</div>
                <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="font-semibold text-gray-800">{value}</p>
                </div>
            </div>
        );
    }
      

    return (
        <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Weather</h3>
                    <p className="text-gray-500 text-sm">Current conditions</p>
                </div>

                <div className="bg-gradient-to-br from-blue-400 to-cyan-400 p-3 rounded-xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-700 mb-3">
                📍 <span className="font-medium">{data.name}, {data.sys.country}</span>
            </div>

            {/* Temperature Card */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-5xl font-bold text-gray-800">
                            {Math.round(data.main.temp)}°C
                        </div>
                        <p className="text-gray-600 mt-1 capitalize">
                            {data.weather[0].description}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Feels like {Math.round(data.main.feels_like)}°C
                        </p>
                    </div>

                    <img
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt="weather"
                        className="w-20 h-20"
                    />
                </div>
            </div>

            {/* Extra Weather Info */}
            <div className="grid grid-cols-2 gap-4">
                <InfoItem icon="💧" label="Humidity" value={`${data.main.humidity}%`} />
                <InfoItem icon="🌬️" label="Wind" value={`${data.wind.speed} m/s`} />
                <InfoItem icon="👁️" label="Visibility" value={`${data.visibility / 1000} km`} />
                <InfoItem icon="☁️" label="Clouds" value={`${data.clouds.all}%`} />
                <InfoItem icon="📈" label="Pressure" value={`${data.main.pressure} hPa`} />
                <InfoItem
                    icon="🌅"
                    label="Sunrise"
                    value={new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
                />
            </div>
        </div>
      
    );
}
