import { getCookie } from "@/utils/cookies";
import axios from "axios";

const auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

const accessToken = getCookie('accessToken')

export const getAllProfile = async () => {
    try {
        const response = await auth.get('/services/tokopedia/profiles', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}