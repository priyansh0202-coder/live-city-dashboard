import { useEffect, useState } from "react";
import { fetchCountries } from "../services/countryService";
import CountryCard from "../components/CountryCard";
import { useNavigate } from "react-router-dom";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchCountries()
            .then(data => {
                setCountries(data);
                setFiltered(data);
            })
            .catch(() => setError("Failed to load countries"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const result = countries.filter(c =>
                c.name.common.toLowerCase().includes(search.toLowerCase())
            );
            setFiltered(result);
        }, 500);
        return () => clearTimeout(timer);

    }, [search, countries]);
      

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">🌍 Country Explorer</h2>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-blue-600"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Search */}
            <div className="p-6">
                <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full md:w-1/2 p-3 border rounded shadow-sm"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Content */}
            <div className="px-6 pb-10">
                {loading && (
                    <p className="text-gray-500">Loading countries...</p>
                )}

                {error && (
                    <p className="text-red-500">{error}</p>
                )}

                {!loading && filtered.length === 0 && (
                    <p className="text-gray-400">No countries found</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map(country => (
                        <CountryCard
                            key={country.cca3}
                            country={country}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
