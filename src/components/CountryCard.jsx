export default function CountryCard({ country }) {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img
                src={country.flags.png}
                alt={country.name.common}
                className="h-32 w-full object-cover rounded"
            />

            <h3 className="mt-3 font-semibold text-lg">
                {country.name.common}
            </h3>

            <p className="text-sm text-gray-600">
                Population: {country.population.toLocaleString()}
            </p>

            <p className="text-sm text-gray-600">
                Region: {country.region}
            </p>
        </div>
    );
}
  