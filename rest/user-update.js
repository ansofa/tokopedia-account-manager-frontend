import { getCookie } from "@/utils/cookies";
import axios from "axios";

const userUpdate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

const accessToken = getCookie("accessToken");

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  try {
    const response = await userUpdate.post("/services/user/cloudinary", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateImage = async (imageUrl) => {
  try {
    const response = await userUpdate.post(
      "/settings/image",
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
