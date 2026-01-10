import axios from "axios";

export const fetchCountries = async () => {
    const res = await axios.get("https://restcountries.com/v3.1/independent?status=true");
    return res.data;
};
