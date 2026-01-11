import axios from "axios";

export const getTopNews = async () => {
    const res = await axios.get(
        `${window.location.origin}/api/news`
    );
    return res.data.articles;
};
