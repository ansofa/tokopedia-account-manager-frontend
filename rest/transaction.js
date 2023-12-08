import { getCookie } from "@/utils/cookies";
import axios from "axios";

const profile = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

const accessToken = getCookie('accessToken')

export const getTransaction = async (profileId) => {
    try {
        const response = await profile.get(`/services/tokopedia/transaction/${profileId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}