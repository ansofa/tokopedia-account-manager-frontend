import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export const postRegistration = async ({
    fullName, email, password, confirmPassword
}) => {
    try {
        const response = await api.post('/users',{
            fullName,
            email,
            password,
            confirmPassword
        })
        return response.data;
    } catch (error) {
        alert(error.message)
    }
}