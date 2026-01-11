import { Navigate, useNavigate } from "react-router-dom";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import WebSocketPanel from "../components/WebSocketPanel";
export default function Dashboard() {
    const navigate = useNavigate(), logout = () => {
        localStorage.clear();
        navigate("/");
        console.log("Logged out");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Decorative background blobs */}
            <div className="fixed top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>

            <div
                className="fixed bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"
                style={{ animationDelay: "2s" }}
            ></div>

            {/* Header */}
            <div className="relative bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Live City Dashboard
                        </h2>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-start gap-4 pt-4">
                <button
                    onClick={() => navigate("/countries")}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Explore Countries
                </button>
                <button
                    onClick={() => navigate("/notes")}
                    className="ml-4 bg-purple-600 text-white px-4 py-2 rounded"
                >
                    Live Notes
                </button>
            </div>

          

            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto p-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Weather Card */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
                        <WeatherWidget />
                    </div>

                    {/* News Card */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
                        <NewsWidget />
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-shadow duration-300">
                        <WebSocketPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}