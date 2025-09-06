import axios from "axios";

export const joinWaitlist = async (email: string) => {
  try {
    const url = `${import.meta.env.VITE_WAITLIST_URL}/hackathon/waitlist`
    const response = await axios.post(url, { email });
    console.log(response)
    return response.data;
  } catch (error: any) {
    return {error: error.response?.data?.message || error.message || "Something went wrong"};
  }
};
