import { getCookie } from "@/utils/cookies";
import axios from "axios";

const profile = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

const accessToken = getCookie('accessToken')

export const getAllProfile = async () => {
    try {
        const response = await profile.get('/services/tokopedia/profiles', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const fetchProfile = async (profileId) => {
    try {
        const response = await profile.get(`/services/tokopedia/profiles/${profileId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const deleteProfile = async (profileId) => {
    try {
        const response = await profile.delete(`/services/tokopedia/profiles/${profileId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}