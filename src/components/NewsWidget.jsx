import { useEffect, useState } from "react";
import { getTopNews } from "../services/newsService";
import Loader from "./Loader";

export default function NewsWidget() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        // Simulated API call - replace with your actual getTopNews function
        setTimeout(() => {
            getTopNews().then(setNews).catch(() => setError("Failed to load news")).finally(() => setLoading(false));
            setLoading(false);
        }, 1200);
    }, []);

    if (loading) {
        return (
            <Loader />
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

    if (!loading && news.length === 0) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <p className="text-gray-400">No news available</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Top News</h3>
                    <p className="text-gray-500 text-sm">Latest headlines</p>
                </div>
                <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-3 rounded-xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                </div>
            </div>

            <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {news.map((item, index) => (
                    <li key={index} className="group">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-purple-50/30"
                        >
                            <h4 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                                {item.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                </svg>
                                {item.source.name}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}