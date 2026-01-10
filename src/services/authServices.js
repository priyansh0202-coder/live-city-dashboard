import axios from "axios";

export const loginUser = async (username, password) => {
    const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
    });
    return res.data;
};
