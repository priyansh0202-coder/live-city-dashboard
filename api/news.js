export default async function handler(req, res) {
    try {
        const response = await fetch(
            `https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=5&token=${process.env.VITE_GNEWS_API_KEY}`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch news from GNews",
            });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
}
  