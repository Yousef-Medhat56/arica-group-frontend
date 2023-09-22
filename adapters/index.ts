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

// export const post = async (endpoint: string, data: {}, locale?: string) => {
//     const response = await axios.post(
//         API_URL + endpoint,
//         { data },

//         {
//             headers: { Authorization },
//             maxRedirects:0,
//             baseURL:API_URL + endpoint
//         }
//     );

//     return response.data;
// };

export const post = async (endpoint: string, data: {}, locale?: string) => {
    const rawResponse = await fetch(API_URL + endpoint, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: Authorization,
        },
        redirect: "manual",
        body: JSON.stringify(data),
    });
    const content = await rawResponse.json();
    return content.data;
};
