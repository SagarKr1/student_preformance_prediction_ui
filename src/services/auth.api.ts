import axiosClient from "../lib/axios";
import axios from "axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: any;
    error?: any;
}

export async function loginUser(
    payload: LoginPayload
): Promise<LoginResponse> {

    try {

        const response = await axiosClient.post(
            "/public/login",
            payload
        );

        // console.log("STATUS :", response.status);
        // console.log("DATA :", response.data);

        // SUCCESS RESPONSE
        if (response.status === 200 && response.data.success) {

            if (response.data.user.role == "admin") {
                return {
                    success: true,
                    message: response.data.message,
                    token: response.data.token,
                    user: {
                        name: response.data.user.full_name,
                        email: response.data.user.email,
                        role: 'admin',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
                        branch: response.data.user.branch || "All Branch"
                    },
                };
            } else {
                return {
                    success: true,
                    message: response.data.message,
                    token: response.data.token,
                    user: {
                        name: response.data.user.full_name,
                        email: response.data.user.email,
                        role: 'teacher',
                        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
                        branch: response.data.user.branch
                    },
                };
            }
        }

        // FALLBACK ERROR
        return {
            success: false,
            message: "Login Failed",
            error: "Invalid credentials",
        };

    } catch (e) {

        console.error("LOGIN ERROR :", e);

        // AXIOS ERROR
        if (axios.isAxiosError(e)) {

            return {
                success: false,
                message:
                    e.response?.data?.message ||
                    "Login Auth Error",

                error:
                    e.response?.data ||
                    e.message,
            };
        }

        // UNKNOWN ERROR
        return {
            success: false,
            message: "Something went wrong",
            error: "Unknown Error",
        };
    }
}