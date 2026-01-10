import axios from "axios";

export const getTopNews = async () => {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

    if (!apiKey) {
        throw new Error("GNews API key missing");
    }

    const res = await axios.get("https://gnews.io/api/v4/top-headlines", {
        params: {
            country: "in",
            lang: "en",
            max: 5,
            token: apiKey,
        },
    });

    return res.data.articles;
};
