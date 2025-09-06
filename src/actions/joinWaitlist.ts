import axios from "axios";

export const joinWaitlist = async (email: string) => {
  try {
    const response = await axios.post("https://jun-greek-spectrum-li.trycloudflare.com/hackathon/waitlist", { email });
    console.log(response)
    return response.data;
  } catch (error: any) {
    return {error: error.response?.data?.message || error.message || "Something went wrong"};
  }
};
