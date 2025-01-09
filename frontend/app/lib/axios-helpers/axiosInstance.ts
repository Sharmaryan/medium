import axios from "axios";
import { getServerSession } from "next-auth/next";
import { NEXT_AUTH } from "../auth";

const isServer = typeof window === "undefined";

const createAxiosInstance = async (clientToken?: string) => {
  let token: string | undefined;

  if (isServer) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.token) {
      throw new Error("Unable to retrieve access token. Please log in.");
    }
    token = session.user.token;
  } else {
    if (!clientToken) {
      throw new Error("Access token must be provided in client-side calls.");
    }
    token = clientToken;
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export default createAxiosInstance;
