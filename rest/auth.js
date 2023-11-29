import { getCookie } from "@/utils/cookies";
import axios from "axios";

const auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
})

const accessToken = getCookie('accessToken')

export const login = async ({ email, password }) => {
    try {
        const response = await auth.post('/auth/login', { email, password })
        return response.data
    } catch (error) {
        return error.response.data
    }

}

export const getUser = async () => {
    try {
        const response = await auth.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const logout = async () => {
    try {
        const response = await auth.delete('/auth/logout');
        return response.data
    } catch (error) {
        return error.response.data
    }
}
