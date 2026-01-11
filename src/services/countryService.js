import axios from "axios";

export const fetchCountries = async () => {
    const res = await axios.get(
        "https://restcountries.com/v3.1/all",
        {
            params: {
                fields: "name,flags,population,region,cca3",
            },
        }
    );

    return res.data;
};
