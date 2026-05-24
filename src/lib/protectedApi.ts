import axios from "axios";

const protectedApi = axios.create({

    baseURL:
        process.env.NEXT_PUBLIC_API_BASE_URL,

    headers: {
        "Content-Type": "application/json",
    },

    timeout: 10000,
});


// REQUEST INTERCEPTOR
protectedApi.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem(
                "eci-token"
            );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// RESPONSE INTERCEPTOR
protectedApi.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem(
                "eci-token"
            );

            localStorage.removeItem(
                "eci-user"
            );

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default protectedApi;