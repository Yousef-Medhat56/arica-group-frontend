import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Authorization = "Bearer " + process.env.NEXT_PUBLIC_API_TOKEN;

export const get = async (endpoint: string, locale?: string) => {
    const response = await axios.get(API_URL + endpoint, {
        params: { locale },
        headers: { Authorization },
    });

    return response.data;
};

export const post = async (endpoint: string, data: {}, locale?: string) => {
    const response = await axios.post(
        API_URL + endpoint,
        { data },
        {
            headers: { Authorization },
        }
    );

    return response.data;
};
