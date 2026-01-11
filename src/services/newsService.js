export const getTopNews = async () => {
    const res = await axios.get("/api/news");
    return res.data.articles;
};
  